export function Avatar({ name }: { name: string }) {
  return (
    <div className="text-slate-100 rounded-full bg-slate-600 px-4 flex items-center justify-center">
      <p className="">{name.substring(0, 2).toUpperCase()}</p>
    </div>
  );
}
