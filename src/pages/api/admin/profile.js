import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "ID wajib diisi." });
    }
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });
      if (!user) {
        return res.status(404).json({ error: "Admin tidak ditemukan." });
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: "Gagal mengambil data admin." });
    }
  } else if (req.method === "PUT") {
    const { id, name, email, bio, address, avatar } = req.body;
    if (!id || !name || !email) {
      return res
        .status(400)
        .json({ error: "ID, nama, dan email wajib diisi." });
    }
    try {
      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email, bio, address, avatar },
      });
      res.status(200).json({
        message: "Profil admin berhasil diupdate.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          bio: user.bio,
          address: user.address,
          avatar: user.avatar,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Gagal update profil admin." });
    }
  } else {
    res.status(405).json({ error: "Metode tidak diizinkan." });
  }
}
