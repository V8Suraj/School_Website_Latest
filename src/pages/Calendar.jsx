import { useState } from "react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { calendarEvents } from "@/data/schoolData";
import { CalendarDays, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import heroCalendar from "@/assets/calenderpage.png";
import { useLanguage } from "@/contexts/LanguageContext";

const CATEGORY_COLORS = {
  Exam: { badge: "bg-orange-100 text-orange-700 border-orange-200", bar: "bg-orange-500", dot: "bg-orange-500" },
  Result: { badge: "bg-amber-100 text-amber-700 border-amber-200", bar: "bg-amber-500", dot: "bg-amber-500" },
  Holiday: { badge: "bg-yellow-100 text-yellow-700 border-yellow-200", bar: "bg-yellow-500", dot: "bg-yellow-500" },
  Meeting: { badge: "bg-orange-50 text-orange-600 border-orange-100", bar: "bg-orange-400", dot: "bg-orange-400" },
  Event: { badge: "bg-amber-50 text-amber-600 border-amber-100", bar: "bg-amber-600", dot: "bg-amber-600" },
  Leave: { badge: "bg-orange-100 text-orange-500 border-orange-200", bar: "bg-orange-300", dot: "bg-orange-300" },
};

const filters = [
  { value: "All", key: "cal.filterAll" },
  { value: "Exam", key: "cal.filterExam" },
  { value: "Result", key: "cal.filterResult" },
  { value: "Holiday", key: "cal.filterHoliday" },
  { value: "Meeting", key: "cal.filterMeeting" },
  { value: "Event", key: "cal.filterEvent" },
  { value: "Leave", key: "cal.filterLeave" },
];

const Calendar = () => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState("All");

  // Set default month: if current system year is 2026, use today, otherwise default to January 2026.
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    if (today.getFullYear() === 2026) {
      return today;
    }
    return new Date(2026, 0, 1);
  });

  const [selectedDate, setSelectedDate] = useState(null);

  const filtered = filter === "All"
    ? calendarEvents
    : calendarEvents.filter(e => e.category === filter);

  const sorted = [...filtered].sort((a, b) => a.date.localeCompare(b.date));

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const formatLocalDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevTotalDays = new Date(year, month, 0).getDate();

    const cells = [];

    // Trail days from previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevTotalDays - i;
      cells.push({
        date: new Date(year, month - 1, dayNum),
        isCurrentMonth: false,
        dayNum,
      });
    }

    // Current month days
    for (let d = 1; d <= totalDays; d++) {
      cells.push({
        date: new Date(year, month, d),
        isCurrentMonth: true,
        dayNum: d,
      });
    }

    // Lead days from next month
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      cells.push({
        date: new Date(year, month + 1, d),
        isCurrentMonth: false,
        dayNum: d,
      });
    }

    return cells;
  };

  const weekdays = language === "hi"
    ? ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Filter events matching selected date or current viewed month
  const eventsInCurrentMonth = sorted.filter(event => {
    const [y, m] = event.date.split("-").map(Number);
    return y === currentMonth.getFullYear() && (m - 1) === currentMonth.getMonth();
  });

  const eventsOnSelectedDate = selectedDate
    ? sorted.filter(event => event.date === selectedDate)
    : [];

  const getFormattedSelectedDateText = () => {
    if (!selectedDate) return "";
    const [y, m, d] = selectedDate.split("-").map(Number);
    const tempDate = new Date(y, m - 1, d);
    return tempDate.toLocaleDateString(language === "hi" ? "hi-IN" : "en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const renderEventCard = (event, i) => {
    const [y, m, d] = event.date.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString(language === "hi" ? "hi-IN" : "en-IN", { month: "short" });
    const year = dateObj.getFullYear();
    const weekday = dateObj.toLocaleString(language === "hi" ? "hi-IN" : "en-IN", { weekday: "short" });
    const colors = CATEGORY_COLORS[event.category] ?? { badge: "bg-muted text-muted-foreground border-border", bar: "bg-muted-foreground", dot: "bg-muted-foreground" };

    return (
      <motion.article
        key={event.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: (i % 6) * 0.05 }}
        className="group relative bg-card rounded-3xl border border-gold/20 overflow-hidden shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all duration-300 flex flex-col"
      >
        <div className={`h-1.5 w-full ${colors.bar}`} />
        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-primary/10 to-gold/10 border border-gold/20 px-4 py-3 min-w-[64px] text-center">
              <span className="font-display text-3xl font-bold text-primary leading-none">{day}</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">{month}</span>
              <span className="text-[10px] text-muted-foreground/70">{year}</span>
            </div>
            <div className="flex flex-col items-end gap-1.5 pt-0.5">
              <span className={`inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border font-bold ${colors.badge}`}>
                {event.category}
              </span>
              <span className="text-xs text-muted-foreground font-medium">{weekday}</span>
            </div>
          </div>

          <h3 className="font-display text-lg font-semibold text-secondary leading-snug mb-2">
            {event.title}
          </h3>

          {event.endDate && (
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <span className={`inline-block h-1.5 w-1.5 rounded-full ${colors.dot}`} />
              {t("cal.until")} {new Date(event.endDate).toLocaleDateString(language === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          )}

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
            {language === "hi" && event.descriptionHi ? event.descriptionHi : event.description}
          </p>

          {event.location && (
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gold/10 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/60" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
        </div>
      </motion.article>
    );
  };

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
              onClick={() => {
                setFilter(value);
                setSelectedDate(null); // Clear selected date when filter changes
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${filter === value
                  ? "bg-primary text-white border-primary"
                  : "border-gold/30 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
            >
              {t(key)}
            </button>
          ))}
        </div>

        {/* Mobile View: Interactive Calendar + Events List */}
        <div className="block md:hidden mb-12">
          <div className="bg-card rounded-3xl border border-gold/30 shadow-soft p-5 ornate-frame relative overflow-hidden bg-paper">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={prevMonth}
                className="p-2 rounded-full border border-gold/20 bg-background text-primary hover:text-primary-foreground hover:bg-primary transition-all hover-lift shadow-soft"
                aria-label="Previous Month"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h3 className="font-display text-md font-bold text-secondary text-gradient-festive">
                {currentMonth.toLocaleString(language === "hi" ? "hi-IN" : "en-IN", {
                  month: "long",
                  year: "numeric",
                })}
              </h3>
              <button
                onClick={nextMonth}
                className="p-2 rounded-full border border-gold/20 bg-background text-primary hover:text-primary-foreground hover:bg-primary transition-all hover-lift shadow-soft"
                aria-label="Next Month"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Weekdays header */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {weekdays.map((day, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                >
                  {day}
                </span>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {getDaysInMonth().map((cell, idx) => {
                const dayStr = formatLocalDate(cell.date);
                const isSelected = selectedDate === dayStr;
                const isToday = formatLocalDate(new Date()) === dayStr;

                const dayEvents = sorted.filter((ev) => ev.date === dayStr);
                const hasEvents = dayEvents.length > 0;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedDate(null);
                      } else {
                        setSelectedDate(dayStr);
                      }
                    }}
                    className={`aspect-square flex flex-col items-center justify-center rounded-full text-xs font-semibold relative transition-all duration-200 ${!cell.isCurrentMonth
                        ? "text-muted-foreground/30 font-light"
                        : "text-foreground"
                      } ${isSelected
                        ? "bg-primary text-primary-foreground shadow-soft scale-105"
                        : isToday
                          ? "border border-secondary/50 text-secondary bg-secondary/5"
                          : hasEvents
                            ? "bg-gold/10 hover:bg-gold/20 text-primary border border-gold/30 font-bold"
                            : "hover:bg-muted"
                      }`}
                  >
                    <span>{cell.dayNum}</span>

                    {/* Category dots */}
                    {hasEvents && !isSelected && (
                      <div className="absolute bottom-1 flex gap-0.5 justify-center">
                        {dayEvents.slice(0, 3).map((ev) => {
                          const colors = CATEGORY_COLORS[ev.category] ?? { dot: "bg-muted-foreground" };
                          return (
                            <span
                              key={ev.id}
                              className={`h-1 w-1 rounded-full ${colors.dot}`}
                            />
                          );
                        })}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Localized Event List Header */}
          <div className="mt-8 mb-4 flex items-center justify-between">
            <h4 className="font-display text-sm font-bold text-secondary">
              {selectedDate ? (
                language === "hi" ? (
                  <>
                    <span className="text-primary">{getFormattedSelectedDateText()}</span> के कार्यक्रम
                  </>
                ) : (
                  `Events on ${getFormattedSelectedDateText()}`
                )
              ) : (
                language === "hi" ? (
                  <>{currentMonth.toLocaleString("hi-IN", { month: "long" })} के सभी कार्यक्रम</>
                ) : (
                  `All Events in ${currentMonth.toLocaleString("en-IN", { month: "long", year: "numeric" })}`
                )
              )}
            </h4>

            {selectedDate && (
              <button
                onClick={() => setSelectedDate(null)}
                className="text-xs font-semibold text-primary hover:text-secondary transition-all"
              >
                {language === "hi" ? "सभी दिखाएँ" : "Clear Selection"}
              </button>
            )}
          </div>

          {/* Event Cards for Mobile */}
          <div className="space-y-4">
            {selectedDate ? (
              eventsOnSelectedDate.length > 0 ? (
                eventsOnSelectedDate.map((ev, i) => renderEventCard(ev, i))
              ) : (
                <div className="text-center py-10 bg-card rounded-3xl border border-gold/15 text-muted-foreground text-sm">
                  {language === "hi" ? "इस तारीख को कोई कार्यक्रम निर्धारित नहीं है।" : "No events scheduled for this date."}
                </div>
              )
            ) : (
              eventsInCurrentMonth.length > 0 ? (
                eventsInCurrentMonth.map((ev, i) => renderEventCard(ev, i))
              ) : (
                <div className="text-center py-10 bg-card rounded-3xl border border-gold/15 text-muted-foreground text-sm">
                  {language === "hi" ? "इस महीने में कोई कार्यक्रम नहीं है।" : "No events scheduled for this month."}
                </div>
              )
            )}
          </div>
        </div>

        {/* Desktop View: Events grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((event, i) => renderEventCard(event, i))}
        </div>

        {sorted.length === 0 && (
          <div className="hidden md:block text-center py-16 text-muted-foreground">{t("cal.noEvents")}</div>
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