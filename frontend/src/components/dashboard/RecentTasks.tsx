import { Task } from "../../types/task";

interface Props {
  tasks: Task[];
}

const statusStyle = {
  TODO:
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",

  IN_PROGRESS:
    "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",

  REVIEW:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",

  COMPLETED:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
};

export default function RecentTasks({
  tasks,
}: Props) {
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
          Recent Tasks
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest created tasks
        </p>

      </div>

      <div className="divide-y divide-slate-200 dark:divide-slate-700">

        {tasks.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No tasks created yet.
          </div>
        ) : (
          tasks.map((task) => (
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
              <div>

                <h3 className="font-medium text-slate-900 dark:text-white">
                  {task.title}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {task.assignee?.name ?? "Unassigned"}
                </p>

              </div>

              <div className="text-right">

                <span
                  className={`
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    ${statusStyle[task.status]}
                  `}
                >
                  {task.status.replace("_", " ")}
                </span>

                <p className="mt-2 text-xs text-slate-500">
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>

              </div>

            </div>
          ))
        )}

      </div>
    </section>
  );
}