import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/holdings"); // redirect to dashboard
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6">Welcome to Trading App</h1>
      <button
        onClick={handleGoogleLogin}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Sign in with Google
      </button>
    </div>
  );
}
