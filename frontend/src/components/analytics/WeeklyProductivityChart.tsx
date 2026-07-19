import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import AnalyticsCard from "./AnalyticsCard";
import ChartTooltip from "./ChartTooltip";
import { CHART_CONFIG } from "../../constants/chart";
import { getYAxisConfig } from "../../utils/chartUtils";

interface Props {
  data: {
    day: string;
    completed: number;
  }[];
}

export default function WeeklyProductivityChart({
  data,
}: Props) {
  const yAxis = getYAxisConfig(
    data.map((d) => d.completed)
  );

  return (
    <AnalyticsCard
      title="Weekly Productivity"
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
              domain={yAxis.domain}
              ticks={yAxis.ticks}
              allowDecimals={false}
              tick={CHART_CONFIG.tick}
            />

            <Tooltip content={<ChartTooltip />} />

            <Line
              type="monotone"
              dataKey="completed"
              stroke="#4F46E5"
              strokeWidth={CHART_CONFIG.line.strokeWidth}
              dot={{
                r: 5,
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