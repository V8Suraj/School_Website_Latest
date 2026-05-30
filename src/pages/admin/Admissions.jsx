import { useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, Check, X, Search, ClipboardList,
  Clock, CheckCircle2, XCircle, FileSearch,
  User, Mail, Phone, GraduationCap, Calendar, ChevronDown,
} from "lucide-react";

const seed = [
  { id: 1, studentName: "Arjun Mehta", grade: "Class VI", parentName: "Suresh Mehta", email: "suresh@example.com", phone: "9876543210", date: "2026-01-12", status: "Pending" },
  { id: 2, studentName: "Priya Singh", grade: "Class IX", parentName: "Kavita Singh", email: "kavita@example.com", phone: "9123456789", date: "2026-01-10", status: "Reviewed" },
  { id: 3, studentName: "Rohan Patel", grade: "Class I", parentName: "Amit Patel", email: "amit@example.com", phone: "9988776655", date: "2026-01-08", status: "Accepted" },
  { id: 4, studentName: "Sneha Sharma", grade: "Class XI", parentName: "Rajesh Sharma", email: "rajesh@example.com", phone: "9871234560", date: "2026-01-06", status: "Rejected" },
  { id: 5, studentName: "Karan Gupta", grade: "Class III", parentName: "Neha Gupta", email: "neha@example.com", phone: "9765432100", date: "2026-01-05", status: "Pending" },
];

const STATUS_CONFIG = {
  Pending: { bg: "bg-amber-50", text: "text-amber-700", icon: Clock, dot: "bg-amber-400" },
  Reviewed: { bg: "bg-blue-50", text: "text-blue-700", icon: FileSearch, dot: "bg-blue-400" },
  Accepted: { bg: "bg-green-50", text: "text-green-700", icon: CheckCircle2, dot: "bg-green-500" },
  Rejected: { bg: "bg-red-50", text: "text-red-700", icon: XCircle, dot: "bg-red-400" },
};

const STAT_CARDS = [
  { status: "Pending", label: "Pending", color: "from-amber-400 to-orange-500", icon: Clock },
  { status: "Reviewed", label: "Reviewed", color: "from-blue-500 to-indigo-500", icon: FileSearch },
  { status: "Accepted", label: "Accepted", color: "from-emerald-500 to-teal-500", icon: CheckCircle2 },
  { status: "Rejected", label: "Rejected", color: "from-rose-500 to-red-500", icon: XCircle },
];

const AdminAdmissions = () => {
  const [apps, setApps] = useState(seed);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const updateStatus = (id, status) => {
    setApps(apps.map(a => a.id === id ? { ...a, status } : a));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
  };

  const filtered = apps.filter(a => {
    const matchSearch = a.studentName.toLowerCase().includes(search.toLowerCase()) ||
      a.parentName.toLowerCase().includes(search.toLowerCase()) ||
      a.grade.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <AdminPageShell title="Admissions" subtitle="View and manage student admission applications">

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STAT_CARDS.map((s, i) => {
          const count = apps.filter(a => a.status === s.status).length;
          return (
            <motion.button
              key={s.status}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setFilterStatus(filterStatus === s.status ? "All" : s.status)}
              className={`relative overflow-hidden rounded-2xl border text-left p-5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-warm ${filterStatus === s.status
                  ? "border-primary/40 bg-primary/5"
                  : "border-gold/20 bg-card"
                }`}
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.color}`} />
              <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-md mb-3`}>
                <s.icon className="h-4 w-4" />
              </div>
              <div className="font-display text-3xl font-bold text-secondary">{count}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </motion.button>
          );
        })}
      </div>

      {/* ── Table card ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-gold/20 bg-card shadow-soft overflow-hidden"
      >
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 border-b border-gold/15 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-saffron text-white shadow-gold">
              <ClipboardList className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display text-base font-semibold text-secondary">Applications</h2>
              <p className="text-xs text-muted-foreground">{filtered.length} of {apps.length} shown</p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search applications..."
                className="pl-8 h-8 text-sm border-gold/25 focus:border-primary/50"
              />
            </div>
            {/* Status filter */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="h-8 pl-3 pr-7 text-sm rounded-lg border border-gold/25 bg-background focus:border-primary/50 focus:outline-none appearance-none cursor-pointer"
              >
                <option value="All">All Status</option>
                {["Pending", "Reviewed", "Accepted", "Rejected"].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold/10 bg-muted/20">
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Student</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground hidden md:table-cell">Grade</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground hidden lg:table-cell">Parent</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground hidden md:table-cell">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/8">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground text-sm">
                    No applications match your search.
                  </td>
                </tr>
              )}
              {filtered.map((a, i) => {
                const cfg = STATUS_CONFIG[a.status];
                const StatusIcon = cfg.icon;
                return (
                  <motion.tr
                    key={a.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="group hover:bg-muted/25 transition-colors"
                  >
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-saffron text-white text-xs font-bold shadow-sm">
                          {a.studentName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-secondary text-sm">{a.studentName}</div>
                          <div className="text-xs text-muted-foreground">{a.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/8 border border-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {a.grade}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground hidden lg:table-cell">{a.parentName}</td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground hidden md:table-cell">{a.date}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          onClick={() => setSelected(a)}
                          className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                          title="View details"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => updateStatus(a.id, "Accepted")}
                          className="p-1.5 rounded-lg hover:bg-green-50 text-muted-foreground hover:text-green-600 transition-colors"
                          title="Accept"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => updateStatus(a.id, "Rejected")}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"
                          title="Reject"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ── Detail drawer / modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 p-4"
            onClick={e => { if (e.target === e.currentTarget) setSelected(null); }}
          >
            <motion.div
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
              className="bg-card rounded-2xl border border-gold/20 w-full max-w-sm h-full max-h-[90vh] shadow-temple flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gold/15 bg-gradient-to-r from-primary/5 to-transparent shrink-0">
                <h2 className="font-display font-semibold text-secondary">Application Details</h2>
                <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Avatar + name */}
              <div className="px-6 py-5 border-b border-gold/10 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-saffron text-white text-xl font-bold shadow-gold">
                    {selected.studentName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold text-secondary">{selected.studentName}</div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold mt-1 ${STATUS_CONFIG[selected.status].bg} ${STATUS_CONFIG[selected.status].text}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_CONFIG[selected.status].dot}`} />
                      {selected.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                {[
                  { icon: GraduationCap, label: "Grade", value: selected.grade },
                  { icon: User, label: "Parent / Guardian", value: selected.parentName },
                  { icon: Mail, label: "Email", value: selected.email },
                  { icon: Phone, label: "Phone", value: selected.phone },
                  { icon: Calendar, label: "Applied On", value: selected.date },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3 rounded-xl border border-gold/15 bg-background/60 px-4 py-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary mt-0.5">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{label}</div>
                      <div className="text-sm font-medium text-secondary mt-0.5">{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="px-6 py-4 border-t border-gold/15 shrink-0 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    onClick={() => updateStatus(selected.id, "Accepted")}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus(selected.id, "Rejected")}
                    className="text-red-500 border-red-200 hover:bg-red-50 gap-1.5"
                  >
                    <XCircle className="h-3.5 w-3.5" /> Reject
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateStatus(selected.id, "Reviewed")}
                  className="w-full gap-1.5 text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <FileSearch className="h-3.5 w-3.5" /> Mark as Reviewed
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </AdminPageShell>
  );
};

export default AdminAdmissions;