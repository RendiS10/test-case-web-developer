import useSWR from "swr";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function LandingPage() {
  const { data, error } = useSWR("/api/products", fetcher);
  const router = useRouter();

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-teal-700">
          Daftar Produk Obat & Vitamin Kucing
        </h1>
        {error && (
          <div className="text-red-500 text-center">Gagal memuat produk.</div>
        )}
        {!data ? (
          <div className="text-center text-gray-500">Memuat...</div>
        ) : Array.isArray(data) ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {data.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold mb-2 text-teal-800">
                  {product.name}
                </h2>
                <p className="text-teal-600 font-bold mb-1">
                  Harga: Rp{product.price}
                </p>
                <p className="text-gray-600 text-sm mb-4 text-center">
                  {product.description}
                </p>
                <button
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded font-bold shadow"
                  onClick={() => router.push(`/products/${product.id}`)}
                >
                  Lihat Detail
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Tidak ada produk tersedia.
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
