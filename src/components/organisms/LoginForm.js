import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
export default function LoginForm({ form, onChange, onSubmit, message }) {
  return (
    <div className="w-full px-2 sm:px-4">
      <h1 className="text-2xl font-bold text-teal-700 mb-6 text-center tracking-tight">
        Login Member
      </h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 mb-2 w-full"
        style={{ maxWidth: 400, margin: "0 auto" }}
      >
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
          Login
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
        <span className="text-gray-600">Belum punya akun? </span>
        <a
          href="/register"
          className="text-teal-600 hover:underline font-semibold"
        >
          Daftar di sini
        </a>
      </div>
    </div>
  );
}
