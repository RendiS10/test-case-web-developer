import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-teal-700 mb-6 text-center">
            Registrasi Member
          </h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-4">
            <input
              name="name"
              placeholder="Nama"
              value={form.name}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded font-bold shadow"
            >
              Daftar
            </button>
          </form>
          <div className="text-center mt-2">
            <span className="text-gray-600">Sudah punya akun? </span>
            <a
              href="/login"
              className="text-teal-600 hover:underline font-semibold"
            >
              Login di sini
            </a>
          </div>
          {message && (
            <p className="text-center text-teal-600 font-semibold mt-2">
              {message}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
