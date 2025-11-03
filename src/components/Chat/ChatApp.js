import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import "./ChatApp.scss";

const ChatApp = () => {
  const [users] = useState([
    { id: 1, name: "Nguyễn A", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Trần B", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Lê C", avatar: "https://i.pravatar.cc/150?img=3" },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({
    1: [{ id: 1, sender: "bot", text: "Xin chào Nguyễn A 👋" }],
    2: [{ id: 1, sender: "bot", text: "Chào Trần B! Hôm nay bạn thế nào?" }],
    3: [{ id: 1, sender: "bot", text: "Lê C ơi, học TOEIC tới đâu rồi?" }],
  });

  const handleSendMessage = (userId, newMessage) => {
    setMessages((prev) => ({
      ...prev,
      [userId]: [...(prev[userId] || []), newMessage],
    }));
  };

  return (
    <div className="chat-app">
      <ChatList users={users} onSelect={setSelectedUser} selectedUser={selectedUser} />
      <ChatWindow
        user={selectedUser}
        messages={messages[selectedUser?.id] || []}
        onSend={handleSendMessage}
      />
    </div>
  );
};

export default ChatApp;
