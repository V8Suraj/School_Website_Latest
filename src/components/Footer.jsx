import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import schoolLogo from "@/assets/schoollogo.png";

const navLinks = [
  { to: "/about", key: "nav.about" },
  { to: "/academics", key: "nav.academics" },
  { to: "/admissions", key: "nav.admissions" },
  { to: "/calendar", key: "nav.calendar" },
  { to: "/notices", key: "nav.notices" },
  { to: "/fees", key: "nav.fees" },
  { to: "/contact", key: "nav.contact" },
];

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative mt-16 overflow-hidden border-t border-amber-900/20 bg-[#0b0704] text-stone-400">

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-0 h-[350px] w-[350px] rounded-full bg-amber-700/10 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-[250px] w-[250px] rounded-full bg-orange-700/10 blur-[90px]" />
      </div>

      <div className="container-narrow relative z-10 py-12">

        {/* Main Grid */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <Link to="/" className="group inline-flex items-center gap-3">
              
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-lg transition-all duration-300 group-hover:bg-amber-500/40" />

                <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-amber-500/30 bg-[#1a120c]">
                  <img
                    src={schoolLogo}
                    alt="School Logo"
                    className="h-10 w-10 object-contain"
                  />
                </div>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold leading-tight text-white">
                  Pratap Saraswati
                </h2>

                <h3 className="font-display text-lg font-semibold text-amber-500">
                  Vidya Mandir
                </h3>

                <p className="mt-1 font-sanskrit text-[9px] tracking-[0.3em] text-amber-600/80">
                  विद्या ददाति विनयं
                </p>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-500">
              {t("footer.tagline")} Nurturing excellence through values and
              modern education.
            </p>

            {/* Social Icons */}
            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-900/30 bg-white/[0.02] transition-all duration-300 hover:border-amber-500 hover:bg-amber-500 hover:text-black"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <h4 className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-500">
              <span className="h-px w-4 bg-amber-500" />
              {t("footer.quicklinks")}
            </h4>

            <div className="grid grid-cols-2 gap-y-3 gap-x-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group flex items-center gap-2 text-[13px] transition-colors hover:text-amber-400"
                >
                  <ArrowRight className="h-3 w-3 text-amber-800 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-500" />

                  {t(link.key)}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <h4 className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-500">
              <span className="h-px w-4 bg-amber-500" />
              {t("footer.visit")}
            </h4>

            <div className="space-y-4">

              {/* Address */}
              <a
                href="https://maps.google.com/?q=108,Saraswati+Marg,Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-3"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-500 transition-transform duration-300 group-hover:scale-110" />

                <p className="text-sm leading-relaxed text-stone-400 transition-colors group-hover:text-white">
                  108, Saraswati Marg, Bengaluru – 560001
                </p>
              </a>

              {/* Phone */}
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-sm transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-amber-600" />
                <span>+91 98765 43210</span>
              </a>

              {/* Email */}
              <a
                href="mailto:hello@vidyalaya.in"
                className="flex items-center gap-3 text-sm transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 text-amber-600" />
                <span>hello@vidyalaya.in</span>
              </a>

              {/* Timing */}
              <div className="flex items-center gap-3 border-t border-white/5 pt-4 text-sm text-stone-500">
                <Clock className="h-4 w-4 text-amber-700" />
                <span>Mon – Sat · 08:00 AM – 05:00 PM</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-5 md:flex-row">

          <p className="text-[10px] uppercase tracking-[0.18em] text-stone-600">
            © {new Date().getFullYear()} Vidyalaya · All Rights Reserved
          </p>

          <div className="rounded-full border border-amber-900/30 bg-amber-900/5 px-5 py-1.5">
            <span className="font-sanskrit text-[10px] tracking-[0.25em] text-amber-500/70">
              {t("footer.blessing")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};