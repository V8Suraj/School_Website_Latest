import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform , AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react"; // ADDED for mobile carousel
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { MandalaBg } from "@/components/MandalaBg";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BookOpen, FlaskConical, Palette, Trophy, Award, Sparkles, ArrowRight,
  Megaphone, FileText, Wallet, CalendarDays, Star, ChevronRight, Users,
} from "lucide-react";
// import heroHome from "@/assets/hero-home.jpg";
import homeherobg from "../assets/homeherobg.png"
import horse from "../assets/horse.png"
import heroVideo from "@/assets/herosection.mp4";
import heroHomeMobile from "@/assets/mobilevertficateimage.png";
import heroAbout from "@/assets/aboutus.png";
import heroAcademics from "@/assets/acdemics.png";
import heroAdmissions from "@/assets/admission.png";
import heroCalendar from "@/assets/calenderpage.png";
import heroContact from "@/assets/conatctus.png";
import heroHero from "@/assets/hero-home.jpg";
import schoolHome from "@/assets/schoolhome.png";
import { announcements, calendarEvents } from "@/data/schoolData";

// ─── static data (icons/colors are language-independent) ──────────────────────
const featureIcons = [BookOpen, FlaskConical, Palette, Trophy];
const featureKeys = [
  { title: "home.feat1.title", desc: "home.feat1.desc" },
  { title: "home.feat2.title", desc: "home.feat2.desc" },
  { title: "home.feat3.title", desc: "home.feat3.desc" },
  { title: "home.feat4.title", desc: "home.feat4.desc" },
];

const stats = [
  { value: 20,   suffix: "+",  label: "home.stat1.label" },
  { value: 2400, suffix: "",   label: "home.stat2.label", group: true },
  { value: 180,  suffix: "+",  label: "home.stat3.label" },
  { value: 98,   suffix: "%",  label: "home.stat4.label" },
];

const quickLinkDefs = [
  { to: "/notices",    icon: FileText,     labelKey: "home.ql1.label", subKey: "home.ql1.sub", color: "from-orange-500 to-red-500" },
  { to: "/fees",       icon: Wallet,       labelKey: "home.ql2.label", subKey: "home.ql2.sub", color: "from-yellow-500 to-orange-500" },
  { to: "/calendar",   icon: CalendarDays, labelKey: "home.ql3.label", subKey: "home.ql3.sub", color: "from-orange-400 to-amber-500" },
  { to: "/admissions", icon: BookOpen,     labelKey: "home.ql4.label", subKey: "home.ql4.sub", color: "from-amber-500 to-orange-600" },
];

const testimonialKeys = [
  { name: "home.test1.name", role: "home.test1.role", text: "home.test1.text" },
  { name: "home.test2.name", role: "home.test2.role", text: "home.test2.text" },
  { name: "home.test3.name", role: "home.test3.role", text: "home.test3.text" },
];

const galleryItems = [
  { src: heroHero,       labelKey: "home.gallery.l1", sanskrit: "विद्यालयः सर्वेषां गृहम्" },
  { src: heroAcademics,  labelKey: "home.gallery.l2", sanskrit: "ज्ञानं परमं बलम्" },
  { src: heroAdmissions, labelKey: "home.gallery.l3", sanskrit: "प्रवेशः नवजीवनस्य द्वारम्" },
  { src: heroCalendar,   labelKey: "home.gallery.l4", sanskrit: "उत्सवः जीवनस्य सारः" },
  { src: heroContact,    labelKey: "home.gallery.l5", sanskrit: "सङ्घे शक्तिः कलौ युगे" },
  { src: heroAbout,      labelKey: "home.gallery.l6", sanskrit: "शरीरमाद्यं खलु धर्मसाधनम्" },
  { src: schoolHome,     labelKey: "home.gallery.l7", sanskrit: "गृहं हि प्रथमा पाठशाला" },
];

// ─── animated counter ──────────────────────────────────────────────────────────
const AnimatedCounter = ({ end, duration = 1.6, suffix = "", group = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frameId = 0;
    let startTime = 0;
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / (duration * 1000), 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(end * eased));
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [duration, end, isInView]);

  const display = group ? count.toLocaleString("en-IN") : String(count);
  return <span ref={ref}>{display}{suffix}</span>;
};

