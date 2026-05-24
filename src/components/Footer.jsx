import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Youtube, Heart, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import schoolLogo from "@/assets/schoollogo.png";

const navLinks = [
  { to: "/about",      key: "nav.about" },
  { to: "/academics",  key: "nav.academics" },
  { to: "/admissions", key: "nav.admissions" },
  { to: "/calendar",   key: "nav.calendar" },
  { to: "/notices",    key: "nav.notices" },
  { to: "/fees",       key: "nav.fees" },
  { to: "/contact",    key: "nav.contact" },
];

const contact = [
  { Icon: MapPin, val: "108, Saraswati Marg, Basavanagudi, Bengaluru – 560001" },
  { Icon: Phone,  val: "+91 98765 43210" },
  { Icon: Mail,   val: "hello@vidyalaya.in" },
  { Icon: Clock,  val: "Mon – Sat · 8 AM – 5 PM" },
];

const socialLinks = [
  { Icon: Facebook, href: "https://facebook.com", color: "#1877F2" },
  { Icon: Instagram, href: "https://instagram.com", color: "#E4405F" },
  { Icon: Twitter, href: "https://twitter.com", color: "#1DA1F2" },
  { Icon: Youtube, href: "https://youtube.com", color: "#FF0000" },
];

const achievements = [
  "NAAC A+ Grade",
  "ISO 9001:2015 Certified",
  "Best School Award 2024",
  "Green Campus Initiative",
];

// Animation variants from restaurant footer
const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
      duration: 0.6
    }
  }
};

const menuItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: "easeOut"
    }
  }),
  hover: {
    scale: 1.05,
    color: "#f59e0b",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const contactItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut"
    }
  }),
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  }
};

const socialIconVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.8 + i * 0.1,
      type: "spring",
      stiffness: 200,
      damping: 12
    }
  }),
  hover: {
    scale: 1.2,
    rotate: 5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.95
  }
};

const scrollButtonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1,
      duration: 0.5,
      type: "spring",
      stiffness: 200
    }
  },
  hover: {
    scale: 1.1,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.95
  }
};

const lineVariants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.3
    }
  }
};

const pulseVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.6, 0.3],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const Footer = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={footerVariants}
      className="relative mt-12 md:mt-16 overflow-hidden bg-gradient-to-br from-[#1a0a00] via-[#2d1200] to-[#1a0800]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
      
      {/* subtle radial glow */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.07 }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "radial-gradient(ellipse at 70% 40%, #f59e0b 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, #c2410c 0%, transparent 50%)" }}
      />

      {/* Decorative top pattern */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />

      <div className="container-narrow relative grid gap-8 py-10 md:grid-cols-12">
        {/* Brand Section - Expanded */}
        <motion.div 
          variants={logoVariants}
          className="md:col-span-5"
        >
          <motion.div 
            className="flex items-center gap-3 mb-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-500/40 bg-white shadow-gold overflow-hidden shrink-0"
              whileHover={{ 
                borderColor: "#f59e0b",
                boxShadow: "0 0 25px rgba(245, 158, 11, 0.4)",
              }}
              transition={{ duration: 0.2 }}
            >
              <motion.img 
                src={schoolLogo} 
                alt="School Logo" 
                className="h-12 w-12 object-contain"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.7 }}
              />
            </motion.div>
            <div>
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="font-display text-base font-bold tracking-wide text-amber-100 leading-tight"
              >
                Pratap Saraswati
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="font-display text-base font-bold tracking-wide text-amber-300 leading-tight"
              >
                Vidya Mandir
              </motion.div>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="font-sanskrit text-[10px] text-amber-400/80 tracking-wider mt-0.5"
              >
                विद्या ददाति विनयं
              </motion.div>
            </div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-xs leading-relaxed text-stone-400 mb-3"
          >
            {t("footer.tagline") || "Empowering young minds with quality education since 1985. Creating future leaders through holistic development and excellence in academics."}
          </motion.p>
          
          <motion.div 
            variants={lineVariants}
            className="flex items-center mt-3 mb-4"
          >
            <div className="w-12 h-[2px] bg-amber-500/60"></div>
            <motion.div 
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="w-1.5 h-1.5 rounded-full bg-amber-500 mx-2"
            />
            <motion.div 
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
              className="w-1.5 h-1.5 rounded-full bg-amber-500"
            />
          </motion.div>

          {/* Achievements badges */}
          <motion.div 
            className="mt-4 flex flex-wrap gap-2"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            {achievements.map((achievement, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={menuItemVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[9px] font-medium text-amber-400/80 border border-amber-500/20 cursor-pointer"
              >
                <span className="h-1 w-1 rounded-full bg-amber-400" />
                {achievement}
              </motion.span>
            ))}
          </motion.div>

          {/* Social Links with Pop Animation */}
          <motion.div className="mt-5">
            <h5 className="text-[10px] font-semibold uppercase tracking-wider text-amber-400/70 mb-2">Follow Us</h5>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, color }, index) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  custom={index}
                  variants={socialIconVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  whileTap="tap"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 cursor-pointer"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                  }}
                >
                  <Icon className="h-3.5 w-3.5 text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div className="mt-5 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.span 
                key={i} 
                className="h-0.5 w-0.5 rounded-full bg-amber-500/40" 
                style={{ opacity: 1 - i * 0.15 }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ 
                  scale: 1, 
                  opacity: 1 - i * 0.15,
                  transition: { duration: 0.3, delay: i * 0.05 }
                }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1 - i * 0.15, 1 - i * 0.1, 1 - i * 0.15],
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-3"
        >
          <motion.h4 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-amber-400 mb-3"
          >
            Quick Links
          </motion.h4>
          <motion.div 
            variants={lineVariants}
            className="w-10 h-[2px] bg-amber-500/60 mb-4"
          />
          <ul className="space-y-2">
            {navLinks.map((l, idx) => (
              <motion.li 
                key={l.to}
                custom={idx}
                variants={menuItemVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
              >
                <Link
                  to={l.to}
                  className="group flex items-center gap-2 text-xs text-stone-400 transition-colors duration-200"
                >
                  <span className="h-px w-2 bg-amber-500/40 transition-all duration-200 group-hover:w-4 group-hover:bg-amber-400" />
                  {t(l.key)}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact info - Expanded */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-4"
        >
          <motion.h4 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-amber-400 mb-3"
          >
            Get in Touch
          </motion.h4>
          <motion.div 
            variants={lineVariants}
            className="w-10 h-[2px] bg-amber-500/60 mb-4"
          />
          <ul className="space-y-3">
            {contact.map(({ Icon, val }, idx) => (
              <motion.li 
                key={val} 
                custom={idx}
                variants={contactItemVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                className="flex items-start gap-2 cursor-pointer"
              >
                <motion.div
                  whileHover={{ x: 5 }}
                  className="mt-0.5"
                >
                  <Icon className="h-3 w-3 text-amber-400 shrink-0" />
                </motion.div>
                <span className="text-xs leading-relaxed text-stone-400">{val}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div 
        className="relative border-t border-white/[0.06] bg-black/20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="container-narrow flex flex-col items-center justify-between gap-4 py-4 text-xs text-stone-500 sm:flex-row">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-gray-400 text-xs text-center"
          >
            © {new Date().getFullYear()} Pratap Saraswati Vidya Mandir · {t("footer.copyright") || "All rights reserved"}
          </motion.p>
          
          <motion.div className="flex gap-5">
            <motion.span whileHover={{ color: "#78716c" }}>
              <Link to="/privacy" className="text-xs">Privacy Policy</Link>
            </motion.span>
            <motion.span whileHover={{ color: "#78716c" }}>
              <Link to="/terms" className="text-xs">Terms of Use</Link>
            </motion.span>
          </motion.div>
          
          <motion.button
            variants={scrollButtonVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            whileTap="tap"
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full bg-amber-500/20 hover:bg-amber-500/40 flex items-center justify-center shadow-lg transition-all duration-300 border border-amber-500/40"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-3.5 w-3.5 text-amber-400" />
          </motion.button>
        </div>
      </motion.div>

      {/* Animated bottom line */}
      <motion.div
        variants={pulseVariants}
        animate="animate"
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-28 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full"
      />
    </motion.footer>
  );
};