import React, { useMemo } from "react";
import Container from "./ui/Container";

export default function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="border-t bg-blue-50 py-10 mt-20">
      <Container>
        <div className="grid gap-10 md:grid-cols-2">

          {/* LEFT */}
          <div>

            {/* 🔥 UPDATED — Scrap Deal text + logo (logo on RIGHT) */}
            <div className="flex items-center gap-2">
              <h4 className="text-xl font-bold text-gray-800">Scrap Deal</h4>

              <img
                src="/assets/logo.jpg"
                alt="Scrap Deal Logo"
                className="h-10 w-10 object-contain"
              />
            </div>

            <p className="mt-3 text-gray-600">
              K2/541,Ramdhan Colony,Mahipalpur, New Delhi, Delhi 110075
            </p>
            <p className="mt-1 text-gray-600">
              Customer Support: 10 AM – 8 PM
            </p>
          </div>

          {/* RIGHT */}
          <div>
            <h4 className="text-xl font-semibold text-gray-800">
              Contact Us
            </h4>
            <p className="mt-3 text-gray-600">
              Mobile:{" "}
              <a
                href="tel:+918368293101"
                className="text-blue-700 font-medium"
              >
                +91 83682 93101
              </a>
            </p>

            <p className="text-gray-600">
              Email:{" "}
              <a
                href="mailto:roshankumar0735@gmail.com"
                className="text-blue-700 font-medium"
              >
                roshankumar0735@gmail.com
              </a>
            </p>

            <div className="mt-4 flex gap-3">
              {/* SOCIAL ICONS */}
              {[
                ["WhatsApp", "https://cdn-icons-png.flaticon.com/512/124/124034.png"],
                ["Instagram", "https://cdn-icons-png.flaticon.com/512/2111/2111463.png"],
                ["Twitter", "https://cdn-icons-png.flaticon.com/512/733/733579.png"],
                ["LinkedIn", "https://cdn-icons-png.flaticon.com/512/174/174857.png"],
                ["Facebook", "https://cdn-icons-png.flaticon.com/512/733/733547.png"],
              ].map(([name, icon], i) => (
                <div
                  key={i}
                  className="p-2 border rounded-lg hover:bg-gray-100"
                >
                  <img src={icon} alt={name} className="h-5 w-5" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-between text-sm text-gray-600">
          <p>© {year} Scrap Deal. All Rights Reserved.</p>
          <p>Built with Tailwind CSS</p>
        </div>
      </Container>
    </footer>
  );
}
