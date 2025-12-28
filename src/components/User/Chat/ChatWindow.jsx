import React, { useEffect, useState, useRef } from "react";
import "./ChatApp.scss";
import chatService from "../../../services/chatService";

const ChatWindow = ({ chat, friend, currentUserId, onMessageSent }) => {
  const [input, setInput] = useState("");
  const chatBodyRef = useRef(null);

 
  const messages = chat?.messages || [];

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Auto scroll xuống khi có tin nhắn mới
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [sortedMessages]);


  if (!friend) {
    return <div className="no-chat">Chọn bạn để chat 💬</div>;
  }

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      await chatService.sendChat(friend.userId, input);
      setInput("");
      
      if (onMessageSent) {
        await onMessageSent();
      }
    } catch (error) {
      console.error("Send message error:", error);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>{friend.name}</h3>
      </div>

      <div className="chat-body" ref={chatBodyRef}>
        {sortedMessages.map((m) => (
          <div
            key={m._id}
            className={`message ${
              m.from === currentUserId ? "sent" : "received"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Nhập tin nhắn..."
        />
        <button onClick={handleSend}>Gửi</button>
      </div>
    </div>
  );
};

export default ChatWindow;