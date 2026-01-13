import { useState } from "react";
import { UserPlus } from "lucide-react";

export default function RegisterForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Password tidak sama");
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Nama Lengkap" name="name" value={form.name} onChange={handleChange} />
      <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
      <Field label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
      <Field
        label="Konfirmasi Password"
        name="confirmPassword"
        type="password"
        value={form.confirmPassword}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition"
      >
        <UserPlus size={18} />
        Daftar
      </button>
    </form>
  );
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        {...props}
        required
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
      />
    </div>
  );
}