// ─── page ──────────────────────────────────────────────────────────────────────
const Index = () => {
  const { language, t } = useLanguage();

  // ADDED: Carousel setup for mobile features section
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "start",
    loop: true,
    skipSnaps: false,
  });
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    
    emblaApi.on("select", onSelect);
    onSelect();
    
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // ADDED: Auto-scroll effect for mobile carousel
  useEffect(() => {
    if (!emblaApi) return;
    
    const interval = setInterval(() => {
      if (!emblaApi.canScrollNext()) {
        emblaApi.scrollTo(0);
      } else {
        emblaApi.scrollNext();
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [emblaApi]);
  // END OF ADDED CODE

  return (
    <>
      {/* ── Hero ── */}
{/* ── Hero ── */}
<PageHero
  title={t("home.heroTitle")}
  sanskrit="॥ विद्यया अमृतमश्नुते ॥"
  subtitle={t("home.heroSubtitle")}
  image={homeherobg}
  mobileImage={heroHomeMobile}
  imageFit="cover"
  imagePosition="center center"
  size="full"
  className="relative"
>
  {/* Horse image - behind everything with transparency */}
  <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
    <img
      src={horse}
      alt="Horse"
      className="absolute left-[5%] bottom-[34%] w-[48vw] max-w-[820px] min-w-[360px] object-contain opacity-40"
    />
  </div>
  
  {/* Stronger overlay to darken the horse area and improve text contrast */}
  <div className="absolute inset-0 pointer-events-none z-[5] bg-gradient-to-r from-black/70 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/60 md:via-black/30 md:to-transparent" />
  
  {/* Buttons */}
  <div className="relative z-10 flex flex-wrap justify-center gap-4">
    <Button asChild variant="hero" size="xl">
      <Link to="/admissions">
        {t("home.beginJourney")}
        <ArrowRight className={`h-5 w-5 ${language === "hi" ? "hidden" : ""}`} />
      </Link>
    </Button>
    <Button asChild variant="hero" size="xl" className="opacity-90 hover:opacity-100">
      <Link to="/about">{t("home.discoverUs")}</Link>
    </Button>
  </div>
</PageHero>

      {/* ── Stats ── */}
      <section className="container-narrow mt-10 md:mt-14 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { ...stats[0], icon: Trophy,      gradient: "from-orange-500 to-amber-500" },
            { ...stats[1], icon: Users,        gradient: "from-amber-500 to-yellow-500" },
            { ...stats[2], icon: BookOpen,     gradient: "from-orange-600 to-red-500"  },
            { ...stats[3], icon: Award,        gradient: "from-amber-600 to-orange-500"},
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
              className="relative overflow-hidden rounded-2xl border border-gold/25 bg-card shadow-soft hover:shadow-warm transition-shadow duration-300 cursor-default"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-festive" />
              {/* background icon watermark */}
              <div className="absolute -right-3 -bottom-3 opacity-[0.06] pointer-events-none">
                <s.icon className="h-20 w-20 text-primary" />
              </div>
              {/* animated ring */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="h-24 w-24 rounded-full border border-primary/8 animate-[ring-pulse_3s_ease-out_infinite]" style={{ animationDelay: `${i * 0.4}s` }} />
              </div>
              <div className="relative p-6 text-center">
                {/* icon badge */}
                <div className={`mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.gradient} text-white shadow-sm`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient-saffron">
                  <AnimatedCounter end={s.value} suffix={s.suffix} group={s.group || false} />
                </div>
                <div className="mt-1.5 text-sm font-medium text-muted-foreground">{t(s.label)}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Announcements + Upcoming Events ── */}
      <section className="container-narrow mt-10 grid gap-6 md:grid-cols-2">
        {/* Announcements */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-3xl border border-gold/20 bg-card shadow-soft"
        >
          <div className="bg-gradient-festive px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20"
              >
                <Megaphone className="h-4 w-4 text-white" />
              </motion.div>
              <div>
                <h3 className="font-display text-lg font-bold text-white leading-tight">{t("home.announcements.title")}</h3>
                <p className="text-[11px] text-white/75">{t("home.announcements.sub")}</p>
              </div>
            </div>
            <Link to="/notices" className="flex items-center gap-1 text-xs text-white/90 hover:text-white transition-colors">
              {t("home.announcements.viewAll")} <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <ul className="divide-y divide-gold/10">
            {announcements.slice(0, 4).map((a, i) => (
              <motion.li
                key={a.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex items-start gap-4 px-5 py-4 hover:bg-muted/30 transition-colors"
              >
                <div className="shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-display font-bold text-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground/90 leading-snug">{language === "hi" && a.titleHi ? a.titleHi : a.title}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                      a.category === "Urgent" ? "bg-orange-100 text-orange-600" :
                      a.category === "Exam"   ? "bg-amber-100 text-amber-700" :
                      a.category === "Event"  ? "bg-orange-50 text-orange-500" :
                      "bg-primary/10 text-primary"
                    }`}>{a.category}</span>
                    <span className="text-[11px] text-muted-foreground">{a.date}</span>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-3xl border border-gold/20 bg-card shadow-soft"
        >
          <div className="bg-gradient-festive px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
                <CalendarDays className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white leading-tight">{t("home.events.title")}</h3>
                <p className="text-[11px] text-white/75">{t("home.events.sub")}</p>
              </div>
            </div>
            <Link to="/calendar" className="flex items-center gap-1 text-xs text-white/90 hover:text-white transition-colors">
              {t("home.events.viewAll")} <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <ul className="divide-y divide-gold/10">
            {calendarEvents.slice(0, 4).map((e, i) => {
              const d = new Date(e.date);
              const COLORS = {
                Exam: "bg-orange-500", Result: "bg-amber-500", Holiday: "bg-yellow-500",
                Meeting: "bg-orange-400", Event: "bg-amber-600", Leave: "bg-orange-300",
              };
              return (
                <motion.li
                  key={e.id}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="shrink-0 w-14 text-center rounded-xl border border-gold/20 bg-gradient-to-b from-primary/10 to-gold/10 py-2">
                    <div className="font-display text-2xl font-bold text-primary leading-none">{d.getDate()}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">
                      {d.toLocaleString("en-IN", { month: "short" })}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground/90 leading-snug truncate">{e.title}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className={`inline-block h-2 w-2 rounded-full ${COLORS[e.category] || "bg-gray-400"}`} />
                      <span className="text-[11px] font-medium text-muted-foreground">{e.category}</span>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </section>

      {/* ── Quick Links ── */}
      <section className="container-narrow mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinkDefs.map(({ to, icon: Icon, labelKey, subKey, color }, i) => (
          <motion.div
            key={to}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to={to}
              className="group relative overflow-hidden rounded-2xl border border-gold/20 bg-card p-5 shadow-soft hover:shadow-warm hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${color}`} />
              {/* shimmer on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="font-display font-semibold text-secondary text-sm">{t(labelKey)}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{t(subKey)}</div>
              <div className="mt-3 flex items-center gap-1 text-[10px] font-semibold text-primary/60 uppercase tracking-widest group-hover:text-primary transition-colors">
                View <ChevronRight className="h-3 w-3" />
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* ── Features ── */}
      {/* UPDATED: Added mobile carousel with auto-scroll */}
      <section className="container-narrow py-24 relative overflow-hidden">
        <MandalaBg className="absolute -right-64 -top-20 h-[30rem] w-[30rem] opacity-35 hidden lg:block z-0" />
        <div className="relative z-10">
          <SectionHeader
            eyebrow="॥ विद्यालय विशेषता ॥"
            title={t("home.features.title")}
            subtitle={t("home.features.sub")}
          />
        </div>
        
        {/* Desktop: Grid layout - unchanged */}
        <div className="hidden md:grid relative z-10 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featureKeys.map((k, i) => {
            const Icon = featureIcons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group relative h-full overflow-hidden rounded-3xl border border-gold/20 bg-card/90 shadow-soft hover:shadow-warm hover:border-gold/40 transition-all duration-300"
              >
                <div className="h-2 w-full bg-gradient-festive" />
                {/* animated dot pattern bg */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundImage: "radial-gradient(hsl(22 88% 52% / 0.06) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                {/* radial glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_90%_10%,hsl(43_88%_55%/0.14),transparent_48%)]" />
                {/* shimmer */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none" />
                <div className="relative z-10 flex h-full flex-col p-7">
                  <div className="flex items-start justify-between gap-4">
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-saffron text-primary-foreground shadow-gold group-hover:shadow-warm transition-shadow duration-300"
                    >
                      <Icon className="h-7 w-7 drop-shadow-[0_1px_0_hsl(0_0%_100%/0.25)]" />
                    </motion.div>
                    <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl md:text-[1.65rem] text-secondary leading-tight">
                    {t(k.title)}
                  </h3>
                  <p className="mt-3 text-sm md:text-[0.98rem] leading-relaxed text-muted-foreground">
                    {t(k.desc)}
                  </p>
                  <div className="mt-auto pt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                    <span>{t("home.features.schoolLife")}</span>
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: Auto-scrolling Carousel - NEW ADDITION */}
      <div className="md:hidden relative w-full overflow-hidden">
  <div className="overflow-hidden w-full" ref={emblaRef}>
    <div className="flex">
      {featureKeys.map((k, i) => {
        const Icon = featureIcons[i];

        return (
          <div
            key={i}
            className="basis-[85%] shrink-0 px-2"
          >
            <div className="group relative w-full h-full overflow-hidden rounded-3xl border border-gold/20 bg-card/90 shadow-soft transition-all duration-300">
              
              {/* Top Gradient */}
              <div className="h-2 w-full bg-gradient-festive" />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col p-4">

                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-saffron text-primary-foreground shadow-gold">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="shrink-0 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-5 text-lg leading-snug font-display text-secondary break-words">
                  {t(k.title)}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground break-words whitespace-normal max-w-full overflow-hidden">
                  {t(k.desc)}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/80">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                  <span className="whitespace-nowrap">
                    {t("home.features.schoolLife")}
                  </span>

                  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                </div>

              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>


          {/* Dots indicator for mobile carousel */}
          <div className="flex justify-center gap-2 mt-6">
            {featureKeys.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  selectedIndex === idx ? "w-6 bg-primary" : "bg-primary/30"
                }`}
                onClick={() => emblaApi?.scrollTo(idx)}
              />
            ))}
          </div>
        </div>
        {/* END OF UPDATED SECTION */}
      </section>

      {/* ── Gallery Marquee ── */}
      <section className="pt-4 pb-12 bg-background overflow-hidden">
        <div className="container-narrow mb-8">
          <SectionHeader
            eyebrow="॥ विद्यालय जीवनम् ॥"
            title={t("home.gallery.title")}
            subtitle={t("home.gallery.sub")}
          />
        </div>

        {/* Two rows scrolling in opposite directions */}
        <div className="flex flex-col gap-4">
          {/* Row 1 — scrolls left */}
          <div
            className="relative flex overflow-hidden"
            style={{ maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)" }}
          >
            <div
              className="flex gap-4 animate-[gallery-scroll_40s_linear_infinite]"
              style={{ width: "max-content" }}
            >
              {[...galleryItems, ...galleryItems].map((item, i) => (
                <div
                  key={i}
                  className="relative w-[300px] h-52   md:w-[420px] md:h-64 shrink-0 rounded-2xl overflow-hidden border border-gold/20 shadow-soft group cursor-pointer"
                >
                  <img
                    src={item.src}
                    alt={t(item.labelKey)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 px-5 py-4">
                    <p className="font-sanskrit text-xs text-amber-300/80 mb-1">{item.sanskrit}</p>
                    <p className="font-display text-base font-semibold text-white drop-shadow-md">{t(item.labelKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right (reverse) */}
          <div
            className="relative flex overflow-hidden"
            style={{ maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)" }}
          >
            <div
              className="flex gap-4 animate-[gallery-scroll_40s_linear_infinite_reverse]"
              style={{ width: "max-content" }}
            >
              {[...galleryItems.slice().reverse(), ...galleryItems.slice().reverse()].map((item, i) => (
                <div
                  key={i}
                  className="relative w-[240px] h-42  md:w-[340px] md:h-52 shrink-0 rounded-2xl overflow-hidden border border-gold/20 shadow-soft group cursor-pointer"
                >
                  <img
                    src={item.src}
                    alt={t(item.labelKey)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
                    <p className="font-display text-sm font-semibold text-white drop-shadow-md">{t(item.labelKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Cultural callout ── */}
      <section className="relative bg-gradient-festive text-primary-foreground overflow-hidden">
        <MandalaBg className="absolute -left-32 -top-32 w-[500px] h-[500px] opacity-20" />
        <MandalaBg className="absolute -right-40 -bottom-40 w-[500px] h-[500px] opacity-20" spin={false} />
        {/* floating sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-gold/60 text-lg select-none pointer-events-none"
            style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
            transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.5 }}
          >✦</motion.div>
        ))}
        <div className="container-narrow relative py-20 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Sparkles className="h-10 w-10 text-gold mx-auto mb-5 animate-flame" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-sanskrit text-2xl md:text-4xl mb-4 text-amber-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] font-bold"
          >
            असतो मा सद्गमय । तमसो मा ज्योतिर्गमय ।
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-lg md:text-xl max-w-2xl mx-auto opacity-90"
          >
            {t("home.cultural.quote")}
          </motion.p>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="container-narrow py-24">
        <SectionHeader eyebrow="॥ अनुभवाः ॥" title={t("home.testimonials.title")} subtitle={t("home.testimonials.sub")} />
  <div className="grid md:grid-cols-3 gap-6">
  {testimonialKeys.map((tk, i) => (
    <motion.div
      key={i}

      /* SAME SMOOTH ENTRY ANIMATION */
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}

      viewport={{ once: true, amount: 0.05 }}

      transition={{
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}

      /* SAME HOVER LIFT */
      whileHover={{
        y: -8,
        transition: { duration: 0.25 },
      }}

      className="group relative flex flex-col overflow-hidden rounded-3xl border border-gold/25 bg-card shadow-soft hover:shadow-warm transition-shadow duration-300"
    >
      {/* Top Gradient */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: i * 0.15 + 0.2,
          duration: 0.5,
        }}
        className="h-1.5 w-full origin-left bg-gradient-festive"
      />

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: i * 0.15 + 0.25,
          duration: 0.4,
        }}
        className="absolute top-6 right-6 font-display text-[7rem] leading-none text-primary/[0.06] select-none pointer-events-none"
      >
        "
      </motion.div>

      <div className="flex flex-col flex-1 p-7">

        {/* Stars */}
        <div className="flex gap-1 mb-5">
          {[...Array(5)].map((_, s) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.15 + s * 0.06,
                duration: 0.3,
              }}
            >
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            </motion.div>
          ))}
        </div>

        {/* Review Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: i * 0.15 + 0.3,
            duration: 0.45,
          }}
          className="flex-1 text-[0.95rem] leading-relaxed text-foreground/80 italic mb-8"
        >
          "{t(tk.text)}"
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: i * 0.15 + 0.35,
            duration: 0.45,
          }}
          className="h-px w-full origin-left bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-5"
        />

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: i * 0.15 + 0.4,
            duration: 0.45,
          }}
          className="flex items-center gap-4"
        >
          <div className="relative shrink-0">

            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-saffron text-primary-foreground font-display text-lg font-bold shadow-gold ring-2 ring-gold/20"
            >
              {(t(tk.name) || "A").charAt(0)}
            </motion.div>

            {/* Verified Badge */}
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
              className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 ring-2 ring-card"
            >
              <svg
                className="h-2.5 w-2.5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.span>
          </div>

          {/* User Info */}
          <div>
            <p className="font-display font-semibold text-secondary text-sm leading-tight">
              {t(tk.name) || "Anonymous"}
            </p>

            <p className="text-xs text-muted-foreground mt-0.5">
              {t(tk.role) || "Community Member"}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  ))}
</div>
      </section>

      {/* ── CTA ── */}
      <section className="container-narrow pb-7 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-gradient-festive p-6 md:p-16 text-secondary shadow-temple ornate-frame"
        >
          <MandalaBg className="absolute -right-20 -top-20 w-80 h-80 opacity-40" />
          <MandalaBg className="absolute -left-16 bottom-0 w-64 h-64 opacity-20" spin={false} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,hsl(43_95%_88%/0.35),transparent_55%),radial-gradient(ellipse_at_80%_80%,hsl(22_88%_52%/0.15),transparent_45%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

          <div className="relative flex flex-col items-center text-center">
            <motion.div
              animate={{ scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/30 border border-white/40 shadow-warm backdrop-blur-sm"
            >
              <Award className="h-7 w-7 text-secondary" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-white/25 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-secondary/80 uppercase backdrop-blur-sm"
            >
              ✦ Admissions Open 2026–27 ✦
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-display text-2xl md:text-5xl font-bold  mb-3 md:mb-4 text-secondary"
            >
              {t("home.cta.title")}
              
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-md md:text-xl text-secondary/80 mb-5 md:mb-8 max-w-lg leading-relaxed"
            >
              {t("home.cta.sub")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button asChild size="lg"
                className="bg-secondary text-primary-foreground hover:bg-secondary/90 shadow-[0_4px_20px_hsl(22_88%_30%/0.35)] hover:shadow-[0_6px_28px_hsl(22_88%_30%/0.45)] transition-all duration-300 font-semibold hover:scale-105"
              >
                <Link to="/admissions">{t("home.cta.apply")}</Link>
              </Button>
              <Button asChild size="lg"
                className="border-2 border-secondary/40 bg-white/25 text-secondary hover:bg-white/40 backdrop-blur-sm font-semibold transition-all duration-300 hover:scale-105"
              >
                <Link to="/contact">{t("home.cta.contact")}</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Index;

