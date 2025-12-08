// src/components/Forum/Forum.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Header from '../Header/Header.jsx';
import PostForm from './PostForm.jsx';
import PostItem from './PostItem.jsx';
import { useAuth } from '../../hooks/useAuth';
import { usePost } from '../../hooks/usePost';
import { toast } from 'react-toastify';
import './Forum.scss';

const Forum = () => {
  const { user, isAuthenticated } = useAuth();
  const { 
    posts, loading, error, currentPost,
    getAllPosts, createPost, updatePost, deletePost, likePost, commentPost,
    setPostForEdit, clearCurrentPost, clearError 
  } = usePost();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Hiệu ứng scroll cho header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const loadPosts = useCallback(async () => {
    const result = await getAllPosts();
    if (!result.success && result.error) console.error(result.error);
  }, [getAllPosts]);

  // --- Handlers (Giữ nguyên logic cũ) ---
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

  return (
    <div className="forum-page-wrapper">
      <Header className={isScrolled ? 'scrolled' : ''} />
      
      {/* Hero Section - Banner đẹp mắt */}
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
              <span className="count">1000+</span>
              <span className="label">Thành viên</span>
            </div>
          </div>
        </div>
      </div>

      <div className="forum-container container">
        {/* Khu vực thông báo lỗi */}
        {error && (
          <div className="alert-floating">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <span>{error}</span>
            <button onClick={clearError}><i className="fa-solid fa-xmark"></i></button>
          </div>
        )}

        {/* Layout chính: 2 Cột (Nếu màn hình lớn) hoặc 1 Cột */}
        <div className="forum-layout">
          {/* Cột trái: Form & Danh sách bài viết */}
          <div className="main-feed">
            
            {/* Form Editor */}
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

            {/* Loading Skeleton */}
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

            {/* Danh sách bài viết */}
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
            
             {/* Load more */}
             {posts.length > 0 && posts.length % 10 === 0 && (
                <button className="btn-load-more-modern" onClick={loadPosts} disabled={loading}>
                  {loading ? 'Đang tải...' : 'Xem thêm bài viết cũ hơn'}
                </button>
             )}
          </div>

          {/* Cột phải: Sidebar (Thông tin thêm) */}
          <div className="sidebar">
            <div className="sidebar-card user-welcome">
                {isAuthenticated ? (
                    <>
                        <div className="avatar-circle">{user?.username?.charAt(0).toUpperCase()}</div>
                        <h3>Xin chào, {user?.username}</h3>
                        <p>Hôm nay bạn đã học từ vựng chưa?</p>
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
            
            <div className="sidebar-card trending-tags">
                <h4><i className="fa-solid fa-arrow-trend-up"></i> Chủ đề nổi bật</h4>
                <div className="tags-cloud">
                    <span>#Part5</span>
                    <span>#Listening</span>
                    <span>#NewEconomy</span>
                    <span>#Tips</span>
                    <span>#Grammar</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;