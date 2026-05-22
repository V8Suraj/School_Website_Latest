import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, Eye, EyeOff, ArrowLeft, Flame, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isAdminRegistered, validateAdminLogin } from "@/lib/adminAuth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    if (validateAdminLogin(form.email.trim(), form.password)) {
      localStorage.setItem("admin-auth", "true");
      navigate("/admin");
    } else {
      setError("Invalid admin email or password.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
      style={{ background: "linear-gradient(135deg, hsl(38 80% 92%) 0%, hsl(32 70% 86%) 100%)" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(hsl(22 88% 45%) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-primary to-gold" />

      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-temple border border-gold/25 overflow-hidden">
          {/* Top festive bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-secondary via-primary to-gold" />

          <div className="p-8">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-saffron shadow-gold">
                  <Flame className="h-8 w-8 text-white animate-[flame-flicker_1.6s_ease-in-out_infinite]" />
                </div>
                <span className="absolute inset-0 rounded-full border border-gold/50 animate-ring-pulse" />
              </div>
              <h1 className="font-display text-2xl font-bold text-secondary">Vidyalaya</h1>
              <p className="font-sanskrit text-xs text-primary/70 tracking-wider mt-0.5">विद्या ददाति विनयं</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/60" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">Admin Portal</span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/60" />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@vidyalaya.in"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="border-gold/30 focus:border-primary/60 bg-white/80"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" /> Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    className="border-gold/30 focus:border-primary/60 bg-white/80 pr-10"
                    required
                  />
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

              <Button type="submit" variant="hero" className="w-full mt-2 gap-2" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block h-4 w-4 border-2 border-white/40 border-t-white rounded-full" />
                    Signing in…
                  </span>
                ) : "Sign In to Dashboard"}
              </Button>
            </form>

            {/* Footer links */}
            <div className="mt-5 space-y-2 text-center">
              {!isAdminRegistered() ? (
                <p className="text-xs text-muted-foreground">
                  No admin account?{" "}
                  <Link to="/admin/register" className="text-primary hover:underline font-medium">Register Admin</Link>
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Update credentials?{" "}
                  <Link to="/admin/register" className="text-primary hover:underline font-medium">Re-register</Link>
                </p>
              )}
              <Link to="/" className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="h-3 w-3" /> Back to School Website
              </Link>
            </div>
          </div>
        </div>

        {/* Sanskrit footer */}
        <p className="text-center font-sanskrit text-xs text-primary/50 mt-4 tracking-wider">
          ॥ सत्यं शिवं सुन्दरम् ॥
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;