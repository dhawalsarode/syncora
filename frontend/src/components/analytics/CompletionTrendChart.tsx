import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import AnalyticsCard from "./AnalyticsCard";
import ChartTooltip from "./ChartTooltip";
import { CHART_CONFIG } from "../../constants/chart";

interface Props {
  data: {
    day: string;
    completed: number;
  }[];
}

export default function CompletionTrendChart({
  data,
}: Props) {
  return (
    <AnalyticsCard
      title="Completion Trend"
      subtitle="Tasks completed during the last 7 days"
    >
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={CHART_CONFIG.margin}
          >
            <CartesianGrid {...CHART_CONFIG.grid} />

            <XAxis
              dataKey="day"
              tick={CHART_CONFIG.tick}
            />

            <YAxis
              allowDecimals={false}
              tick={CHART_CONFIG.tick}
            />

            <Tooltip content={<ChartTooltip />} />

            <Line
              type="monotone"
              dataKey="completed"
              stroke="#4F46E5"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#4F46E5",
              }}
              activeDot={{
                r: 7,
              }}
              animationDuration={CHART_CONFIG.animation.duration}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </AnalyticsCard>
  );
}