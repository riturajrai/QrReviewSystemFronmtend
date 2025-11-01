// // import React, { useState } from "react";
// // import QRCode from "qrcode";

// // export default function GenerateQR() {
// //   const [qrUrl, setQrUrl] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleGenerate = async () => {
// //     setLoading(true);
// //     setQrUrl("");

// //     try {
// //       // 1️⃣ Backend se unique link lo
// //       const token = localStorage.getItem("token");
// //       const res = await fetch("http://localhost:5000/api/qr/create-qr", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       const data = await res.json();

// //       if (!data.success) throw new Error(data.message);

// //       // 2️⃣ QR generate karo frontend pe
// //       const qrImage = await QRCode.toDataURL(data.qrLink);
// //       setQrUrl(qrImage);

// //     } catch (err) {
// //       console.error("QR generation error:", err);
// //       alert("Failed to generate QR");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col items-center gap-4 p-6">
// //       <button
// //         onClick={handleGenerate}
// //         className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
// //       >
// //         {loading ? "Generating..." : "Generate QR"}
// //       </button>

// //       {qrUrl && (
// //         <div className="mt-6 text-center">
// //           <img src={qrUrl} alt="QR Code" className="w-48 h-48 mx-auto" />
// //           <p className="mt-3 text-gray-700 text-sm">Scan to give feedback</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// "use client";

// import React, { useState } from "react";
// import QRCode from "qrcode";

// export default function QRPage() {
//   const [qrImage, setQrImage] = useState("");
//   const [uniqueId, setUniqueId] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleGenerateQR = async () => {
//     setLoading(true);
//     setQrImage("");

//     try {
//       // 1️⃣ Frontend me unique ID banao
//       const id = Math.random().toString(36).substring(2, 10);
//       setUniqueId(id);

//       // 2️⃣ Feedback link banao (frontend se)
//       const qrLink = `http://localhost:3000/feedback/${id}`;

//       // 3️⃣ Backend ko test request bhejo
//       await fetch("https://reviwes-backend.onrender.com/upload-qr", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           qrId: id,
//           qrLink: qrLink,
//           createdAt: new Date().toISOString(),
//         }),
//       });

//       // 4️⃣ QR image frontend me generate karo
//       const qr = await QRCode.toDataURL(qrLink);
//       setQrImage(qr);
//     } catch (error) {
//       console.error("QR generation error:", error);
//       alert("Failed to generate QR");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
//         <h1 className="text-3xl font-bold mb-4 text-gray-800">
//           Generate Feedback QR
//         </h1>

//         <button
//           onClick={handleGenerateQR}
//           disabled={loading}
//           className={`px-6 py-3 rounded-xl text-white font-semibold ${
//             loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {loading ? "Generating..." : "Generate QR"}
//         </button>

//         {qrImage && (
//           <div className="mt-6">
//             <img
//               src={qrImage}
//               alt="QR Code"
//               className="w-48 h-48 mx-auto border-2 border-gray-200 p-2 rounded-xl"
//             />
//             <p className="mt-4 text-gray-700 text-sm">
//               Unique ID: <b>{uniqueId}</b>
//             </p>
//             <p className="text-gray-500 text-sm mt-1">
//               Scan this QR to open Feedback Page
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

