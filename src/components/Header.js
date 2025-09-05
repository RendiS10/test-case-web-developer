import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import HeaderNav from "./organisms/HeaderNav";

export default function Header() {
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
    else setUser(null);
    // Close dropdown on outside click
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Yakin ingin logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        Swal.fire({
          icon: "success",
          title: "Logout Berhasil",
          text: "Anda telah keluar dari akun.",
          timer: 1200,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "/";
        });
      }
    });
  };

  return (
    <header className="bg-teal-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Toko Obat & Vitamin Kucing</h1>
        <HeaderNav
          user={user}
          dropdown={dropdown}
          setDropdown={setDropdown}
          dropdownRef={dropdownRef}
          handleLogout={handleLogout}
        />
      </div>
    </header>
  );
}
