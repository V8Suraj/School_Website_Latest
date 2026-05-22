import { useEffect, useState } from "react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil, Check, X, ChevronRight, Languages, Loader2,
  BookOpen, Eye, Star, User, Building2, Save, GraduationCap, Plus, Trash2,
} from "lucide-react";
import { defaultFacilities, loadAboutFacilities, saveAboutFacilities, loadAboutContent, saveAboutContent, defaultAboutContent, defaultFaculty, loadAboutFaculty, saveAboutFaculty } from "@/lib/aboutContent";
import { translateFields } from "@/lib/translate";

// ─── Hindi preview block ───────────────────────────────────────────────────────
const HindiBlock = ({ fields, onChange }) => (
  <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 space-y-3">
    <div className="flex items-center gap-2 text-xs font-semibold text-violet-700 uppercase tracking-wide">
      <Languages className="h-3.5 w-3.5" /> Hindi Translation (editable)
    </div>
    {fields.map(f => (
      <div key={f.key} className="space-y-1.5">
        <Label className="text-xs text-violet-600">{f.label} (हिंदी)</Label>
        {(f.rows ?? 1) > 1 ? (
          <textarea rows={f.rows} value={f.value} onChange={e => onChange(f.key, e.target.value)}
            className="w-full rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm font-sanskrit resize-none focus:outline-none focus:border-violet-400" />
        ) : (
          <input value={f.value} onChange={e => onChange(f.key, e.target.value)}
            className="w-full rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm font-sanskrit focus:outline-none focus:border-violet-400" />
        )}
      </div>
    ))}
  </div>
);

