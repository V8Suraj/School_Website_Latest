import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Megaphone, CalendarDays, Info, BookOpen,
  ClipboardList, MessageSquare, FileText, Wallet, LogOut,
  GraduationCap, X, Images, ScrollText, ArrowLeft,
} from "lucide-react";

const navItems = [
  { to: "/admin",            label: "Dashboard",      icon: LayoutDashboard, end: true },
  { to: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { to: "/admin/calendar",   label: "Calendar Events", icon: CalendarDays },
  { to: "/admin/gallery",    label: "Gallery",         icon: Images },
  { to: "/admin/about",      label: "About Us",        icon: Info },
  { to: "/admin/academics",  label: "Academics",       icon: BookOpen },
  { to: "/admin/admissions", label: "Admissions",      icon: ClipboardList },
  { to: "/admin/inquiries",  label: "Inquiries",       icon: MessageSquare },
  { to: "/admin/notices",    label: "Notices",         icon: FileText },
  { to: "/admin/fees",       label: "Fee Structure",   icon: Wallet },
  { to: "/admin/circular",   label: "Circular / Cert", icon: ScrollText },
];

export const AdminSidebar = ({ mobileOpen, setMobileOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin-auth");
    navigate("/admin/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-gold/20">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-saffron shadow-gold">
          <GraduationCap className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="font-display font-bold text-secondary text-base leading-tight">Vidyalaya</div>
          <div className="text-xs text-muted-foreground">Admin Panel</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gold/20 space-y-1">
        <a
          href="/"
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Website
        </a>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 bg-card border-r border-gold/20 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-[82vw] max-w-[19rem] bg-card h-full shadow-xl">
            <div className="flex justify-end p-3">
              <button onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  );
};