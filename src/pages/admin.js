import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminSidebarNav from "../components/organisms/AdminSidebarNav";
import ProductForm from "../components/organisms/ProductForm";
import ProductList from "../components/organisms/ProductList";
import TransactionHistory from "../components/organisms/TransactionHistory";
import ProfileForm from "../components/organisms/ProfileForm";

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
    } else {
      setMenu("produk");
    }
  }, []);

  // Fetch data admin setiap kali menu berubah ke profil
  useEffect(() => {
    if (menu === "profil") {
      const userData = localStorage.getItem("user");
      if (!userData) return;
      const userObj = JSON.parse(userData);
      fetch(`/api/admin/profile?id=${userObj.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setProfile({
              name: data.user.name,
              email: data.user.email,
              bio: data.user.bio || "",
              address: data.user.address || "",
              avatar: data.user.avatar || "",
            });
          } else {
            setProfile({
              name: userObj.name,
              email: userObj.email,
              bio: userObj.bio || "",
              address: userObj.address || "",
              avatar: userObj.avatar || "",
            });
          }
        });
    }
  }, [menu]);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions?all=1");
    const data = await res.json();
    setTransactions(Array.isArray(data) ? data : []);
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
    if (data.error) {
      Swal.fire({
        icon: "error",
        title: "Gagal menyimpan produk",
        text: data.error,
      });
      setMessage(data.error);
    } else {
      Swal.fire({
        icon: "success",
        title: editId ? "Produk berhasil diedit." : "Produk berhasil ditambah.",
        timer: 1500,
        showConfirmButton: false,
      });
      setMessage(
        editId ? "Produk berhasil diedit." : "Produk berhasil ditambah."
      );
      setForm({ name: "", price: "", description: "", image: "", stock: "" });
      setEditId(null);
      fetchProducts();
    }
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
    Swal.fire({
      title: "Yakin ingin menghapus produk?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch("/api/admin/products", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        const data = await res.json();
        if (data.error) {
          Swal.fire({
            icon: "error",
            title: "Gagal menghapus produk",
            text: data.error,
          });
          setMessage(data.error);
        } else {
          Swal.fire({
            icon: "success",
            title: "Produk berhasil dihapus.",
            timer: 1500,
            showConfirmButton: false,
          });
          setMessage("Produk berhasil dihapus.");
          fetchProducts();
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="flex gap-8 w-full max-w-5xl">
          <AdminSidebarNav
            active={menu}
            onMenuChange={(m) => {
              setMenu(m);
              if (m === "riwayat") fetchTransactions();
            }}
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-teal-700 mb-6 text-center">
              Dashboard Admin
            </h1>
            {menu === "produk" && (
              <>
                <ProductForm
                  form={form}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  editId={editId}
                  onCancel={() => {
                    setEditId(null);
                    setForm({
                      name: "",
                      price: "",
                      description: "",
                      image: "",
                      stock: "",
                    });
                  }}
                  message={message}
                />
                <ProductList
                  products={products}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </>
            )}
            {menu === "riwayat" && (
              <TransactionHistory transactions={transactions} />
            )}
            {menu === "profil" && (
              <ProfileForm
                profile={profile}
                onChange={(e) =>
                  setProfile({ ...profile, [e.target.name]: e.target.value })
                }
                onSubmit={async (e) => {
                  e.preventDefault();
                  const userData = JSON.parse(localStorage.getItem("user"));
                  const res = await fetch("/api/admin/profile", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      id: userData.id,
                      name: profile.name,
                      email: profile.email,
                      bio: profile.bio,
                      address: profile.address,
                      avatar: profile.avatar,
                    }),
                  });
                  const data = await res.json();
                  if (data.error) {
                    Swal.fire({
                      icon: "error",
                      title: "Gagal update profil admin",
                      text: data.error,
                    });
                  } else {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    Swal.fire({
                      icon: "success",
                      title: "Profil admin berhasil diupdate!",
                      timer: 1500,
                      showConfirmButton: false,
                    });
                  }
                }}
                disabledEmail={true}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
