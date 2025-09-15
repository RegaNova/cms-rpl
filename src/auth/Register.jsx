import { useState } from "react";

export default function Register({ onRegister }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Semua field wajib diisi!");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.username === form.username)) {
      setError("Username sudah terdaftar!");
      return;
    }
    users.push({ ...form });
    localStorage.setItem("users", JSON.stringify(users));
    setSuccess("Registrasi berhasil! Silakan login.");
    setError("");
    setForm({ username: "", password: "" });
    setTimeout(() => onRegister("login"), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Register Admin</h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-center">{success}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Username</label>
          <input type="text" className="w-full border rounded px-3 py-2" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input type="password" className="w-full border rounded px-3 py-2" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold">Register</button>
        <div className="mt-4 text-center text-sm">
          Sudah punya akun? <a href="#" className="text-blue-600 hover:underline" onClick={e => { e.preventDefault(); onRegister("login"); }}>Login</a>
        </div>
      </form>
    </div>
  );
}
