import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/Auth/Authlayout";
import RegisterForm from "../../components/Auth/RegisterForm";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (data) => {
    // 🔥 NANTI GANTI KE API REGISTER USER
    console.log("Register data:", data);
    alert("Registrasi berhasil");
    navigate("/login");
  };

  return (
    <AuthLayout
      title="Registrasi Akun"
      subtitle="Daftar sebagai pengguna"
    >
      <RegisterForm onSubmit={handleRegister} />

      <p className="mt-6 text-sm text-center text-gray-600">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-teal-600 font-semibold">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
