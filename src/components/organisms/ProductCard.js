export default function ProductCard({ product, onDetail }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center">
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
      <p className="text-teal-600 font-bold mb-1">Harga: Rp{product.price}</p>
      <p className="text-gray-600 text-sm mb-4 text-center">
        {product.description}
      </p>
      <button
        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded font-bold shadow"
        onClick={onDetail}
      >
        Lihat Detail
      </button>
    </div>
  );
}
