import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    stock: "",
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [menu, setMenu] = useState("produk");
  const [transactions, setTransactions] = useState([]);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    address: "",
    avatar: "",
  });

  useEffect(() => {
    // Proteksi admin
    const userData = localStorage.getItem("user");
    if (!userData || JSON.parse(userData).role !== "ADMIN") {
      window.location.href = "/";
      return;
    }
    fetchProducts();
    // Cek menu dari query string
    const params = new URLSearchParams(window.location.search);
    if (params.get("menu") === "riwayat") {
      setMenu("riwayat");
      fetchTransactions();
    } else if (params.get("menu") === "profil") {
      setMenu("profil");
      const userObj = JSON.parse(userData);
      setProfile({
        name: userObj.name,
        email: userObj.email,
        bio: userObj.bio || "",
        address: userObj.address || "",
        avatar: userObj.avatar || "",
      });
    } else {
      setMenu("produk");
    }
  }, []);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions?all=1");
    const data = await res.json();
    setTransactions(data);
  };

  const fetchProducts = async () => {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const method = editId ? "PUT" : "POST";
    const res = await fetch("/api/admin/products", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editId ? { ...form, id: editId } : form),
    });
    const data = await res.json();
    setMessage(
      data.message ||
        data.error ||
        (editId ? "Produk berhasil diedit." : "Produk berhasil ditambah.")
    );
    setForm({ name: "", price: "", description: "", image: "", stock: "" });
    setEditId(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image || "",
      stock: product.stock || "",
    });
    setEditId(product.id);
  };

  const handleDelete = async (id) => {
    const res = await fetch("/api/admin/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    setMessage(data.message || data.error || "Produk berhasil dihapus.");
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 flex flex-col items-center">
      <div className="flex gap-8 w-full max-w-5xl">
        <AdminSidebar active={menu} />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-teal-700 mb-6 text-center">
            Dashboard Admin
          </h1>
          {menu === "produk" && (
            <>
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-xl font-bold text-teal-700 mb-4 text-center">
                  CRUD Produk
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 gap-4 mb-4"
                >
                  <input
                    name="name"
                    placeholder="Nama"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  <input
                    name="price"
                    type="number"
                    placeholder="Harga"
                    value={form.price}
                    onChange={handleChange}
                    required
                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  <input
                    name="description"
                    placeholder="Deskripsi"
                    value={form.description}
                    onChange={handleChange}
                    required
                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  <input
                    name="image"
                    placeholder="URL Gambar (opsional)"
                    value={form.image}
                    onChange={handleChange}
                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  <input
                    name="stock"
                    type="number"
                    placeholder="Stok Produk"
                    value={form.stock}
                    onChange={handleChange}
                    required
                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded font-bold shadow"
                    >
                      {editId ? "Edit Produk" : "Tambah Produk"}
                    </button>
                    {editId && (
                      <button
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded font-bold shadow"
                        onClick={() => {
                          setEditId(null);
                          setForm({
                            name: "",
                            price: "",
                            description: "",
                            image: "",
                            stock: "",
                          });
                        }}
                      >
                        Batal Edit
                      </button>
                    )}
                  </div>
                </form>
                {message && (
                  <p className="text-center text-teal-600 font-semibold mb-4">
                    {message}
                  </p>
                )}
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-teal-700 mb-4 text-center">
                  Daftar Produk
                </h2>
                <ul className="space-y-6">
                  {products.map((product) => (
                    <li
                      key={product.id}
                      className="border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                    >
                      <div className="flex-1">
                        <div className="font-bold text-lg text-teal-800">
                          {product.name}
                        </div>
                        <div className="text-teal-600 font-bold">
                          Rp{product.price}
                        </div>
                        <div className="text-gray-600 mb-2">
                          {product.description}
                        </div>
                        <div className="text-gray-500 mb-2">
                          Stok: {product.stock}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded font-bold shadow"
                            onClick={() => handleEdit(product)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-bold shadow"
                            onClick={() => handleDelete(product.id)}
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                      {product.image && (
                        <div className="flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-24 h-24 object-cover rounded shadow"
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          {menu === "riwayat" && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-teal-700 mb-4 text-center">
                Riwayat Penjualan
              </h2>
              {transactions.length === 0 ? (
                <p className="text-gray-500 text-center">
                  Belum ada transaksi.
                </p>
              ) : (
                <ul className="space-y-4">
                  {transactions.map((trx) => (
                    <li
                      key={trx.id}
                      className="border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                    >
                      <div className="flex-1">
                        <div className="font-bold text-teal-800">
                          {trx.product.name}
                        </div>
                        <div className="text-gray-700">Qty: {trx.quantity}</div>
                        <div className="text-gray-600">
                          Tanggal: {new Date(trx.createdAt).toLocaleString()}
                        </div>
                        <div className="text-gray-500">
                          Pembeli: {trx.user.name} ({trx.user.email})
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {menu === "profil" && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-teal-700 mb-4 text-center">
                Edit Profil Admin
              </h2>
              <form
                className="grid grid-cols-1 gap-4 max-w-md mx-auto bg-gray-50 p-6 rounded-xl shadow"
                onSubmit={(e) => {
                  e.preventDefault();
                  // TODO: update profile API
                  localStorage.setItem(
                    "user",
                    JSON.stringify({
                      ...JSON.parse(localStorage.getItem("user")),
                      ...profile,
                    })
                  );
                  Swal.fire({
                    icon: "success",
                    title: "Profil admin berhasil diupdate!",
                    timer: 1500,
                    showConfirmButton: false,
                  });
                }}
              >
                <input
                  name="name"
                  placeholder="Nama"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <input
                  name="bio"
                  placeholder="Bio"
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <input
                  name="address"
                  placeholder="Alamat"
                  value={profile.address}
                  onChange={(e) =>
                    setProfile({ ...profile, address: e.target.value })
                  }
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <input
                  name="avatar"
                  placeholder="URL Avatar"
                  value={profile.avatar}
                  onChange={(e) =>
                    setProfile({ ...profile, avatar: e.target.value })
                  }
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded font-bold shadow"
                >
                  Simpan Perubahan
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