// ─── component ─────────────────────────────────────────────────────────────────
const AdminAbout = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [saved, setSaved]                 = useState(null);
  const [form, setForm]                   = useState(defaultAboutContent);
  const [facilities, setFacilities]       = useState(defaultFacilities);
  const [faculty, setFaculty]             = useState(defaultFaculty);
  const [translating, setTranslating]     = useState(null);

  useEffect(() => {
    setFacilities(loadAboutFacilities());
    setFaculty(loadAboutFaculty());
    setForm(f => ({ ...f, ...loadAboutContent() }));
  }, []);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const saveSection = (key) => {
    if (key === "facilities") {
      const clean = facilities
        .map(f => ({ title: f.title.trim(), desc: f.desc.trim(), image: f.image.trim() }))
        .filter(f => f.title && f.desc && f.image);
      saveAboutFacilities(clean.length > 0 ? clean : defaultFacilities);
    } else if (key === "faculty") {
      const clean = faculty
        .map(f => ({ name: f.name.trim(), role: f.role.trim(), subject: f.subject.trim(), experience: f.experience.trim(), photo: f.photo.trim() }))
        .filter(f => f.name);
      saveAboutFaculty(clean.length > 0 ? clean : defaultFaculty);
    } else {
      saveAboutContent(form);
    }
    setSaved(key);
    setActiveSection(null);
    setTimeout(() => setSaved(null), 2000);
  };

  const translate = async (key, fields, hiKeys) => {
    setTranslating(key);
    const result = await translateFields(fields);
    setForm(f => {
      const updates = {};
      for (const [k, hiKey] of Object.entries(hiKeys)) updates[hiKey] = result[k] ?? "";
      return { ...f, ...updates };
    });
    setTranslating(null);
  };

  const updateFacility = (i, field, value) =>
    setFacilities(prev => prev.map((f, idx) => idx === i ? { ...f, [field]: value } : f));

  const updateFacultyMember = (i, field, value) =>
    setFaculty(prev => prev.map((f, idx) => idx === i ? { ...f, [field]: value } : f));

  const handleImageUpload = (i, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { if (typeof reader.result === "string") updateFacility(i, "image", reader.result); };
    reader.readAsDataURL(file);
    e.currentTarget.value = "";
  };

  // ── section card ─────────────────────────────────────────────────────────
  const SectionCard = ({
    id, icon: Icon, iconColor, title, summary, children,
  }) => {
    const isOpen   = activeSection === id;
    const wasSaved = saved === id;
    return (
      <div className={`rounded-xl border transition-all duration-200 overflow-hidden bg-card ${isOpen ? "border-primary/40 shadow-warm" : "border-gold/20"}`}>
        <button type="button" onClick={() => setActiveSection(isOpen ? null : id)}
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isOpen ? "bg-primary text-white" : iconColor}`}>
              {wasSaved ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
            </div>
            <div>
              <p className="font-semibold text-secondary text-sm">{title}</p>
              {!isOpen && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1 max-w-xs sm:max-w-sm">{summary}</p>}
            </div>
          </div>
          <ChevronRight className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pt-2 border-t border-gold/15 space-y-4">
                {children}
                <div className="flex gap-2 pt-1">
                  <Button onClick={() => saveSection(id)} variant="hero" size="sm" className="gap-1.5">
                    <Save className="h-3.5 w-3.5" /> Save Section
                  </Button>
                  <Button onClick={() => setActiveSection(null)} variant="outline" size="sm">
                    <X className="h-3.5 w-3.5 mr-1" /> Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // ── translate button ──────────────────────────────────────────────────────
  const TranslateBtn = ({ sectionKey, onClick }) => (
    <Button type="button" onClick={onClick} disabled={translating === sectionKey}
      variant="outline" size="sm"
      className="gap-1.5 border-violet-300 text-violet-700 hover:bg-violet-50 w-fit"
    >
      {translating === sectionKey
        ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Translating…</>
        : <><Languages className="h-3.5 w-3.5" /> Convert to Hindi</>
      }
    </Button>
  );

  return (
    <AdminPageShell title="About Us" subtitle="Click any section to edit · Use 'Convert to Hindi' to auto-translate">
      <div className="space-y-3">

        {/* ── History & Values ── */}
        <SectionCard id="history" icon={BookOpen} iconColor="bg-amber-100 text-amber-600"
          title="School History & Values" summary={form.history}
        >
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">School History</Label>
            <Textarea rows={4} value={form.history} onChange={e => set("history", e.target.value)} className="border-gold/25 focus:border-primary/50 resize-none" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Core Values (comma-separated)</Label>
            <Input value={form.values} onChange={e => set("values", e.target.value)} className="border-gold/25 focus:border-primary/50" />
          </div>
          <TranslateBtn sectionKey="history" onClick={() =>
            translate("history", { history: form.history, values: form.values }, { history: "historyHi", values: "valuesHi" })
          } />
          {(form.historyHi || form.valuesHi) && (
            <HindiBlock
              fields={[
                { label: "School History", key: "historyHi", value: form.historyHi, rows: 4 },
                { label: "Core Values", key: "valuesHi", value: form.valuesHi },
              ]}
              onChange={(k, v) => set(k, v)}
            />
          )}
        </SectionCard>

        {/* ── Mission & Vision ── */}
        <SectionCard id="missionVision" icon={Eye} iconColor="bg-blue-100 text-blue-600"
          title="Mission & Vision" summary={`${form.mission} · ${form.vision}`}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Mission</Label>
              <Textarea rows={3} value={form.mission} onChange={e => set("mission", e.target.value)} className="border-gold/25 focus:border-primary/50 resize-none" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Vision</Label>
              <Textarea rows={3} value={form.vision} onChange={e => set("vision", e.target.value)} className="border-gold/25 focus:border-primary/50 resize-none" />
            </div>
          </div>
          <TranslateBtn sectionKey="missionVision" onClick={() =>
            translate("missionVision", { mission: form.mission, vision: form.vision }, { mission: "missionHi", vision: "visionHi" })
          } />
          {(form.missionHi || form.visionHi) && (
            <HindiBlock
              fields={[
                { label: "Mission", key: "missionHi", value: form.missionHi, rows: 3 },
                { label: "Vision",  key: "visionHi",  value: form.visionHi,  rows: 3 },
              ]}
              onChange={(k, v) => set(k, v)}
            />
          )}
        </SectionCard>

        {/* ── Principal ── */}
        <SectionCard id="principal" icon={User} iconColor="bg-emerald-100 text-emerald-600"
          title="Principal's Message" summary={`${form.principalName} — ${form.principalMessage}`}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Principal Name</Label>
              <Input value={form.principalName} onChange={e => set("principalName", e.target.value)} className="border-gold/25 focus:border-primary/50" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Photo URL (optional)</Label>
              <Input value={form.principalPhoto} onChange={e => set("principalPhoto", e.target.value)} placeholder="https://..." className="border-gold/25 focus:border-primary/50" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Message</Label>
            <Textarea rows={4} value={form.principalMessage} onChange={e => set("principalMessage", e.target.value)} className="border-gold/25 focus:border-primary/50 resize-none" />
          </div>
          <TranslateBtn sectionKey="principal" onClick={() =>
            translate("principal",
              { name: form.principalName, message: form.principalMessage },
              { name: "principalNameHi", message: "principalMessageHi" }
            )
          } />
          {(form.principalNameHi || form.principalMessageHi) && (
            <HindiBlock
              fields={[
                { label: "Principal Name", key: "principalNameHi",    value: form.principalNameHi },
                { label: "Message",        key: "principalMessageHi", value: form.principalMessageHi, rows: 4 },
              ]}
              onChange={(k, v) => set(k, v)}
            />
          )}
        </SectionCard>

        {/* ── Facilities ── */}
        <SectionCard id="facilities" icon={Building2} iconColor="bg-violet-100 text-violet-600"
          title="Campus Facilities" summary={`${facilities.length} facilities listed`}
        >
          <div className="space-y-3">
            {facilities.map((f, i) => (
              <div key={i} className="rounded-xl border border-gold/20 bg-muted/20 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">Facility {i + 1}</span>
                  {facilities.length > 1 && (
                    <button type="button" onClick={() => setFacilities(prev => prev.filter((_, idx) => idx !== i))}
                      className="text-xs text-red-500 hover:text-red-600 font-medium">Remove</button>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Name</Label>
                    <Input value={f.title} onChange={e => updateFacility(i, "title", e.target.value)} placeholder="e.g. Robotics Lab" className="border-gold/25" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Image URL</Label>
                    <Input value={f.image} onChange={e => updateFacility(i, "image", e.target.value)} placeholder="https://..." className="border-gold/25" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Description</Label>
                  <Textarea rows={2} value={f.desc} onChange={e => updateFacility(i, "desc", e.target.value)} className="resize-none border-gold/25" />
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <Label htmlFor={`img-${i}`} className="text-xs text-primary cursor-pointer hover:underline font-medium">Upload Image</Label>
                  <Input id={`img-${i}`} type="file" accept="image/*" onChange={e => handleImageUpload(i, e)} className="max-w-xs border-gold/25" />
                </div>
                {f.image && <img src={f.image} alt={f.title} className="h-20 w-36 rounded-lg object-cover border border-gold/25" />}
              </div>
            ))}
          </div>
          <Button type="button" onClick={() => setFacilities(prev => [...prev, { title: "", desc: "", image: "" }])}
            variant="outline" size="sm" className="gap-1.5">
            + Add Facility
          </Button>
        </SectionCard>

        {/* ── Faculty ── */}
        <SectionCard id="faculty" icon={GraduationCap} iconColor="bg-teal-100 text-teal-600"
          title="Faculty Members" summary={`${faculty.length} faculty members listed`}
        >
          <div className="space-y-3">
            {faculty.map((f, i) => (
              <div key={i} className="rounded-xl border border-gold/20 bg-muted/20 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">Faculty {i + 1}</span>
                  {faculty.length > 1 && (
                    <button type="button" onClick={() => setFaculty(prev => prev.filter((_, idx) => idx !== i))}
                      className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium">
                      <Trash2 className="h-3 w-3" /> Remove
                    </button>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Full Name</Label>
                    <Input value={f.name} onChange={e => updateFacultyMember(i, "name", e.target.value)} placeholder="e.g. Dr. Arvind Krishnan" className="border-gold/25" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Role / Designation</Label>
                    <Input value={f.role} onChange={e => updateFacultyMember(i, "role", e.target.value)} placeholder="e.g. Head of Science" className="border-gold/25" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Subject</Label>
                    <Input value={f.subject} onChange={e => updateFacultyMember(i, "subject", e.target.value)} placeholder="e.g. Physics & Chemistry" className="border-gold/25" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Experience</Label>
                    <Input value={f.experience} onChange={e => updateFacultyMember(i, "experience", e.target.value)} placeholder="e.g. 12 years" className="border-gold/25" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Photo URL (optional)</Label>
                  <Input value={f.photo} onChange={e => updateFacultyMember(i, "photo", e.target.value)} placeholder="https://..." className="border-gold/25" />
                </div>
                {f.photo && (
                  <img src={f.photo} alt={f.name} className="h-16 w-16 rounded-full object-cover border-2 border-gold/30" />
                )}
              </div>
            ))}
          </div>
          <Button type="button"
            onClick={() => setFaculty(prev => [...prev, { name: "", role: "", subject: "", experience: "", photo: "" }])}
            variant="outline" size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" /> Add Faculty Member
          </Button>
        </SectionCard>

      </div>
    </AdminPageShell>
  );
};

export default AdminAbout;