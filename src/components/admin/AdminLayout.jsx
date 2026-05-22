import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Menu, GraduationCap } from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";
import { Button } from "@/components/ui/button";

const isAuthenticated = () => localStorage.getItem("admin-auth") === "true";

export const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAuthenticated()) return <Navigate to="/admin/login" replace />;

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="flex-1 overflow-auto">
        <div className="md:hidden sticky top-0 z-40 border-b border-gold/20 bg-card/95 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-saffron shadow-gold">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="font-display text-sm font-bold text-secondary leading-tight truncate">Vidyalaya</div>
                <div className="text-xs text-muted-foreground leading-tight truncate">Admin Panel</div>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="shrink-0 h-10 w-10 rounded-lg border-gold/30 bg-card"
              onClick={() => setMobileOpen(true)}
              aria-label="Open admin menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
};