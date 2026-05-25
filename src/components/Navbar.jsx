import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  Info,
  Bell,
  Phone,
  X,
  GraduationCap,
  Calendar,
  IndianRupee,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import schoolLogo from "@/assets/schoollogo.png";

const isAdminLoggedIn = () =>
  typeof window !== "undefined" &&
  !!localStorage.getItem("admin-auth");

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const loggedIn = isAdminLoggedIn();

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 border-b border-orange-100 bg-[#faf7f2]/90 backdrop-blur-xl shadow-sm">
        <div className="container-narrow relative flex h-20 items-center justify-between">

          {/* ================= LEFT LOGO ================= */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            {/* LOGO CLICK MENU */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
              className="relative flex h-12 w-12 lg:h-16 lg:w-16 items-center justify-center rounded-full overflow-hidden border-2 border-primary/30 shadow-gold bg-white shrink-0"
            >
              <img
                src={schoolLogo}
                alt="School Logo"
                className="h-14 w-14 object-contain"
              />
            </button>

            {/* TEXT */}
            <div className="leading-tight">
              <div className="font-display text-sm lg:text-lg font-bold text-secondary leading-tight">
                Pratap Saraswati
              </div>
              <div className="font-display text-sm lg:text-2xl font-bold text-primary leading-tight">
                Vidya Mandir
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-[1px] w-5 bg-orange-300"></div>
                <div className="font-sanskrit text-[10px] text-muted-foreground">
                  विद्या ददाति विनयं
                </div>
                <div className="h-[1px] w-5 bg-orange-300"></div>
              </div>
            </div>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
              { to: "/academics", label: "Academics" },
              { to: "/calendar", label: "Calendar" },
              { to: "/fees", label: "Fees" },
              { to: "/notices", label: "Notices" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors",
                    "after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-1 after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300",
                    isActive
                      ? "text-primary after:w-8"
                      : "text-foreground/80 hover:text-primary after:w-0 hover:after:w-8"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* ================= RIGHT TOOLS ================= */}
          <div className="flex items-center gap-2 lg:gap-3">
            
            {/* LANGUAGE TOGGLE (BY DEFAULT ENGLISH) */}
            <button
              type="button"
              onClick={() => setLanguage(language === "hi" ? "en" : "hi")}
              className={cn(
                "relative flex items-center h-9 w-[85px] rounded-full p-1 transition-all duration-300 select-none border",
                "active:scale-95 hover:brightness-102 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50",
                language === "hi"
                  ? "bg-orange-50 border-orange-200/80 shadow-inner"
                  : "bg-orange-500 border-orange-600 shadow-md shadow-orange-500/10"
              )}
              aria-label="Toggle Language"
            >
              <span
                className={cn(
                  "absolute left-4 text-[13px] font-bold transition-all duration-300",
                  language === "hi" ? "opacity-100 scale-100 text-orange-600" : "opacity-0 scale-90 text-orange-300"
                )}
              >
                हिं
              </span>
              <span
                className={cn(
                  "absolute right-3.5 text-[11px] font-[800] tracking-wider transition-all duration-300",
                  language === "hi" ? "opacity-0 scale-90 text-orange-200" : "opacity-100 scale-100 text-white"
                )}
              >
                ENG
              </span>
              <div
                className={cn(
                  "h-7 w-7 rounded-full transition-transform z-10 shadow-[0_2px_6px_rgba(234,88,12,0.2)]",
                  "duration-300 cubic-bezier-[0.34,1.56,0.64,1]",
                  language === "hi" ? "translate-x-[46px] bg-orange-500" : "translate-x-0 bg-white"
                )}
              />
            </button>

            {/* APPLY BUTTON (Hidden on Mobile, Visible on MD/LG screens) */}
            <Button
              asChild
              variant="hero"
              size="sm"
              className="hidden md:inline-flex rounded-md px-4 lg:px-6 h-9"
            >
              <Link to="/admissions">Apply</Link>
            </Button>

            {/* DASHBOARD BUTTON */}
            {loggedIn && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="hidden lg:flex gap-1.5 border-primary/30 text-primary hover:bg-primary/5"
              >
                <Link to="/admin">
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  Dashboard
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* ================= MOBILE BOTTOM DRAWER PANEL ================= */}
      <AnimatePresence>
        {open && (
          <>
            {/* SMOOTH OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[90]"
            />

            {/* SMOOTH PANEL */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 220,
              }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] rounded-t-[32px] bg-[#faf7f2] shadow-2xl border-t border-orange-100 overflow-hidden max-h-[85vh]"
            >
              {/* DRAWER HEADER */}
              <div className="flex justify-between items-center p-5 border-b border-orange-50/50">
                <div className="flex items-center gap-3">
                  <img
                    src={schoolLogo}
                    alt="logo"
                    className="h-12 w-12 rounded-full object-contain"
                  />
                  <div>
                    <h2 className="font-bold text-secondary text-sm leading-tight">
                      Pratap Saraswati
                    </h2>
                    <h3 className="font-bold text-primary text-base leading-tight">
                      Vidya Mandir
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="h-9 w-9 rounded-full bg-white shadow-xs flex items-center justify-center active:scale-90 transition-transform"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              {/* DRAW MENU ITEMS */}
              <div className="grid grid-cols-2 gap-3 p-5 overflow-y-auto">
                {[
                  { to: "/", label: "Home", icon: Home },
                  { to: "/about", label: "About", icon: Info },
                  { to: "/academics", label: "Academics", icon: GraduationCap },
                  { to: "/calendar", label: "Calendar", icon: Calendar },
                  { to: "/fees", label: "Fees", icon: IndianRupee },
                  { to: "/notices", label: "Notices", icon: Bell },
                  { to: "/contact", label: "Contact", icon: Phone },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "h-[80px] rounded-2xl bg-white shadow-xs flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95",
                          isActive
                            ? "bg-primary text-white"
                            : "text-foreground/80 hover:bg-primary/5"
                        )
                      }
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs font-semibold">{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>

              {/* MOBILE BOTTOM PANEL APPLY BUTTON */}
              <div className="px-5 pb-6">
                <Button
                  asChild
                  variant="hero"
                  className="w-full h-11 rounded-xl text-sm"
                >
                  <Link to="/admissions" onClick={() => setOpen(false)}>
                    Apply for Admission
                  </Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================= MOBILE FLOATING BOTTOM NAV ================= */}
      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] z-50">
        <div className="relative h-[72px] rounded-[24px] bg-white/95 backdrop-blur-xl border border-orange-100 shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-around px-2">
          
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center text-[10px] font-medium transition-all",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            <Home className="h-6 w-6 mb-1" />
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center text-[10px] font-medium transition-all",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            <Info className="h-6 w-6 mb-1" />
            About
          </NavLink>

          {/* CENTER QUICK LAUNCH TRIGGER */}
          <button
            onClick={() => setOpen(true)}
            className="-mt-8 active:scale-95 transition-transform"
          >
            <div className="h-[88px] w-[88px] rounded-full bg-white border-[5px] border-[#faf7f2] shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex items-center justify-center">
              <img
                src={schoolLogo}
                alt="School Logo"
                className="h-16 w-16 rounded-full object-cover"
              />
            </div>
          </button>

          <NavLink
            to="/notices"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center text-[10px] font-medium transition-all",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            <Bell className="h-6 w-6 mb-1" />
            Notices
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center text-[10px] font-medium transition-all",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            <Phone className="h-6 w-6 mb-1" />
            Contact
          </NavLink>
        </div>
      </div>
    </>
  );
};