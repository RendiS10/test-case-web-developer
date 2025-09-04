import { useRouter } from "next/router";
import useSWR from "swr";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(id ? `/api/products/${id}` : null, fetcher);

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
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
          {data.image && (
            <img
              src={data.image}
              alt={data.name}
              className="w-40 h-40 object-cover rounded-xl mb-6 shadow"
            />
          )}
          <h1 className="text-2xl font-bold text-teal-700 mb-2 text-center">
            {data.name}
          </h1>
          <p className="text-teal-600 font-bold text-lg mb-2">
            Harga: Rp{data.price}
          </p>
          <p className="text-gray-600 text-center mb-6">{data.description}</p>
          <button
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg font-bold shadow transition mb-2"
            onClick={() => router.push("/")}
          >
            &larr; Kembali ke Daftar Produk
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
