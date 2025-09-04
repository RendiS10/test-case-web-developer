import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

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
    setForm({ name: "", price: "", description: "", image: "" });
    setEditId(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image || "",
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
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h1 className="text-2xl font-bold text-teal-700 mb-6 text-center">
          Admin Panel - CRUD Produk
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
                  setForm({ name: "", price: "", description: "", image: "" });
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
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
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
                <div className="text-teal-600 font-bold">Rp{product.price}</div>
                <div className="text-gray-600 mb-2">{product.description}</div>
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
    </div>
  );
}
