import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from "../components/organisms/LoginForm";

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
      <main className="flex-1 flex items-center justify-center py-8 px-4 bg-gradient-to-br from-teal-50 via-white to-teal-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
          <LoginForm
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            message={message}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
// ...existing code...
