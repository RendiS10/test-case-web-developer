export default function Input({ ...props }) {
  return (
    <input
      {...props}
      className={
        "border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 " +
        (props.className || "")
      }
    />
  );
}
