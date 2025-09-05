import FormField from "../molecules/FormField";
import Button from "../atoms/Button";

export default function ProfileForm({
  profile,
  onChange,
  onSubmit,
  disabledEmail,
}) {
  return (
    <form
      className="flex flex-col gap-4 w-full max-w-md mx-auto bg-white p-6 rounded-2xl shadow-xl border border-teal-100"
      onSubmit={onSubmit}
      style={{ minWidth: 280 }}
    >
      <h2 className="text-xl font-bold text-teal-700 mb-2 text-center">
        Edit Profil Admin
      </h2>
      <FormField
        label="Nama"
        name="name"
        value={profile.name}
        onChange={onChange}
        className="w-full"
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        value={profile.email}
        onChange={onChange}
        readOnly={disabledEmail}
        className="w-full bg-gray-100 cursor-not-allowed"
      />
      <FormField
        label="Bio"
        name="bio"
        value={profile.bio}
        onChange={onChange}
        className="w-full"
      />
      <FormField
        label="Alamat"
        name="address"
        value={profile.address}
        onChange={onChange}
        className="w-full"
      />
      <FormField
        label="URL Avatar"
        name="avatar"
        value={profile.avatar}
        onChange={onChange}
        className="w-full"
      />
      <Button
        type="submit"
        className="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded font-bold shadow mt-2"
      >
        Simpan Perubahan
      </Button>
    </form>
  );
}
