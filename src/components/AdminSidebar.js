import Link from "next/link";

export default function AdminSidebar({ active }) {
  return (
    <aside className="bg-white shadow-lg rounded-2xl p-6 w-64 min-h-[300px] flex flex-col gap-4">
      <nav className="flex flex-col gap-2">
        <Link href="/admin">
          <a
            className={`px-4 py-2 rounded font-semibold hover:bg-teal-50 ${
              active === "produk"
                ? "bg-teal-100 text-teal-700"
                : "text-gray-700"
            }`}
          >
            CRUD Produk
          </a>
        </Link>
        <Link href="/admin?menu=riwayat">
          <a
            className={`px-4 py-2 rounded font-semibold hover:bg-teal-50 ${
              active === "riwayat"
                ? "bg-teal-100 text-teal-700"
                : "text-gray-700"
            }`}
          >
            Riwayat Penjualan
          </a>
        </Link>
        <Link href="/admin?menu=profil">
          <a
            className={`px-4 py-2 rounded font-semibold hover:bg-teal-50 ${
              active === "profil"
                ? "bg-teal-100 text-teal-700"
                : "text-gray-700"
            }`}
          >
            Edit Profil Admin
          </a>
        </Link>
        <Link href="/">
          <a className="px-4 py-2 rounded font-semibold hover:bg-teal-50 text-gray-700">
            Home (Produk)
          </a>
        </Link>
      </nav>
    </aside>
  );
}
