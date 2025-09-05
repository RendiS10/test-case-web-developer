export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className={
        "px-4 py-2 rounded font-bold shadow " + (props.className || "")
      }
    >
      {children}
    </button>
  );
}
