// DashboardPage.tsx
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DragDropContext,
  DropResult,
} from "@hello-pangea/dnd";
import { LayoutDashboard, Bell, Sun, Moon, Search,} from "lucide-react";
import TaskCard from "../components/TaskCard";
import api from "../api/client";
import { useAuth } from "../auth/AuthContext";
import { socket } from "../socket/socket";
import { useTheme } from "../theme/ThemeContext";
import CreateTaskModal from "../components/CreateTaskModal";
import KanbanColumn from "../components/KanbanColumn";

/* ================= TYPES ================= */

export type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
type View = "ALL" | "ASSIGNED" | "CREATED" | "OVERDUE";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Notification {
  id: string;
  message: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  creatorId: string;
  assignedToId?: string | null;
  creator?: User | null;
  assignee?: User | null;
}

/* ================= API ================= */

const fetchTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data;
};

const fetchNotifications = async (): Promise<Notification[]> => {
  const res = await api.get("/notifications");
  return Array.isArray(res.data) ? res.data : res.data.notifications ?? [];
};

/* ================= CONSTANTS ================= */

const STATUS_COLUMNS: TaskStatus[] = [
  "TODO",
  "IN_PROGRESS",
  "REVIEW",
  "COMPLETED",
];

const STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  REVIEW: "Review",
  COMPLETED: "Completed",
};

const PRIORITY_COLORS: Record<TaskPriority, string> = {
  LOW: "bg-gray-200 text-gray-800",
  MEDIUM: "bg-blue-200 text-blue-800",
  HIGH: "bg-orange-200 text-orange-800",
  URGENT: "bg-red-200 text-red-800",
};

