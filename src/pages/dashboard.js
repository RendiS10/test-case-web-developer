import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

  if (message)
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center text-teal-700 font-semibold text-lg">
            {message}
          </div>
        </main>
        <Footer />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl">
          <h1 className="text-2xl font-bold text-teal-700 mb-6 text-center">
            Dashboard Member
          </h1>
          <h2 className="text-xl font-bold text-teal-600 mb-4 text-center">
            Riwayat Transaksi
          </h2>
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-center">Belum ada transaksi.</p>
          ) : (
            <ul className="space-y-4">
              {transactions.map((trx) => (
                <li
                  key={trx.id}
                  className="border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="font-bold text-teal-800">
                      {trx.product.name}
                    </div>
                    <div className="text-gray-700">Qty: {trx.quantity}</div>
                    <div className="text-gray-600">
                      Tanggal: {new Date(trx.createdAt).toLocaleString()}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
