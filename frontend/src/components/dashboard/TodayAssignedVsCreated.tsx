import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

import AnalyticsCard from "../analytics/AnalyticsCard";

const mockData = [
  { hour: "12 AM", assigned: 0, created: 0 },
  { hour: "3 AM", assigned: 0, created: 0 },
  { hour: "6 AM", assigned: 0, created: 0 },
  { hour: "9 AM", assigned: 1, created: 0 },
  { hour: "12 PM", assigned: 2, created: 1 },
  { hour: "3 PM", assigned: 1, created: 2 },
  { hour: "6 PM", assigned: 2, created: 1 },
  { hour: "9 PM", assigned: 0, created: 1 },
];

export default function TodayAssignedVsCreated() {
  return (
    <AnalyticsCard
      title="Today's Performance"
      subtitle="Assigned vs created tasks during the last 24 hours"
    >
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="hour" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="assigned"
              name="Assigned"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
            />

            <Bar
              dataKey="created"
              name="Created"
              fill="#6366F1"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AnalyticsCard>
  );
}