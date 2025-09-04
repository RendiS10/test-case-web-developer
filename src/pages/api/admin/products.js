import { PrismaClient } from "../../generated/prisma";

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
    const { name, price, description, image } = req.body;
    if (!name || !price || !description) {
      return res.status(400).json({ error: "Semua field wajib diisi." });
    }
    try {
      const product = await prisma.product.create({
        data: { name, price: Number(price), description, image },
      });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: "Gagal menambah produk." });
    }
  } else if (req.method === "PUT") {
    // Edit produk
    const { id, name, price, description, image } = req.body;
    if (!id || !name || !price || !description) {
      return res.status(400).json({ error: "Semua field wajib diisi." });
    }
    try {
      const product = await prisma.product.update({
        where: { id: Number(id) },
        data: { name, price: Number(price), description, image },
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
      res.status(500).json({ error: "Gagal menghapus produk." });
    }
  } else {
    res.status(405).json({ error: "Metode tidak diizinkan." });
  }
}
