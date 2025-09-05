import FormField from "../molecules/FormField";
import Button from "../atoms/Button";

export default function RegisterForm({ form, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 mb-4">
      <FormField
        label="Nama"
        name="name"
        value={form.name}
        onChange={onChange}
        required
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={onChange}
        required
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={onChange}
        required
      />
      <Button
        type="submit"
        className="bg-teal-600 hover:bg-teal-700 text-white"
      >
        Daftar
      </Button>
    </form>
  );
}
