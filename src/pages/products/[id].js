import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import useSWR from "swr";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductDetailCard from "../../components/organisms/ProductDetailCard";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, mutate } = useSWR(
    id ? `/api/products/${id}` : null,
    fetcher
  );
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user") || "null"));
    }
  }, []);

  if (error)
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-red-500 text-lg font-semibold">
            Gagal memuat detail produk.
          </div>
        </main>
        <Footer />
      </div>
    );
  if (!data)
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-gray-500 text-lg font-semibold">Memuat...</div>
        </main>
        <Footer />
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-10 px-4">
        <ProductDetailCard
          data={data}
          user={user}
          loading={loading}
          onBuy={async () => {
            setLoading(true);
            const res = await fetch("/api/transactions", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: user.id,
                productId: data.id,
                quantity: 1,
              }),
            });
            const result = await res.json();
            setLoading(false);
            if (result.success) {
              Swal.fire({
                icon: "success",
                title: "Pembelian Berhasil",
                text: "Produk berhasil dibeli!",
                timer: 1500,
                showConfirmButton: false,
              });
              mutate(); // refresh data produk
            } else {
              Swal.fire({
                icon: "error",
                title: "Pembelian Gagal",
                text: result.error || "Gagal membeli produk.",
              });
            }
          }}
          onBack={() => router.push("/")}
        />
      </main>
      <Footer />
    </div>
  );
}
