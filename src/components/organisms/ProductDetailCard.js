export default function ProductDetailCard({
  data,
  user,
  loading,
  onBuy,
  onBack,
}) {
  return (
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
        onClick={onBack}
      >
        &larr; Kembali ke Daftar Produk
      </button>
      {user && user.role === "MEMBER" && (
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg font-bold shadow transition mb-2"
          disabled={loading || data.stock <= 0}
          onClick={onBuy}
        >
          {data.stock > 0
            ? loading
              ? "Memproses..."
              : "Beli Produk"
            : "Stok Habis"}
        </button>
      )}
      {!user && (
        <div className="mt-4 text-center">
          <p className="text-red-500 font-semibold mb-2">
            Silakan login untuk membeli produk ini.
          </p>
          <button
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded font-bold shadow"
            onClick={() => onBack("/login")}
          >
            Login untuk Membeli
          </button>
        </div>
      )}
      {data.stock !== undefined && (
        <div className="text-sm text-gray-500 mt-2">
          Stok tersedia: {data.stock}
        </div>
      )}
    </div>
  );
}
