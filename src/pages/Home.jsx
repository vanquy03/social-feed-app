import React, { useEffect, useState } from "react";
import axitosClient from "../api/axitosClient";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";

const Home = () => {
    const [posts, setPosts] = useState([]);

    // hàm lấy bài viết từ server
    const fetchPosts = async () => {
        try {
            const response = await axitosClient.get("/posts");
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }
    // gọi hàm fetchPosts khi component được tải lần đầu
    useEffect(() => {

        fetchPosts();
    }, []);

    // giao diện trang Home
    return (
        <div style={{ padding: "20px" }}>
            <h2>Bảng tin</h2>

            <CreatePost onPostCreated={fetchPosts} />

            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};
export default Home;