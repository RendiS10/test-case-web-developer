export default function Avatar({ src, alt, size = 32 }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover`}
      style={{ width: size, height: size }}
    />
  );
}
