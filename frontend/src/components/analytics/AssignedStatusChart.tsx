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

const mockData = [
  { status: "To Do", tasks: 4 },
  { status: "In Progress", tasks: 3 },
  { status: "Review", tasks: 2 },
  { status: "Completed", tasks: 6 },
];

export default function AssignedStatusChart() {
  return (
    <AnalyticsCard
      title="Assigned Tasks"
      subtitle="Tasks assigned to you by status"
    >
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={mockData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis dataKey="status" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="tasks"
              fill="#6366F1"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AnalyticsCard>
  );
}