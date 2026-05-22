import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import schoolLogo from "@/assets/schoollogo.png";

const isAdminLoggedIn = () => typeof window !== "undefined" && !!localStorage.getItem("admin-auth");

const mainLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];


const academicsDropdown = [
  { to: "/academics", label: "Academics" },
  { to: "/calendar", label: "Calendar" },
  { to: "/fees", label: "Fees" },
  { to: "/notices", label: "Notices" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const loggedIn = isAdminLoggedIn();

  return (
    <header className="sticky top-0 z-50 border-b border-gold/30 bg-card shadow-soft">
      <div className="container-narrow flex h-20 items-center justify-between">
        <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex h-12 w-12 lg:h-16 lg:w-16 items-center justify-center rounded-full overflow-hidden border-2 border-primary/30 shadow-gold group-hover:scale-105 transition-transform duration-300 bg-white shrink-0">
              <img src={schoolLogo} alt="School Logo" className="h-14 w-14 object-contain" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-sm lg:text-base font-bold text-secondary leading-tight">Pratap Saraswati</div>
              <div className="font-display text-sm lg:text-base font-bold text-primary leading-tight">Vidya Mandir</div>
              <div className="font-sanskrit text-[10px] text-muted-foreground">विद्या ददाति विनयं</div>
            </div>
          </Link>
        </motion.div>

        <motion.nav
  initial={{ opacity: 0, y: -8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.05 }}
  className="hidden lg:flex items-center gap-1"
>

  {/* Home About Contact */}
  {mainLinks.map((item) => (
    <NavLink
      key={item.to}
      to={item.to}
      end={item.to === "/"}
      className={({ isActive }) =>
        cn(
          "relative px-4 py-2 text-sm font-medium transition-colors",
          "after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-1 after:h-0.5 after:bg-gradient-saffron after:transition-all after:duration-300",
          isActive
            ? "text-primary after:w-8"
            : "text-foreground/80 hover:text-primary after:w-0 hover:after:w-8"
        )
      }
    >
      {item.label}
    </NavLink>
  ))}

  {/* Academics Calendar Fees Notices */}
  {academicsDropdown.map((item) => (
    <NavLink
      key={item.to}
      to={item.to}
      className={({ isActive }) =>
        cn(
          "relative px-4 py-2 text-sm font-medium transition-colors",
          "after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-1 after:h-0.5 after:bg-gradient-saffron after:transition-all after:duration-300",
          isActive
            ? "text-primary after:w-8"
            : "text-foreground/80 hover:text-primary after:w-0 hover:after:w-8"
        )
      }
    >
      {item.label}
    </NavLink>
  ))}

</motion.nav>

        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center rounded-full border border-gold/35 bg-card/70 p-1">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                language === "en" ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:text-primary",
              )}
            >
              {t("lang.english")}
            </button>
            <button
              type="button"
              onClick={() => setLanguage("hi")}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                language === "hi" ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:text-primary",
              )}
            >
              {t("lang.hindi")}
            </button>
          </div>

          <Button asChild variant="hero" size="sm" className="hover:shadow-gold transition-shadow duration-300">
            <Link to="/admissions">Apply</Link>
          </Button>
          {loggedIn && (
            <Button asChild variant="outline" size="sm" className="gap-1.5 border-primary/30 text-primary hover:bg-primary/5">
              <Link to="/admin">
                <LayoutDashboard className="h-3.5 w-3.5" />
                Dashboard
              </Link>
            </Button>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden border-t border-gold/30 bg-card/95 backdrop-blur"
          >
            <nav className="container-narrow flex flex-col py-4 gap-1">
              {/* Home About Contact */}
{mainLinks.map((item) => (
  <NavLink
    key={item.to}
    to={item.to}
    end={item.to === "/"}
    onClick={() => setOpen(false)}
    className={({ isActive }) =>
      cn(
        "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
        isActive ? "bg-primary/10 text-primary" : "hover:bg-muted",
      )
    }
  >
    {item.label}
  </NavLink>
))}

{/* Academics links */}
{academicsDropdown.map((item) => (
  <NavLink
    key={item.to}
    to={item.to}
    onClick={() => setOpen(false)}
    className={({ isActive }) =>
      cn(
        "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
        isActive ? "bg-primary/10 text-primary" : "hover:bg-muted",
      )
    }
  >
    {item.label}
  </NavLink>
))}

              <div className="mt-2 mb-1 flex items-center rounded-full border border-gold/35 bg-card/70 p-1 w-fit">
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                    language === "en" ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:text-primary",
                  )}
                >
                  {t("lang.english")}
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("hi")}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                    language === "hi" ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:text-primary",
                  )}
                >
                  {t("lang.hindi")}
                </button>
              </div>

              <div className="mt-2">
                <Button asChild variant="hero" className="w-full">
                  <Link to="/admissions" onClick={() => setOpen(false)}>Apply</Link>
                </Button>
                {loggedIn && (
                  <Button asChild variant="outline" className="w-full mt-2 gap-2 border-primary/30 text-primary">
                    <Link to="/admin" onClick={() => setOpen(false)}>
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};