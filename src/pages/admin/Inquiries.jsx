import { useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Reply, Trash2, User, AtSign, Calendar, Search, Languages, Loader2, BookOpen } from "lucide-react";
import { translateToHindi, translateFields } from "@/lib/translate";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select";



const SUBJECT_FILTERS = [
  "All",
  "General Inquiry",
  "Admissions",
  "Fee Structure",
  "Academic Programs",
  "Scholarships",
  "Campus Visit",
  "Parent-Teacher Meeting",
  "Complaint / Feedback",
  "Other",
];

const seed = [
  { id: 1, name: "Sunita Verma",  email: "sunita@example.com",  subject: "Admissions",           message: "I would like to know about the admission process for Class III.", date: "2026-01-14", read: false },
  { id: 2, name: "Rajesh Kumar",  email: "rajesh@example.com",  subject: "Fee Structure",         message: "Can you please share the fee structure for Class X?",            date: "2026-01-13", read: false },
  { id: 3, name: "Meena Joshi",   email: "meena@example.com",   subject: "General Inquiry",       message: "Does the school provide bus service from Sector 12?",            date: "2026-01-11", read: true  },
  { id: 4, name: "Arjun Kapoor",  email: "arjun@example.com",   subject: "Scholarships",          message: "Are there any merit-based scholarships available for Class IX?",  date: "2026-01-10", read: true  },
  { id: 5, name: "Priya Nair",    email: "priya@example.com",   subject: "Campus Visit",          message: "We would like to schedule a campus visit this weekend.",          date: "2026-01-09", read: false },
  { id: 6, name: "Deepak Sharma", email: "deepak@example.com",  subject: "Complaint / Feedback",  message: "I have a concern regarding the canteen food quality.",            date: "2026-01-08", read: true  },
];

