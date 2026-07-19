import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

import AnalyticsCard from "./AnalyticsCard";
import ChartTooltip from "./ChartTooltip";
import { CHART_CONFIG } from "../../constants/chart";
import { getYAxisConfig } from "../../utils/chartUtils";

interface WeeklyAssignedVsCreatedData {
  day: string;
  assigned: number;
  created: number;
}

interface Props {
  data: WeeklyAssignedVsCreatedData[];
}

const AssignedDot = (props: any) => {
  const { cx, cy, payload } = props;

  if (cx == null || cy ==null) return null;

  const overlap = payload.assigned === payload.created;

  return (
    <circle
      cx={overlap ? cx - 4 : cx}
      cy={cy}
      r={5}
      fill="#10B981"
      stroke="white"
      strokeWidth={2}
    />
  );
};

const CreatedDot = (props: any) => {
  const { cx, cy, payload } = props;

  if (cx == null || cy == null) return null;

  const overlap = payload.assigned === payload.created;

  return (
    <circle
      cx={overlap ? cx + 4 : cx}
      cy={cy}
      r={5}
      fill="#6366F1"
      stroke="white"
      strokeWidth={2}
    />
  );
};

export default function WeeklyAssignedVsCreated({
  data,
}: Props) {
  const yAxis = getYAxisConfig([
    ...data.map((d) => d.assigned),
    ...data.map((d) => d.created),
  ]);

  return (
    <AnalyticsCard
      title="Weekly Performance"
      subtitle="Assigned vs created tasks during the last 7 days"
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
              interval={0}
            />

            <YAxis
              domain={yAxis.domain}
              ticks={yAxis.ticks}
              allowDecimals={false}
              tick={CHART_CONFIG.tick}
            />

            <Tooltip content={<ChartTooltip />} />

            <Legend />

            <Line
              type="monotone"
              dataKey="assigned"
              stroke="#10B981"
              strokeWidth={3}
              dot={<AssignedDot />}
              activeDot={{ r: 7 }}
              name="Assigned"
              animationDuration={CHART_CONFIG.animation.duration}
            />

            <Line
              type="monotone"
              dataKey="created"
              stroke="#6366F1"
              strokeWidth={3}
              dot={<CreatedDot />}
              activeDot={{ r: 7 }}
              name="Created"
              animationDuration={CHART_CONFIG.animation.duration}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </AnalyticsCard>
  );
}