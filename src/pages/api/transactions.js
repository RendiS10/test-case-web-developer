import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "User ID wajib diisi." });
    }
    try {
      // Dummy: ambil transaksi user dari database
      const transactions = await prisma.transaction.findMany({
        where: { userId: Number(userId) },
        include: { product: true },
      });
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Gagal mengambil riwayat transaksi." });
    }
  } else {
    res.status(405).json({ error: "Metode tidak diizinkan." });
  }
}
