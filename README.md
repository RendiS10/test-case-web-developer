# 🐾 KucingCare - Web Produk Obat & Vitamin Kucing

Website modern berbasis Next.js & Prisma untuk katalog produk, transaksi, dan manajemen member/admin. Menggunakan atomic design untuk struktur komponen yang rapi dan maintainable.

---

## 🚀 Fitur Utama

- **Landing Page Produk**: Daftar produk obat & vitamin kucing.
- **Detail Produk**: Info lengkap produk (nama, harga, deskripsi, gambar).
- **Registrasi & Login Member**: Daftar dan login sebagai member.
- **Dashboard Member**: Riwayat transaksi, edit profil.
- **Admin Panel**: CRUD produk, riwayat penjualan, edit profil admin.
- **Atomic Design**: Komponen UI terstruktur (atoms, molecules, organisms).

---

## 📂 Struktur Folder

```
src/
	components/
		atoms/        # Komponen dasar (Button, Input, dll)
		molecules/    # Gabungan atom (FormField, Card, dll)
		organisms/    # Bagian besar UI (LoginForm, ProductList, Sidebar, dll)
	pages/          # Halaman utama (index, login, register, dashboard, admin, dll)
	app/            # Global style & layout
```

---

## 🛠️ Cara Instalasi & Menjalankan Lokal

1. Clone repo:
   ```bash
   git clone https://github.com/RendiS10/test-case-web-developer.git
   cd test-case-web-developer
   ```
2. Install dependencies:
   ```bash
   npm install
   # atau
   yarn install
   ```
3. Jalankan server development:
   ```bash
   npm run dev
   # atau
   yarn dev
   ```
4. Buka di browser: [http://localhost:3000](http://localhost:3000)

---

## 👤 Cara Penggunaan

- **Member**
  - Registrasi di `/register`, login di `/login`.
  - Setelah login, akses dashboard di `/dashboard` untuk melihat riwayat transaksi & edit profil.
- **Admin**
  - Login sebagai admin (role: ADMIN), akses panel di `/admin` untuk CRUD produk, riwayat penjualan, dan edit profil admin.

---

## 🌐 Deploy ke Vercel

1. Push semua perubahan ke GitHub.
2. Buka [Vercel](https://vercel.com), login dengan akun GitHub.
3. Klik "New Project", pilih repo ini.
4. Ikuti instruksi, klik "Deploy".
5. Tambahkan environment variable (misal: `DATABASE_URL`) jika pakai database.
6. Tunggu proses build & deploy selesai, dapatkan URL aplikasi online.

Referensi: [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)

---

## 📄 Dokumentasi Fitur Halaman

- **Landing Page Produk**: `/` - Daftar produk
- **Detail Produk**: `/products/[id]` - Info lengkap produk
- **Registrasi Member**: `/register` - Daftar member baru
- **Login Member**: `/login` - Login member
- **Dashboard Member**: `/dashboard` - Riwayat transaksi, edit profil
- **Admin Panel**: `/admin` - CRUD produk, riwayat penjualan, edit profil admin

---

## 🔗 Teknologi

- [Next.js](https://nextjs.org)
- [Prisma ORM](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [SweetAlert2](https://sweetalert2.github.io/)

```

```
