import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { MandalaBg } from "@/components/MandalaBg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import Holistic from "../assets/Holistic.png";
import HolisticDev from "../assets/HolisticDev.webp";
import ExpertFaculty from "../assets/ExpertFaculty.jpg";
import RichCurriculum from "../assets/Rich Curriculum.jpg";
import ProvenExcellence from "../assets/Proven Excellence.webp";
import {
  Clock,
  MessageCircle,
  GraduationCap,
  Building,
} from "lucide-react";
import {
  Heart, Users, BookOpen, Trophy,
  ArrowRight, CheckCircle2, Sparkles, Phone, Mail, ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import heroAdmissions from "@/assets/admission.png";

/* ─── Static config (icons / colours only) ─────────────── */

const stepsMeta = [
  {
    num: "01", devanagari: "१",
    accent: "hsl(38 95% 58%)",
    accentMuted: "hsl(38 95% 58% / 0.12)",
    accentBorder: "hsl(38 95% 58% / 0.35)",
    iconBg: "from-amber-400 to-orange-500",
  },
  {
    num: "02", devanagari: "२",
    accent: "hsl(22 88% 52%)",
    accentMuted: "hsl(22 88% 52% / 0.10)",
    accentBorder: "hsl(22 88% 52% / 0.30)",
    iconBg: "from-primary to-orange-400",
  },
  {
    num: "03", devanagari: "३",
    accent: "hsl(22 88% 52%)",
    accentMuted: "hsl(22 88% 52% / 0.10)",
    accentBorder: "hsl(22 88% 52% / 0.30)",
    iconBg: "from-orange-500 to-amber-500",
  },
  {
    num: "04", devanagari: "४",
    accent: "hsl(43 78% 52%)",
    accentMuted: "hsl(43 78% 52% / 0.12)",
    accentBorder: "hsl(43 78% 52% / 0.35)",
    iconBg: "from-gold to-amber-400",
  },
];

const whyMeta = [
  { icon: Heart, image: HolisticDev, stat: "100%", color: "from-primary to-orange-400" },
  { icon: Users, image: ExpertFaculty, stat: "40+", color: "from-amber-500 to-orange-500" },
  { icon: BookOpen, image: RichCurriculum, stat: "CBSE", color: "from-amber-600 to-primary" },
  { icon: Trophy, image: ProvenExcellence, stat: "98%", color: "from-gold to-amber-500" },
];

const docKeys = ["doc1", "doc2", "doc3", "doc4", "doc5", "doc6"];
const faqCount = [1, 2, 3, 4, 5, 6, 7];

/* ─── FAQ Item ──────────────────────────────────────────── */
const faqIcons = ["🎓", "📝", "📋", "💰", "👥", "📅", "🚌"];

const FaqItem = ({ question, answer, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div
        className={`relative overflow-hidden rounded-2xl border transition-all duration-400 ${open
            ? "border-primary/40 bg-white shadow-[0_8px_32px_hsl(22_88%_52%/0.12)]"
            : "border-gold/20 bg-white/80 hover:border-gold/40 hover:bg-white shadow-[0_2px_12px_hsl(43_78%_52%/0.07)] hover:shadow-[0_4px_20px_hsl(43_78%_52%/0.13)]"
          }`}
      >
        {/* Left accent bar — only visible when open */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-gold to-amber-400 transition-all duration-400 rounded-l-2xl ${open ? "opacity-100" : "opacity-0"
            }`}
        />

        {/* Question row */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center gap-4 px-5 py-5 md:px-6 text-left"
        >
          {/* Number + emoji badge */}
          <div className={`shrink-0 flex flex-col items-center justify-center h-11 w-11 rounded-xl border transition-all duration-300 ${open
              ? "bg-gradient-to-br from-primary to-orange-400 border-transparent text-white shadow-[0_4px_12px_hsl(22_88%_52%/0.35)]"
              : "bg-gold/8 border-gold/25 text-primary group-hover:border-gold/50"
            }`}>
            <span className="text-base leading-none">{faqIcons[index]}</span>
            <span className={`text-[9px] font-bold tracking-wider mt-0.5 ${open ? "text-white/80" : "text-primary/60"}`}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Question text */}
          <span className={`flex-1 font-display text-sm md:text-base lg:text-lg leading-snug transition-colors duration-200 ${open ? "text-primary" : "text-secondary group-hover:text-primary/80"
            }`}>
            {question}
          </span>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`shrink-0 h-7 w-7 rounded-full flex items-center justify-center border transition-all duration-300 ${open
                ? "bg-primary/10 border-primary/30 text-primary"
                : "border-gold/25 text-muted-foreground group-hover:border-gold/50"
              }`}
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </motion.div>
        </button>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="pl-[4.25rem] pr-5 md:pr-6 pb-5 pt-0">
                {/* Thin gold rule */}
                <div className="h-px w-full bg-gradient-to-r from-primary/20 via-gold/30 to-transparent mb-4" />
                <p className="text-sm md:text-[0.95rem] text-muted-foreground leading-relaxed">
                  {answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ─── Component ─────────────────────────────────────────── */
const Admissions = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const { t } = useLanguage();

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ parent: "", child: "", email: "", phone: "", grade: "", message: "" });
  const [errors, setErrors] = useState({});
  const [validFields, setValidFields] = useState({});

  const validateField = (name, value) => {
    if (name === "email") {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setValidFields((p) => ({ ...p, [name]: ok && value.length > 0 }));
      setErrors((p) => ({ ...p, [name]: !ok && value.length > 0 }));
    } else if (name === "phone") {
      const ok = /^[\d\s+\-()]{10,}$/.test(value);
      setValidFields((p) => ({ ...p, [name]: ok }));
      setErrors((p) => ({ ...p, [name]: !ok && value.length > 0 }));
    } else {
      setValidFields((p) => ({ ...p, [name]: value.trim().length > 0 }));
      setErrors((p) => ({ ...p, [name]: false }));
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((p) => ({ ...p, [id]: value }));
    validateField(id, value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1800));
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success("Application received! We'll be in touch soon. 🪔");
  };

  const isFormValid =
    Object.keys(formData).filter((k) => k !== "message")
      .every((k) => formData[k].trim().length > 0) &&
    !Object.values(errors).some(Boolean);

  return (
    <>
      <PageHero
        title={t("admissions.heroTitle")}
        sanskrit="॥ स्वागतम् ॥"
        subtitle={t("admissions.heroSubtitle")}
        image={heroAdmissions}
        size="full"
      />

      {/* ── Process Steps ── */}
      <section className="relative py-24 overflow-hidden">
        {/* Light warm background */}
        <div className="absolute inset-0 bg-[hsl(38_55%_95%)]" />
        {/* Faint dot texture */}
        <div className="absolute inset-0 opacity-[0.045]"
          style={{ backgroundImage: "radial-gradient(hsl(22 88% 45%) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />
        {/* Gold rules */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <div className="container-narrow relative z-10">

          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-sanskrit text-xs tracking-[0.22em] text-primary mb-5">
              {t("admissions.stepsEyebrow")}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-secondary leading-tight">
              {t("admissions.stepsTitle")}
            </h2>
            <div className="mt-5 flex items-center justify-center gap-3">
              <span className="h-px w-20 bg-gradient-to-r from-transparent to-gold/60" />
              <span className="text-primary text-base">✦</span>
              <span className="h-px w-20 bg-gradient-to-l from-transparent to-gold/60" />
            </div>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto leading-relaxed text-base">
              {t("admissions.stepsSubtitle")}
            </p>
          </div>

          {/* Step Cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stepsMeta.map((s, i) => (
              <div
                key={i}
                className="group relative flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_hsl(43_78%_52%/0.22)]"
                style={{
                  borderColor: s.accentBorder,
                  boxShadow: `0 4px 16px hsl(43 78% 52% / 0.08)`,
                }}
              >
                {/* Accent top bar — widens on hover */}
                <div
                  className="h-[3px] w-full shrink-0 transition-all duration-300 group-hover:h-[5px]"
                  style={{ background: `linear-gradient(90deg, ${s.accent}, transparent)` }}
                />

                {/* Warm saffron wash on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${s.accentMuted}, transparent 72%)` }}
                />

                {/* Bottom accent line slides in on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: `linear-gradient(90deg, ${s.accent}, transparent)` }}
                />

                <div className="relative z-10 flex flex-col flex-1 p-6">
                  {/* Top row: step number + devanagari */}
                  <div className="flex items-start justify-between mb-5">
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-[0.2em] uppercase border transition-all duration-300 group-hover:shadow-sm"
                      style={{ background: s.accentMuted, borderColor: s.accentBorder, color: s.accent }}
                    >
                      STEP {s.num}
                    </span>
                    {/* Devanagari numeral brightens on hover */}
                    <span
                      className="font-sanskrit text-3xl font-bold leading-none transition-all duration-300 group-hover:opacity-60 group-hover:scale-110"
                      style={{ color: s.accent, opacity: 0.2 }}
                    >
                      {s.devanagari}
                    </span>
                  </div>

                  {/* Icon — scales and gets a soft glow ring on hover */}
                  <div className="relative mb-5 w-fit">
                    {/* Glow blur behind icon */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-40 blur-md scale-125 transition-opacity duration-300"
                      style={{ background: `linear-gradient(135deg, ${s.accent}, transparent)` }}
                    />
                    <div className={`relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.iconBg} text-white shadow-gold transition-transform duration-300 group-hover:scale-110`}>
                      {i === 0 && (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z" />
                        </svg>
                      )}
                      {i === 1 && (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                      {i === 2 && (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                      {i === 3 && (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Title — shifts to accent colour on hover */}
                  <h3
                    className="font-display text-xl mb-2 leading-snug transition-colors duration-300 group-hover:text-primary"
                    style={{ color: "hsl(var(--secondary))" }}
                  >
                    {t(["admissions.step1Title", "admissions.step2Title", "admissions.step3Title", "admissions.step4Title"][i])}
                  </h3>

                  {/* Divider — expands on hover */}
                  <div
                    className="h-px mb-3 transition-all duration-300 w-8 group-hover:w-14"
                    style={{ background: s.accent, opacity: 0.5 }}
                  />

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {t(["admissions.step1Desc", "admissions.step2Desc", "admissions.step3Desc", "admissions.step4Desc"][i])}
                  </p>

                  {/* Connector arrow (not last, desktop) */}
                  {i < stepsMeta.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 h-6 w-6 items-center justify-center rounded-full border border-gold/30 bg-white shadow-soft transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_2px_8px_hsl(22_88%_52%/0.2)]">
                      <svg className="h-3 w-3 text-primary/60" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom badge */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-white px-5 py-2 text-xs font-medium text-primary shadow-[0_2px_8px_hsl(43_78%_52%/0.12)]">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              Entire process takes 2–3 weeks
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
            </span>
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold/40" />
          </div>

        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-temple" />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(hsl(22 88% 45%) 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Borders */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <div className="container-narrow relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2 font-sanskrit text-xs tracking-[0.22em] text-primary mb-6 backdrop-blur-sm shadow-sm">
              ✦ {t("admissions.whyEyebrow")}
            </span>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-secondary leading-tight tracking-tight">
              {t("admissions.whyTitle")}
            </h2>

            <div className="mt-6 flex items-center justify-center gap-4">
              <span className="h-px w-24 bg-gradient-to-r from-transparent to-gold/60" />
              <span className="text-primary text-lg">✦</span>
              <span className="h-px w-24 bg-gradient-to-l from-transparent to-gold/60" />
            </div>

            <p className="mt-5 text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg">
              {t("admissions.whySubtitle")}
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {whyMeta.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.6,
                }}
                className="
                  max-w-[340px] mx-auto w-full
                  group relative h-full flex flex-col
                  overflow-hidden rounded-lg
                  border border-gold/20
                  bg-white/95 backdrop-blur-md
                  shadow-[0_10px_30px_rgba(0,0,0,0.05)]
                  hover:-translate-y-2
                  hover:border-gold/40
                  hover:shadow-[0_20px_50px_-12px_rgba(220,168,40,0.25)]
                  transition-all duration-500
                  hover:scale-[1.03]
                "
              >

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-orange-300/10 via-transparent to-amber-300/10 z-0" />

                {/* Image Area */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-50">

                  {item.image ? (
                    <>
                      <img
                        src={item.image}
                        alt="Feature"
                        className="
                          absolute inset-0 w-full h-full object-cover
                          group-hover:scale-110
                          transition-transform duration-700 ease-out
                        "
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent z-10" />

                      {/* Shine Effect */}
                      <div className="
                        absolute inset-0 opacity-0 group-hover:opacity-100
                        transition duration-700
                        bg-gradient-to-r from-transparent via-white/20 to-transparent
                        -translate-x-full group-hover:translate-x-full
                      " />
                    </>
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color}/10`} />
                  )}

                  {/* Top Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent z-20" />
                </div>

                {/* Content */}
                <div className="relative z-20 flex flex-col flex-grow px-7 pt-3 pb-7 -mt-2">

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-secondary mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
                    {
                      t(
                        [
                          "admissions.why1Title",
                          "admissions.why2Title",
                          "admissions.why3Title",
                          "admissions.why4Title",
                        ][i]
                      )
                    }
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground/90 leading-relaxed mb-6">
                    {
                      t(
                        [
                          "admissions.why1Desc",
                          "admissions.why2Desc",
                          "admissions.why3Desc",
                          "admissions.why4Desc",
                        ][i]
                      )
                    }
                  </p>

                  {/* Footer (Stats + Icon in Cart style) */}
                  <div className="mt-auto flex items-end justify-between border-t border-gold/15 pt-5">

                    {/* Stats */}
                    <div className="flex flex-col">
                      <span className="font-display text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500 leading-none mb-1">
                        {item.stat}
                      </span>

                      <span className="text-[10px] text-muted-foreground/80 font-bold uppercase tracking-[0.15em]">
                        {
                          t(
                            [
                              "admissions.why1StatLabel",
                              "admissions.why2StatLabel",
                              "admissions.why3StatLabel",
                              "admissions.why4StatLabel",
                            ][i]
                          )
                        }
                      </span>
                    </div>

                    {/* Add to Cart Style Icon Button */}
                    <div className="
                      relative flex items-center justify-center 
                      h-12 w-12 rounded-xl bg-gold/10 
                      border border-gold/20 text-primary 
                      shadow-sm overflow-hidden shrink-0 ml-2
                      group-hover:shadow-[0_8px_20px_rgba(220,168,40,0.3)]
                      transition-all duration-500
                    ">
                      {/* Hover Gradient Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Icon */}
                      <item.icon className="relative z-10 h-5 w-5 group-hover:text-white group-hover:scale-110 transition-all duration-500" />
                    </div>

                  </div>

                  {/* Accent Line */}
                  <div className="mt-6 h-[3px] w-14 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 group-hover:w-24 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Documents + Form ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[hsl(38_55%_95%)]" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(hsl(22 88% 45%) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <div className="container-narrow relative z-10">
          <div className="grid lg:grid-cols-5 gap-8 items-start">

            {/* Documents checklist */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-2 space-y-5"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-1">{t("admissions.docsLabel")}</p>
                <h3 className="font-display text-2xl md:text-3xl text-secondary">{t("admissions.docsTitle")}</h3>
                <div className="mt-3 h-px w-20 bg-gradient-to-r from-primary to-gold" />
              </div>
              <ul className="space-y-2.5">
                {docKeys.map((key, i) => (
                  <motion.li
                    key={key}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-3 rounded-xl bg-white border border-gold/20 px-4 py-3 shadow-[0_2px_8px_hsl(43_78%_52%/0.07)] hover:border-gold/40 hover:shadow-[0_4px_16px_hsl(43_78%_52%/0.12)] transition-all duration-200"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-saffron text-white mt-0.5">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm text-foreground/80">{t(["admissions.doc1", "admissions.doc2", "admissions.doc3", "admissions.doc4", "admissions.doc5", "admissions.doc6"][docKeys.indexOf(key)])}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Contact quick links */}
              <div className="rounded-2xl bg-gradient-festive text-primary-foreground p-6 shadow-warm overflow-hidden relative">
                <MandalaBg className="absolute -right-8 -bottom-8 w-32 h-32 opacity-15" spin={false} />
                <p className="font-display text-lg mb-4 relative z-10">{t("admissions.contactTitle")}</p>
                <div className="space-y-3 relative z-10">
                  <a href="tel:+919876543210" className="flex items-center gap-3 text-sm opacity-90 hover:opacity-100 transition-opacity">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20"><Phone className="h-4 w-4" /></div>
                    +91 98765 43210
                  </a>
                  <a href="mailto:admissions@psvidyamandir.in" className="flex items-center gap-3 text-sm opacity-90 hover:opacity-100 transition-opacity">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20"><Mail className="h-4 w-4" /></div>
                    admissions@psvidyamandir.in
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Application Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-3"
            >
              <div className="rounded-3xl border border-gold/25 bg-white shadow-temple overflow-hidden ornate-frame">
                <div className="h-1.5 w-full bg-gradient-festive" />
                <div className="p-8 md:p-10">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-12 text-center"
                      >
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-saffron text-white shadow-gold mb-6">
                          <CheckCircle2 className="h-10 w-10" />
                        </div>
                        <h3 className="font-display text-2xl text-secondary mb-3">{t("admissions.successTitle")}</h3>
                        <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">{t("admissions.successDesc")}</p>
                        <Button variant="outline" onClick={() => setSubmitted(false)} className="border-gold/40">
                          {t("admissions.successBtn")}
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onSubmit={onSubmit}
                        className="space-y-5"
                      >
                        <div>
                          <h3 className="font-display text-2xl text-secondary mb-1">{t("admissions.formTitle")}</h3>
                          <p className="text-sm text-muted-foreground">{t("admissions.formSubtitle")}</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="parent" className="text-sm font-medium">
                              {t("admissions.formParent")} <span className="text-primary">*</span>
                            </Label>
                            <Input id="parent" value={formData.parent} onChange={handleChange}
                              placeholder={t("admissions.formParentPlaceholder")}
                              className={`transition-all ${errors.parent ? "border-destructive" : validFields.parent ? "border-emerald-400" : ""}`}
                              required />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="child" className="text-sm font-medium">
                              {t("admissions.formChild")} <span className="text-primary">*</span>
                            </Label>
                            <Input id="child" value={formData.child} onChange={handleChange}
                              placeholder={t("admissions.formChildPlaceholder")}
                              className={`transition-all ${errors.child ? "border-destructive" : validFields.child ? "border-emerald-400" : ""}`}
                              required />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-sm font-medium">
                              {t("admissions.formEmail")} <span className="text-primary">*</span>
                            </Label>
                            <Input id="email" type="email" value={formData.email} onChange={handleChange}
                              placeholder={t("admissions.formEmailPlaceholder")}
                              className={`transition-all ${errors.email ? "border-destructive" : validFields.email ? "border-emerald-400" : ""}`}
                              required />
                            {errors.email && <p className="text-xs text-destructive">{t("admissions.formEmailError")}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="phone" className="text-sm font-medium">
                              {t("admissions.formPhone")} <span className="text-primary">*</span>
                            </Label>
                            <Input id="phone" type="tel" value={formData.phone} onChange={handleChange}
                              placeholder={t("admissions.formPhonePlaceholder")}
                              className={`transition-all ${errors.phone ? "border-destructive" : validFields.phone ? "border-emerald-400" : ""}`}
                              required />
                            {errors.phone && <p className="text-xs text-destructive">{t("admissions.formPhoneError")}</p>}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="grade" className="text-sm font-medium">
                            {t("admissions.formGrade")} <span className="text-primary">*</span>
                          </Label>
                          <div className="relative">
                            <select
                              id="grade"
                              value={formData.grade}
                              onChange={handleChange}
                              required
                              className={`w-full appearance-none rounded-md border bg-background px-3 py-2 pr-9 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-primary text-foreground ${errors.grade ? "border-destructive" : validFields.grade ? "border-emerald-400" : "border-input"
                                }`}
                            >
                              <option value="" disabled>Select Class (e.g. Class VI)</option>
                              <option value="Pre-K">Pre-K (Nursery)</option>
                              <option value="LKG">LKG</option>
                              <option value="UKG">UKG</option>
                              <option value="Grade 1">Grade 1</option>
                              <option value="Grade 2">Grade 2</option>
                              <option value="Grade 3">Grade 3</option>
                              <option value="Grade 4">Grade 4</option>
                              <option value="Grade 5">Grade 5</option>
                              <option value="Grade 6">Grade 6</option>
                              <option value="Grade 7">Grade 7</option>
                              <option value="Grade 8">Grade 8</option>
                              <option value="Grade 9">Grade 9</option>
                              <option value="Grade 10">Grade 10</option>
                              <option value="Grade 11 (Science)">Grade 11 – Science</option>
                              <option value="Grade 11 (Commerce)">Grade 11 – Commerce</option>
                              <option value="Grade 11 (Arts)">Grade 11 – Arts</option>
                              <option value="Grade 12 (Science)">Grade 12 – Science</option>
                              <option value="Grade 12 (Commerce)">Grade 12 – Commerce</option>
                              <option value="Grade 12 (Arts)">Grade 12 – Arts</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="message" className="text-sm font-medium">
                            {t("admissions.formMessage")}{" "}
                            <span className="text-muted-foreground text-xs">{t("admissions.formMessageOptional")}</span>
                          </Label>
                          <Textarea id="message" value={formData.message} onChange={handleChange}
                            rows={3} placeholder={t("admissions.formMessagePlaceholder")}
                            className="resize-none" />
                        </div>

                        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={!isFormValid || isSubmitting}>
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="inline-block h-4 w-4 border-2 border-white/40 border-t-white rounded-full"
                              />
                              {t("admissions.formSubmitting")}
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              {t("admissions.formSubmit")} <ArrowRight className="h-4 w-4" />
                            </span>
                          )}
                        </Button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(38_55%_95%)] to-white" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(hsl(22 88% 45%) 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }} />

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="container-narrow relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-5 py-2 font-sanskrit text-xs tracking-[0.25em] text-primary mb-5 shadow-sm backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {t("admissions.faqEyebrow")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-secondary leading-tight mb-5 tracking-tight">
              {t("admissions.faqTitle")}
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6 opacity-80">
              <span className="h-px w-20 bg-gradient-to-r from-transparent to-gold/60" />
              <span className="text-primary text-base">✦</span>
              <span className="h-px w-20 bg-gradient-to-l from-transparent to-gold/60" />
            </div>
            <p className="text-muted-foreground/90 leading-relaxed max-w-2xl mx-auto text-lg font-medium">
              {t("admissions.faqSubtitle")}
            </p>
          </motion.div>

          {/* FAQ Grid */}
          <div className="grid lg:grid-cols-[380px_1fr] gap-x-6 gap-y-12 items-start max-w-[1200px] mx-auto">

            {/* ── Left panel (Sticky Info Cards) ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, type: "spring", stiffness: 70 }}
              className="lg:sticky lg:top-32 space-y-4 w-full"
            >
              {/* Card 1 */}
              <div className="group rounded-2xl border border-gold/20 bg-white/90 backdrop-blur-md p-6 shadow-sm hover:shadow-md transition-all duration-500">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 border border-gold/20 text-primary mb-4 group-hover:scale-110 transition-transform duration-500">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="font-display text-secondary text-base font-bold mb-1.5">Still have questions?</h3>
                <p className="text-xs text-muted-foreground/80 mb-4">Our admissions team is happy to help you personally.</p>
                <a href="tel:+919876543210" className="inline-flex items-center gap-2.5 text-xs font-bold text-primary bg-gold/5 px-3 py-2 rounded-lg border border-gold/10">
                  <Phone className="h-3.5 w-3.5" /> +91 98765 43210
                </a>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl border border-gold/20 bg-white/90 backdrop-blur-md p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-secondary text-base font-bold">Office Hours</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    { day: "Mon – Fri", time: "9:00 AM – 5:00 PM" },
                    { day: "Saturday", time: "9:00 AM – 1:00 PM" },
                    { day: "Sunday", time: "Closed", closed: true },
                  ].map((row) => (
                    <li key={row.day} className="flex items-center justify-between text-xs font-medium">
                      <span className="text-muted-foreground">{row.day}</span>
                      <span className={row.closed ? "text-rose-500" : "text-secondary"}>{row.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl border border-gold/20 bg-white/90 backdrop-blur-md p-6 shadow-sm">
                <h3 className="font-display text-secondary text-base font-bold mb-5">Quick Facts</h3>
                <ul className="space-y-4">
                  {[
                    { icon: GraduationCap, label: "Board", value: "CBSE" },
                    { icon: Clock, label: "Duration", value: "2–3 Weeks" },
                    { icon: Users, label: "Ratio", value: "20 : 1" },
                    { icon: Building, label: "Classes", value: "I – XII" },
                  ].map((f) => (
                    <li key={f.label} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/5 border border-gold/15 text-primary shrink-0">
                          <f.icon className="h-4.5 w-4.5" />
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">{f.label}</span>
                      </div>
                      <span className="text-[10px] font-extrabold text-secondary bg-white border border-gold/20 rounded-full px-2.5 py-0.5 shadow-sm">
                        {f.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* ── Right: FAQ list (Stretches to fill remaining space) ── */}
            <div className="space-y-3 w-full">
              {faqCount.map((n, i) => {
                const isOpen = openFaq === i;
                return (
                  <motion.div
                    key={n}
                    className={`group relative rounded-2xl border transition-all duration-500 overflow-hidden ${isOpen
                        ? "border-primary/30 bg-gradient-to-r from-white to-gold/5 shadow-md"
                        : "border-gold/15 bg-white/60 hover:bg-white hover:border-gold/30"
                      }`}
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-orange-400 origin-top transition-transform duration-500 ${isOpen ? "scale-y-100" : "scale-y-0"}`} />

                    <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-start justify-between gap-4 px-6 py-5 md:px-8 text-left outline-none">
                      <span className={`font-display text-base md:text-lg font-bold leading-snug transition-all duration-300 ${isOpen ? "text-primary translate-x-1" : "text-secondary group-hover:translate-x-1"}`}>
                        {t(["admissions.faq1Q", "admissions.faq2Q", "admissions.faq3Q", "admissions.faq4Q", "admissions.faq5Q", "admissions.faq6Q", "admissions.faq7Q"][i])}
                      </span>
                      <div className={`mt-0.5 flex items-center justify-center h-8 w-8 rounded-full shrink-0 transition-all duration-500 ${isOpen ? "bg-primary text-white" : "bg-gold/10 text-primary"}`}>
                        <ChevronDown className={`h-5 w-5 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                          <div className="px-6 pb-8 pt-0 md:px-8 text-sm md:text-[15px] text-muted-foreground font-medium leading-relaxed">
                            <div className="h-px w-12 bg-primary/20 mb-4" />
                            {t(["admissions.faq1A", "admissions.faq2A", "admissions.faq3A", "admissions.faq4A", "admissions.faq5A", "admissions.faq6A", "admissions.faq7A"][i])}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="container-narrow py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-festive text-primary-foreground p-10 md:p-14 shadow-temple text-center">
          <MandalaBg className="absolute -left-20 -top-20 w-72 h-72 opacity-15" />
          <MandalaBg className="absolute -right-20 -bottom-20 w-72 h-72 opacity-15" spin={false} />
          <div className="relative z-10">
            <Sparkles className="h-9 w-9 text-gold mx-auto mb-4" />
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-3">{t("admissions.ctaTitle")}</h3>
            <p className="opacity-90 max-w-xl mx-auto mb-8 text-lg">{t("admissions.ctaSubtitle")}</p>
            <div className="flex flex-wrap justify-center gap-4">
              {/* btn 1 */}
              <Button asChild variant="gold" size="xl" className="text-w">
                <Link to="/contact">{t("admissions.ctaVisit")}</Link>
              </Button>
              <Button asChild size="xl" className="bg-white/20 hover:bg-white/30 border border-white/30 text-white">
                <a href="tel:+919876543210">{t("admissions.ctaCall")}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Admissions;