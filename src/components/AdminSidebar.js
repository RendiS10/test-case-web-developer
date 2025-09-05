import AdminSidebarNav from "./organisms/AdminSidebarNav";

export default function AdminSidebar({ active, onMenuChange }) {
  return (
    <aside className="bg-white shadow-lg rounded-2xl p-6 w-64 min-h-[300px] flex flex-col gap-4">
      <AdminSidebarNav active={active} onMenuChange={onMenuChange} />
    </aside>
  );
}
