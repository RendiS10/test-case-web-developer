import MemberSidebarNav from "./organisms/MemberSidebarNav";

export default function Sidebar({ active, onMenuChange }) {
  return (
    <aside className="bg-white shadow-lg rounded-2xl p-6 w-64 min-h-[300px] flex flex-col gap-4">
      <MemberSidebarNav active={active} onMenuChange={onMenuChange} />
    </aside>
  );
}
