import React, { useState } from "react";
import "./ChatApp.scss";

const ChatWindow = ({ user, messages, onSend }) => {
  const [input, setInput] = useState("");
  const [animateHeart, setAnimateHeart] = useState(false);

  if (!user)
    return <div className="no-chat">Chọn người để bắt đầu trò chuyện 💬</div>;

  const handleSend = (customText = null) => {
    const textToSend = customText ?? input.trim();
    if (!textToSend) return;

    const newMsg = { id: Date.now(), sender: "user", text: textToSend };
    onSend(user.id, newMsg);
    setInput("");

    if (textToSend === "❤️") {
      setAnimateHeart(true);
      setTimeout(() => setAnimateHeart(false), 700);
    }

    setTimeout(() => {
      onSend(user.id, {
        id: Date.now() + 1,
        sender: "bot",
        text: "👍",
      });
    }, 800);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <img src={user.avatar} alt={user.name} className="avatar" />
        <div>
          <h3>{user.name}</h3>
          <p className="active-status">Đang hoạt động</p>
        </div>
      </div>

      <div className="chat-body">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`message ${m.sender === "user" ? "sent" : "received"}`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Aa"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className={`like-btn ${animateHeart ? "pulse" : ""}`}
          onClick={() => handleSend("❤️")}
        >
          ❤️
        </button>
        <button className="send-btn" onClick={() => handleSend()}>
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
