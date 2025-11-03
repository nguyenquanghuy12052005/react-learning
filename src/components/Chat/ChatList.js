import React from "react";
import "./ChatApp.scss";

const ChatList = ({ users, onSelect, selectedUser }) => {
  return (
    <div className="chat-list">
      <h2>Đoạn chat</h2>
      <input type="text" placeholder="Tìm kiếm..." className="search" />

      {users.map((user) => (
        <div
          key={user.id}
          className={`chat-item ${
            selectedUser?.id === user.id ? "active" : ""
          }`}
          onClick={() => onSelect(user)}
        >
          <img src={user.avatar} alt={user.name} className="avatar" />
          <div className="chat-info">
            <h4>{user.name}</h4>
            <p>Nhấn để xem tin nhắn</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
