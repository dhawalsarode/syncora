import {
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import TaskCard from "./TaskCard";
import { Task, TaskStatus } from "../pages/DashboardPage";

interface Props {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function KanbanColumn({
  status,
  title,
  tasks,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Droppable droppableId={status}>
      {(p) => (
        <div
          ref={p.innerRef}
          {...p.droppableProps}
          className="
            flex
            flex-col
            rounded-3xl
            border
            border-slate-200/70
            dark:border-slate-700/70
            bg-white/70
            dark:bg-slate-900/70
            backdrop-blur-xl
            shadow-lg
            overflow-hidden
            min-h-[650px]
          "
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="font-semibold text-lg">
              {title}
            </h2>

            <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs">
              {tasks.length}
            </span>
          </div>

          <div className="flex-1 p-4 space-y-4">
            {tasks.map((task, index) => (
              <Draggable
                draggableId={task.id}
                index={index}
                key={task.id}
              >
                {(d) => (
                  <div
                    ref={d.innerRef}
                    {...d.draggableProps}
                    {...d.dragHandleProps}
                  >
                    <TaskCard
                      task={task}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </div>
                )}
              </Draggable>
            ))}

            {p.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}