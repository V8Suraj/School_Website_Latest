import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, Eye, EyeOff, ArrowLeft, CheckCircle2, Flame, Lock, Mail, User, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ADMIN_SECRET_KEY, isAdminRegistered, saveAdminCredentials } from "@/lib/adminAuth";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", secretKey: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) { setError("Please enter admin name."); return; }
    if (!form.email.includes("@")) { setError("Please enter a valid email."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (form.secretKey !== ADMIN_SECRET_KEY) { setError("Invalid secret key."); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    saveAdminCredentials({ name: form.name.trim(), email: form.email.trim(), password: form.password });
    localStorage.setItem("admin-auth", "true");
    setSuccess(true);
    setTimeout(() => navigate("/admin"), 1400);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, hsl(38 80% 92%) 0%, hsl(32 70% 86%) 100%)" }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-white/90 rounded-3xl shadow-temple border border-gold/25 p-10 text-center max-w-sm w-full">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg mx-auto mb-5">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="font-display text-2xl text-secondary mb-2">Admin Registered!</h1>
          <p className="text-sm text-muted-foreground">Redirecting to dashboard…</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8"
      style={{ background: "linear-gradient(135deg, hsl(38 80% 92%) 0%, hsl(32 70% 86%) 100%)" }}>
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(hsl(22 88% 45%) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-primary to-gold" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-temple border border-gold/25 overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-secondary via-primary to-gold" />

          <div className="p-8">
            {/* Logo */}
            <div className="flex flex-col items-center mb-7">
              <div className="relative mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-saffron shadow-gold">
                  <Flame className="h-8 w-8 text-white animate-[flame-flicker_1.6s_ease-in-out_infinite]" />
                </div>
                <span className="absolute inset-0 rounded-full border border-gold/50 animate-ring-pulse" />
              </div>
              <h1 className="font-display text-2xl font-bold text-secondary">Register Admin</h1>
              <p className="text-xs text-muted-foreground mt-1">Protected by secret key</p>
            </div>

            {isAdminRegistered() && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700">
                ⚠️ Admin credentials already exist. Registering again will replace them.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { id: "name",     label: "Admin Name",   icon: User,  type: "text",     placeholder: "School Admin" },
                { id: "email",    label: "Email Address", icon: Mail,  type: "email",    placeholder: "admin@vidyalaya.in" },
                { id: "secretKey",label: "Secret Key",    icon: Key,   type: "password", placeholder: "Enter admin secret key" },
              ].map(({ id, label, icon: Icon, type, placeholder }) => (
                <div key={id} className="space-y-1.5">
                  <Label htmlFor={id} className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5" /> {label}
                  </Label>
                  <Input id={id} type={type} placeholder={placeholder}
                    value={form[id]}
                    onChange={e => setForm({ ...form, [id]: e.target.value })}
                    className="border-gold/30 focus:border-primary/60 bg-white/80"
                    required />
                </div>
              ))}

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" /> Password
                </Label>
                <div className="relative">
                  <Input id="password" type={showPass ? "text" : "password"} placeholder="Minimum 6 characters"
                    value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                    className="border-gold/30 focus:border-primary/60 bg-white/80 pr-10" required />
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </motion.p>
              )}

              <Button type="submit" variant="hero" className="w-full mt-2" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block h-4 w-4 border-2 border-white/40 border-t-white rounded-full" />
                    Registering…
                  </span>
                ) : "Register Admin"}
              </Button>
            </form>

            <div className="mt-5 space-y-2 text-center">
              <p className="text-xs text-muted-foreground">
                Already registered?{" "}
                <Link to="/admin/login" className="text-primary hover:underline font-medium">Go to Login</Link>
              </p>
              <Link to="/" className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="h-3 w-3" /> Back to School Website
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center font-sanskrit text-xs text-primary/50 mt-4 tracking-wider">
          ॥ सत्यं शिवं सुन्दरम् ॥
        </p>
      </motion.div>
    </div>
  );
};

export default AdminRegister;