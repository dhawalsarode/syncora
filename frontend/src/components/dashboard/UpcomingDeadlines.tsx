import { Task } from "../../types/task";

interface Props {
  tasks: Task[];
}

const priorityStyle = {
  LOW:
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",

  MEDIUM:
    "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",

  HIGH:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",

  URGENT:
    "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

const priorityDot = {
  LOW: "bg-slate-400",
  MEDIUM: "bg-sky-500",
  HIGH: "bg-amber-500",
  URGENT: "bg-red-500",
};

export default function UpcomingDeadlines({
  tasks,
}: Props) {
  const today = new Date();

  const upcoming = [...tasks]
    .sort(
      (a, b) =>
        new Date(a.dueDate).getTime() -
        new Date(b.dueDate).getTime()
    )
    .slice(0, 5);

  return (
    <section
      className="
        rounded-2xl
        border
        border-slate-200
        dark:border-slate-700
        bg-white
        dark:bg-slate-900
        shadow-sm
      "
    >
      <div className="border-b border-slate-200 dark:border-slate-700 px-6 py-5">

        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Upcoming Deadlines
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Next scheduled tasks
        </p>

      </div>

      <div className="divide-y divide-slate-200 dark:divide-slate-700">

        {upcoming.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No upcoming deadlines.
          </div>
        ) : (
          upcoming.map((task) => {
            const due = new Date(task.dueDate);

            const days = Math.ceil(
              (due.getTime() - today.getTime()) /
                (1000 * 60 * 60 * 24)
            );

            const dueLabel =
              days < 0
                ? `${Math.abs(days)} day${
                    Math.abs(days) > 1 ? "s" : ""
                  } overdue`
                : days === 0
                ? "Due Today"
                : days === 1
                ? "Tomorrow"
                : `Due in ${days} days`;

            return (
              <div
                key={task.id}
                className="
                  flex
                  items-center
                  justify-between
                  px-6
                  py-4
                  transition-colors
                  hover:bg-slate-50
                  dark:hover:bg-slate-800/40
                "
              >
                <div className="flex items-start gap-3">

                  <span
                    className={`
                      mt-2
                      h-3
                      w-3
                      rounded-full
                      ${priorityDot[task.priority]}
                    `}
                  />

                  <div>

                    <p className="font-medium text-slate-900 dark:text-white">
                      {task.title}
                    </p>

                    <p
                      className={`mt-1 text-xs font-medium
                        ${
                          days < 0
                            ? "text-red-500"
                            : days === 0
                            ? "text-amber-500"
                            : "text-slate-500"
                        }`}
                    >
                      {dueLabel}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {task.assignee?.name ??
                        "Unassigned"}
                    </p>

                  </div>

                </div>

                <span
                  className={`
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    ${priorityStyle[task.priority]}
                  `}
                >
                  {task.priority}
                </span>
              </div>
            );
          })
        )}

      </div>
    </section>
  );
}