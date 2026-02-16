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
  BuildingOfficeIcon,
  PhotoIcon,
  StarIcon as StarOutlineIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

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
  const [selectedTemplate, setSelectedTemplate] = useState(0);

  // Form Settings States
  const [companyName, setCompanyName] = useState("");
  const [customURL, setCustomURL] = useState("");
  const [redirectFromRating, setRedirectFromRating] = useState(3);
  const [logoUrl, setLogoUrl] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState("");
  const [settingsError, setSettingsError] = useState("");

  // Customizations
  const [qrColor, setQrColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [customText, setCustomText] = useState("Scan the QR code to leave a review");
  const [textColor, setTextColor] = useState("#000000");
  const [logoSrc, setLogoSrc] = useState(null);
  const [logoSize, setLogoSize] = useState(80);
  const [logoPosition, setLogoPosition] = useState("above");
  const [headerText, setHeaderText] = useState("Share Your Feedback on Google!");
  const [footerText, setFooterText] = useState("We Value Your Opinion!");
  const [showStars, setShowStars] = useState(true);
  const [gradientBackground, setGradientBackground] = useState(false);
  const [gradientColor1, setGradientColor1] = useState("#f0f0f0");
  const [gradientColor2, setGradientColor2] = useState("#ffffff");
  const [showButton, setShowButton] = useState(false);
  const [buttonText, setButtonText] = useState("Leave a Review");
  const [buttonColor, setButtonColor] = useState("#4285F4");
  const [decorativeStars, setDecorativeStars] = useState(false);
  const [qrBorderRadius, setQrBorderRadius] = useState(20);
  const [showGoogleLogo, setShowGoogleLogo] = useState(true);

  /* ------------------- Fetch Form Settings from API ------------------- */
  const fetchFormSettings = async () => {
    try {
      const { data } = await axios.get("/custom-url/get-url", {
        withCredentials: true,
      });

      if (data.success && data.data) {
        setCompanyName(data.data.companyName || "");
        setCustomURL(data.data.url || "");
        setRedirectFromRating(data.data.redirectFromRating ?? 3);
        setLogoUrl(data.data.logoUrl || "");
        setLogoSrc(data.data.logoUrl || null);
      }
    } catch (err) {
      console.log("No form settings found, using defaults");
    }
  };

  /* ------------------- Save Form Settings ------------------- */
  const handleSaveSettings = async () => {
    if (!customURL.trim()) {
      setSettingsError("Please enter a valid redirect URL");
      return;
    }
    if (!companyName.trim()) {
      setSettingsError("Please enter your brand name");
      return;
    }
    setSettingsLoading(true);
    setSettingsSuccess("");
    setSettingsError("");

    try {
      // Upload logo if a new file is selected
      let newLogoUrl = logoUrl;
      if (logoFile) {
        const formData = new FormData();
        formData.append("logo", logoFile);

        const uploadResponse = await axios.post("/form/upload-logo", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (uploadResponse.data.success) {
          newLogoUrl = uploadResponse.data.data.logoUrl;
          setLogoUrl(newLogoUrl);
          setLogoSrc(newLogoUrl);
          setLogoFile(null);
        } else {
          setSettingsError(uploadResponse.data.message || "Logo upload failed");
          setSettingsLoading(false);
          return;
        }
      }

      // Save or update custom settings
      const { data } = await axios.post(
        "/custom-url/set-url",
        {
          url: customURL.trim(),
          companyName: companyName.trim(),
          redirectFromRating: Number(redirectFromRating),
        },
        { withCredentials: true }
      );

      if (data.success) {
        setSettingsSuccess("Settings saved successfully!");
        setTimeout(() => setSettingsSuccess(""), 3000);
        await fetchFormSettings(); // Refresh settings
      } else {
        setSettingsError(data.message || "Failed to save settings");
      }
    } catch (err) {
      setSettingsError(err.response?.data?.message || "Something went wrong");
    } finally {
      setSettingsLoading(false);
    }
  };

  /* ------------------- Delete Form Settings ------------------- */
  const handleDeleteSettings = async () => {
    setSettingsLoading(true);
    try {
      const { data } = await axios.delete("/custom-url/delete-url", {
        withCredentials: true,
      });

      if (data.success) {
        setCustomURL("");
        setCompanyName("");
        setRedirectFromRating(3);
        setLogoUrl("");
        setLogoSrc(null);
        setSettingsSuccess("Settings deleted successfully!");
        setTimeout(() => setSettingsSuccess(""), 3000);
      } else {
        setSettingsError(data.message || "Failed to delete");
      }
    } catch (err) {
      setSettingsError(err.response?.data?.message || "Something went wrong");
    } finally {
      setSettingsLoading(false);
    }
  };

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
    fetchFormSettings();
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
        resetToDefaults();
      } else {
        setError(data.message || "Failed to generate QR");
      }
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoadingQR(false);
    }
  };

  const resetToDefaults = async () => {
    setSelectedTemplate(0);
    setQrColor("#000000");
    setBackgroundColor("#ffffff");
    setCustomText("Scan the QR code to leave a review");
    setTextColor("#000000");
    setLogoSize(80);
    setLogoPosition("above");
    setHeaderText("Share Your Feedback on Google!");
    setFooterText("We Value Your Opinion!");
    setShowStars(true);
    setGradientBackground(false);
    setGradientColor1("#f0f0f0");
    setGradientColor2("#ffffff");
    setShowButton(false);
    setButtonText("Leave a Review");
    setButtonColor("#4285F4");
    setDecorativeStars(false);
    setQrBorderRadius(20);
    setShowGoogleLogo(true);

    await fetchFormSettings();
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
        resetToDefaults();
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
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d");

    const qrImg = new Image();
    qrImg.crossOrigin = "anonymous";

    qrImg.onload = () => {
      // Draw background
      if (gradientBackground) {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, gradientColor1);
        gradient.addColorStop(1, gradientColor2);
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = backgroundColor;
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let currentY = 100;
      ctx.textAlign = "center";

      // Draw decorative stars if enabled
      if (decorativeStars) {
        drawDecorativeStars(ctx, canvas.width, canvas.height);
      }

      // Draw Google logo at top if enabled
      if (showGoogleLogo) {
        drawGoogleLogo(ctx, canvas.width / 2, currentY);
        currentY += 120;
      }

      // Draw brand logo if available and position is above
      if (logoPosition === "above" && logoSrc) {
        const logoImg = new Image();
        logoImg.crossOrigin = "anonymous";
        logoImg.onload = () => {
          const logoDisplaySize = logoSize * 1.5;
          const logoX = (canvas.width - logoDisplaySize) / 2;
          ctx.drawImage(logoImg, logoX, currentY, logoDisplaySize, logoDisplaySize);
          currentY += logoDisplaySize + 60;
          continueDrawing();
        };
        logoImg.onerror = () => {
          continueDrawing();
        };
        logoImg.src = logoSrc;
      } else {
        continueDrawing();
      }

      function continueDrawing() {
        // Draw header text
        if (headerText) {
          ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
          ctx.shadowBlur = 4;
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;

          ctx.fillStyle = textColor;
          ctx.font = "bold 72px Arial";
          const words = headerText.split(' ');
          let line = '';
          let lines = [];

          words.forEach(word => {
            const testLine = line + word + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > canvas.width - 160 && line !== '') {
              lines.push(line);
              line = word + ' ';
            } else {
              line = testLine;
            }
          });
          lines.push(line);

          lines.forEach(textLine => {
            ctx.fillText(textLine.trim(), canvas.width / 2, currentY);
            currentY += 90;
          });

          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;

          currentY += 40;
        }

        // Draw brand name if present
        if (companyName) {
          ctx.fillStyle = textColor;
          ctx.font = "bold 56px Arial";
          ctx.fillText(companyName, canvas.width / 2, currentY);
          currentY += 80;
        }

        // Draw QR code with rounded corners and white background
        const qrSize = 600;
        const qrX = (canvas.width - qrSize) / 2;
        const qrY = currentY;

        ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
        ctx.shadowBlur = 25;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 10;

        ctx.fillStyle = "#ffffff";
        ctx.save();
        roundRect(ctx, qrX - 40, qrY - 40, qrSize + 80, qrSize + 80, qrBorderRadius);
        ctx.fill();
        ctx.restore();

        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

        if (qrColor !== "#000000") {
          colorizeQR(ctx, qrColor, qrX, qrY, qrSize, qrSize);
        }

        // Draw logo over QR if position is center
        if (logoPosition === "center" && logoSrc) {
          const logoImg = new Image();
          logoImg.crossOrigin = "anonymous";
          logoImg.onload = () => {
            const logoDisplaySize = logoSize * 1.5;
            const logoX = (canvas.width - logoDisplaySize) / 2;
            const logoY = qrY + (qrSize - logoDisplaySize) / 2;

            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(logoX + logoDisplaySize / 2, logoY + logoDisplaySize / 2, logoDisplaySize / 2 + 10, 0, Math.PI * 2);
            ctx.fill();

            ctx.drawImage(logoImg, logoX, logoY, logoDisplaySize, logoDisplaySize);
            finishDrawing();
          };
          logoImg.onerror = () => {
            finishDrawing();
          };
          logoImg.src = logoSrc;
        } else {
          finishDrawing();
        }

        function finishDrawing() {
          currentY += qrSize + 70;

          // Draw custom text below QR
          if (customText) {
            ctx.fillStyle = textColor;
            ctx.font = "48px Arial";
            const textWords = customText.split(' ');
            let textLine = '';
            let textLines = [];

            textWords.forEach(word => {
              const testLine = textLine + word + ' ';
              const metrics = ctx.measureText(testLine);
              if (metrics.width > canvas.width - 160 && textLine !== '') {
                textLines.push(textLine);
                textLine = word + ' ';
              } else {
                textLine = testLine;
              }
            });
            textLines.push(textLine);

            textLines.forEach(line => {
              ctx.fillText(line.trim(), canvas.width / 2, currentY);
              currentY += 60;
            });
            currentY += 40;
          }

          // Draw stars
          if (showStars) {
            const starSize = 80;
            const starSpacing = 25;
            const totalStarsWidth = (starSize * 5) + (starSpacing * 4);
            const startX = (canvas.width - totalStarsWidth) / 2;

            for (let i = 0; i < 5; i++) {
              drawStar(ctx, startX + (i * (starSize + starSpacing)) + starSize / 2, currentY, starSize / 2);
            }
            currentY += starSize + 70;
          }

          // Draw button if enabled
          if (showButton) {
            const buttonWidth = 550;
            const buttonHeight = 110;
            const buttonX = (canvas.width - buttonWidth) / 2;
            const buttonY = currentY;

            ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 8;

            ctx.fillStyle = buttonColor;
            roundRect(ctx, buttonX, buttonY, buttonWidth, buttonHeight, 55);
            ctx.fill();

            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            const buttonTextColor = getContrastColor(buttonColor);
            ctx.fillStyle = buttonTextColor;
            ctx.font = "bold 48px Arial";
            ctx.fillText(buttonText, canvas.width / 2, buttonY + buttonHeight / 2 + 16);

            currentY += buttonHeight + 60;
          }

          // Draw footer text
          if (footerText) {
            ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
            ctx.shadowBlur = 3;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;

            ctx.fillStyle = textColor;
            ctx.font = "bold 52px Arial";

            const footerWords = footerText.split(' ');
            let footerLine = '';
            let footerLines = [];

            footerWords.forEach(word => {
              const testLine = footerLine + word + ' ';
              const metrics = ctx.measureText(testLine);
              if (metrics.width > canvas.width - 160 && footerLine !== '') {
                footerLines.push(footerLine);
                footerLine = word + ' ';
              } else {
                footerLine = testLine;
              }
            });
            footerLines.push(footerLine);

            footerLines.forEach(line => {
              ctx.fillText(line.trim(), canvas.width / 2, currentY);
              currentY += 65;
            });

            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
          }

          // Convert to blob and download
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "google-review-qr.png";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            } else {
              alert("Failed to generate QR image for download.");
            }
          }, "image/png");
        }
      }
    };

    qrImg.onerror = () => {
      console.error("Failed to load QR image.");
      alert("Failed to load QR image. Please check if the QR code is generated correctly.");
    };
    qrImg.src = qr.imageUrl;
  };

  function drawGoogleLogo(ctx, centerX, centerY) {
    ctx.save();
    ctx.font = "bold 80px Arial";

    const text = "Google";
    const colors = ["#4285F4", "#EA4335", "#FBBC04", "#4285F4", "#34A853", "#EA4335"];

    let currentX = centerX - 180;

    for (let i = 0; i < text.length; i++) {
      ctx.fillStyle = colors[i];
      ctx.fillText(text[i], currentX, centerY);
      currentX += ctx.measureText(text[i]).width;
    }

    ctx.restore();
  }

  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  function drawDecorativeStars(ctx, width, height) {
    const positions = [
      { x: 150, y: 450, size: 45, rotation: 0 },
      { x: 200, y: 550, size: 32, rotation: 15 },
      { x: 130, y: 630, size: 38, rotation: -20 },
      { x: 180, y: 750, size: 35, rotation: 30 },
      { x: 140, y: 880, size: 30, rotation: -15 },
      { x: 170, y: 1000, size: 40, rotation: 20 },
      { x: 120, y: 1120, size: 33, rotation: -25 },
      { x: width - 160, y: 500, size: 50, rotation: 10 },
      { x: width - 130, y: 620, size: 36, rotation: -15 },
      { x: width - 190, y: 730, size: 42, rotation: 25 },
      { x: width - 150, y: 860, size: 34, rotation: -20 },
      { x: width - 180, y: 980, size: 38, rotation: 15 },
      { x: width - 140, y: 1100, size: 32, rotation: -30 },
      { x: width - 170, y: 1220, size: 37, rotation: 20 },
    ];

    positions.forEach(pos => {
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.rotate((pos.rotation * Math.PI) / 180);
      drawStar(ctx, 0, 0, pos.size / 2);
      ctx.restore();
    });
  }

  function drawStar(ctx, cx, cy, radius) {
    const spikes = 5;
    const outerRadius = radius;
    const innerRadius = radius * 0.5;
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);

    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }

    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();

    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    gradient.addColorStop(0, "#FFF700");
    gradient.addColorStop(0.5, "#FFD700");
    gradient.addColorStop(1, "#FFA500");
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.shadowColor = "rgba(255, 215, 0, 0.6)";
    ctx.shadowBlur = 8;
    ctx.fill();

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
  }

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

  function getContrastColor(hexColor) {
    const rgb = hexToRgb(hexColor);
    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    return brightness > 155 ? '#000000' : '#ffffff';
  }

  /* ------------------- Templates (Only 5) ------------------- */
  const templates = [
    {
      name: "Professional Navy",
      backgroundColor: "#023e8a",
      qrColor: "#000000",
      textColor: "#caf0f8",
      headerText: "Share Your Experience on Google",
      footerText: "Your Opinion Matters to Us",
      customText: "Scan the QR code to leave a review",
      showStars: true,
      gradientBackground: false,
      showButton: true,
      buttonText: "Leave Review",
      buttonColor: "#0096c7",
      decorativeStars: false,
      qrBorderRadius: 18,
      showGoogleLogo: true,
    },
    {
      name: "Golden Hour",
      gradientBackground: true,
      gradientColor1: "#f7b733",
      gradientColor2: "#fc4a1a",
      qrColor: "#000000",
      textColor: "#ffffff",
      headerText: "Rate Your Experience",
      footerText: "Thank You! ⭐",
      customText: "Scan to leave a review",
      showStars: true,
      showButton: true,
      buttonText: "Leave a Review",
      buttonColor: "#ffffff",
      decorativeStars: false,
      qrBorderRadius: 28,
      showGoogleLogo: true,
    },
    {
      name: "Electric Blue",
      backgroundColor: "#0077b6",
      qrColor: "#000000",
      textColor: "#ffffff",
      headerText: "Leave Us a Google Review!",
      footerText: "Your Feedback Helps Us Improve! 💙",
      customText: "Scan to review",
      showStars: true,
      showButton: true,
      buttonText: "Review Now",
      buttonColor: "#00b4d8",
      decorativeStars: false,
      qrBorderRadius: 22,
      showGoogleLogo: true,
    },
    {
      name: "Cherry Blossom",
      gradientBackground: true,
      gradientColor1: "#f72585",
      gradientColor2: "#b5179e",
      qrColor: "#000000",
      textColor: "#ffffff",
      headerText: "We'd Love Your Feedback!",
      footerText: "Thank You for Your Time! 🌸",
      customText: "Scan the QR code",
      showStars: true,
      showButton: false,
      decorativeStars: true,
      qrBorderRadius: 30,
      showGoogleLogo: true,
    },
    {
      name: "Coral Sunset",
      backgroundColor: "#ff6b6b",
      qrColor: "#000000",
      textColor: "#ffffff",
      headerText: "Leave Us a Google Review!",
      footerText: "Your Feedback is Valuable! ❤️",
      customText: "Scan the QR code to review",
      showStars: true,
      showButton: true,
      buttonText: "Write Review",
      buttonColor: "#2d3436",
      decorativeStars: false,
      qrBorderRadius: 25,
      showGoogleLogo: true,
    },
  ];

  const handleTemplateSelect = async (index) => {
    setSelectedTemplate(index);
    const template = templates[index];

    setBackgroundColor(template.backgroundColor || "#ffffff");
    setQrColor(template.qrColor);
    setTextColor(template.textColor);
    setHeaderText(template.headerText);
    setFooterText(template.footerText);
    setCustomText(template.customText);
    setShowStars(template.showStars);
    setGradientBackground(template.gradientBackground || false);
    setShowButton(template.showButton || false);
    setButtonText(template.buttonText || "Leave a Review");
    setButtonColor(template.buttonColor || "#4285F4");
    setDecorativeStars(template.decorativeStars || false);
    setQrBorderRadius(template.qrBorderRadius || 20);
    setShowGoogleLogo(template.showGoogleLogo !== false);
    if (template.gradientColor1) setGradientColor1(template.gradientColor1);
    if (template.gradientColor2) setGradientColor2(template.gradientColor2);

    await fetchFormSettings();
  };

  const getBackgroundStyle = () => {
    if (gradientBackground) {
      return {
        background: `linear-gradient(135deg, ${gradientColor1}, ${gradientColor2})`
      };
    }
    return {
      backgroundColor: backgroundColor
    };
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setLogoSrc(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const renderStars = (threshold) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarSolidIcon
            key={star}
            className={`w-4 h-4 ${star <= threshold ? "text-indigo-600" : "text-gray-300"
              }`}
          />
        ))}
        <span className="ml-2 text-gray-600 text-sm">
          {threshold === 1 ? "all ratings" : threshold === 5 ? "only" : "and above"}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">My QR Code</h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Generate and customize your Google Review QR code
          </p>
        </div>

        {/* Loading Skeleton */}
        {fetching && <QRSkeleton />}

        {/* No QR Yet */}
        {!fetching && !qr && (
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <QrCodeIcon className="w-20 h-20 text-indigo-400 mx-auto mb-4 animate-pulse" />
            <h2 className="text-xl font-bold text-gray-800">
              Setting up your QR Code...
            </h2>
            <p className="text-gray-500 mt-2">
              Your QR is automatically created after signup.
            </p>
          </div>
        )}
        {/* QR Exists */}
        {qr && (
          <>
            {/* Template Selector */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose a Template</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {templates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => handleTemplateSelect(index)}
                    className={`p-3 rounded-xl border-3 transition-all hover:scale-105 ${selectedTemplate === index
                        ? "border-indigo-600 bg-indigo-50 shadow-lg ring-2 ring-indigo-300"
                        : "border-gray-300 hover:border-gray-400"
                      }`}
                  >
                    <div
                      className="w-full h-24 flex items-center justify-center rounded-lg mb-2 relative overflow-hidden"
                      style={
                        template.gradientBackground
                          ? { background: `linear-gradient(135deg, ${template.gradientColor1}, ${template.gradientColor2})` }
                          : { backgroundColor: template.backgroundColor }
                      }
                    >
                      <div className="w-12 h-12 bg-white rounded-lg shadow-md"></div>
                      {template.showStars && (
                        <div className="absolute bottom-2 flex gap-1">
                          {[...Array(3)].map((_, i) => (
                            <svg key={i} className="w-3 h-3" fill="#FFD700" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-gray-700 text-center">{template.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Preview Panel */}
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Preview</h2>
                <div className="flex justify-center">
                  <div
                    className="w-full max-w-md p-8 rounded-2xl shadow-2xl relative overflow-hidden"
                    style={getBackgroundStyle()}
                  >
                    {/* Decorative Stars */}
                    {decorativeStars && (
                      <>
                        <div className="absolute top-20 left-4">
                          <svg className="w-9 h-9" fill="url(#starGradient1)" viewBox="0 0 24 24">
                            <defs>
                              <radialGradient id="starGradient1">
                                <stop offset="0%" stopColor="#FFF700" />
                                <stop offset="50%" stopColor="#FFD700" />
                                <stop offset="100%" stopColor="#FFA500" />
                              </radialGradient>
                            </defs>
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </div>
                        <div className="absolute top-28 left-7" style={{ transform: 'rotate(15deg)' }}>
                          <svg className="w-6 h-6" fill="#FFD700" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </div>
                        <div className="absolute top-36 left-3" style={{ transform: 'rotate(-20deg)' }}>
                          <svg className="w-7 h-7" fill="#FFD700" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </div>
                        <div className="absolute top-32 right-4" style={{ transform: 'rotate(10deg)' }}>
                          <svg className="w-10 h-10" fill="#FFD700" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </div>
                        <div className="absolute top-40 right-3" style={{ transform: 'rotate(-15deg)' }}>
                          <svg className="w-7 h-7" fill="#FFD700" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </div>
                      </>
                    )}

                    {/* Google Logo */}
                    {showGoogleLogo && (
                      <div className="mb-6 relative z-10">
                        <div className="text-center text-4xl font-bold">
                          <span className="text-[#4285F4]">G</span>
                          <span className="text-[#EA4335]">o</span>
                          <span className="text-[#FBBC04]">o</span>
                          <span className="text-[#4285F4]">g</span>
                          <span className="text-[#34A853]">l</span>
                          <span className="text-[#EA4335]">e</span>
                        </div>
                      </div>
                    )}

                    {/* Header Text */}
                    {headerText && (
                      <h3
                        className="text-xl sm:text-2xl font-bold text-center mb-6 relative z-10"
                        style={{ color: textColor }}
                      >
                        {headerText}
                      </h3>
                    )}

                    {/* Logo Above QR */}
                    {logoPosition === "above" && logoSrc && (
                      <div className="flex justify-center mb-6 relative z-10">
                        <img
                          src={logoSrc}
                          alt="Logo"
                          className="object-contain rounded-lg"
                          style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
                        />
                      </div>
                    )}

                    {/* Brand Name */}
                    {companyName && (
                      <p
                        className="text-lg sm:text-xl font-bold text-center mb-6 relative z-10"
                        style={{ color: textColor }}
                      >
                        {companyName}
                      </p>
                    )}

                    {/* QR Code */}
                    <div
                      className="bg-white p-5 mx-auto w-fit mb-6 relative z-10 shadow-lg"
                      style={{ borderRadius: `${qrBorderRadius}px` }}
                    >
                      <div className="relative w-56 h-56">
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
                        {logoPosition === "center" && logoSrc && (
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1">
                            <img
                              src={logoSrc}
                              alt="Logo"
                              className="object-contain rounded-full"
                              style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Custom Text */}
                    {customText && (
                      <p
                        className="text-base sm:text-lg text-center mb-6 relative z-10"
                        style={{ color: textColor }}
                      >
                        {customText}
                      </p>
                    )}

                    {/* Stars */}
                    {showStars && (
                      <div className="flex justify-center gap-2 mb-6 relative z-10">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-9 h-9"
                            fill="#FFD700"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                    )}

                    {/* Button */}
                    {showButton && (
                      <div className="flex justify-center mb-6 relative z-10">
                        <button
                          className="px-10 py-3 font-bold text-base rounded-full shadow-lg transition-transform hover:scale-105"
                          style={{
                            backgroundColor: buttonColor,
                            color: getContrastColor(buttonColor)
                          }}
                        >
                          {buttonText}
                        </button>
                      </div>
                    )}

                    {/* Footer Text */}
                    {footerText && (
                      <p
                        className="text-lg sm:text-xl font-bold text-center relative z-10"
                        style={{ color: textColor }}
                      >
                        {footerText}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Customization Panel */}
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Customize</h2>

                <div className="space-y-6 max-h-[700px] overflow-y-auto pr-2">
                  {/* Form Settings Section */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <BuildingOfficeIcon className="w-5 h-5 text-indigo-600" />
                      Form Settings
                    </h3>

                    {/* Company Name */}
                    <div className="mb-4">
                      <label className="block text-base font-semibold text-gray-700 mb-2">
                        Brand Name
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g., ABC Restaurant"
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
                      />
                    </div>

                    {/* Redirect URL */}
                    <div className="mb-4">
                      <label className="block text-base font-semibold text-gray-700 mb-2">
                        Redirect URL
                      </label>
                      <input
                        type="url"
                        value={customURL}
                        onChange={(e) => setCustomURL(e.target.value)}
                        placeholder="https://yourwebsite.com/thank-you"
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Users meeting the rating threshold will be redirected here
                      </p>
                    </div>

                    {/* Logo Upload */}
                    <div className="mb-4">
                      <label className="block text-base font-semibold text-gray-700 mb-2">
                       Brand Logo
                      </label>
                      {logoSrc && (
                        <img
                          src={logoSrc}
                          alt="Current Logo"
                          className="w-24 h-24 object-contain rounded-lg border border-gray-300 mb-2"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl"
                      />
                    </div>

                    {/* Redirect Threshold */}
                    <div className="mb-4">
                      <label className="block text-base font-semibold text-gray-700 mb-2">
                        Redirect Threshold
                      </label>
                      <select
                        value={redirectFromRating}
                        onChange={(e) => setRedirectFromRating(Number(e.target.value))}
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
                      >
                        <option value={1}>1 star and above (all ratings)</option>
                        <option value={2}>2 stars and above</option>
                        <option value={3}>3 stars and above</option>
                        <option value={4}>4 stars and above</option>
                        <option value={5}>5 stars only</option>
                      </select>
                      <div className="mt-2 p-3 bg-gray-50 rounded-xl">
                        {renderStars(redirectFromRating)}
                      </div>
                    </div>

                    {/* Save/Delete Settings Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={handleSaveSettings}
                        disabled={settingsLoading}
                        className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-70 font-medium"
                      >
                        {settingsLoading ? (
                          <ArrowPathIcon className="w-5 h-5 animate-spin" />
                        ) : (
                          <CheckIcon className="w-5 h-5" />
                        )}
                        {settingsLoading ? "Saving..." : "Save Settings"}
                      </button>

                      {(companyName || customURL || logoUrl) && (
                        <button
                          onClick={handleDeleteSettings}
                          disabled={settingsLoading}
                          className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-3 rounded-xl hover:bg-red-700 disabled:opacity-70 font-medium"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    {/* Settings Messages */}
                    {settingsSuccess && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
                        <CheckIcon className="w-5 h-5 text-green-600" />
                        <p className="text-green-800 font-medium text-sm">{settingsSuccess}</p>
                      </div>
                    )}
                    {settingsError && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-800 font-medium text-sm">{settingsError}</p>
                      </div>
                    )}
                  </div>

                  {/* QR Customization Section */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">QR Customization</h3>

                    {/* Header Text */}
                    <div className="mb-4">
                      <label className="block text-base font-semibold text-gray-700 mb-2">
                        Header Text
                      </label>
                      <input
                        type="text"
                        value={headerText}
                        onChange={(e) => setHeaderText(e.target.value)}
                        placeholder="e.g. Share Your Feedback on Google!"
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
                      />
                    </div>

                    {/* Custom Text */}
                    <div className="mb-4">
                      <label className="block text-base font-semibold text-gray-700 mb-2">
                        Text Below QR
                      </label>
                      <input
                        type="text"
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        placeholder="e.g. Scan the QR code to leave a review"
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
                      />
                    </div>

                    {/* Footer Text */}
                    <div className="mb-4">
                      <label className="block text-base font-semibold text-gray-700 mb-2">
                        Footer Text
                      </label>
                      <input
                        type="text"
                        value={footerText}
                        onChange={(e) => setFooterText(e.target.value)}
                        placeholder="e.g. We Value Your Opinion!"
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
                      />
                    </div>

                    {/* Toggles */}
                    <div className="space-y-3 mb-4">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={showGoogleLogo}
                          onChange={(e) => setShowGoogleLogo(e.target.checked)}
                          className="w-5 h-5 rounded"
                        />
                        <span className="text-base font-semibold text-gray-700">
                          Show Google Logo
                        </span>
                      </label>

                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={showStars}
                          onChange={(e) => setShowStars(e.target.checked)}
                          className="w-5 h-5 rounded"
                        />
                        <span className="text-base font-semibold text-gray-700">
                          Show Star Rating
                        </span>
                      </label>

                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={decorativeStars}
                          onChange={(e) => setDecorativeStars(e.target.checked)}
                          className="w-5 h-5 rounded"
                        />
                        <span className="text-base font-semibold text-gray-700">
                          Show Decorative Stars
                        </span>
                      </label>

                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={showButton}
                          onChange={(e) => setShowButton(e.target.checked)}
                          className="w-5 h-5 rounded"
                        />
                        <span className="text-base font-semibold text-gray-700">
                          Show Call-to-Action Button
                        </span>
                      </label>

                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={gradientBackground}
                          onChange={(e) => setGradientBackground(e.target.checked)}
                          className="w-5 h-5 rounded"
                        />
                        <span className="text-base font-semibold text-gray-700">
                          Use Gradient Background
                        </span>
                      </label>
                    </div>

                    {/* Button Customization */}
                    {showButton && (
                      <>
                        <div className="mb-4">
                          <label className="block text-base font-semibold text-gray-700 mb-2">
                            Button Text
                          </label>
                          <input
                            type="text"
                            value={buttonText}
                            onChange={(e) => setButtonText(e.target.value)}
                            placeholder="e.g. Leave a Review"
                            className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-base font-semibold text-gray-700 mb-2">
                            Button Color
                          </label>
                          <input
                            type="color"
                            value={buttonColor}
                            onChange={(e) => setButtonColor(e.target.value)}
                            className="w-24 h-14 border-2 border-gray-300 rounded-xl cursor-pointer"
                          />
                        </div>
                      </>
                    )}

                    {/* Background Colors */}
                    {gradientBackground ? (
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-base font-semibold text-gray-700 mb-2">
                            Gradient Start
                          </label>
                          <input
                            type="color"
                            value={gradientColor1}
                            onChange={(e) => setGradientColor1(e.target.value)}
                            className="w-full h-14 border-2 border-gray-300 rounded-xl cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="block text-base font-semibold text-gray-700 mb-2">
                            Gradient End
                          </label>
                          <input
                            type="color"
                            value={gradientColor2}
                            onChange={(e) => setGradientColor2(e.target.value)}
                            className="w-full h-14 border-2 border-gray-300 rounded-xl cursor-pointer"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4">
                        <label className="block text-base font-semibold text-gray-700 mb-2">
                          Background Color
                        </label>
                        <input
                          type="color"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          className="w-24 h-14 border-2 border-gray-300 rounded-xl cursor-pointer"
                        />
                      </div>
                    )}

                    {/* QR & Text Colors */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-base font-semibold text-gray-700 mb-2">
                          Text Color
                        </label>
                        <input
                          type="color"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="w-full h-14 border-2 border-gray-300 rounded-xl cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-base font-semibold text-gray-700 mb-2">
                          QR Code Color
                        </label>
                        <input
                          type="color"
                          value={qrColor}
                          onChange={(e) => setQrColor(e.target.value)}
                          className="w-full h-14 border-2 border-gray-300 rounded-xl cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* QR Border Radius */}
                    <div className="mb-4">
                      <label className="block text-base font-semibold text-gray-700 mb-2">
                        QR Corner Roundness: {qrBorderRadius}px
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={40}
                        value={qrBorderRadius}
                        onChange={(e) => setQrBorderRadius(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    {/* Logo Controls */}
                    {logoSrc && (
                      <>
                        <div className="mb-4">
                          <label className="block text-base font-semibold text-gray-700 mb-2">
                            Logo Size: {logoSize}px
                          </label>
                          <input
                            type="range"
                            min={40}
                            max={150}
                            value={logoSize}
                            onChange={(e) => setLogoSize(Number(e.target.value))}
                            className="w-full"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-base font-semibold text-gray-700 mb-2">
                            Logo Position
                          </label>
                          <select
                            value={logoPosition}
                            onChange={(e) => setLogoPosition(e.target.value)}
                            className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
                          >
                            <option value="above">Above QR Code</option>
                            <option value="center">Center (Over QR)</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8">
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                {/* Link Display */}
                <div className="bg-gray-50 p-4 rounded-xl mb-6">
                  <p className="text-sm text-indigo-600 break-all font-mono">{qr.data}</p>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={copyLink}
                    className="flex items-center justify-center gap-3 bg-indigo-600 text-white px-6 py-4 rounded-xl hover:bg-indigo-700 transition text-lg font-medium shadow-lg hover:shadow-xl"
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
                    className="flex items-center justify-center gap-3 bg-green-600 text-white px-6 py-4 rounded-xl hover:bg-green-700 transition text-lg font-medium shadow-lg hover:shadow-xl"
                  >
                    <ArrowDownTrayIcon className="w-6 h-6" />
                    Download QR
                  </button>

                  {/* <button
                    onClick={() => setShowDeleteDialog(true)}
                    disabled={loadingQR}
                    className="flex items-center justify-center gap-3 bg-red-600 text-white px-6 py-4 rounded-xl hover:bg-red-700 disabled:opacity-70 transition text-lg font-medium shadow-lg hover:shadow-xl"
                  >
                    <TrashIcon className="w-6 h-6" />
                    Delete QR
                  </button> */}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mt-8">
            <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-lg text-red-700 font-medium mb-6 text-center">{error}</p>
            <button
              onClick={fetchQR}
              className="mx-auto block bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 text-lg font-medium"
            >
              <ArrowPathIcon className="w-6 h-6 inline mr-2" /> Retry
            </button>
          </div>
        )}

        {/* Delete QR Confirmation Dialog */}
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
                  className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 text-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteQR}
                  disabled={loadingQR}
                  className="px-8 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-70 flex items-center justify-center gap-3 text-lg font-medium"
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
