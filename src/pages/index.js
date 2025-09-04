import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function LandingPage() {
  const { data, error } = useSWR("/api/products", fetcher);

  if (error) return <div>Gagal memuat produk.</div>;
  if (!data) return <div>Memuat...</div>;

  return (
    <div>
      <h1>Daftar Produk Obat & Vitamin Kucing</h1>
      <ul>
        {data.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>Harga: Rp{product.price}</p>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
