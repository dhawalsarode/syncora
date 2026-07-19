import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export default function ChartTooltip({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg dark:border-slate-700 dark:bg-slate-900">
      {label && (
        <p className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">
          {label}
        </p>
      )}

      <div className="space-y-1">
        {payload.map((entry) => (
          <div
            key={entry.dataKey}
            className="flex items-center justify-between gap-6"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: entry.color,
                }}
              />

              <span className="text-sm text-slate-600 dark:text-slate-300">
                {entry.name}
              </span>
            </div>

            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}