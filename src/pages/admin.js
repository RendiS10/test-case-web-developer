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
    <div>
      <h1>Admin Panel - CRUD Produk</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nama"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Harga"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Deskripsi"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="image"
          placeholder="URL Gambar (opsional)"
          value={form.image}
          onChange={handleChange}
        />
        <button type="submit">
          {editId ? "Edit Produk" : "Tambah Produk"}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({ name: "", price: "", description: "", image: "" });
            }}
          >
            Batal Edit
          </button>
        )}
      </form>
      {message && <p>{message}</p>}
      <h2>Daftar Produk</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <b>{product.name}</b> - Rp{product.price} <br />
            {product.description}
            {product.image && (
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ maxWidth: 100 }}
                />
              </div>
            )}
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
