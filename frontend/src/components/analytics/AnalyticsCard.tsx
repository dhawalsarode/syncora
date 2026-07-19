import { ReactNode } from "react";

type AnalyticsCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function AnalyticsCard({
  title,
  subtitle,
  children,
}: AnalyticsCardProps) {
  return (
    <section className="flex h-[380px] flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-5 shrink-0">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      {/* Chart */}
      <div className="min-h-0 flex-1">
        {children}
      </div>
    </section>
  );
}