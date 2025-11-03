import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Forum.scss';

const Forum = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Nguyen A',
      content: 'Từ nào trong TOEIC khiến bạn khó nhớ nhất?',
      likes: 3,
      comments: ['Tôi thấy từ "negotiate" rất khó!', 'Từ "revenue" cũng khó đấy!'],
    },
    {
      id: 2,
      author: 'Tran B',
      content: 'Mọi người có mẹo học từ vựng TOEIC nhanh không?',
      likes: 5,
      comments: ['Dùng flashcard nha!', 'Học theo chủ đề sẽ dễ hơn.'],
    },
  ]);

  const [newComment, setNewComment] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [expandedPosts, setExpandedPosts] = useState([]); // danh sách bài viết đang mở rộng comment

  // Like
  const handleLike = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  // Comment
  const handleComment = (id) => {
    if (!newComment.trim()) return;
    setPosts(posts.map(p => 
      p.id === id ? { ...p, comments: [...p.comments, newComment] } : p
    ));
    setNewComment('');
    setSelectedPost(null);
  };

  // Toggle xem thêm / thu gọn bình luận
  const toggleExpandComments = (id) => {
    if (expandedPosts.includes(id)) {
      setExpandedPosts(expandedPosts.filter(pId => pId !== id)); // thu gọn
    } else {
      setExpandedPosts([...expandedPosts, id]); // mở rộng
    }
  };

  return (
    <>
      <Header />

      <div className="forum-container">
        <h1 className="text-center text-primary mb-5 fw-bold">Diễn đàn TOEIC</h1>

        <div className="forum-posts">
          {posts.map(post => {
            const isExpanded = expandedPosts.includes(post.id);
            const displayedComments = isExpanded
              ? post.comments
              : post.comments.slice(0, 1); // chỉ 1 comment đầu khi chưa mở rộng

            return (
              <div key={post.id} className="forum-card">
                <div className="forum-author">{post.author}</div>
                <div className="forum-content">{post.content}</div>

                <div className="forum-actions">
                  <button className="btn-like" onClick={() => handleLike(post.id)}>
                    👍 {post.likes}
                  </button>
                  <button className="btn-comment" onClick={() => setSelectedPost(post.id)}>
                    💬 Bình luận
                  </button>
                </div>

                <div className="forum-comments">
                  {displayedComments.map((c, i) => (
                    <p key={i} className="comment">💭 {c}</p>
                  ))}

                  {/* Nếu có nhiều hơn 1 comment thì hiện nút xem thêm */}
                  {post.comments.length > 1 && (
                    <p
                      className="toggle-comments"
                      onClick={() => toggleExpandComments(post.id)}
                    >
                      {isExpanded ? 'Ẩn bớt ▲' : 'Xem thêm ▼'}
                    </p>
                  )}
                </div>

                {selectedPost === post.id && (
                  <div className="comment-box mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập bình luận..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => handleComment(post.id)}
                    >
                      Gửi
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Forum;
