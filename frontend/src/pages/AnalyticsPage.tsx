import AssignedStatusChart from "../components/analytics/AssignedStatusChart";
import CreatedStatusChart from "../components/analytics/CreatedStatusChart";
import WeeklyProductivityChart from "../components/analytics/WeeklyProductivityChart";
import CompletionByPriorityChart from "../components/analytics/CompletionByPriorityChart";
import WeeklyAssignedVsCreated from "../components/analytics/WeeklyAssignedVsCreated";
import TodayAssignedVsCreated from "../components/analytics/TodayAssignedVsCreated";
import PriorityChart from "../components/dashboard/PriorityChart";
import WorkflowOverviewChart from "../components/analytics/WorkflowOverviewChart"

import useAnalytics from "../hooks/useAnalytics";

export default function AnalyticsPage() {
  const {
    loading,
    productivityScore,
    productivityLabel,
    averageCompletionTime,
    completedThisWeek,
    overdueRate,
    weeklyCompletion,
    priorityChart,
    completionByPriority,
    workflowOverview,
  } = useAnalytics();

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* My Analytics */}

      <div>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          My Analytics
        </h1>

        <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
          Your assigned and created task insights.
        </p>

      </div>

      {/* My Analytics */}

      <div className="grid gap-6 xl:grid-cols-2">

        <AssignedStatusChart />

        <CreatedStatusChart />

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <WeeklyAssignedVsCreated />

        <TodayAssignedVsCreated />

      </div>

      {/* Charts */}

      <div className="grid gap-6 xl:grid-cols-2">

        <WeeklyProductivityChart
          data={weeklyCompletion}
        />

        <PriorityChart
          data={priorityChart}
        />

      </div>

      {/* Completion by Priority */}

      <div className="grid gap-6">

        <CompletionByPriorityChart
          data={completionByPriority}
        />

        <WorkflowOverviewChart
          data={workflowOverview}
        />
      </div>

    </div>
  );
}