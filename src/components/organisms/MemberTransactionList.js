export default function MemberTransactionList({ transactions }) {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return <p className="text-gray-500 text-center">Belum ada transaksi.</p>;
  }
  return (
    <ul className="space-y-4">
      {transactions.map((trx) => (
        <li
          key={trx.id}
          className="border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <div className="flex-1">
            <div className="font-bold text-teal-800">{trx.product.name}</div>
            <div className="text-gray-700">Qty: {trx.quantity}</div>
            <div className="text-gray-600">
              Tanggal: {new Date(trx.createdAt).toLocaleString()}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
