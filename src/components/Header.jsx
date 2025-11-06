import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold cursor-pointer hover:text-blue-200 transition"
      >
        Social Feed
      </h1>

      {username && (
        <div className="flex items-center gap-3">
          <span>👋 Xin chào, <b>{username}</b></span>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
