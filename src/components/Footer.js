export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-4 mt-12 border-t">
      <div className="container mx-auto text-center px-4">
        &copy; {new Date().getFullYear()} Toko Obat & Vitamin Kucing. All rights
        reserved.
      </div>
    </footer>
  );
}
