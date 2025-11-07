import React, { useState, useEffect } from "react";
import axiosClient from "../api/axitosClient";

function CommentSection({ postId, onCommentAdded }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadComments();
    }, []);

    const loadComments = async () => {
        try {
            setLoading(true);
            const res = await axiosClient.get(`/comments/${postId}`);
            setComments(res.data);
        } catch (err) {
            console.error("❌ Lỗi khi tải bình luận:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        try {
            const userId = localStorage.getItem("userId");
            const userName = localStorage.getItem("username");

            const res = await axiosClient.post("/comments", {
                PostId: postId,
                UserId: userId,
                Content: newComment,
            });

            // Thêm comment mới vào list
            setComments([{ id: res.data.id, username: userName, content: newComment }, ...comments]);
            setNewComment("");

            // 🔸 Gọi callback tăng commentCount
            if (onCommentAdded) onCommentAdded();
        } catch (err) {
            console.error("❌ Lỗi khi gửi bình luận:", err);
        }
    };

    return (
        <div className="mt-2 border-t pt-2">
            <h4 className="text-sm font-semibold mb-2">Bình luận</h4>

            {loading ? (
                <p>Đang tải...</p>
            ) : comments.length === 0 ? (
                <p className="text-gray-500 text-sm">Chưa có bình luận nào.</p>
            ) : (
                comments.map((c) => (
                    <div key={c.id} className="mb-2">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{c.username}</strong>: {c.content}
                            </div>

                            <div className="dropdown">
                                <button
                                    className="btn btn-link text-muted p-0 border-0"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="bi bi-three-dots-vertical"></i>
                                </button>

                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <button className="dropdown-item" onClick={() => alert('Chỉnh sửa')}>
                                            ✏️ Chỉnh sửa
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item text-danger" onClick={() => alert('Xóa')}>
                                            🗑️ Xóa
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                ))
            )}

            <div className="flex mt-2">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 border rounded px-2 py-1 text-sm"
                    placeholder="Viết bình luận..."
                />
                <button
                    onClick={handleAddComment}
                    className="ml-2 bg-blue-500 text-white px-3 py-1 rounded text-sm"
                >
                    Gửi
                </button>
            </div>
        </div>
    );
}

export default CommentSection;
