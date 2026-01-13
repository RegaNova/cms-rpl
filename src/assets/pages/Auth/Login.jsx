import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/Auth/Authlayout";
import LoginForm from "../../components/Auth/LoginForm";
import { useAuth } from "../../../Auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    // 🔥 NANTI GANTI KE API LOGIN (ADMIN DARI SEEDER)
    const role = data.email.includes("admin") ? "admin" : "user";
    login(role);
    navigate("/");
  };

  return (
    <AuthLayout
      title="Login"
      subtitle="Masuk menggunakan akun terdaftar"
    >
      <LoginForm onSubmit={handleLogin} />

      <p className="mt-6 text-sm text-center text-gray-600">
        Belum punya akun?{" "}
        <Link to="/register" className="text-teal-600 font-semibold">
          Daftar
        </Link>
      </p>
    </AuthLayout>
  );
}
