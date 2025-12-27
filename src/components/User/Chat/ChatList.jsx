import React from "react";
import "./ChatApp.scss";

const ChatList = ({ users = [], loading, selectedUser, onSelect }) => {
  return (
    <div className="chat-list">
      <h2>Đoạn chat</h2>
      <input type="text" placeholder="Tìm kiếm..." className="search" />

      {loading && <p className="loading">Đang tải bạn bè...</p>}

      {!loading && users.length === 0 && (
        <div className="empty">Chưa có bạn bè</div>
      )}

      {!loading &&
        users.map((user) => (
          <div
            key={user._id}
            className={`chat-item ${
              selectedUser?._id === user._id ? "active" : ""
            }`}
            onClick={() => onSelect(user)}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="avatar"
            />
            <div className="chat-info">
              <h4>{user.name}</h4>
              <p>Nhấn để trò chuyện</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatList;
