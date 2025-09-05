import Link from "next/link";

export default function AdminSidebarNav({ active, onMenuChange }) {
  return (
    <nav className="flex flex-col gap-2">
      <button
        type="button"
        className={`w-full text-left px-4 py-2 rounded font-semibold hover:bg-teal-50 ${
          active === "produk" ? "bg-teal-100 text-teal-700" : "text-gray-700"
        }`}
        onClick={() => onMenuChange("produk")}
      >
        CRUD Produk
      </button>
      <button
        type="button"
        className={`w-full text-left px-4 py-2 rounded font-semibold hover:bg-teal-50 ${
          active === "riwayat" ? "bg-teal-100 text-teal-700" : "text-gray-700"
        }`}
        onClick={() => onMenuChange("riwayat")}
      >
        Riwayat Penjualan
      </button>
      <button
        type="button"
        className={`w-full text-left px-4 py-2 rounded font-semibold hover:bg-teal-50 ${
          active === "profil" ? "bg-teal-100 text-teal-700" : "text-gray-700"
        }`}
        onClick={() => onMenuChange("profil")}
      >
        Edit Profil Admin
      </button>
      <Link
        href="/"
        className="px-4 py-2 rounded font-semibold hover:bg-teal-50 text-gray-700"
      >
        Home (Produk)
      </Link>
    </nav>
  );
}
