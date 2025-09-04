import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Semua field wajib diisi." });
    }
    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "Email sudah terdaftar." });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });
      res
        .status(201)
        .json({
          message: "Registrasi berhasil.",
          user: { id: user.id, name: user.name, email: user.email },
        });
    } catch (error) {
      res.status(500).json({ error: "Gagal registrasi." });
    }
  } else {
    res.status(405).json({ error: "Metode tidak diizinkan." });
  }
}
