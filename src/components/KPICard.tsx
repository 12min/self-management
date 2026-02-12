import type { StatusColor } from '../types';

interface KPICardProps {
  label: string;
  value: string;
  detail: string;
  color: StatusColor;
  valueSize?: 'normal' | 'small';
}

export function KPICard({ label, value, detail, color, valueSize = 'normal' }: KPICardProps) {
  return (
    <div className="bg-white rounded-xl p-5 border border-border shadow-sm">
      <div className="text-xs uppercase tracking-wide text-gray font-semibold">
        {label}
      </div>
      <div
        className={`font-bold my-1 ${valueSize === 'small' ? 'text-xl' : 'text-3xl'}`}
        style={{ color: `var(--${color})` }}
      >
        {value}
      </div>
      <div className="text-sm text-gray">
        {detail}
      </div>
    </div>
  );
}
