import { Link, useParams, Navigate } from "react-router-dom";
import { Gift, CalendarClock, Ticket, ShieldCheck, ArrowRight, Sparkles, Trophy, ChevronLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { PRIZE_CATEGORIES, type CategoryKey } from "@/data/prizes";

const PrizeDetails = () => {
  const { category } = useParams<{ category: CategoryKey }>();
  if (!category || !(category in PRIZE_CATEGORIES)) return <Navigate to="/" replace />;

  const cat = PRIZE_CATEGORIES[category];
  const Icon = cat.icon;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />
      <div className="fixed top-20 -right-20 w-72 h-72 orb orb-primary opacity-30 pointer-events-none animate-orb-float" />
      <div className="fixed bottom-40 -left-20 w-80 h-80 orb orb-purple opacity-25 pointer-events-none animate-orb-float-delay" />

      <SiteHeader />

      {/* Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${cat.grad} py-14 px-4`}>
        <div className="absolute inset-0 pattern-grid opacity-15" />
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-accent/30 blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-4">
            <Trophy className="w-3.5 h-3.5 text-white" />
            <span className="text-xs font-bold text-white">سحب دوري حصري</span>
          </div>
          <div className="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-4 shadow-button">
            <Icon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 drop-shadow-lg">{cat.title}</h1>
          <p className="text-sm md:text-base text-white/90">{cat.tagline}</p>
        </div>
      </section>

      <section className="py-12 px-4 relative z-10">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Description */}
          <div className="bg-card rounded-2xl p-6 border border-border/40 card-shadow">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <h2 className="text-lg font-extrabold text-foreground">عن هذه الفئة</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
          </div>

          {/* Prizes Grid */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Gift className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-extrabold text-foreground">الجوائز المتاحة في السحب</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.prizes.map((prize) => (
                <Link
                  key={prize.id}
                  to={`/prizes/${cat.key}/${prize.id}`}
                  className="group relative bg-card rounded-2xl border border-border/40 card-shadow hover:card-hover-shadow transition-all duration-500 hover:-translate-y-1 overflow-hidden block"
                >
                  <div className="relative aspect-square overflow-hidden bg-muted/30">
                    <img
                      src={prize.image}
                      alt={prize.name}
                      loading="lazy"
                      width={800}
                      height={800}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-full bg-white/90 text-primary border border-white/40 backdrop-blur-sm">
                      {prize.quantity} فائز
                    </span>
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full bg-primary/90 text-primary-foreground border border-white/30 backdrop-blur-sm">
                      {prize.frequency}
                    </span>
                    <div className="absolute bottom-2 right-3 left-3">
                      <p className="text-[10px] font-bold text-white/80">{prize.shortDesc}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-extrabold text-foreground mb-2">{prize.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-primary">{prize.value}</span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary group-hover:gap-2 transition-all">
                        التفاصيل
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Eligibility */}
          <div className="bg-card rounded-2xl p-6 border border-border/40 card-shadow">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <h2 className="text-lg font-extrabold text-foreground">شروط الاستحقاق</h2>
            </div>
            <ul className="space-y-2.5">
              {cat.eligibility.map((c, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg hero-gradient flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[11px] font-bold text-primary-foreground">{i + 1}</span>
                  </div>
                  <span className="text-sm text-foreground leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How to win */}
          <div className="bg-card rounded-2xl p-6 border border-border/40 card-shadow">
            <div className="flex items-center gap-2 mb-4">
              <CalendarClock className="w-4 h-4 text-accent" />
              <h2 className="text-lg font-extrabold text-foreground">آلية السحب والفوز</h2>
            </div>
            <ol className="relative border-r-2 border-border/40 pr-5 space-y-4">
              {cat.howToWin.map((step, i) => (
                <li key={i} className="relative">
                  <div className="absolute -right-[27px] top-0 w-5 h-5 rounded-full hero-gradient flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA */}
          <div className="relative overflow-hidden rounded-3xl p-7 hero-gradient text-center">
            <div className="absolute inset-0 pattern-grid opacity-20" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 mb-3">
                <Ticket className="w-3 h-3 text-white" />
                <span className="text-[11px] font-bold text-white">اشتراك تلقائي عند التفعيل</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-2">جاهز للدخول في السحب؟</h3>
              <p className="text-xs md:text-sm text-white/90 mb-5">فعّل بطاقتك الآن واشترك تلقائياً في السحب الدوري</p>
              <Link
                to="/login"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary font-extrabold text-sm shadow-2xl hover:-translate-y-0.5 transition-all"
              >
                فعّل بطاقتك الآن
                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default PrizeDetails;
