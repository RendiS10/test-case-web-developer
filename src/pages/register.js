import { useState } from "react";
import Swal from "sweetalert2";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RegisterForm from "../components/organisms/RegisterForm";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Data sudah benar?",
      text: "Pastikan data yang diisi sudah benar sebelum registrasi.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Registrasi",
      cancelButtonText: "Cek Lagi",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setMessage("");
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data.user || data.message) {
          Swal.fire({
            icon: "success",
            title: "Registrasi Berhasil",
            text: "Akun berhasil dibuat. Silakan login.",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            window.location.href = "/login";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Registrasi Gagal",
            text: data.error || "Terjadi kesalahan.",
          });
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <RegisterForm
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
