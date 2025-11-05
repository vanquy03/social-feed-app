import React from "react";

function PostCard({ post }) {
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
        <span>❤️ {post.likeCount}</span>
        <span>💬 {post.commentCount}</span>
      </div>
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
