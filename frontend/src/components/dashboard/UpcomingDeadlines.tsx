interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
}

interface Props {
  tasks: Task[];
}

const priorityColor = {
  LOW: "bg-slate-400",
  MEDIUM: "bg-sky-500",
  HIGH: "bg-amber-500",
  URGENT: "bg-red-500",
};

export default function UpcomingDeadlines({
  tasks,
}: Props) {
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
        <h2 className="text-lg font-semibold">
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
          upcoming.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between px-6 py-4"
            >
              <div className="flex items-center gap-3">

                <span
                  className={`
                    h-3
                    w-3
                    rounded-full
                    ${priorityColor[task.priority]}
                  `}
                />

                <div>
                  <p className="font-medium">
                    {task.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Due{" "}
                    {new Date(
                      task.dueDate
                    ).toLocaleDateString()}
                  </p>
                </div>

              </div>

              <span
                className="
                  rounded-full
                  bg-slate-100
                  px-3
                  py-1
                  text-xs
                  font-medium
                  dark:bg-slate-800
                "
              >
                {task.priority}
              </span>
            </div>
          ))
        )}

      </div>
    </section>
  );
}