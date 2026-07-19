import { useEffect } from "react";
import {
  CalendarDays,
  Clock3,
  Flag,
  User,
  UserRound,
  X,
} from "lucide-react";

import { Task } from "../types/task";

interface Props {
  task: Task;
  onClose: () => void;
  onEdit: (task: Task) => void;
}

const PRIORITY_STYLES = {
  LOW: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200",
  MEDIUM:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  HIGH:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  URGENT:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

const STATUS_STYLES = {
  TODO: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200",
  IN_PROGRESS:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  REVIEW:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  COMPLETED:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
};

function formatDate(date?: string | null) {
  if (!date) return "—";

  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function TaskDetailsModal({
  task,
  onClose,
  onEdit,
}: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        backdrop-blur-sm
        p-6
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-2xl
          rounded-3xl
          border
          border-slate-200
          dark:border-slate-700
          bg-white
          dark:bg-slate-900
          shadow-2xl
          overflow-hidden
        "
      >
        {/* Header */}

        <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-700 px-7 py-6">

          <div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {task.title}
            </h2>

            <div className="mt-4 flex flex-wrap gap-3">

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[task.status]}`}
              >
                {task.status.replace("_", " ")}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${PRIORITY_STYLES[task.priority]}`}
              >
                {task.priority}
              </span>

            </div>

          </div>

          <button
            onClick={onClose}
            className="
              rounded-xl
              p-2
              text-slate-500
              hover:bg-slate-100
              dark:text-slate-400
              dark:hover:bg-slate-800
              transition
            "
          >
            <X size={20} />
          </button>

        </div>

        {/* Info Grid */}

        <div className="grid gap-6 p-7 md:grid-cols-2">

          <Info
            icon={<User size={17} />}
            label="Assigned To"
            value={task.assignee?.name ?? "Unassigned"}
          />

          <Info
            icon={<UserRound size={17} />}
            label="Created By"
            value={task.creator?.name ?? "Unknown"}
          />

          <Info
            icon={<CalendarDays size={17} />}
            label="Due Date"
            value={formatDate(task.dueDate)}
          />

          <Info
            icon={<Clock3 size={17} />}
            label="Created"
            value={formatDate(task.createdAt)}
          />

        </div>

        {/* Description */}

        <div className="border-t border-slate-200 dark:border-slate-700 px-7 py-6">

          <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
            Description
          </h3>

          <p className="whitespace-pre-wrap break-words leading-7 text-slate-700 dark:text-slate-300">
            {task.description}
          </p>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-slate-200 dark:border-slate-700 px-7 py-5">

          <button
            onClick={onClose}
            className="
              rounded-xl
              border
              border-slate-200
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              px-5
              py-2.5
              text-slate-700
              dark:text-slate-200
              hover:bg-slate-50
              dark:hover:bg-slate-700
              transition
            "
          >
            Close
          </button>

          <button
            onClick={() => onEdit(task)}
            className="
              rounded-xl
              bg-indigo-600
              px-5
              py-2.5
              font-medium
              text-white
              hover:opacity-90
              transition
            "
          >
            Edit Task
          </button>

        </div>
      </div>
    </div>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>

      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
        {icon}
        {label}
      </div>

      <div className="text-base font-semibold text-slate-900 dark:text-white">
        {value}
      </div>

    </div>
  );
}