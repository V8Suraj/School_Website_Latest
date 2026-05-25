import { useState } from "react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { notices } from "@/data/schoolData";
import {
  Download,
  AlertTriangle,
  Building2,
  School,
  FileText,
} from "lucide-react";
import heroNotices from "@/assets/notice.png";
import { useLanguage } from "@/contexts/LanguageContext";

const CATEGORY_CONFIG = {
  "School Notice": {
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: School,
    badge: "bg-blue-50 text-blue-700",
  },

  "Government Notice": {
    color: "bg-green-100 text-green-700 border-green-200",
    icon: Building2,
    badge: "bg-green-50 text-green-700",
  },

  "Urgent Notice": {
    color: "bg-red-100 text-red-700 border-red-200",
    icon: AlertTriangle,
    badge: "bg-red-50 text-red-700",
  },
};

const filters = [
  {
    value: "All",
    label: "All",
  },

  {
    value: "School Notice",
    label: "School Notice",
  },

  {
    value: "Government Notice",
    label: "Government Notice",
  },

  {
    value: "Urgent Notice",
    label: "Urgent Notice",
  },
];

const Notices = () => {
  const { t, language } = useLanguage();

  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? notices
      : notices.filter((n) => n.category === filter);

  return (
    <>
      {/* Hero Section */}
      <PageHero
        title={t("notices.heroTitle")}
        sanskrit="॥ सूचना ॥"
        subtitle={t("notices.heroSubtitle")}
        image={heroNotices}
        size="full"
        overlay="bg-gradient-to-br from-slate-950/85 via-slate-900/65 to-primary/40"
      />

      <section className="container-narrow py-16">

        {/* Section Header */}
        <SectionHeader
          title={t("notices.sectionTitle")}
          subtitle={t("notices.sectionSub")}
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {filters.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-300 ${
                filter === value
                  ? "bg-primary text-white border-primary shadow-lg"
                  : "bg-card border-gold/20 text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-primary/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Notice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {filtered.map((notice, i) => {
            const config = CATEGORY_CONFIG[notice.category];
            const Icon = config.icon;

            return (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-white/90 backdrop-blur-xl rounded-[28px] border border-white/30 overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >

                {/* Top Gradient Strip */}
                <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-primary" />

                <div className="p-6 flex flex-col h-full">

                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">

                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm shrink-0 ${config.color}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Badge */}
                    <span
                      className={`text-[11px] font-semibold px-3 py-1 rounded-full whitespace-nowrap ${config.badge}`}
                    >
                      {notice.category}
                    </span>
                  </div>

                  {/* Date */}
                  <p className="text-[11px] tracking-wide uppercase text-muted-foreground mt-5">
                    {notice.date}
                  </p>

                  {/* Title */}
                  <h3 className="font-display text-[22px] text-secondary mt-2 leading-snug group-hover:text-primary transition-colors duration-300">
                    {language === "hi" && notice.titleHi
                      ? notice.titleHi
                      : notice.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed flex-1">
                    {language === "hi" && notice.bodyHi
                      ? notice.bodyHi
                      : notice.body}
                  </p>

                  {/* PDF Buttons */}
                  {notice.attachment && (
                    <div className="flex items-center gap-2 mt-6">

                      {/* View Button */}
                      <a
                        href={notice.attachment}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/20 bg-primary/5 text-primary text-[10px] font-semibold hover:bg-primary hover:text-white transition-all duration-300"
                      >
                        <FileText className="h-3 w-3" />
                        View
                      </a>

                      {/* Download Button */}
                      <a
                        href={notice.attachment}
                        download
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-[10px] font-semibold hover:scale-105 transition-all duration-300"
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </a>

                    </div>
                  )}

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground text-lg">
            {t("notices.noNotices")}
          </div>
        )}

      </section>
    </>
  );
};

export default Notices;