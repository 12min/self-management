interface HeaderProps {
  title: string;
  subtitle: string;
  owner: string;
  week: string;
  quarter: string;
  source?: string;
}

export function Header({ title, subtitle, owner, week, quarter, source }: HeaderProps) {
  return (
    <div className="bg-gradient-to-br from-red-900 to-red-600 text-white p-8 rounded-2xl mb-6">
      <h1 className="text-2xl font-bold mb-1">{title}</h1>
      <div className="opacity-85 text-sm">{subtitle}</div>
      <div className="flex gap-6 mt-4 text-xs opacity-90 flex-wrap">
        <span className="flex items-center gap-1.5">Owner: {owner}</span>
        <span className="flex items-center gap-1.5">{week}</span>
        <span className="flex items-center gap-1.5">{quarter}</span>
        {source && <span className="flex items-center gap-1.5">Source: {source}</span>}
      </div>
    </div>
  );
}
