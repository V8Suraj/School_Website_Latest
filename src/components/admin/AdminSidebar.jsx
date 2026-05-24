import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Megaphone,
  CalendarDays,
  Info,
  BookOpen,
  ClipboardList,
  MessageSquare,
  FileText,
  Wallet,
  LogOut,
  GraduationCap,
  X,
  Images,
  ScrollText,
  ArrowLeft,
  ChevronDown,
  Search,
} from "lucide-react";

import { useState } from "react";

const navItems = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    end: true,
  },

  {
    to: "/admin/announcements",
    label: "Announcements",
    icon: Megaphone,
  },

  {
    to: "/admin/calendar",
    label: "Calendar Events",
    icon: CalendarDays,
  },

  {
    to: "/admin/gallery",
    label: "Gallery",
    icon: Images,
  },

  {
    to: "/admin/about",
    label: "About Us",
    icon: Info,
  },

  {
    to: "/admin/academics",
    label: "Academics",
    icon: BookOpen,
  },

  {
    to: "/admin/admissions",
    label: "Admissions",
    icon: ClipboardList,
  },

  {
    to: "/admin/inquiries",
    label: "Inquiries",
    icon: MessageSquare,
    filters: [
      "All",
      "Admissions",
      "Fee Structure",
      "Transport",
    ],
  },

  {
    to: "/admin/notices",
    label: "Notices",
    icon: FileText,
    filters: [
      "All",
      "Academic",
      "Holiday",
      "Circular",
      "Events",
    ],
  },

  {
    to: "/admin/fees",
    label: "Fee Structure",
    icon: Wallet,
  },

  {
    to: "/admin/circular",
    label: "Circular / Cert",
    icon: ScrollText,
  },
];

const AdminSidebar = ({
  mobileOpen,
  setMobileOpen,
}) => {

  const navigate = useNavigate();

  const [openFilter, setOpenFilter] =
    useState(null);

  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("admin-auth");
    navigate("/admin/login");
  };

  const filteredNavItems = navItems.filter(
    (item) =>
      item.label
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#fffdf8] via-[#faf6ef] to-[#f5efe6]">

      {/* 
          LOGO
       */}

      <div className="px-5 py-6 border-b border-orange-100/70">

        <div className="flex items-center gap-4">

          {/* Logo */}
          <div className="relative">

            <div className="absolute inset-0 rounded-2xl bg-orange-500 blur-xl opacity-20" />

            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 shadow-lg">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
          </div>

          {/* Text */}
          <div>
            <h2 className="text-xl font-bold tracking-wide text-[#7c1d1d]">
              Vidyalaya
            </h2>

            <p className="text-sm text-muted-foreground">
              Modern Admin Panel
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-5">

          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <input
            type="text"
            placeholder="Search menu..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full h-11 rounded-2xl border border-orange-100 bg-white pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-orange-200"
          />
        </div>
      </div>

      {/* 
          NAVIGATION
       */}

      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-2">

        <div className="px-3 mb-2">
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-semibold">
            Main Menu
          </p>
        </div>

        {filteredNavItems.map(
          ({
            to,
            label,
            icon: Icon,
            end,
            filters,
          }) => (
            <div key={to}>

              {/* Main Nav */}
              <NavLink
                to={to}
                end={end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "group relative flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 overflow-hidden",
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xl shadow-orange-200"
                      : "text-slate-600 hover:bg-white hover:shadow-md hover:scale-[1.01]"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">

                      {/* Icon */}
                      <div
                        className={cn(
                          "relative flex items-center justify-center h-10 w-10 rounded-xl transition-all duration-300",
                          isActive
                            ? "bg-white/15 backdrop-blur-sm"
                            : "bg-slate-100 group-hover:bg-orange-100"
                        )}
                      >
                        <Icon className="h-4.5 w-4.5 shrink-0" />
                      </div>

                      {/* Label */}
                      <span className="relative z-10 text-sm font-medium">
                        {label}
                      </span>
                    </div>

                    {/* Dropdown */}
                    {filters && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();

                          setOpenFilter(
                            openFilter === label
                              ? null
                              : label
                          );
                        }}
                        className={cn(
                          "transition-transform duration-300",
                          openFilter === label &&
                            "rotate-180"
                        )}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    )}
                  </>
                )}
              </NavLink>

              {/* 
                  FILTER DROPDOWN
               */}

              {filters &&
                openFilter === label && (

                  <div className="ml-5 mt-2 space-y-2 border-l-2 border-orange-100 pl-4">

                    {filters.map((filter) => (
                      <button
                        key={filter}
                        className="w-full text-left px-4 py-2.5 rounded-xl text-sm bg-white text-slate-600 border border-orange-100 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300"
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          )
        )}
      </nav>

      {/* 
          FOOTER
       */}

      <div className="border-t border-orange-100/70 p-4 bg-white/40 backdrop-blur-sm space-y-2">

        {/* Back */}
        <a
          href="/"
          className="group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-slate-600 hover:bg-white hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-slate-100 group-hover:bg-orange-100 transition-all">
            <ArrowLeft className="h-4 w-4" />
          </div>

          <span>Back to Website</span>
        </a>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="group flex w-full items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-300"
        >
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-red-100/70">
            <LogOut className="h-4 w-4" />
          </div>

          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* 
          DESKTOP SIDEBAR
       */}

      <aside className="hidden md:flex flex-col w-[285px] shrink-0 bg-white/80 backdrop-blur-xl border-r border-orange-100/70 h-screen sticky top-0">

        <SidebarContent />
      </aside>

      {/* 
          MOBILE SIDEBAR
     */}

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">

          {/* Drawer */}
          <div className="w-[86vw] max-w-[22rem] h-full bg-white shadow-2xl animate-in slide-in-from-left duration-300">

            {/* Close */}
            <div className="flex justify-end p-4">

              <button
                onClick={() =>
                  setMobileOpen(false)
                }
                className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 hover:bg-orange-100 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <SidebarContent />
          </div>

          {/* Overlay */}
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() =>
              setMobileOpen(false)
            }
          />
        </div>
      )}
    </>
  );
};

export { AdminSidebar };

export default AdminSidebar;