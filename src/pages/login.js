import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(data.message || data.error);
    // Simpan data user ke localStorage/session jika login berhasil
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Selamat datang, " + data.user.name + "!",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        if (data.user.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-teal-700 mb-6 text-center">
            Login Member
          </h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-4">
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
              Login
            </button>
          </form>
          <div className="text-center mt-2">
            <span className="text-gray-600">Sudah belum memiliki akun? </span>
            <a
              href="/register"
              className="text-teal-600 hover:underline font-semibold"
            >
              Daftar di sini
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
// ...existing code...
