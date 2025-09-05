import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [menu, setMenu] = useState("riwayat");
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    address: "",
    avatar: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      setMessage("Silakan login terlebih dahulu.");
      return;
    }
    const userObj = JSON.parse(userData);
    setUser(userObj);
    setProfile({
      name: userObj.name,
      email: userObj.email,
      bio: userObj.bio || "",
      address: userObj.address || "",
      avatar: userObj.avatar || "",
    });
    fetch(`/api/transactions?userId=${userObj.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setMessage(data.error);
        else setTransactions(data);
      });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handler = () => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("menu") === "profil") setMenu("profil");
        else setMenu("riwayat");
      };
      handler();
      window.addEventListener("popstate", handler);
      window.addEventListener("pushstate", handler);
      window.addEventListener("replacestate", handler);
      return () => {
        window.removeEventListener("popstate", handler);
        window.removeEventListener("pushstate", handler);
        window.removeEventListener("replacestate", handler);
      };
    }
  }, []);

  if (message)
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center text-teal-700 font-semibold text-lg">
            {message}
          </div>
        </main>
        <Footer />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="flex gap-8 w-full max-w-4xl">
          <Sidebar active={menu} onMenuChange={setMenu} />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-teal-700 mb-6 text-center">
              Dashboard Member
            </h1>
            {menu === "riwayat" ? (
              <>
                <h2 className="text-xl font-bold text-teal-600 mb-4 text-center">
                  Riwayat Transaksi
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
                          <div className="text-gray-700">
                            Qty: {trx.quantity}
                          </div>
                          <div className="text-gray-600">
                            Tanggal: {new Date(trx.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-teal-600 mb-4 text-center">
                  Edit Profil Member
                </h2>
                <form
                  className="grid grid-cols-1 gap-4 max-w-md mx-auto bg-gray-50 p-6 rounded-xl shadow"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // TODO: update profile API
                    localStorage.setItem(
                      "user",
                      JSON.stringify({ ...user, ...profile })
                    );
                    Swal.fire({
                      icon: "success",
                      title: "Profil berhasil diupdate!",
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
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
