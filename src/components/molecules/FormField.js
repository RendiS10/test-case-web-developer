import Input from "../atoms/Input";

export default function FormField({ label, ...props }) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold text-gray-700">{label}</label>
      <Input {...props} />
    </div>
  );
}
