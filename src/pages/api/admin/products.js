import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Ambil semua produk
    try {
      const products = await prisma.product.findMany();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Gagal mengambil data produk." });
    }
  } else if (req.method === "POST") {
    // Tambah produk baru
    const { name, price, description, image, stock } = req.body;
    if (!name || !price || !description) {
      return res.status(400).json({ error: "Semua field wajib diisi." });
    }
    try {
      const product = await prisma.product.create({
        data: {
          name,
          price: Number(price),
          description,
          image,
          stock: Number(stock),
        },
      });
      res.status(201).json(product);
    } catch (error) {
      console.error("CREATE PRODUCT ERROR:", error);
      res
        .status(500)
        .json({ error: error.message || "Gagal menambah produk." });
    }
  } else if (req.method === "PUT") {
    // Edit produk
    const { id, name, price, description, image, stock } = req.body;
    if (!id || !name || !price || !description) {
      return res.status(400).json({ error: "Semua field wajib diisi." });
    }
    try {
      const product = await prisma.product.update({
        where: { id: Number(id) },
        data: {
          name,
          price: Number(price),
          description,
          image,
          stock: Number(stock),
        },
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: "Gagal mengedit produk." });
    }
  } else if (req.method === "DELETE") {
    // Hapus produk
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "ID produk wajib diisi." });
    }
    try {
      await prisma.product.delete({ where: { id: Number(id) } });
      res.status(200).json({ message: "Produk berhasil dihapus." });
    } catch (error) {
      console.error("DELETE PRODUCT ERROR:", error);
      if (error.code === "P2025") {
        res.status(404).json({ error: "Produk tidak ditemukan." });
      } else if (
        error.code === "ER_ROW_IS_REFERENCED_2" ||
        (error.message && error.message.includes("foreign key constraint"))
      ) {
        res.status(400).json({
          error:
            "Produk tidak bisa dihapus karena masih ada riwayat pembelian.",
        });
      } else {
        res
          .status(500)
          .json({ error: error.message || "Gagal menghapus produk." });
      }
    }
  } else {
    res.status(405).json({ error: "Metode tidak diizinkan." });
  }
}
