import Link from "next/link";
import Avatar from "../atoms/Avatar";

export default function HeaderNav({
  user,
  dropdown,
  setDropdown,
  dropdownRef,
  handleLogout,
}) {
  return (
    <nav className="space-x-4 flex items-center">
      <Link href="/" className="hover:underline">
        Home
      </Link>
      {!user && (
        <>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          <Link href="/register" className="hover:underline">
            Register
          </Link>
        </>
      )}
      {user && (
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-2 focus:outline-none"
            onClick={() => setDropdown((d) => !d)}
          >
            <Avatar src={user.avatar || "/window.svg"} alt="avatar" size={32} />
            <span className="font-semibold">{user.name}</span>
          </button>
          {dropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow z-10">
              {user.role === "ADMIN" ? (
                <Link
                  href="/admin"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdown(false)}
                >
                  Dashboard Admin
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdown(false)}
                >
                  Dashboard
                </Link>
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
  );
}