/* ================= COMPONENT ================= */

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const queryClient = useQueryClient();

  const [view, setView] = useState<View>("ALL");
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState("");
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  /* ================= SOCKET ================= */

  useEffect(() => {
    socket.connect();

    socket.on("task:created", () =>
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    );

    socket.on("task:created", () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
    );

    socket.on("task:updated", () =>
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    );

    socket.on("task:deleted", () =>
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    );

    return () => {
      socket.off("task:created");
      socket.off("task:updated");
      socket.off("task:deleted");
      socket.disconnect();
    };
  }, [queryClient]);
  /* ================= FILTER ================= */

  const filteredTasks = useMemo(() => {
    const now = new Date();
    return tasks.filter((t) => {
      if (view === "ASSIGNED" && t.assignedToId !== user?.id) return false;
      if (view === "CREATED" && t.creatorId !== user?.id) return false;
      if (
        view === "OVERDUE" &&
        (new Date(t.dueDate) >= now || t.status === "COMPLETED")
      )
        return false;
        const q = search.toLowerCase();

        if (
          q &&
          !(
            t.title.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q) ||
            t.assignee?.name?.toLowerCase().includes(q) ||
            t.creator?.name?.toLowerCase().includes(q)
          )
        ) {
          return false;
        }
      return true;
    });
  }, [tasks, view, user?.id, search]);

  /* ================= ACTIONS ================= */

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const status = result.destination.droppableId as TaskStatus;
    await api.patch(`/tasks/${result.draggableId}`, { status });
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  const deleteTask = async (id: string) => {
    await api.delete(`/tasks/${id}`);
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-background p-8 text-text dark:bg-slate-950 dark:text-slate-100"
  style={{ zoom: "110%" }}>
      <div className="max-w-[1850px] mx-auto space-y-6">
        {/* HEADER */}
        <div
            className="
              relative
              flex
              justify-between
              items-center
              rounded-3xl
              border
              border-white/40
              bg-white/60
              dark:bg-slate-900/60
              backdrop-blur-xl
              shadow-xl
              px-6
              py-5
            "
          >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <LayoutDashboard
                size={24}
                className="text-primary"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Task Manager
              </h1>

              <p className="text-secondary">
                Collaborate, assign and track work.
              </p>
            </div>
        </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={() => setShowCreate(true)}
              className="
                          flex
                          items-center
                          gap-2
                          h-11
                          px-5
                          rounded-xl
                          bg-primary
                          text-white
                          font-medium
                          hover:bg-blue-700
                          transition
                          "
            >
              + Create Task
            </button>

            <button
              onClick={() => setShowNotifications((s) => !s)}
              className="
                          flex
                          items-center
                          justify-center
                          h-11
                          w-11
                          rounded-xl
                          border
                          border-border
                          bg-surface
                          hover:bg-slate-100
                          dark:bg-slate-800
                          dark:hover:bg-slate-700
                          transition
                          "
            >
              <Bell size={20} />
            </button>

            <button
              onClick={toggleTheme}
              className="
                          flex
                          items-center
                          justify-center
                          h-11
                          w-11
                          rounded-xl
                          border
                          border-border
                          bg-surface
                          hover:bg-slate-100
                          dark:bg-slate-800
                          dark:hover:bg-slate-700
                          transition
                          "
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={logout}
              className="
                          flex
                          items-center
                          justify-center
                          h-11
                          px-5
                          rounded-xl
                          bg-danger
                          text-white
                          font-medium
                          hover:bg-red-600
                          transition
                          "
            >
              Logout
            </button>
          </div>

        {/* NOTIFICATIONS PANEL */}
        {showNotifications && (
          <div
            className="
              absolute
              right-0
              top-16
              w-96
              rounded-3xl
              border
              border-slate-200
              dark:border-slate-700
              bg-white/95
              dark:bg-slate-900/95
              backdrop-blur-xl
              shadow-2xl
              overflow-hidden
              z-50
            "
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-lg">
                Notifications
              </h3>

              <span className="text-xs text-secondary">
                {notifications.length}
              </span>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="py-12 text-center text-secondary">
                  No notifications
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="
                      px-5
                      py-4
                      border-b
                      border-slate-100
                      dark:border-slate-800
                      hover:bg-slate-50
                      dark:hover:bg-slate-800
                      transition
                    "
                  >
                    <p className="text-sm leading-6">
                      {n.message}
                    </p>

                    <p className="mt-2 text-xs text-secondary">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        </div>

        {/* SEARCH */}
        <div className="relative mt-6">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="
            w-full
            h-12
            rounded-2xl
            border
            border-slate-200
            dark:border-slate-700
            bg-white/80
            dark:bg-slate-900/80
            backdrop-blur-xl
            pl-11
            pr-4
            text-sm
            placeholder:text-slate-400
            focus:outline-none
            focus:ring-2
            focus:ring-primary/20
            focus:border-primary
            transition-all
            shadow-sm
            "
          />
        </div>

        {/* VIEW FILTER */}
        <div className="flex gap-2 mt-5">
          {[
            { value: "ALL", label: "All" },
            { value: "ASSIGNED", label: "Assigned" },
            { value: "CREATED", label: "Created" },
            { value: "OVERDUE", label: "Overdue" },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setView(filter.value as View)}
              className={`
                h-10
                px-5
                rounded-full
                font-medium
                transition-all
                duration-200
                ${
                  view === filter.value
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface border border-border text-secondary hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
                }
              `}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* KANBAN */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div
              className="
                mt-8
                grid
                grid-cols-1
                lg:grid-cols-2
                2xl:grid-cols-4
                gap-6
                items-start
              "
            >
            {STATUS_COLUMNS.map((status) => (
              <KanbanColumn
                key={status}
                status={status}
                title={STATUS_LABELS[status]}
                tasks={filteredTasks.filter((t) => t.status === status)}
                onEdit={setEditTask}
                onDelete={deleteTask}
              />
            ))}
            </div>
        </DragDropContext>
      </div>

      {/* MODALS */}
      {showCreate && (
        <CreateTaskModal onClose={() => setShowCreate(false)} />
      )}
      {editTask && (
        <CreateTaskModal task={editTask} onClose={() => setEditTask(null)} />
      )}
    </div>
  );
};

export default DashboardPage;