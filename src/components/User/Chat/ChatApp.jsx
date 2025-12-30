import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { FaArrowLeft } from "react-icons/fa"; // Import icon mũi tên
import "./ChatApp.scss";

import { useAuth } from "../../../hooks/useAuth";
import chatService from "../../../services/chatService";

const ChatApp = () => {
  const { user, isAuthenticated, getFriend } = useAuth();
  const navigate = useNavigate(); // Hook điều hướng

  const [friends, setFriends] = useState([]);
  const [friendsLoading, setFriendsLoading] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  
  // Ref để lưu interval ID
  const pollingIntervalRef = useRef(null);

  const loadFriends = useCallback(async () => {
    try {
      setFriendsLoading(true);
      const result = await getFriend();

      if (result.success && Array.isArray(result.data)) {
        setFriends(result.data);
      } else {
        setFriends([]);
      }
    } catch (err) {
      console.error("Load friends error:", err);
      setFriends([]);
    } finally {
      setFriendsLoading(false);
    }
  }, [getFriend]);

  const loadChats = useCallback(async () => {
    try {
      const data = await chatService.getChats();
      setChats(Array.isArray(data) ? data : []);
      
      // Cập nhật selectedChat nếu đang chọn friend
      if (selectedFriend) {
        const updatedChat = (Array.isArray(data) ? data : []).find(
          (c) =>
            (c.user1 === user.userId && c.user2 === selectedFriend.userId) ||
            (c.user2 === user.userId && c.user1 === selectedFriend.userId)
        );
        setSelectedChat(updatedChat || null);
      }
    } catch (err) {
      console.error("Load chats error:", err);
      setChats([]);
    }
  }, [selectedFriend, user?.userId]);

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);

    const chat = chats.find(
      (c) =>
        (c.user1 === user.userId && c.user2 === friend.userId) ||
        (c.user2 === user.userId && c.user1 === friend.userId)
    );

    setSelectedChat(chat || null);
  };

  // HÀM RELOAD CHAT SAU KHI GỬI
  const handleMessageSent = useCallback(async () => {
    await loadChats();
  }, [loadChats]);

  // SETUP POLLING - Tự động reload chat mỗi 3 giây
  useEffect(() => {
    if (isAuthenticated) {
      loadFriends();
      loadChats();

      // Bắt đầu polling
      pollingIntervalRef.current = setInterval(() => {
        loadChats();
      }, 3000); // Reload mỗi 3 giây

      // Cleanup khi unmount
      return () => {
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
        }
      };
    }
  }, [isAuthenticated, loadFriends, loadChats]);

  // Handle quay lại
  const handleGoBack = () => {
    navigate("/userprofile");
  };

  if (!isAuthenticated) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#18191a' }}>
        {/* Nút Back cho trường hợp chưa đăng nhập */}
        <div className="nav-header">
            <button className="btn-back" onClick={handleGoBack}>
                <FaArrowLeft className="icon" /> Quay lại hồ sơ
            </button>
        </div>
        <div className="chat-empty" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          Vui lòng đăng nhập để chat 💬
        </div>
      </div>
    );
  }

  return (
    // Bọc trong container column
    <div className="chat-page-wrapper" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Thay Header bằng thanh điều hướng chứa nút Back */}
      <div className="nav-header">
        <button className="btn-back" onClick={handleGoBack}>
            <FaArrowLeft className="icon" /> Quay lại hồ sơ
        </button>
      </div>

      {/* Phần ChatApp chiếm toàn bộ không gian còn lại */}
      <div className="chat-app" style={{ flex: 1, overflow: 'hidden' }}>
        <ChatList
          users={friends}
          loading={friendsLoading}
          selectedUser={selectedFriend}
          onSelect={handleSelectFriend}
        />

        <ChatWindow
          friend={selectedFriend}
          chat={selectedChat}
          currentUserId={user.userId}
          onMessageSent={handleMessageSent}
        />
      </div>
    </div>
  );
};

export default ChatApp;