 

import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { MandalaBg } from "@/components/MandalaBg";
import { Home, ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: Route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-temple px-4">
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(hsl(22 88% 45%) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-festive" />

      {/* Floating mandalas */}
      <MandalaBg className="absolute -left-32 -top-32 w-80 h-80 opacity-[0.08]" />
      <MandalaBg
        className="absolute -right-32 -bottom-32 w-80 h-80 opacity-[0.06]"
        spin={false}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center max-w-lg"
      >
        {/* 404 number */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative inline-block mb-6"
        >
          <span className="font-display text-[8rem] md:text-[10rem] font-bold leading-none text-gradient-saffron select-none">
            404
          </span>
          <div className="absolute inset-0 bg-gradient-saffron opacity-10 blur-3xl rounded-full" />
        </motion.div>

        {/* Sanskrit */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-sanskrit text-lg text-primary/70 mb-3 tracking-wide"
        >
          ॥ मार्गः न प्राप्तः ॥
        </motion.p>

        {/* Ornate divider */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-primary text-base">✦</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        {/* Message */}
        <h1 className="font-display text-2xl md:text-3xl font-bold text-secondary mb-3">
          Page Not Found
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or may have been moved.
          Let us guide you back to the right path.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="hero" size="lg" className="gap-2">
            <Link to="/">
              <Home className="h-4 w-4" /> Back to Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 border-gold/40 hover:border-gold/70"
          >
            <Link to="/admissions">
              <BookOpen className="h-4 w-4" /> Admissions
            </Link>
          </Button>
        </div>

        {/* Quick links */}
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {[
            { to: "/about", label: "About Us" },
            { to: "/academics", label: "Academics" },
            { to: "/calendar", label: "Calendar" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="h-3 w-3" /> {label}
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;