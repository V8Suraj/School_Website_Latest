import { useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, X, Wallet, Save, Plus, Info } from "lucide-react";


const seed = [
  { id: 1, className: "Class I – II",   tuition: "₹2,500/month", admission: "₹5,000", exam: "₹800",   other: "₹500" },
  { id: 2, className: "Class III – V",  tuition: "₹3,000/month", admission: "₹5,000", exam: "₹1,000", other: "₹500" },
  { id: 3, className: "Class VI – VIII",tuition: "₹3,500/month", admission: "₹6,000", exam: "₹1,200", other: "₹600" },
  { id: 4, className: "Class IX – X",   tuition: "₹4,000/month", admission: "₹7,000", exam: "₹1,500", other: "₹700" },
  { id: 5, className: "Class XI – XII", tuition: "₹4,500/month", admission: "₹8,000", exam: "₹1,800", other: "₹800" },
];

const fields = [
  { key: "className",  label: "Class / Grade",   placeholder: "e.g. Class I – II" },
  { key: "tuition",    label: "Tuition Fee",      placeholder: "e.g. ₹2,500/month" },
  { key: "admission",  label: "Admission Fee",    placeholder: "e.g. ₹5,000" },
  { key: "exam",       label: "Exam Fee",         placeholder: "e.g. ₹800" },
  { key: "other",      label: "Other Charges",    placeholder: "e.g. ₹500" },
];

const AdminFees = () => {
  const [items, setItems] = useState(seed);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ className: "", tuition: "", admission: "", exam: "", other: "" });
  const [deleteId, setDeleteId] = useState(null);

  const openAdd = () => { setEditing(null); setForm({ className: "", tuition: "", admission: "", exam: "", other: "" }); setShowForm(true); };
  const openEdit = (f) => { setEditing(f); setForm({ className: f.className, tuition: f.tuition, admission: f.admission, exam: f.exam, other: f.other }); setShowForm(true); };
  const handleSave = () => {
    if (!form.className.trim()) return;
    if (editing) setItems(items.map(i => i.id === editing.id ? { ...editing, ...form } : i));
    else setItems([...items, { id: Date.now(), ...form }]);
    setShowForm(false);
  };

  return (
    <AdminPageShell title="Fee Structure" subtitle="Manage class-wise fee details for students and parents" onAdd={openAdd} addLabel="Add Class Fees">

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="rounded-2xl border border-gold/25 bg-card shadow-soft overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gold/15 bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-amber-400 text-white shadow-md">
                  <Wallet className="h-4 w-4" />
                </div>
                <h2 className="font-display font-semibold text-secondary text-sm">{editing ? "Edit Fee Record" : "New Fee Record"}</h2>
              </div>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fields.map(({ key, label, placeholder }) => (
                  <div key={key} className="space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</Label>
                    <Input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} className="border-gold/25 focus:border-primary/50" />
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} variant="hero" size="sm" className="gap-1.5"><Save className="h-3.5 w-3.5" /> Save</Button>
                <Button onClick={() => setShowForm(false)} variant="outline" size="sm">Cancel</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="rounded-2xl border border-gold/20 bg-card shadow-soft overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gold/15 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-amber-400 text-white shadow-md">
              <Wallet className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-secondary text-sm">Fee Records</h2>
              <p className="text-xs text-muted-foreground">{items.length} class groups</p>
            </div>
          </div>
          <Button onClick={openAdd} variant="hero" size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Add</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold/10 bg-muted/20">
                {["Class / Grade", "Tuition Fee", "Admission Fee", "Exam Fee", "Other", ""].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/8">
              {items.map((f, i) => (
                <motion.tr
                  key={f.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-muted/25 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center rounded-full bg-primary/8 border border-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {f.className}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-secondary">{f.tuition}</td>
                  <td className="px-5 py-3.5 text-foreground/70">{f.admission}</td>
                  <td className="px-5 py-3.5 text-foreground/70">{f.exam}</td>
                  <td className="px-5 py-3.5 text-foreground/70">{f.other}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(f)} className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"><Pencil className="h-3.5 w-3.5" /></button>
                      <button onClick={() => setDeleteId(f.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Note */}
        <div className="flex items-start gap-2 px-5 py-3 border-t border-gold/10 bg-amber-50/50">
          <Info className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700">Admission fee is a one-time charge. Tuition fee is payable monthly or quarterly.</p>
        </div>
      </div>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} className="bg-card rounded-2xl border border-gold/20 p-6 w-full max-w-sm shadow-warm text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mx-auto mb-4"><Trash2 className="h-5 w-5 text-red-500" /></div>
              <h3 className="font-display font-semibold text-secondary mb-1">Delete Fee Record?</h3>
              <p className="text-sm text-muted-foreground mb-5">This action cannot be undone.</p>
              <div className="flex gap-3">
                <Button onClick={() => { setItems(items.filter(i => i.id !== deleteId)); setDeleteId(null); }} size="sm" className="flex-1 bg-red-500 hover:bg-red-600 text-white">Delete</Button>
                <Button onClick={() => setDeleteId(null)} variant="outline" size="sm" className="flex-1">Cancel</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </AdminPageShell>
  );
};

export default AdminFees;