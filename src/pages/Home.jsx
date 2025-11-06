import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleGoToFeed = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/feed");
    } else {
      navigate("/login");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to Social Feed App</h1>
      <p>Chào mừng bạn đến với bảng tin mạng xã hội mini 🚀</p>
      <button onClick={handleGoToFeed} style={styles.button}>
        Vào bảng tin
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "80px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Home;


// import React, { useEffect, useState } from "react";
// import axitosClient from "../api/axitosClient";
// import PostCard from "../components/PostCard";
// import CreatePost from "../components/CreatePost";

// const Home = () => {
//     const [posts, setPosts] = useState([]);

//     // hàm lấy bài viết từ server
//     const fetchPosts = async () => {
//         try {
//             const response = await axitosClient.get("/posts");
//             setPosts(response.data);
//         } catch (error) {
//             console.error("Error fetching posts:", error);
//         }
//     }
//     // gọi hàm fetchPosts khi component được tải lần đầu
//     useEffect(() => {

//         fetchPosts();
//     }, []);

//     // giao diện trang Home
//     return (
//         <div style={{ padding: "20px" }}>
//             <h2>Bảng tin</h2>

//             <CreatePost onPostCreated={fetchPosts} />

//             {posts.map((post) => (
//                 <PostCard key={post.id} post={post} />
//             ))}
//         </div>
//     );
// };
// export default Home;