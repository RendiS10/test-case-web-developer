import FormField from "../molecules/FormField";
import Button from "../atoms/Button";

export default function ProductForm({
  form,
  onChange,
  onSubmit,
  editId,
  onCancel,
  message,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 w-full max-w-md mx-auto bg-white p-6 rounded-2xl shadow-xl border border-teal-100"
      style={{ minWidth: 280 }}
    >
      <h2 className="text-xl font-bold text-teal-700 mb-2 text-center">
        {editId ? "Edit Produk" : "Tambah Produk"}
      </h2>
      <FormField
        label="Nama Produk"
        name="name"
        value={form.name}
        onChange={onChange}
        required
        className="w-full"
      />
      <FormField
        label="Harga Produk"
        name="price"
        type="number"
        value={form.price}
        onChange={onChange}
        required
        className="w-full"
      />
      <FormField
        label="Deskripsi Produk"
        name="description"
        value={form.description}
        onChange={onChange}
        className="w-full"
      />
      <FormField
        label="URL Gambar"
        name="image"
        value={form.image}
        onChange={onChange}
        className="w-full"
      />
      <FormField
        label="Stok"
        name="stock"
        type="number"
        value={form.stock}
        onChange={onChange}
        required
        className="w-full"
      />
      {message && (
        <div className="w-full flex justify-center">
          <p className="text-center text-teal-600 font-semibold mt-2 max-w-xs">
            {message}
          </p>
        </div>
      )}
      <div className="flex gap-4 mt-2">
        <Button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded font-bold shadow"
        >
          {editId ? "Simpan Edit" : "Simpan Produk"}
        </Button>
        {editId && (
          <Button
            type="button"
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded font-bold shadow"
            onClick={onCancel}
          >
            Batal
          </Button>
        )}
      </div>
    </form>
  );
}
