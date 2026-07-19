import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import AnalyticsCard from "../analytics/AnalyticsCard";
import { CHART_CONFIG } from "../../constants/chart";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

export default function PriorityChart({ data }: Props) {
  return (
    <AnalyticsCard
      title="Priority Distribution"
      subtitle="Tasks grouped by priority"
    >
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={CHART_CONFIG.margin}
          >
            <CartesianGrid {...CHART_CONFIG.grid} />

            <XAxis
              dataKey="name"
              tick={CHART_CONFIG.tick}
            />

            <YAxis
              allowDecimals={false}
              tick={CHART_CONFIG.tick}
            />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#5B5FEF"
              radius={CHART_CONFIG.bar.radius}
              animationDuration={CHART_CONFIG.animation.duration}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AnalyticsCard>
  );
}