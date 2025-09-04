import { useEffect, useState } from "react";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setMessage("Silakan login terlebih dahulu.");
      return;
    }
    fetch(`/api/transactions?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setMessage(data.error);
        else setTransactions(data);
      });
  }, []);

  if (message) return <div>{message}</div>;

  return (
    <div>
      <h1>Dashboard Member</h1>
      <h2>Riwayat Transaksi</h2>
      {transactions.length === 0 ? (
        <p>Belum ada transaksi.</p>
      ) : (
        <ul>
          {transactions.map((trx) => (
            <li key={trx.id}>
              {trx.product.name} - Qty: {trx.quantity} - Tanggal:{" "}
              {new Date(trx.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
