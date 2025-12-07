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
    posts, 
    loading, 
    error, 
    currentPost,
    getAllPosts, 
    createPost, 
    updatePost, 
    deletePost, 
    likePost, 
    commentPost,
    setPostForEdit,
    clearCurrentPost,
    clearError 
  } = usePost();

  const [showCreateForm, setShowCreateForm] = useState(false);

  // Fetch posts khi component mount
  useEffect(() => {
    loadPosts();
  }, []);

  // Tự động đóng error sau 5 giây
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const loadPosts = useCallback(async () => {
    const result = await getAllPosts();
    if (!result.success && result.error) {
      console.error('Failed to load posts:', result.error);
    }
  }, [getAllPosts]);

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
    if (!currentPost) {
      toast.error('Không tìm thấy bài viết cần cập nhật');
      return;
    }

    const result = await updatePost(currentPost._id, postData);
    
    if (result.success) {
      toast.success('Cập nhật bài viết thành công!');
      clearCurrentPost();
    } else {
      toast.error(result.error || 'Cập nhật thất bại');
    }
  };

  const handleDeletePost = async (postId) => {
    const result = await deletePost(postId);
    
    if (result.success) {
      toast.success('Đã xóa bài viết');
    } else {
      toast.error(result.error || 'Xóa bài viết thất bại');
    }
  };

  const handleLikePost = async (postId) => {
    const result = await likePost(postId);
    await loadPosts();
    if (!result.success && result.error) {
      toast.error(result.error);
    }
  };

  const handleCommentPost = async (postId, comment) => {
    const result = await commentPost(postId, comment);
    await loadPosts();
    if (result.success) {
      toast.success('Đã gửi bình luận');
    } else {
      toast.error(result.error || 'Gửi bình luận thất bại');
    }
  };

  const handleEditPost = (post) => {
    setPostForEdit(post);
    setShowCreateForm(false);
  };

  const handleCancelEdit = () => {
    clearCurrentPost();
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };

  const handleToggleCreateForm = () => {
    if (!isAuthenticated) {
      toast.error('Vui lòng đăng nhập để đăng bài');
      return;
    }

    if (currentPost) {
      clearCurrentPost();
    }
    
    setShowCreateForm(!showCreateForm);
  };

  return (
    <>
      <Header />
      
      <div className="forum-container">
        {/* Header */}
        <div className="forum-header">
          <div className="forum-header-content">
            <h1 className="forum-title">
              <i className="fa-solid fa-comments"></i>
              Diễn đàn TOEIC
            </h1>
            <p className="forum-subtitle">
              Chia sẻ kinh nghiệm học tập, tips luyện thi và thảo luận cùng cộng đồng
            </p>
          </div>

          {isAuthenticated && !currentPost && (
            <button 
              className={`btn-create-post ${showCreateForm ? 'active' : ''}`}
              onClick={handleToggleCreateForm}
            >
              <i className={`fa-solid ${showCreateForm ? 'fa-xmark' : 'fa-plus'}`}></i>
              <span>{showCreateForm ? 'Hủy' : 'Tạo bài viết'}</span>
            </button>
          )}
        </div>

        {/* Thông báo yêu cầu đăng nhập */}
        {!isAuthenticated && (
          <div className="alert alert-info">
            <i className="fa-solid fa-circle-info"></i>
            <span>
              Vui lòng <a href="/login" className="alert-link">đăng nhập</a> để tạo bài viết, thích và bình luận.
            </span>
          </div>
        )}

        {/* Thông báo lỗi */}
        {error && (
          <div className="alert alert-danger">
            <div className="alert-content">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span>{error}</span>
            </div>
            <button 
              className="btn-close-alert" 
              onClick={clearError}
              title="Đóng"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        )}

        {/* Form chỉnh sửa bài viết */}
        {currentPost && isAuthenticated && (
          <div className="form-section edit-mode">
            <PostForm 
              onSubmit={handleUpdatePost}
              initialData={currentPost}
              onCancel={handleCancelEdit}
              loading={loading}
              mode="edit"
            />
          </div>
        )}

        {/* Form tạo bài viết mới */}
        {showCreateForm && !currentPost && isAuthenticated && (
          <div className="form-section create-mode">
            <PostForm 
              onSubmit={handleCreatePost}
              onCancel={handleCancelCreate}
              loading={loading}
              mode="create"
            />
          </div>
        )}

        {/* Loading state */}
        {loading && posts.length === 0 && (
          <div className="loading-container">
            <div className="spinner-wrapper">
              <i className="fa-solid fa-spinner fa-spin"></i>
            </div>
            <p className="loading-text">Đang tải bài viết...</p>
          </div>
        )}

        {/* Danh sách bài viết */}
        <div className="posts-list">
          {!loading && posts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <i className="fa-solid fa-inbox"></i>
              </div>
              <h3 className="empty-state-title">Chưa có bài viết nào</h3>
              <p className="empty-state-text">
                Hãy là người đầu tiên chia sẻ kinh nghiệm học TOEIC của bạn!
              </p>
              {isAuthenticated && !showCreateForm && (
                <button 
                  className="btn-primary-large"
                  onClick={() => setShowCreateForm(true)}
                >
                  <i className="fa-solid fa-plus"></i>
                  <span>Tạo bài viết đầu tiên</span>
                </button>
              )}
            </div>
          ) : (
            <>
              {posts.map(post => (
                <PostItem
                  key={post._id}
                  post={post}
                  onDelete={handleDeletePost}
                  onLike={handleLikePost}
                  onComment={handleCommentPost}
                  onEdit={handleEditPost}
                  showActions={isAuthenticated}
                />
              ))}

              {/* Load more button - Nếu có pagination */}
              {posts.length > 0 && posts.length % 10 === 0 && (
                <div className="load-more-container">
                  <button 
                    className="btn-load-more"
                    onClick={loadPosts}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        <span>Đang tải...</span>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-arrow-down"></i>
                        <span>Tải thêm bài viết</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Forum;