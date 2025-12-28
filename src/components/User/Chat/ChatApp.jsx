import React, { useEffect, useState, useCallback, useRef } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import "./ChatApp.scss";

import { useAuth } from "../../../hooks/useAuth";
import chatService from "../../../services/chatService";

const ChatApp = () => {
  const { user, isAuthenticated, getFriend } = useAuth();

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

  // reload chat sau khi gửi
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

  if (!isAuthenticated) {
    return <div className="chat-empty">Vui lòng đăng nhập để chat 💬</div>;
  }

  return (
    <div className="chat-app">
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
  );
};

export default ChatApp;