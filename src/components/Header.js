export default function Header() {
  return (
    <header className="bg-teal-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Toko Obat & Vitamin Kucing</h1>
        <nav className="space-x-4">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/login" className="hover:underline">
            Login
          </a>
          <a href="/register" className="hover:underline">
            Register
          </a>
        </nav>
      </div>
    </header>
  );
}