const AdminInquiries = () => {
  const [items, setItems]         = useState(seed);
  const [selected, setSelected]   = useState(null);
  const [deleteId, setDeleteId]   = useState(null);
  const [search, setSearch]       = useState("");
  const [filterSubject, setFilterSubject] = useState("All");

  // translation state for detail panel
  const [translating, setTranslating]   = useState(false);
  const [translatedMsg, setTranslatedMsg] = useState(null);
  const [translateDir, setTranslateDir]   = useState("en-hi");

  const markRead = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, read: true } : i));

  const handleOpen = (inq) => {
    markRead(inq.id);
    setSelected({ ...inq, read: true });
    setTranslatedMsg(null);
    setTranslateDir("en-hi");
  };

  const handleTranslate = async () => {
    if (!selected) return;
    setTranslating(true);
    try {
      const langpair = translateDir === "en-hi" ? "en|hi" : "hi|en";
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(selected.message)}&langpair=${langpair}`;
      const res  = await fetch(url);
      const data = await res.json();
      setTranslatedMsg(data?.responseData?.translatedText || selected.message);
      // flip direction for next click
      setTranslateDir(d => d === "en-hi" ? "hi-en" : "en-hi");
    } catch {
      setTranslatedMsg(selected.message);
    }
    setTranslating(false);
  };

  const visible = items.filter(inq => {
    const matchSubject = filterSubject === "All" || inq.subject === filterSubject;
    const matchSearch  = !search ||
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.subject.toLowerCase().includes(search.toLowerCase()) ||
      inq.message.toLowerCase().includes(search.toLowerCase());
    return matchSubject && matchSearch;
  });

  const unread = items.filter(i => !i.read).length;

  return (
    <AdminPageShell title="Inquiries" subtitle={`${unread} unread message${unread !== 1 ? "s" : ""}`}>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total",  value: items.length,                      color: "from-orange-400 to-amber-500" },
          { label: "Unread", value: items.filter(i => !i.read).length, color: "from-primary to-orange-600"  },
          { label: "Read",   value: items.filter(i => i.read).length,  color: "from-amber-400 to-yellow-500"},
          { label: "Today",  value: items.filter(i => i.date === new Date().toISOString().slice(0,10)).length, color: "from-orange-500 to-red-500" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="relative overflow-hidden rounded-2xl border border-gold/20 bg-card p-5 shadow-soft"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.color}`} />
            <div className="font-display text-3xl font-bold text-secondary">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="space-y-3">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, subject or message…"
            className="w-full rounded-xl border border-gold/25 bg-card pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
          />
        </div>

        {/* Subject filter pills */}
        <div className="hidden md:flex gap-1.5 flex-wrap">
          {SUBJECT_FILTERS.map(s => (
            <button key={s} onClick={() => setFilterSubject(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                filterSubject === s
                  ? "bg-primary text-white border-primary"
                  : "border-gold/30 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

 {/* mobile dropdown filter */}
    <div className="md:hidden w-full flex justify-between items-center gap-2">
  <Select value={filterSubject} onValueChange={setFilterSubject}>
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Select subject" />
    </SelectTrigger>

    <SelectContent className="w-full">
      {[ ...SUBJECT_FILTERS].map((s) => (
        <SelectItem key={s} value={s}  className="relative flex  cursor-pointer select-none items-center rounded-sm px-3 py-2 pl-8 text-sm outline-none data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-orange-500 data-[highlighted]:to-amber-500 data-[highlighted]:text-white">
          {s}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>

</div>

      </div>

      {/* Inbox */}
      <div className="rounded-2xl border border-gold/20 bg-card shadow-soft overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gold/15 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-orange-600 text-white shadow-md">
            <MessageSquare className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-secondary text-sm">Inbox</h2>
            <p className="text-xs text-muted-foreground">{visible.length} of {items.length} messages</p>
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
            <MessageSquare className="h-10 w-10 opacity-20" />
            <p className="text-sm">No inquiries match your filter.</p>
          </div>
        ) : (
          <div className="divide-y divide-gold/8">
            {visible.map((inq, i) => (
              <motion.div key={inq.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className={`group flex items-start gap-4 px-6 py-4 cursor-pointer hover:bg-muted/20 transition-colors ${!inq.read ? "bg-primary/[0.03]" : ""}`}
                onClick={() => handleOpen(inq)}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm ${!inq.read ? "bg-gradient-saffron text-white" : "bg-muted text-muted-foreground"}`}>
                  {inq.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-sm ${!inq.read ? "font-bold text-secondary" : "font-medium text-foreground/80"}`}>{inq.name}</span>
                    <span className="text-[11px] text-muted-foreground shrink-0">{inq.date}</span>
                  </div>
                  <div className={`text-xs mt-0.5 ${!inq.read ? "font-semibold text-primary" : "text-muted-foreground"}`}>{inq.subject}</div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{inq.message}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {!inq.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                  <button onClick={e => { e.stopPropagation(); setDeleteId(inq.id); }}
                    className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-all">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 p-4"
            onClick={e => { if (e.target === e.currentTarget) setSelected(null); }}
          >
            <motion.div initial={{ x: 80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 80, opacity: 0 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
              className="bg-card rounded-2xl border border-gold/20 w-full max-w-md h-full max-h-[90vh] shadow-temple flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gold/15 bg-gradient-to-r from-primary/5 to-transparent shrink-0">
                <h2 className="font-display font-semibold text-secondary text-sm truncate pr-4">{selected.subject}</h2>
                <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground shrink-0">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Sender avatar */}
              <div className="px-6 py-4 border-b border-gold/10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-saffron text-white text-lg font-bold shadow-gold">
                    {selected.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-secondary">{selected.name}</div>
                    <div className="text-xs text-muted-foreground">{selected.email}</div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                {[
                  { icon: User,     label: "Name",    value: selected.name    },
                  { icon: AtSign,   label: "Email",   value: selected.email   },
                  { icon: BookOpen, label: "Subject", value: selected.subject },
                  { icon: Calendar, label: "Date",    value: selected.date    },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 rounded-xl border border-gold/15 bg-background/60 px-4 py-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{label}</div>
                      <div className="text-sm font-medium text-secondary mt-0.5">{value}</div>
                    </div>
                  </div>
                ))}

                {/* Message */}
                <div className="rounded-xl border border-gold/15 bg-background/60 px-4 py-4 space-y-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Message</div>
                  <p className="text-sm text-foreground/80 leading-relaxed">{selected.message}</p>

                  {/* Translation */}
                  {translatedMsg && (
                    <div className="rounded-lg border border-violet-200 bg-violet-50 px-3 py-3">
                      <div className="text-[10px] uppercase tracking-widest text-violet-600 font-semibold mb-1.5 flex items-center gap-1">
                        <Languages className="h-3 w-3" />
                        {translateDir === "hi-en" ? "English Translation" : "हिंदी अनुवाद"}
                      </div>
                      <p className="text-sm text-violet-900 leading-relaxed font-sanskrit">{translatedMsg}</p>
                    </div>
                  )}

                  {/* Translate button */}
                  <button onClick={handleTranslate} disabled={translating}
                    className="flex items-center gap-1.5 text-xs font-semibold text-violet-700 border border-violet-300 bg-violet-50 hover:bg-violet-100 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-60"
                  >
                    {translating
                      ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Translating…</>
                      : <><Languages className="h-3.5 w-3.5" />
                          {translateDir === "en-hi" ? "Translate to Hindi" : "Translate to English"}
                        </>
                    }
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 border-t border-gold/15 shrink-0">
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-gradient-saffron text-white text-sm font-semibold shadow-gold hover:opacity-90 transition-opacity"
                >
                  <Reply className="h-4 w-4" /> Reply via Email
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          >
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }}
              className="bg-card rounded-2xl border border-gold/20 p-6 w-full max-w-sm shadow-warm text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mx-auto mb-4">
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="font-display font-semibold text-secondary mb-1">Delete Inquiry?</h3>
              <p className="text-sm text-muted-foreground mb-5">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => { setItems(items.filter(i => i.id !== deleteId)); setDeleteId(null); if (selected?.id === deleteId) setSelected(null); }}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors">
                  Delete
                </button>
                <button onClick={() => setDeleteId(null)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gold/25 text-sm font-medium hover:bg-muted transition-colors">
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </AdminPageShell>
  );
};

export default AdminInquiries;