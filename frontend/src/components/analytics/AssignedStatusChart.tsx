import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

import ChartTooltip from "./ChartTooltip";
import AnalyticsCard from "./AnalyticsCard";
import { CHART_CONFIG } from "../../constants/chart";

interface AssignedStatusData {
  status: string;
  tasks: number;
}

interface Props {
  data: AssignedStatusData[];
}

export default function AssignedStatusChart({ data }: Props) {
  return (
    <AnalyticsCard
      title="Assigned Tasks"
      subtitle="Tasks assigned to you by status"
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
              fill="#10B981"
              radius={CHART_CONFIG.bar.radius}
              animationDuration={CHART_CONFIG.animation.duration}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AnalyticsCard>
  );
}