import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MemberSidebarNav from "../components/organisms/MemberSidebarNav";
import MemberTransactionList from "../components/organisms/MemberTransactionList";
import MemberProfileForm from "../components/organisms/MemberProfileForm";

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
          <MemberSidebarNav active={menu} onMenuChange={setMenu} />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-teal-700 mb-6 text-center">
              Dashboard Member
            </h1>
            {menu === "riwayat" ? (
              <MemberTransactionList transactions={transactions} />
            ) : (
              <MemberProfileForm
                profile={profile}
                onChange={(e) =>
                  setProfile({ ...profile, [e.target.name]: e.target.value })
                }
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!user) return;
                  try {
                    const res = await fetch("/api/admin/profile", {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        id: user.id,
                        name: profile.name,
                        email: profile.email,
                        bio: profile.bio,
                        address: profile.address,
                        avatar: profile.avatar,
                      }),
                    });
                    const data = await res.json();
                    if (data.user) {
                      localStorage.setItem("user", JSON.stringify(data.user));
                      setProfile({
                        name: data.user.name,
                        email: data.user.email,
                        bio: data.user.bio || "",
                        address: data.user.address || "",
                        avatar: data.user.avatar || "",
                      });
                      Swal.fire({
                        icon: "success",
                        title: "Profil berhasil diupdate!",
                        timer: 1500,
                        showConfirmButton: false,
                      });
                    } else {
                      Swal.fire({
                        icon: "error",
                        title: "Gagal update profil",
                        text: data.error || "Terjadi kesalahan.",
                      });
                    }
                  } catch (err) {
                    Swal.fire({
                      icon: "error",
                      title: "Gagal update profil",
                      text: err.message,
                    });
                  }
                }}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
