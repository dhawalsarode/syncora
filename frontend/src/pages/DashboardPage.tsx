import useDashboard from "../hooks/useDashboard";

import StatsGrid from "../components/dashboard/StatsGrid";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import ProgressChart from "../components/dashboard/ProgressChart";
import { useAuth } from "../auth/AuthContext";
import RecentTasks from "../components/dashboard/RecentTasks";
import UpcomingDeadlines from "../components/dashboard/UpcomingDeadlines";

const DashboardPage = () => {
  const { user } = useAuth();
  const {
    loading,
    tasks,
    stats,
    statusChart,
    recentTasks,
    upcomingTasks,
  } = useDashboard();

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-slate-500 text-lg">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <section className="flex items-end justify-between">

        <div>
          <p className="text-sm font-medium text-indigo-600">
            Dashboard
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Good Evening, {user?.name} 👋
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Here's what's happening across your workspace today.
          </p>
        </div>

      </section>

      <StatsGrid stats={stats} />

      {/* Charts */}

      <section className="grid gap-6 xl:grid-cols-2">

      <AnalyticsChart
        data={statusChart}
      />

      <ProgressChart
        percentage={stats.completionRate}
      />

      </section>

      {/* Recent */}

      <section className="grid gap-6 xl:grid-cols-2">

        <UpcomingDeadlines tasks={upcomingTasks} />

        <RecentTasks tasks={recentTasks} />

      </section>

    </div>
  );
};

export default DashboardPage;