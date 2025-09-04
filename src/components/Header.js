import { useEffect, useState, useRef } from "react";

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
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <header className="bg-teal-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Toko Obat & Vitamin Kucing</h1>
        <nav className="space-x-4 flex items-center">
          <a href="/" className="hover:underline">
            Home
          </a>
          {!user && (
            <>
              <a href="/login" className="hover:underline">
                Login
              </a>
              <a href="/register" className="hover:underline">
                Register
              </a>
            </>
          )}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-2 focus:outline-none"
                onClick={() => setDropdown((d) => !d)}
              >
                <img
                  src={user.avatar || "/window.svg"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <span className="font-semibold">{user.name}</span>
              </button>
              {dropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow z-10">
                  {user.role === "ADMIN" ? (
                    <a
                      href="/admin"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdown(false)}
                    >
                      Dashboard Admin
                    </a>
                  ) : (
                    <a
                      href="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdown(false)}
                    >
                      Dashboard
                    </a>
                  )}
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
