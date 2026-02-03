"use client";

import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [status, setStatus] = useState("Checking subscription...");

  useEffect(() => {
    const checkStatus = async () => {
      const res = await fetch(
        "https://api.infravion.com/api/subscription-status",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      if (data.status === "active") {
        setStatus("Subscription Active ");
      } else {
        setStatus("Payment pending...");
      }
    };

    checkStatus();
  }, []);

  return <h2>{status}</h2>;
}
