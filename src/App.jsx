import React from "react";
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";

// 🔒 Protected Route – hanya bisa diakses kalau sudah login
function RequireAuth({ children }) {
  const location = useLocation();
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

// 🚫 Guest Route – hanya bisa diakses kalau BELUM login
function GuestOnly({ children }) {
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  if (loggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Uncaught error:", error, info);
    this.setState({ error, info });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleDismiss = () => {
    this.setState({ error: null, info: null });
  };

  render() {
    if (this.state && this.state.error) {
      return (
        <div className="min-h-screen flex items-start justify-center p-6 bg-white">
          <div className="max-w-3xl w-full border rounded-xl p-6 bg-red-50 text-red-900 shadow">
            <h2 className="text-xl font-bold mb-2">
              Terjadi kesalahan saat memuat aplikasi
            </h2>
            <p className="mb-4 text-sm">
              Tolong kirimkan pesan error ini ke pengembang agar bisa diperbaiki.
            </p>
            <div className="mb-4 bg-white p-3 rounded text-sm text-red-800 overflow-auto max-h-48 border">
              <pre className="whitespace-pre-wrap text-xs">
                {this.state.error && this.state.error.toString()}
              </pre>
              {this.state.info && this.state.info.componentStack && (
                <pre className="whitespace-pre-wrap text-xs mt-2">
                  {this.state.info.componentStack}
                </pre>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={this.handleReload}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Muat Ulang
              </button>
              <button
                onClick={this.handleDismiss}
                className="px-4 py-2 border rounded"
              >
                Tutup Pesan
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  // ✅ Tambahkan fungsi logout di sini
  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");

    // Redirect ke login
    window.location.href = "#/login"; // Karena kamu pakai HashRouter
  };

  // Wrapper halaman Login, Register, Forgot
  const LoginPage = () => {
    const navigate = useNavigate();
    const onNavigate = (to) => {
      if (to === "login") navigate("/login");
      if (to === "register") navigate("/register");
      if (to === "forgot") navigate("/forgot");
    };
    return <Login onNavigate={onNavigate} />;
  };

  const RegisterPage = () => {
    const navigate = useNavigate();
    const onNavigate = (to) => {
      if (to === "login") navigate("/login");
      if (to === "register") navigate("/register");
      if (to === "forgot") navigate("/forgot");
    };
    return <Register onNavigate={onNavigate} />;
  };

  const ForgotPage = () => {
    const navigate = useNavigate();
    const onNavigate = (to) => {
      if (to === "login") navigate("/login");
      if (to === "register") navigate("/register");
      if (to === "forgot") navigate("/forgot");
    };
    return <ForgotPassword onNavigate={onNavigate} />;
  };

  return (
    <HashRouter>
      <ErrorBoundary>
        <Routes>
          {/* 🔐 Halaman Auth hanya untuk yang belum login */}
          <Route
            path="/login"
            element={
              <GuestOnly>
                <LoginPage />
              </GuestOnly>
            }
          />
          <Route
            path="/register"
            element={
              <GuestOnly>
                <RegisterPage />
              </GuestOnly>
            }
          />
          <Route
            path="/forgot"
            element={
              <GuestOnly>
                <ForgotPage />
              </GuestOnly>
            }
          />

          {/* 🧭 Dashboard hanya untuk user yang sudah login */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard onLogout={handleLogout} />
              </RequireAuth>
            }
          />

          {/* Redirect default */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </ErrorBoundary>
    </HashRouter>
  );
};

export default App;
