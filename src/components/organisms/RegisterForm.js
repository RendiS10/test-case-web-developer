import FormField from "../molecules/FormField";
import Button from "../atoms/Button";

export default function RegisterForm({ form, onChange, onSubmit, message }) {
  return (
    <div className="w-full px-2 sm:px-4">
      <h1 className="text-2xl font-bold text-teal-700 mb-6 text-center tracking-tight">
        Registrasi Member
      </h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 mb-2 w-full"
        style={{ maxWidth: 400, margin: "0 auto" }}
      >
        <FormField
          label="Nama"
          name="name"
          value={form.name}
          onChange={onChange}
          required
          className="w-full"
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          required
          className="w-full"
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          required
          className="w-full"
        />
        <Button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded font-bold shadow"
        >
          Daftar
        </Button>
      </form>
      {message && (
        <div className="w-full flex justify-center">
          <p className="text-center text-teal-600 font-semibold mt-4 max-w-xs">
            {message}
          </p>
        </div>
      )}
      <div className="text-center mt-4">
        <span className="text-gray-600">Sudah punya akun? </span>
        <a
          href="/login"
          className="text-teal-600 hover:underline font-semibold"
        >
          Login di sini
        </a>
      </div>
    </div>
  );
}
