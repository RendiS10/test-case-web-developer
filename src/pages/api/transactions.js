import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId, all } = req.query;
    try {
      let transactions = [];
      if (all === "1") {
        // Untuk admin: ambil semua transaksi, sertakan relasi user dan product
        transactions = await prisma.transaction.findMany({
          include: { user: true, product: true },
        });
      } else if (userId) {
        // Untuk user: ambil transaksi milik user
        transactions = await prisma.transaction.findMany({
          where: { userId: Number(userId) },
          include: { product: true },
        });
      } else {
        return res.status(400).json({ error: "User ID wajib diisi." });
      }
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Gagal mengambil riwayat transaksi." });
    }
  } else if (req.method === "POST") {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
      return res.status(400).json({ error: "Data pembelian tidak lengkap." });
    }
    try {
      const product = await prisma.product.findUnique({
        where: { id: Number(productId) },
      });
      if (!product || product.stock < quantity) {
        return res.status(400).json({ error: "Stok produk tidak cukup." });
      }
      // Kurangi stok produk
      await prisma.product.update({
        where: { id: Number(productId) },
        data: { stock: product.stock - quantity },
      });
      // Buat transaksi
      await prisma.transaction.create({
        data: {
          userId: Number(userId),
          productId: Number(productId),
          quantity: Number(quantity),
          status: "SUCCESS",
        },
      });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Gagal memproses pembelian." });
    }
  } else {
    res.status(405).json({ error: "Metode tidak diizinkan." });
  }
}
