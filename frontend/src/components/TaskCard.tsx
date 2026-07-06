import { Pencil, Trash2, User, UserRound } from "lucide-react";
import { Task } from "../pages/DashboardPage";

const PRIORITY_COLORS = {
  LOW: "bg-gray-200 text-gray-800",
  MEDIUM: "bg-blue-200 text-blue-800",
  HIGH: "bg-orange-200 text-orange-800",
  URGENT: "bg-red-200 text-red-800",
};

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div
      className="
        w-full
        rounded-2xl
        border
        border-slate-200
        dark:border-slate-700
        bg-white
        dark:bg-slate-800
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-200
        p-4
      "
    >
      {/* HEADER */}

      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-base truncate">
          {task.title}
        </h3>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-500 hover:text-blue-700"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* DESCRIPTION */}

      <p className="mt-2 text-sm text-gray-500 line-clamp-2">
        {task.description}
      </p>

      {/* USERS */}

      <div className="mt-4 flex justify-between text-xs">

        <div className="flex items-center gap-1">
          <User size={14} />
          <span>
            {task.assignee?.name ?? "Unassigned"}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <UserRound size={14} />
          <span>{task.creator?.name}</span>
        </div>

      </div>

      {/* FOOTER */}

      <div className="mt-4 flex justify-between items-center">

        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${
            PRIORITY_COLORS[task.priority]
          }`}
        >
          {task.priority}
        </span>

        <span className="text-xs text-gray-500">
          {new Date(task.dueDate).toLocaleDateString()}
        </span>

      </div>
    </div>
  );
}