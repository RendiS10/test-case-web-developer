import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(id ? `/api/products/${id}` : null, fetcher);

  if (error) return <div>Gagal memuat detail produk.</div>;
  if (!data) return <div>Memuat...</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>Harga: Rp{data.price}</p>
      <p>{data.description}</p>
      {data.image && (
        <img src={data.image} alt={data.name} style={{ maxWidth: 300 }} />
      )}
    </div>
  );
}
