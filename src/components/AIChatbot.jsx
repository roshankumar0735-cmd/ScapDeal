import React, { useState, useEffect, useRef } from "react";

export default function AIChatbot({ onOpenService, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello! I'm your AI assistant. How can I help you?",
    },
  ]);

  const [input, setInput] = useState("");

  // ⭐ NEW: reference for auto scroll
  const bottomRef = useRef(null);

  // ⭐ NEW: scroll to bottom whenever messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const lowerInput = input.toLowerCase();
    let botResponse = "";

    // ⭐ Check login
    const isLoggedIn = localStorage.getItem("scrap_deal_user");

    if (lowerInput.includes("scrap")) {
      if (!isLoggedIn) {
        botResponse = "You must login first to schedule a scrap pickup.";
        setTimeout(() => onOpenService("login"), 800);
      } else {
        botResponse = "Opening scrap pickup form...";
        setTimeout(() => onOpenService("scrap"), 800);
      }

    } else if (lowerInput.includes("truck")) {
      if (!isLoggedIn) {
        botResponse = "You must login first to book a truck.";
        setTimeout(() => onOpenService("login"), 800);
      } else {
        botResponse = "Opening truck booking form...";
        setTimeout(() => onOpenService("truck"), 800);
      }

    } else if (lowerInput.includes("yes")) {
      botResponse =
        "Sure! Just tell me which service you want: Scrap or Truck.";

    } else {
      botResponse =
        "I can help with:\n• Scrap Pickup\n• Truck Booking\nJust type any service name.";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: botResponse }]);
    }, 500);

    setInput("");
  };

  return (
    <div
      className="
        fixed 
        right-6 bottom-28 
        w-80 h-96 
        bg-white 
        rounded-2xl 
        shadow-xl 
        border border-gray-300 
        z-[999] 
        flex flex-col
      "
    >
      {/* HEADER */}
      <div className="bg-blue-600 text-white p-3 rounded-t-2xl flex justify-between items-center">
        <span className="font-semibold">AI Assistant</span>

        <button
          onClick={onClose}
          className="text-white text-lg hover:text-gray-200"
        >
          ✕
        </button>
      </div>

      {/* CHAT BOX */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-3 py-2 rounded-lg text-sm whitespace-pre-line ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* ⭐ Auto scroll anchor */}
        <div ref={bottomRef}></div>
      </div>

      {/* INPUT BAR */}
      <form onSubmit={handleSend} className="p-3 border-t">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg text-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded-lg text-sm"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
