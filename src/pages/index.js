import useSWR from "swr";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/organisms/Footer";
import ProductCard from "../components/organisms/ProductCard";

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
              <ProductCard
                key={product.id}
                product={product}
                onDetail={() => router.push(`/products/${product.id}`)}
              />
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
