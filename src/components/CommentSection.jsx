import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

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
            const res = await axiosClient.get(`/comments/getcomments?postid=${postId}`);
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

            const res = await axiosClient.post("/comments/add", {
                PostId: postId,
                UserId: userId,
                Content: newComment,
            });

            // load lại danh sách bình luận
            loadComments();
            setNewComment("");

            // 🔸 Gọi callback tăng commentCount
            if (onCommentAdded) onCommentAdded();
        } catch (err) {
            console.error("❌ Lỗi khi gửi bình luận:", err);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axiosClient.post(`/comments/delete?commentid=${commentId}`);

            // load lại danh sách bình luận
            loadComments();
        } catch (err) {
            console.error("❌ Lỗi khi xóa bình luận:", err);
        }
    };

    const handleEditComment = async (commentId, newCommnet) => {
        try {
            await axiosClient.put("/comments/edit/", {
                commentId: commentId,
                newContent: newCommnet
            });
            // load lại danh sách bình luận
            loadComments();
        }
        catch (err) {
            console.error("❌ Lỗi khi chỉnh sửa bình luận:", err);
        }
    }

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
                            <div className="bg-gray-50 p-3 rounded-md shadow-sm mb-2">
                                <strong className="text-blue-600">{c.username}</strong>
                                <span className="ml-2 text-gray-800">{c.content}</span>
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
                                        <button className="dropdown-item" onClick={(handleEditComment)}>
                                            ✏️ Chỉnh sửa
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item text-danger" onClick={() => {
                                            if(window.confirm("Bạn có chắc muốn xóa bình luận này?")) {
                                                handleDeleteComment(c.id);
                                            }
                                        }}>
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
