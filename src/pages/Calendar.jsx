import { useState } from "react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { calendarEvents } from "@/data/schoolData";
import { CalendarDays, MapPin } from "lucide-react";
import heroCalendar from "@/assets/calenderpage.png";
import { useLanguage } from "@/contexts/LanguageContext";

const CATEGORY_COLORS = {
  Exam:    { badge: "bg-orange-100 text-orange-700 border-orange-200",    bar: "bg-orange-500",  dot: "bg-orange-500" },
  Result:  { badge: "bg-amber-100 text-amber-700 border-amber-200",       bar: "bg-amber-500",   dot: "bg-amber-500" },
  Holiday: { badge: "bg-yellow-100 text-yellow-700 border-yellow-200",    bar: "bg-yellow-500",  dot: "bg-yellow-500" },
  Meeting: { badge: "bg-orange-50 text-orange-600 border-orange-100",     bar: "bg-orange-400",  dot: "bg-orange-400" },
  Event:   { badge: "bg-amber-50 text-amber-600 border-amber-100",        bar: "bg-amber-600",   dot: "bg-amber-600" },
  Leave:   { badge: "bg-orange-100 text-orange-500 border-orange-200",    bar: "bg-orange-300",  dot: "bg-orange-300" },
};

const filters = [
  { value: "All",     key: "cal.filterAll" },
  { value: "Exam",    key: "cal.filterExam" },
  { value: "Result",  key: "cal.filterResult" },
  { value: "Holiday", key: "cal.filterHoliday" },
  { value: "Meeting", key: "cal.filterMeeting" },
  { value: "Event",   key: "cal.filterEvent" },
  { value: "Leave",   key: "cal.filterLeave" },
];

const Calendar = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? calendarEvents
    : calendarEvents.filter(e => e.category === filter);

  const sorted = [...filtered].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <PageHero
        title={t("cal.heroTitle")}
        sanskrit="॥ काल एव परं बलम् ॥"
        subtitle={t("cal.heroSubtitle")}
        image={heroCalendar}
        size="full"
      />

      <section className="container-narrow py-16">
        <SectionHeader
          eyebrow="॥ उत्सवाः ॥"
          title={t("cal.sectionTitle")}
          subtitle={t("cal.sectionSub")}
        />

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map(({ value, key }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                filter === value
                  ? "bg-primary text-white border-primary"
                  : "border-gold/30 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {t(key)}
            </button>
          ))}
        </div>

        {/* Events grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((event, i) => {
            const dateObj = new Date(event.date);
            const day     = dateObj.getDate();
            const month   = dateObj.toLocaleString("en-IN", { month: "short" });
            const year    = dateObj.getFullYear();
            const weekday = dateObj.toLocaleString("en-IN", { weekday: "short" });
            const colors  = CATEGORY_COLORS[event.category] ?? { badge: "bg-muted text-muted-foreground border-border", bar: "bg-muted-foreground", dot: "bg-muted-foreground" };
            return (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: (i % 6) * 0.07 }}
                className="group relative bg-card rounded-3xl border border-gold/20 overflow-hidden shadow-soft hover:shadow-warm hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                {/* top colour bar */}
                <div className={`h-1.5 w-full ${colors.bar}`} />

                <div className="flex flex-col flex-1 p-5">
                  {/* date + badge row */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    {/* big date block */}
                    <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-primary/10 to-gold/10 border border-gold/20 px-4 py-3 min-w-[64px] text-center">
                      <span className="font-display text-3xl font-bold text-primary leading-none">{day}</span>
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">{month}</span>
                      <span className="text-[10px] text-muted-foreground/70">{year}</span>
                    </div>
                    {/* badge + weekday */}
                    <div className="flex flex-col items-end gap-1.5 pt-0.5">
                      <span className={`inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border font-bold ${colors.badge}`}>
                        {event.category}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">{weekday}</span>
                    </div>
                  </div>

                  {/* title */}
                  <h3 className="font-display text-lg font-semibold text-secondary leading-snug mb-2">
                    {event.title}
                  </h3>

                  {/* end date */}
                  {event.endDate && (
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <span className={`inline-block h-1.5 w-1.5 rounded-full ${colors.dot}`} />
                      {t("cal.until")} {new Date(event.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  )}

                  {/* description */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                    {event.description}
                  </p>

                  {/* location */}
                  {event.location && (
                    <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gold/10 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/60" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">{t("cal.noEvents")}</div>
        )}
      </section>

      {/* CTA */}
      <section className="container-narrow pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-festive text-primary-foreground p-10 text-center shadow-temple ornate-frame">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(43_95%_78%/0.15),transparent_55%)]" />
          <div className="relative z-10">
            <CalendarDays className="h-10 w-10 mx-auto text-gold mb-4" />
            <h3 className="font-display text-3xl mb-2 font-bold">{t("cal.cta.title")}</h3>
            <p className="opacity-90 max-w-xl mx-auto text-lg">{t("cal.cta.sub")}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Calendar;