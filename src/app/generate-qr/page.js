"use client";
import { useEffect, useState } from "react";
import axios from "../llb/axios";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  QrCodeIcon,
  LinkIcon,
  TrashIcon,
  ArrowPathIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  ArrowDownTrayIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
export default function QRPage() {
  return (
    <ProtectedRoute>
      <QRContent />
    </ProtectedRoute>
  );
}
function QRContent() {
  const [qr, setQr] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loadingQR, setLoadingQR] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState(0);
  // Customizations
  const [qrColor, setQrColor] = useState("#000000");
  const [customText, setCustomText] = useState("Scan for Feedback");
  const [textColor, setTextColor] = useState("#000000");
  const [logoSrc, setLogoSrc] = useState(null);
  const [logoSize, setLogoSize] = useState(50);
  const [logoPosition, setLogoPosition] = useState("center");
  /* ------------------- Fetch Existing QR ------------------- */
  const fetchQR = async () => {
    setFetching(true);
    setError("");
    try {
      const { data } = await axios.get('/my-qr', {
        withCredentials: true,
      });
      setQr(data.success ? data.qr : null);
    } catch (e) {
      console.error("Fetch QR error:", e);
      setError("Failed to load QR code. Please try again.");
    } finally {
      setFetching(false);
    }
  };
  useEffect(() => {
    fetchQR();
  }, []);
  /* ------------------- Generate New QR ------------------- */
  const generateQR = async () => {
    setLoadingQR(true);
    setError("");
    try {
      const { data } = await axios.post('/generate-qr',
        {},
        { withCredentials: true }
      );
      if (data.success) {
        setQr(data.qr);
        setSelectedFrame(0);
        setQrColor("#000000");
        setCustomText("Scan for Feedback");
        setTextColor("#000000");
        setLogoSrc(null);
        setLogoSize(50);
        setLogoPosition("center");
      } else {
        setError(data.message || "Failed to generate QR");
      }
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoadingQR(false);
    }
  };
  /* ------------------- Delete QR ------------------- */
  const deleteQR = async () => {
    setLoadingQR(true);
    setError("");
    try {
      const { data } = await axios.delete('/delete-qr', {
        withCredentials: true,
      });
      if (data.success) {
        setQr(null);
        setSelectedFrame(0);
        setShowDeleteDialog(false);
      } else {
        setError(data.message || "Failed to delete QR");
      }
    } catch (e) {
      setError("Failed to delete QR. Please try again.");
    } finally {
      setLoadingQR(false);
    }
  };
  /* ------------------- Copy Link ------------------- */
  const copyLink = async () => {
    if (!qr?.data) return;
    try {
      await navigator.clipboard.writeText(qr.data);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      alert("Failed to copy link.");
    }
  };
  /* ------------------- Download QR ------------------- */
  const downloadQR = () => {
    if (!qr?.imageUrl) {
      alert("No QR image available.");
      return;
    }
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const qrImg = new Image();
    qrImg.crossOrigin = "anonymous";
    qrImg.onload = () => {
      canvas.width = 450;
      canvas.height = 550;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const qrSize = 260;
      const qrX = 95;
      const qrY = selectedFrame > 0 ? 105 : 55;
      if (selectedFrame > 0) {
        const frameImg = new Image();
        frameImg.crossOrigin = "anonymous";
        frameImg.onload = () => {
          ctx.drawImage(frameImg, 0, 0, 450, 550);
          drawQRAndProceed();
        };
        frameImg.onerror = () => {
          console.error("Failed to load frame image.");
          drawQRAndProceed(); // Proceed without frame if error
        };
        frameImg.src = `/frames/frame-${selectedFrame}.png`;
      } else {
        drawQRAndProceed();
      }
      function drawQRAndProceed() {
        ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
        if (qrColor !== "#000000") {
          colorizeQR(ctx, qrColor, qrX, qrY, qrSize, qrSize);
        }
        drawLogoAndText();
      }
      function drawLogoAndText() {
        if (logoSrc) {
          const logoImg = new Image();
          logoImg.crossOrigin = "anonymous";
          logoImg.onload = () => {
            let logoX = qrX + (qrSize - logoSize) / 2;
            let logoY = qrY + (qrSize - logoSize) / 2;
            switch (logoPosition) {
              case "top":
                logoY = qrY;
                break;
              case "bottom":
                logoY = qrY + qrSize - logoSize;
                break;
              case "left":
                logoX = qrX;
                break;
              case "right":
                logoX = qrX + qrSize - logoSize;
                break;
              // center is default
            }
            ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
            drawTextAndFinalize();
          };
          logoImg.onerror = () => {
            console.error("Failed to load logo image.");
            drawTextAndFinalize(); // Proceed without logo if error
          };
          logoImg.src = logoSrc;
        } else {
          drawTextAndFinalize();
        }
      }
      function drawTextAndFinalize() {
        if (customText) {
          ctx.font = "bold 28px Arial";
          ctx.fillStyle = textColor;
          ctx.textAlign = "center";
          ctx.fillText(customText, canvas.width / 2, 430);
        }
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "my-feedback-qr.png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          } else {
            alert("Failed to generate QR image for download.");
          }
        }, "image/png");
      }
    };
    qrImg.onerror = () => {
      console.error("Failed to load QR image.");
      alert("Failed to load QR image. Please check if the QR code is generated correctly.");
    };
    qrImg.src = qr.imageUrl;
  };
  /* ------------------- Print QR ------------------- */
  const printQR = () => {
    if (!qr?.imageUrl) {
      alert("No QR image available.");
      return;
    }
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const qrImg = new Image();
    qrImg.crossOrigin = "anonymous";
    qrImg.onload = () => {
      canvas.width = 450;
      canvas.height = 550;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const qrSize = 260;
      const qrX = 95;
      const qrY = selectedFrame > 0 ? 105 : 55;
      if (selectedFrame > 0) {
        const frameImg = new Image();
        frameImg.crossOrigin = "anonymous";
        frameImg.onload = () => {
          ctx.drawImage(frameImg, 0, 0, 450, 550);
          drawQRAndProceed();
        };
        frameImg.onerror = () => {
          console.error("Failed to load frame image for print.");
          drawQRAndProceed();
        };
        frameImg.src = `/frames/frame-${selectedFrame}.png`;
      } else {
        drawQRAndProceed();
      }
      function drawQRAndProceed() {
        ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
        if (qrColor !== "#000000") {
          colorizeQR(ctx, qrColor, qrX, qrY, qrSize, qrSize);
        }
        drawLogoAndText();
      }
      function drawLogoAndText() {
        if (logoSrc) {
          const logoImg = new Image();
          logoImg.crossOrigin = "anonymous";
          logoImg.onload = () => {
            let logoX = qrX + (qrSize - logoSize) / 2;
            let logoY = qrY + (qrSize - logoSize) / 2;
            switch (logoPosition) {
              case "top":
                logoY = qrY;
                break;
              case "bottom":
                logoY = qrY + qrSize - logoSize;
                break;
              case "left":
                logoX = qrX;
                break;
              case "right":
                logoX = qrX + qrSize - logoSize;
                break;
              // center is default
            }
            ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
            drawTextAndFinalize();
          };
          logoImg.onerror = () => {
            console.error("Failed to load logo image for print.");
            drawTextAndFinalize();
          };
          logoImg.src = logoSrc;
        } else {
          drawTextAndFinalize();
        }
      }
      function drawTextAndFinalize() {
        if (customText) {
          ctx.font = "bold 28px Arial";
          ctx.fillStyle = textColor;
          ctx.textAlign = "center";
          ctx.fillText(customText, canvas.width / 2, 430);
        }
        const dataUrl = canvas.toDataURL("image/png");
        const win = window.open('', '_blank');
        if (win) {
          win.document.write(
            '<html><head><title>Print QR</title></head><body>' +
            '<img src="' + dataUrl + '" style="width:100%; max-width:450px;" onload="window.print();window.close()" />' +
            '</body></html>'
          );
          win.document.close();
        } else {
          alert("Failed to open print window. Please allow pop-ups.");
        }
      }
    };
    qrImg.onerror = () => {
      console.error("Failed to load QR image for print.");
      alert("Failed to load QR image for print. Please check if the QR code is generated correctly.");
    };
    qrImg.src = qr.imageUrl;
  };
  function colorizeQR(ctx, hex, x, y, w, h) {
    const imageData = ctx.getImageData(x, y, w, h);
    const data = imageData.data;
    const [r, g, b] = hexToRgb(hex);
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] < 50 && data[i + 1] < 50 && data[i + 2] < 50 && data[i + 3] > 0) {
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
      }
    }
    ctx.putImageData(imageData, x, y);
  }
  function hexToRgb(hex) {
    return [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16),
    ];
  }
  function getLogoStyle(position, logoSizePercent) {
    const styles = {
      width: `${logoSizePercent}px`,
      height: `${logoSizePercent}px`,
    };
    switch (position) {
      case "center":
        return { ...styles, top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
      case "top":
        return { ...styles, top: "0", left: "50%", transform: "translate(-50%, 0)" };
      case "bottom":
        return { ...styles, top: "100%", left: "50%", transform: "translate(-50%, -100%)" };
      case "left":
        return { ...styles, top: "50%", left: "0", transform: "translate(0, -50%)" };
      case "right":
        return { ...styles, top: "50%", left: "100%", transform: "translate(-100%, -50%)" };
      default:
        return { ...styles, top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    }
  }
  /* ------------------- Frames ------------------- */
  const frames = [
    { name: "None", border: "border-4 border-gray-300" },
    { name: "Classic", border: "border-8 border-indigo-600 rounded-3xl" },
    { name: "Rounded", border: "border-8 border-purple-600 rounded-full" },
    { name: "Dashed", border: "border-8 border-dashed border-indigo-500" },
    { name: "Gradient", border: "border-8 border-transparent bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-3xl" },
    { name: "Shadow", border: "shadow-2xl border-8 border-white rounded-3xl" },
    { name: "Neon", border: "border-8 border-cyan-400 shadow-[0_0_20px_#06b6d4] rounded-3xl" },
    { name: "Elegant", border: "border-8 border-gray-800 rounded-3xl" },
    { name: "Minimal", border: "border-4 border-gray-400 rounded-2xl" },
    { name: "Bold", border: "border-12 border-red-600 rounded-3xl" },
    { name: "Vintage", border: "border-8 border-amber-700 rounded-3xl sepia" },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">My QR Code</h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          Generate and customize your feedback QR code
        </p>
        {/* Loading Skeleton */}
        {fetching && <QRSkeleton />}
        {/* No QR Yet */}
        {!fetching && !qr && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
            <QrCodeIcon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <p className="text-xl text-gray-700 mb-6">
              You don't have a QR code yet.
            </p>
            <button
              onClick={generateQR}
              disabled={loadingQR}
              className="inline-flex items-center gap-3 bg-indigo-600 text-white px-6 py-4 rounded-xl hover:bg-indigo-700 disabled:opacity-70 transition text-lg font-medium touch-manipulation"
            >
              {loadingQR ? (
                <ArrowPathIcon className="w-6 h-6 animate-spin" />
              ) : (
                <QrCodeIcon className="w-6 h-6" />
              )}
              {loadingQR ? "Generating..." : "Generate QR"}
            </button>
          </div>
        )}
        {/* QR Exists */}
        {qr && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200">
            {/* Preview */}
            <div className="mb-10 flex justify-center">
              <div className="bg-white w-full max-w-xs sm:max-w-sm md:max-w-md">
                <div className={`p-4 sm:p-6 md:p-8 bg-white ${frames[selectedFrame].border} transition-all duration-300`}>
                  <div className="relative w-full aspect-square mx-auto">
                    <img
                      src={qr.imageUrl}
                      alt="Your QR Code"
                      className="w-full h-full"
                      style={{
                        filter:
                          qrColor === "#000000"
                            ? "none"
                            : `invert(1) hue-rotate(${getHue(qrColor)}deg) saturate(5) brightness(0.8)`,
                      }}
                    />
                    {logoSrc && (
                      <img
                        src={logoSrc}
                        alt="Logo"
                        className="absolute object-contain"
                        style={getLogoStyle(logoPosition, (logoSize / 260) * 100 + "%")}
                      />
                    )}
                  </div>
                </div>
                {customText && (
                  <p className="mt-6 text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: textColor }}>
                    {customText}
                  </p>
                )}
              </div>
            </div>
            {/* Customizations */}
            <div className="space-y-8 mb-10">
              {/* QR Color */}
              <div className="text-left">
                <label className="block text-base font-semibold text-gray-700 mb-3">
                  QR Code Color
                </label>
                <input
                  type="color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="w-24 h-14 border-2 border-gray-300 rounded-xl cursor-pointer"
                />
              </div>
              {/* Custom Text */}
              <div className="text-left">
                <label className="block text-base font-semibold text-gray-700 mb-3">
                  Text Below QR
                </label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="e.g. Scan for Feedback"
                  className="w-full px-5 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
                />
              </div>
              {/* Text Color */}
              <div className="text-left">
                <label className="block text-base font-semibold text-gray-700 mb-3">
                  Text Color
                </label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-24 h-14 border-2 border-gray-300 rounded-xl cursor-pointer"
                />
              </div>
              {/* Logo Upload */}
              <div className="text-left">
                <label className="block text-base font-semibold text-gray-700 mb-3">
                  Add Logo (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => setLogoSrc(ev.target.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full px-5 py-3 text-base border border-gray-300 rounded-xl"
                />
                {logoSrc && (
                  <button
                    onClick={() => setLogoSrc(null)}
                    className="mt-2 text-red-600 font-medium"
                  >
                    Remove Logo
                  </button>
                )}
              </div>
              {/* Logo Size */}
              {logoSrc && (
                <div className="text-left">
                  <label className="block text-base font-semibold text-gray-700 mb-3">
                    Logo Size
                  </label>
                  <input
                    type="range"
                    min={20}
                    max={100}
                    value={logoSize}
                    onChange={(e) => setLogoSize(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-600 mt-1">{logoSize}px</p>
                </div>
              )}
              {/* Logo Position */}
              {logoSrc && (
                <div className="text-left">
                  <label className="block text-base font-semibold text-gray-700 mb-3">
                    Logo Position
                  </label>
                  <select
                    value={logoPosition}
                    onChange={(e) => setLogoPosition(e.target.value)}
                    className="w-full px-5 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
                  >
                    <option value="center">Center</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              )}
              {/* Frame Selector - Responsive Grid */}
              <div>
                <p className="text-base font-semibold text-gray-700 mb-4 text-left">
                  Choose Frame Style
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {frames.map((frame, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedFrame(index)}
                      className={`p-4 rounded-xl border-4 transition-all touch-manipulation ${
                        selectedFrame === index
                          ? "border-indigo-600 bg-indigo-50 shadow-lg scale-105"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className={`w-full aspect-square ${frame.border} flex items-center justify-center rounded-lg`}>
                        <div className="w-12 h-12 bg-gray-800 rounded"></div>
                      </div>
                      <p className="mt-2 text-sm font-medium text-gray-700">{frame.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Link */}
            <div className="bg-gray-50 p-4 rounded-xl mb-8">
              <p className="text-sm text-indigo-600 break-all font-mono">{qr.data}</p>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={copyLink}
                className="flex items-center justify-center gap-3 bg-indigo-600 text-white px-6 sm:px-8 py-4 rounded-xl hover:bg-indigo-700 transition text-lg font-medium touch-manipulation"
              >
                {copySuccess ? (
                  <>
                    <CheckIcon className="w-6 h-6" />
                    Copied!
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-6 h-6" />
                    Copy Link
                  </>
                )}
              </button>
              <button
                onClick={downloadQR}
                className="flex items-center justify-center gap-3 bg-green-600 text-white px-6 sm:px-8 py-4 rounded-xl hover:bg-green-700 transition text-lg font-medium touch-manipulation"
              >
                <ArrowDownTrayIcon className="w-6 h-6" />
                Download QR
              </button>
              <button
                onClick={printQR}
                className="flex items-center justify-center gap-3 bg-blue-600 text-white px-6 sm:px-8 py-4 rounded-xl hover:bg-blue-700 transition text-lg font-medium touch-manipulation"
              >
                <PrinterIcon className="w-6 h-6" />
                Print QR
              </button>
              <button
                onClick={() => setShowDeleteDialog(true)}
                disabled={loadingQR}
                className="flex items-center justify-center gap-3 bg-red-600 text-white px-6 sm:px-8 py-4 rounded-xl hover:bg-red-700 disabled:opacity-70 transition text-lg font-medium touch-manipulation"
              >
                <TrashIcon className="w-6 h-6" />
                Delete
              </button>
            </div>
          </div>
        )}
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mt-8">
            <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-lg text-red-700 font-medium mb-6">{error}</p>
            <button
              onClick={fetchQR}
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 text-lg font-medium"
            >
              <ArrowPathIcon className="w-6 h-6 inline mr-2" /> Retry
            </button>
          </div>
        )}
        {/* Delete Confirmation Dialog */}
        {showDeleteDialog && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Delete QR Code?</h3>
              <p className="text-lg text-gray-600 mb-8">
                This action <span className="font-bold text-red-600">cannot be undone</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 text-lg font-medium touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteQR}
                  disabled={loadingQR}
                  className="px-8 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-70 flex items-center justify-center gap-3 text-lg font-medium touch-manipulation"
                >
                  {loadingQR ? <ArrowPathIcon className="w-6 h-6 animate-spin" /> : <TrashIcon className="w-6 h-6" />}
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
// Hue calculation for preview color filter
function getHue(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  if (max !== min) {
    if (max === r) h = ((g - b) / (max - min)) * 60;
    else if (max === g) h = (2 + (b - r) / (max - min)) * 60;
    else h = (4 + (r - g) / (max - min)) * 60;
  }
  return h < 0 ? h + 360 : h;
}
const QRSkeleton = () => (
  <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-lg border border-gray-200 animate-pulse">
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square bg-gray-200 mx-auto mb-8 rounded-2xl"></div>
    <div className="h-8 bg-gray-200 w-64 mx-auto rounded mb-4"></div>
    <div className="h-12 bg-gray-200 w-48 mx-auto rounded"></div>
  </div>
);
