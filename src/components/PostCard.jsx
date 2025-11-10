import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import CommentSection from "./CommentSection";

function PostCard({ post }) {
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [liked, setLiked] = useState(post.isLiked);

  const [commentCount, setCommentCount] = useState(post.commentCount);
  const [showComments, setShowComments] = useState(false);

  const handleCommentAdded = () => {
    setCommentCount(commentCount + 1);
  }

  const handleLike = async () => {
    try {
      const userId = localStorage.getItem("userId"); // lấy từ khi login
      const response = await axiosClient.post("likes/likeorunlike", {
        UserId: userId,
        PostId: post.id
      });

      if (response.data === "Liked") {
        setLikeCount(likeCount + 1);
        setLiked(true);
      } else if (response.data === "Unliked") {
        setLikeCount(likeCount - 1);
        setLiked(false);
      }
    } catch (err) {
      console.error("❌ Lỗi khi thích bài viết:", err);
    }
  }

  return (
    <div className="post-card" style={styles.card}>
      <div style={styles.header}>
        <strong>{post.username}</strong>
        <span style={styles.date}>
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>

      <p style={styles.content}>{post.content}</p>

      <div style={styles.footer}>
        <button onClick={handleLike}>
          {liked ? "❤️ Đã thích" : "🤍 Thích"} ({likeCount})
        </button>
        <button onClick={() => setShowComments(!showComments)}>
          <span>💬 {commentCount}</span>
        </button>
      </div>
      {showComments && (
        <CommentSection postId={post.id} onCommentAdded={handleCommentAdded} />
      )}
    </div>
  );
}


const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "10px 15px",
    marginBottom: "15px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#333",
  },
  content: {
    margin: "10px 0",
    fontSize: "15px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    color: "#555",
  },
  date: {
    fontSize: "12px",
    color: "#888",
  },
};

export default PostCard;
