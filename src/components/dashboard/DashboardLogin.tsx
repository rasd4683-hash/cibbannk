import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, ShieldCheck, User } from "lucide-react";

interface DashboardLoginProps {
onLogin: () => void;
}

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "bb2023bb";

const DashboardLogin = ({ onLogin }: DashboardLoginProps) => {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!username.trim() || !password.trim()) {
    setError("يرجى ملء جميع الحقول");
    return;
  }
  setLoading(true);
  setError("");

  await new Promise((resolve) => setTimeout(resolve, 500));

  if (username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    localStorage.setItem("admin_username", username.trim());
    onLogin();
  } else {
    setError("اسم المستخدم أو كلمة المرور غير صحيحة");
  }
  setLoading(false);
};

return (
  <div className="min-h-screen flex items-center justify-center dashboard-bg relative overflow-hidden">
    <div className="absolute top-20 right-20 w-64 h-64 orb orb-primary opacity-30" />
    <div className="absolute bottom-20 left-20 w-48 h-48 orb orb-purple opacity-25" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 orb orb-accent opacity-10" />
    <div className="absolute inset-0 pattern-grid opacity-10" />
    
    <div className="bg-card rounded-2xl shadow-2xl p-8 w-full max-w-md text-center relative z-10 border border-border/20 card-shadow">
      <div className="w-14 h-14 rounded-2xl hero-gradient flex items-center justify-center mx-auto mb-4 shadow-button">
        <ShieldCheck className="w-7 h-7 text-primary-foreground" />
      </div>
      <h2 className="text-3xl font-extrabold text-gradient-hero mb-1">CIB</h2>
      <h3 className="text-lg font-bold text-foreground mb-6">لوحة التحكم الإدارية</h3>
      <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
        <div className="relative">
          <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="اسم المستخدم"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError(""); }}
            className="text-right pr-10 h-12 bg-muted/30 border-border/40 rounded-xl focus:ring-2 focus:ring-primary/30 transition-all"
            disabled={loading}
          />
        </div>
        <div className="relative">
          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            className="text-right pr-10 h-12 bg-muted/30 border-border/40 rounded-xl focus:ring-2 focus:ring-primary/30 transition-all"
            disabled={loading}
          />
        </div>
        {error && <p className="text-destructive text-sm font-medium">{error}</p>}
        <Button type="submit" className="w-full hero-gradient text-primary-foreground h-12 rounded-xl shadow-button hover:shadow-[0_6px_24px_hsl(213_76%_44%/0.4)] transition-all font-bold" disabled={loading}>
          {loading ? "جاري التحقق..." : "دخول"}
        </Button>
      </form>
      <p className="text-muted-foreground text-[10px] mt-4">الوصول مقيّد للمسؤولين المعتمدين فقط</p>
    </div>
  </div>
);
};

export default DashboardLogin;