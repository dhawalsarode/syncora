import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

import AnalyticsCard from "./AnalyticsCard";
import ChartTooltip from "./ChartTooltip";
import { CHART_CONFIG } from "../../constants/chart";

interface CreatedStatusData {
  status: string;
  tasks: number;
}

interface Props {
  data: CreatedStatusData[];
}

export default function CreatedStatusChart({ data }: Props) {
  return (
    <AnalyticsCard
      title="Created Tasks"
      subtitle="Tasks created by you by status"
    >
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={CHART_CONFIG.margin}
          >
            <CartesianGrid {...CHART_CONFIG.grid} />

            <XAxis
              dataKey="status"
              tick={CHART_CONFIG.tick}
              interval={0}
            />

            <YAxis
              allowDecimals={false}
              tick={CHART_CONFIG.tick}
            />

            <Tooltip content={<ChartTooltip />} />

            <Bar
              dataKey="tasks"
              fill="#6366F1"
              radius={CHART_CONFIG.bar.radius}
              animationDuration={CHART_CONFIG.animation.duration}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AnalyticsCard>
  );
}