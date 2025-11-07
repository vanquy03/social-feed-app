import { useEffect, useState } from "react";
import axiosClient from "../api/axitosClient";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";

function Feed() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axiosClient.get(`posts/get_all?userId=${userId}`);
      setPosts(response.data);
    } catch (err) {
      console.error("❌ Lỗi khi tải bài viết:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Bảng tin</h2>
      <CreatePost onPostCreated={fetchPosts} />
      <div style={styles.list}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "30px auto",
    padding: "20px",
  },
  list: {
    marginTop: "20px",
  },
};

export default Feed;
