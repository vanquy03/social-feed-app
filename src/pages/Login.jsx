import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axitosClient from "../api/axitosClient";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await axitosClient.post("/users/login", { username, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.user.id);
            localStorage.setItem("username", response.data.user.username);
            navigate("/feed");
        } catch (err) {
            console.error("API error:", err);

            if (err.response) {
            // Server có phản hồi (ví dụ: 401, 500,...)
            setError(err.response.data?.message || "Đăng nhập thất bại (server error)");
            } else if (err.request) {
            // Request gửi đi nhưng không có phản hồi (server không chạy, CORS, v.v.)
            setError("Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại server.");
            } else {
            // Lỗi khác (ví dụ lỗi code JS)
            setError("Đã xảy ra lỗi không xác định.");
            }
        }
    };

     return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-80">
            <h2 className="text-xl font-bold mb-4 text-center">Đăng nhập</h2>
            <input
            type="text"
            placeholder="Username"
            className="border w-full p-2 mb-3 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <input
            type="password"
            placeholder="Password"
            className="border w-full p-2 mb-3 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <button
            type="submit"
            className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600"
            >
            Đăng nhập
            </button>
        </form>
        </div>
    );
}

export default Login;