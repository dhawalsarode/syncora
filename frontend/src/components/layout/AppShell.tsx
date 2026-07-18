import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppShell() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-950">

      {/* Sidebar */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Right Side */}

      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Top Navigation */}

        <Navbar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />

        {/* Main Content */}

        <main
          className="
            flex-1
            overflow-y-auto
            bg-slate-100
            dark:bg-slate-950
            p-5
          "
        >
          <Outlet />
        </main>

      </div>

    </div>
  );
}
