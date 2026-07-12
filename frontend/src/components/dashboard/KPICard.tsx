import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  color: string;
  icon: LucideIcon;
}

export default function KPICard({
  title,
  value,
  subtitle,
  color,
  icon: Icon,
}: KPICardProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        dark:border-slate-700
        bg-white
        dark:bg-slate-900
        p-5
        shadow-sm
        hover:shadow-md
        transition-all
      "
    >
      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-400">
              {subtitle}
            </p>
          )}

        </div>

        <div className={`${color} h-12 w-12 shrink-0 rounded-xl flex items-center justify-center`}>
          <Icon
              size={22}
              strokeWidth={2.2}
              className="text-white"
            />
        </div>
      </div>
    </div>
  );
}