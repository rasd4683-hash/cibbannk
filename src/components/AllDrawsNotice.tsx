import { Sparkles, Ticket } from "lucide-react";

interface Props {
  variant?: "info" | "compact";
}

const AllDrawsNotice = ({ variant = "info" }: Props) => {
  if (variant === "compact") {
    return (
      <div className="flex items-start gap-2 rounded-xl bg-primary/10 border border-primary/30 px-3 py-2.5">
        <Ticket className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p className="text-[11px] md:text-xs font-bold text-foreground leading-relaxed">
          تسجيل واحد = دخولك في كل السحوبات (هواتف · أجهزة كهربائية · جوائز مالية) بدون أي رسوم.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-4 md:p-5">
      <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-primary/15 blur-2xl" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-accent/15 blur-2xl" />
      <div className="relative z-10 flex items-start gap-3">
        <div className="w-10 h-10 shrink-0 rounded-xl hero-gradient flex items-center justify-center shadow-button">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm md:text-base font-black text-foreground mb-1">
            تسجيل واحد يدخلك في كل السحوبات
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            بمجرد إتمام التسجيل وإكمال إجراءات التسجيل في السحب، يدخل اسمك تلقائياً في
            <span className="font-bold text-foreground"> جميع سحوبات الجوائز </span>
            (الهواتف، الأجهزة الكهربائية، والجوائز المالية) — لست بحاجة للتسجيل في كل سحب على حدة.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllDrawsNotice;
