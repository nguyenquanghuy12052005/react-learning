// src/components/Forum/Forum.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Header from '../Header/Header.jsx';
import PostForm from './PostForm.jsx';
import PostItem from './PostItem.jsx';
import { useAuth } from '../../hooks/useAuth';
import { usePost } from '../../hooks/usePost';
import { toast } from 'react-toastify';
import './Forum.scss';
import UserModal from './UserModal.jsx';

const Forum = () => {
  const { user, isAuthenticated, getAllUser, getFriend } = useAuth();
  const { 
    posts, loading, error, currentPost,
    getAllPosts, createPost, updatePost, deletePost, likePost, commentPost,
    setPostForEdit, clearCurrentPost, clearError 
  } = usePost();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [allUsers, setAllUsers] = useState([]); // Đổi tên từ users sang allUsers
  const [friends, setFriends] = useState([]); // Thêm state cho danh sách bạn bè
  const [usersLoading, setUsersLoading] = useState(false);
  const [friendsLoading, setFriendsLoading] = useState(false); // Thêm loading riêng cho bạn bè
  const [selectedUser, setSelectedUser] = useState(null);

  // Hiệu ứng scroll cho header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadPosts = useCallback(async () => {
    const result = await getAllPosts();
    if (!result.success && result.error) console.error(result.error);
  }, [getAllPosts]);

  const loadUsers = useCallback(async () => {
    try {
      setUsersLoading(true);
      const result = await getAllUser();
      console.log('=== DEBUG ALL USERS DATA ===');
      console.log('API result:', result);
      
      if (result.success && result.data) {
        console.log('All users loaded:', result.data.length);
        setAllUsers(result.data);
      } else {
        console.error('Lỗi khi load users:', result.error);
      }
    } catch (error) {
      console.error('Lỗi khi load users:', error);
      toast.error('Không thể tải danh sách thành viên');
    } finally {
      setUsersLoading(false);
    }
  }, [getAllUser]);

  const loadFriends = useCallback(async () => {
    try {
      setFriendsLoading(true);
      const result = await getFriend();
      console.log('=== DEBUG FRIENDS DATA ===');
      console.log('API result:', result);
      
      if (result.success && result.data) {
        console.log('Friends loaded:', result.data.length);
        setFriends(result.data);
      } else {
        console.error('Lỗi khi load friends:', result.error);
        // Nếu không có bạn bè, set mảng rỗng
        setFriends([]);
      }
    } catch (error) {
      console.error('Lỗi khi load friends:', error);
      toast.error('Không thể tải danh sách bạn bè');
      setFriends([]);
    } finally {
      setFriendsLoading(false);
    }
  }, [getFriend]);

  useEffect(() => {
    loadPosts();
    loadUsers();
    loadFriends();
  }, [loadPosts, loadUsers, loadFriends]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleCreatePost = async (postData) => {
    const result = await createPost(postData);
    if (result.success) {
      toast.success('Đăng bài thành công!');
      setShowCreateForm(false);
    } else {
      toast.error(result.error || 'Đăng bài thất bại');
    }
  };

  const handleUpdatePost = async (postData) => {
    if (!currentPost) return;
    const result = await updatePost(currentPost._id, postData);
    if (result.success) {
      toast.success('Cập nhật thành công!');
      clearCurrentPost();
    } else {
      toast.error(result.error);
    }
  };

  const handleDeletePost = async (postId) => {
    if(window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
        const result = await deletePost(postId);
        if (result.success) toast.success('Đã xóa bài viết');
        else toast.error(result.error);
    }
  };

  const handleToggleCreateForm = () => {
    if (!isAuthenticated) {
      toast.info('Vui lòng đăng nhập để tham gia thảo luận');
      return;
    }
    if (currentPost) clearCurrentPost();
    setShowCreateForm(!showCreateForm);
  };

  const getAvatarUrl = useCallback((avatar) => {
    if (!avatar || avatar === 'null' || avatar === 'undefined') {
      return null;
    }
    
    if (typeof avatar === 'object') {
      if (avatar.url) return avatar.url;
      if (avatar.link) return avatar.link;
      if (avatar.src) return avatar.src;
      return null;
    }
    
    if (typeof avatar === 'string') {
      avatar = avatar.trim();
      if (avatar.length === 0) return null;
      
      if (avatar.includes('gravatar.com')) {
        if (avatar.startsWith('//')) {
          avatar = 'https:' + avatar;
        } else if (!avatar.startsWith('http')) {
          avatar = 'https://' + avatar;
        }
        
        try {
          const url = new URL(avatar);
          const defaultParam = url.searchParams.get('default');
          if (defaultParam === 'mm' || !defaultParam) {
            url.searchParams.set('default', 'identicon');
          }
          return url.toString();
        } catch (e) {
          console.error('Error parsing Gravatar URL:', e);
          return avatar;
        }
      }
      
      if (avatar.startsWith('//')) return `https:${avatar}`;
      if (avatar.startsWith('http')) return avatar;
      
      if (avatar.startsWith('/')) {
        return `${window.location.origin}${avatar}`;
      }
      
      return avatar;
    }
    
    return null;
  }, []);

  const getFallbackAvatarUrl = useCallback((name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&bold=true`;
  }, []);

  // Hàm render member item để tránh trùng code
  const renderMemberItem = (member) => {
    const displayName = member.name || member.username || 'Người dùng';
    const avatarUrl = getAvatarUrl(member.avatar) || getFallbackAvatarUrl(displayName);
    
    return (
      <div 
        key={member._id} 
        className="member-item"
       onClick={() => setSelectedUser(member)}
         style={{ cursor: 'pointer' }}
      >
        <div className="member-avatar">
          <img 
            src={member.avatar}
            alt={displayName}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = getFallbackAvatarUrl(displayName);
            }}
          />
        </div>
        <div className="member-info">
          <span className="member-name">{displayName}</span>
          <div className="member-meta">
            <span className="member-level">Lv. {member.level || 1}</span>
            {member.role === 'admin' && (
              <span className="member-badge admin">Admin</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="forum-page-wrapper">
      <Header className={isScrolled ? 'scrolled' : ''} />
      
      {/* Hero Section */}
      <div className="forum-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <div className="text-content">
            <h1 className="hero-title">Cộng đồng TOEIC Việt Nam</h1>
            <p className="hero-subtitle">
              Nơi chia sẻ kiến thức, kinh nghiệm và cùng nhau chinh phục mục tiêu 990+.
            </p>
            {isAuthenticated && !showCreateForm && !currentPost && (
              <button 
                className="btn-hero-create"
                onClick={handleToggleCreateForm}
              >
                <i className="fa-solid fa-pen-nib"></i> Viết bài mới
              </button>
            )}
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="count">{posts.length}+</span>
              <span className="label">Bài viết</span>
            </div>
            <div className="stat-item">
              <span className="count">{allUsers.length}+</span>
              <span className="label">Thành viên</span>
            </div>
            <div className="stat-item">
              <span className="count">{friends.length}+</span>
              <span className="label">Bạn bè</span>
            </div>
          </div>
        </div>
      </div>

      <div className="forum-container container">
        {error && (
          <div className="alert-floating">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <span>{error}</span>
            <button onClick={clearError}><i className="fa-solid fa-xmark"></i></button>
          </div>
        )}

        <div className="forum-layout">
          {/* Cột trái: Form & Danh sách bài viết */}
          <div className="main-feed">
            <div className={`editor-collapse ${showCreateForm || currentPost ? 'open' : ''}`}>
               {(currentPost && isAuthenticated) && (
                <PostForm 
                  onSubmit={handleUpdatePost}
                  initialData={currentPost}
                  onCancel={() => clearCurrentPost()}
                  loading={loading}
                  mode="edit"
                />
              )}

              {(showCreateForm && !currentPost && isAuthenticated) && (
                <PostForm 
                  onSubmit={handleCreatePost}
                  onCancel={() => setShowCreateForm(false)}
                  loading={loading}
                  mode="create"
                />
              )}
            </div>

            {loading && posts.length === 0 && (
              <div className="loading-skeleton">
                {[1, 2, 3].map(i => (
                  <div key={i} className="skeleton-card">
                    <div className="sk-header"><div className="sk-avatar"></div><div className="sk-name"></div></div>
                    <div className="sk-body"></div>
                  </div>
                ))}
              </div>
            )}

            <div className="posts-stream">
              {!loading && posts.length === 0 ? (
                <div className="empty-state-modern">
                  <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-state-2130362-1800926.png" alt="Empty" />
                  <h3>Chưa có bài viết nào</h3>
                  <p>Hãy trở thành người đầu tiên chia sẻ kiến thức!</p>
                </div>
              ) : (
                posts.map(post => (
                  <PostItem
                    key={post._id}
                    post={post}
                    onDelete={handleDeletePost}
                    onLike={async (id) => { await likePost(id); loadPosts(); }}
                    onComment={async (id, cmt) => { await commentPost(id, cmt); loadPosts(); }}
                    onEdit={(p) => { setPostForEdit(p); setShowCreateForm(false); window.scrollTo({top: 400, behavior: 'smooth'}); }}
                    showActions={isAuthenticated}
                  />
                ))
              )}
            </div>
            
             {posts.length > 0 && posts.length % 10 === 0 && (
                <button className="btn-load-more-modern" onClick={loadPosts} disabled={loading}>
                  {loading ? 'Đang tải...' : 'Xem thêm bài viết cũ hơn'}
                </button>
             )}
          </div>

          {/* Cột giữa: Sidebar - Thành viên tích cực */}
          <div className="sidebar">
            <div className="sidebar-card user-welcome">
                {isAuthenticated ? (
                    <>
                        <div className="avatar-circle">
                          {user?.avatar ? (
                            <img 
                              src={getAvatarUrl(user.avatar)}
                              alt={user.username}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = getFallbackAvatarUrl(user.username);
                              }}
                            />
                          ) : (
                            <div className="avatar-fallback">
                              {user?.username?.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <h3>Xin chào, {user?.name}</h3>
                        <p>Level {user?.level || 1} • {user?.xpPoints || 0} XP</p>
                        {user?.role === 'admin' && (
                          <span className="user-role-badge">Admin</span>
                        )}
                    </>
                ) : (
                    <>
                        <i className="fa-solid fa-user-astronaut icon-large"></i>
                        <h3>Tham gia cộng đồng</h3>
                        <p>Đăng nhập để tương tác và lưu bài viết hay.</p>
                        <a href="/login" className="btn-sidebar-login">Đăng nhập ngay</a>
                    </>
                )}
            </div>

            {/* Thành viên tích cực (tất cả user) */}
            <div className="sidebar-card active-members">
                <div className="card-header">
                  <h4><i className="fa-solid fa-users"></i> Thành viên tích cực</h4>
                  <span className="member-count">{allUsers.length} thành viên</span>
                </div>
                
                {usersLoading ? (
                  <div className="users-loading">
                    <div className="loading-spinner"></div>
                    <p>Đang tải thành viên...</p>
                  </div>
                ) : allUsers.length === 0 ? (
                  <div className="no-users">
                    <i className="fa-solid fa-user-slash"></i>
                    <p>Chưa có thành viên</p>
                  </div>
                ) : (
                  <>
                    <div className="members-list">
                      {allUsers.slice(0, 40).map((member) => renderMemberItem(member))}
                    </div>
                    
                    {allUsers.length > 8 && (
                      <div className="view-all-members">
                        <button className="btn-view-all">
                          <i className="fa-solid fa-angles-right"></i> Xem tất cả thành viên
                        </button>
                      </div>
                    )}
                  </>
                )}
            </div>

            <div className="sidebar-card trending-tags">
                <h4><i className="fa-solid fa-arrow-trend-up"></i> Chủ đề nổi bật</h4>
                <div className="tags-cloud">
                    <span className="tag">#Part5</span>
                    <span className="tag">#Listening</span>
                    <span className="tag">#NewEconomy</span>
                    <span className="tag">#Tips</span>
                    <span className="tag">#Grammar</span>
                    <span className="tag">#Reading</span>
                    <span className="tag">#Vocabulary</span>
                    <span className="tag">#TestTaking</span>
                </div>
            </div>

            <div className="sidebar-card quick-stats">
                <h4><i className="fa-solid fa-chart-line"></i> Thống kê cộng đồng</h4>
                <div className="stats-grid">
                  <div className="stat-box">
                    <span className="stat-number">{posts.length}</span>
                    <span className="stat-label">Bài viết</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-number">{allUsers.length}</span>
                    <span className="stat-label">Thành viên</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-number">{friends.length}</span>
                    <span className="stat-label">Bạn bè</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-number">99%</span>
                    <span className="stat-label">Tích cực</span>
                  </div>
                </div>
            </div>
          </div>

          {/* Cột phải: Sidebar - Danh sách bạn bè */}
          <div className="sidebar-right">
            <div className="sidebar-card friends-list">
                <div className="card-header">
                  <h4><i className="fa-solid fa-user-friends"></i> Bạn bè</h4>
                  <span className="member-count">{friends.length} bạn bè</span>
                </div>
                
                {friendsLoading ? (
                  <div className="users-loading">
                    <div className="loading-spinner"></div>
                    <p>Đang tải bạn bè...</p>
                  </div>
                ) : friends.length === 0 ? (
                  <div className="no-friends">
                    <i className="fa-solid fa-user-plus"></i>
                    <p>Chưa có bạn bè</p>
                    <small>Hãy kết bạn với các thành viên khác!</small>
                  </div>
                ) : (
                  <>
                    <div className="members-list">
                      {friends.slice(0, 10).map((friend) => renderMemberItem(friend))}
                    </div>
                    
                    {friends.length > 10 && (
                      <div className="view-all-members">
                        <button className="btn-view-all" onClick={() => toast.info('Xem tất cả bạn bè')}>
                          <i className="fa-solid fa-angles-right"></i> Xem tất cả bạn bè
                        </button>
                      </div>
                    )}
                  </>
                )}
            </div>

            {/* Có thể thêm các widget khác cho sidebar phải */}
            <div className="sidebar-card online-friends">
                <h4><i className="fa-solid fa-circle text-success"></i> Bạn bè đang online</h4>
                <div className="online-list">
                  {friends.length > 0 ? (
                    friends.slice(0, 3).map((friend) => (
                      <div key={friend._id} className="online-item">
                        <div className="online-avatar">
                          <img 
                            src={getAvatarUrl(friend.avatar) || getFallbackAvatarUrl(friend.name)}
                            alt={friend.name}
                          />
                          <span className="online-dot"></span>
                        </div>
                        <span className="online-name">{friend.name}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted small">Chưa có bạn bè online</p>
                  )}
                </div>
            </div>
          </div>
        </div>
      </div>

      {selectedUser && (
        <UserModal 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)}
          currentUserId={user?._id}
        />
      )}
    </div>
  );
};

export default Forum;