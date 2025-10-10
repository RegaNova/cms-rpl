import React from "react";
import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./auth/AuthPage";

function RequireAuth({ children }) {
  const location = useLocation();
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
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
            <h2 className="text-xl font-bold mb-2">Terjadi kesalahan saat memuat aplikasi</h2>
            <p className="mb-4 text-sm">Tolong kirimkan pesan error ini ke pengembang agar bisa diperbaiki.</p>
            <div className="mb-4 bg-white p-3 rounded text-sm text-red-800 overflow-auto max-h-48 border">
              <pre className="whitespace-pre-wrap text-xs">{this.state.error && this.state.error.toString()}</pre>
              {this.state.info && this.state.info.componentStack && (
                <pre className="whitespace-pre-wrap text-xs mt-2">{this.state.info.componentStack}</pre>
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={this.handleReload} className="px-4 py-2 bg-red-600 text-white rounded">Muat Ulang</button>
              <button onClick={this.handleDismiss} className="px-4 py-2 border rounded">Tutup Pesan</button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  return (
    <HashRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </ErrorBoundary>
    </HashRouter>
  );
};

export default App;