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