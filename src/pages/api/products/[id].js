import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  if (method === "GET") {
    try {
      const product = await prisma.product.findUnique({
        where: { id: Number(id) },
      });
      if (!product)
        return res.status(404).json({ error: "Produk tidak ditemukan." });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: "Gagal mengambil detail produk." });
    }
  } else {
    res.status(405).json({ error: "Metode tidak diizinkan." });
  }
}
