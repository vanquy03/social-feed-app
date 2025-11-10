import { useState } from "react";
import axiosClient from "../api/axiosClient";

const CreatePost = ({ onPostCreated }) => {
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const userId = localStorage.getItem("userId"); // lấy từ khi login
            await axiosClient.post("posts/create", { content, userId });
            setContent("");
            if (onPostCreated) onPostCreated();
        } catch (err) {
            setError(err.response?.data || "Lỗi khi tạo bài viết");
        }
    };

    return (
        <div className="create-post">
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Bạn đang nghĩ gì?"
                />
                <button type="submit">Đăng</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default CreatePost;
