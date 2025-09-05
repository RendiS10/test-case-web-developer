export default function TransactionHistory({ transactions }) {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return (
      <p className="text-gray-500 text-center">
        Belum ada transaksi atau data tidak valid.
      </p>
    );
  }
  const grouped = Object.entries(
    transactions.reduce((acc, trx) => {
      const userId = trx.user.id;
      if (!acc[userId]) acc[userId] = { user: trx.user, list: [] };
      acc[userId].list.push(trx);
      return acc;
    }, {})
  );
  return (
    <div className="space-y-8">
      {grouped.map(([userId, { user, list }]) => (
        <div key={userId} className="border rounded-2xl p-4">
          <div className="font-bold text-teal-700 mb-2">
            {user.name} <span className="text-gray-500">({user.email})</span>
          </div>
          <ul className="space-y-2">
            {list.map((trx) => (
              <li key={trx.id} className="border rounded-xl p-3">
                <div className="font-semibold text-teal-800">
                  {trx.product.name}
                </div>
                <div className="text-gray-700">Qty: {trx.quantity}</div>
                <div className="text-gray-600">
                  Tanggal: {new Date(trx.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
