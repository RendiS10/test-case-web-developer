export default function ProductList({ products, onEdit, onDelete }) {
  return (
    <ul className="space-y-6">
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <li
            key={product.id}
            className="border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex-1">
              <div className="font-bold text-lg text-teal-800">
                {product.name}
              </div>
              <div className="text-teal-600 font-bold">Rp{product.price}</div>
              <div className="text-gray-600 mb-2">{product.description}</div>
              <div className="text-gray-500 mb-2">Stok: {product.stock}</div>
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded font-bold shadow"
                  onClick={() => onEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-bold shadow"
                  onClick={() => onDelete(product.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
            {product.image && (
              <div className="flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded shadow"
                />
              </div>
            )}
          </li>
        ))
      ) : (
        <li className="text-red-500">Gagal memuat produk.</li>
      )}
    </ul>
  );
}
