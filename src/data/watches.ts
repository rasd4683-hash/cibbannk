import watchTitanX from "@/assets/watch-titan-x.png";
import watchLunaRose from "@/assets/watch-luna-rose.png";
import watchPulseNeon from "@/assets/watch-pulse-neon.png";
import watchAquaDeep from "@/assets/watch-aqua-deep.png";
import watchRoyalGold from "@/assets/watch-royal-gold.png";
import watchArcticSilver from "@/assets/watch-arctic-silver.png";
import watchVioletPro from "@/assets/watch-violet-pro.png";
import watchCrimsonFire from "@/assets/watch-crimson-fire.png";
import watchOnyxStealth from "@/assets/watch-onyx-stealth.png";

export interface WatchItem {
  id: string;
  name: string;
  image: string;
  color: string;
  accent: string;
  colorKey: string;
  colorLabel: string;
  price: number;
  description: string;
  longDescription: string;
  features: string[];
  specs: { label: string; value: string }[];
  stock: number;
}

export const WATCHES: WatchItem[] = [
  {
    id: "titan-x",
    name: "ساعة Titan X الرياضية",
    image: watchTitanX,
    color: "from-orange-500/10 to-orange-600/5",
    accent: "bg-orange-500",
    colorKey: "orange",
    colorLabel: "برتقالي",
    price: 1200,
    description: "ساعة رياضية بإطار أسود فاخر وحزام برتقالي حيوي — مثالية للأنشطة اليومية والرياضية.",
    longDescription: "ساعة Titan X الرياضية صُمّمت لعشّاق المغامرة والنشاط اليومي. تجمع بين متانة الإطار الأسود الفاخر وحيوية الحزام البرتقالي الجريء، لتمنحك إطلالة قوية وأداءً يدوم لساعات طويلة من التمرين والمتابعة الصحية الدقيقة.",
    features: ["مقاومة للماء حتى 50م", "تتبّع 20+ نشاطاً رياضياً", "بطارية تدوم 14 يوماً", "شاشة AMOLED عالية الوضوح"],
    specs: [
      { label: "حجم الشاشة", value: "1.43 بوصة" },
      { label: "البطارية", value: "14 يوماً" },
      { label: "الوزن", value: "42 جم" },
      { label: "التوافق", value: "iOS / Android" },
    ],
    stock: 12,
  },
  {
    id: "luna-rose",
    name: "ساعة Luna Rose الفاخرة",
    image: watchLunaRose,
    color: "from-rose-400/10 to-rose-500/5",
    accent: "bg-rose-400",
    colorKey: "rose",
    colorLabel: "وردي",
    price: 1850,
    description: "تصميم نسائي راقي بحزام شبكي ذهبي وردي مع زخارف لامعة — تليق بأناقتك في كل مناسبة.",
    longDescription: "ساعة Luna Rose قطعة مجوهرات تنبض بالحياة. الحزام الشبكي الذهبي الوردي والزخارف اللامعة تمنحك حضوراً أنيقاً في كل مناسبة، بينما تخفي خلف جمالها تقنيات ذكية متطورة لتتبع صحتك وإشعاراتك.",
    features: ["تصميم مجوهرات أنيق", "تتبّع الدورة الصحية", "إشعارات هاتفية كاملة", "وجوه ساعة قابلة للتخصيص"],
    specs: [
      { label: "حجم الشاشة", value: "1.32 بوصة" },
      { label: "البطارية", value: "10 أيام" },
      { label: "المادة", value: "ستانلس ستيل" },
      { label: "التوافق", value: "iOS / Android" },
    ],
    stock: 6,
  },
  {
    id: "pulse-neon",
    name: "ساعة Pulse Neon",
    image: watchPulseNeon,
    color: "from-emerald-500/10 to-emerald-600/5",
    accent: "bg-emerald-500",
    colorKey: "green",
    colorLabel: "أخضر",
    price: 1450,
    description: "تصميم رياضي عصري بشاشة AMOLED وحزام أخضر نيون — لعشّاق الرياضة والمغامرة.",
    longDescription: "Pulse Neon هي رفيقك المثالي للحركة المستمرة. الحزام الأخضر النيون يلفت الأنظار، والشاشة AMOLED الحادة تُظهر بياناتك بوضوح حتى تحت أشعة الشمس المباشرة.",
    features: ["GPS مدمج", "قياس الأكسجين SpO2", "مقاومة الصدمات", "وضع التدريب الذكي"],
    specs: [
      { label: "حجم الشاشة", value: "1.45 بوصة" },
      { label: "البطارية", value: "12 يوماً" },
      { label: "GPS", value: "نعم" },
      { label: "التوافق", value: "iOS / Android" },
    ],
    stock: 9,
  },
  {
    id: "aqua-deep",
    name: "ساعة Aqua Deep الزرقاء",
    image: watchAquaDeep,
    color: "from-blue-500/10 to-blue-600/5",
    accent: "bg-blue-500",
    colorKey: "blue",
    colorLabel: "أزرق",
    price: 1650,
    description: "إطار سيراميك أزرق محيطي مع حزام جلدي أنيق — مزيج من الفخامة والكلاسيكية.",
    longDescription: "Aqua Deep تجمع بين الأناقة الكلاسيكية والتقنية الحديثة. إطار السيراميك الأزرق المحيطي وحزام الجلد الفاخر يجعلانها مثالية للمناسبات الرسمية واليومية على حدٍّ سواء.",
    features: ["إطار سيراميك مقاوم للخدش", "حزام جلد طبيعي", "مقاومة للماء 5ATM", "شحن لاسلكي سريع"],
    specs: [
      { label: "حجم الشاشة", value: "1.39 بوصة" },
      { label: "البطارية", value: "11 يوماً" },
      { label: "الإطار", value: "سيراميك" },
      { label: "التوافق", value: "iOS / Android" },
    ],
    stock: 7,
  },
  {
    id: "royal-gold",
    name: "ساعة Royal Gold الكلاسيكية",
    image: watchRoyalGold,
    color: "from-amber-400/10 to-amber-500/5",
    accent: "bg-amber-500",
    colorKey: "gold",
    colorLabel: "ذهبي",
    price: 2400,
    description: "ساعة تنفيذية فاخرة بإطار ذهبي مصقول وحزام جلد تمساح بني — تعكس مكانتك الرفيعة.",
    longDescription: "Royal Gold تعكس مكانتك الرفيعة في كل تفصيل. الإطار الذهبي المصقول وحزام جلد التمساح البني يمنحانك حضوراً تنفيذياً لا يُنسى، مدعومان بأرقى التقنيات الذكية.",
    features: ["طلاء ذهبي 18 قيراط", "حزام جلد تمساح", "ETA كرونوغراف ذكي", "وضع التنفيذي الراقي"],
    specs: [
      { label: "حجم الشاشة", value: "1.41 بوصة" },
      { label: "البطارية", value: "9 أيام" },
      { label: "الطلاء", value: "ذهبي 18K" },
      { label: "التوافق", value: "iOS / Android" },
    ],
    stock: 4,
  },
  {
    id: "arctic-silver",
    name: "ساعة Arctic Silver",
    image: watchArcticSilver,
    color: "from-zinc-300/10 to-zinc-400/5",
    accent: "bg-zinc-400",
    colorKey: "silver",
    colorLabel: "فضي",
    price: 1750,
    description: "تصميم فضي تيتانيوم نحيف للغاية مع حزام أبيض ناعم — أناقة بسيطة ومتطورة.",
    longDescription: "Arctic Silver تُعرّف الأناقة البسيطة بأبهى صورها. هيكل التيتانيوم النحيف للغاية والحزام الأبيض الناعم يمنحانك راحة استثنائية مع مظهر متطور يناسب كل الإطلالات.",
    features: ["تيتانيوم خفيف الوزن", "تصميم فائق النحافة", "مستشعرات صحية متقدمة", "شاشة Always-On"],
    specs: [
      { label: "السماكة", value: "8.9 ملم" },
      { label: "البطارية", value: "13 يوماً" },
      { label: "الهيكل", value: "تيتانيوم" },
      { label: "التوافق", value: "iOS / Android" },
    ],
    stock: 8,
  },
  {
    id: "violet-pro",
    name: "ساعة Violet Pro",
    image: watchVioletPro,
    color: "from-purple-500/10 to-purple-600/5",
    accent: "bg-purple-500",
    colorKey: "purple",
    colorLabel: "بنفسجي",
    price: 1550,
    description: "إطار ألومنيوم بنفسجي عميق مع حزام نايلون مضفّر — تصميم مستقبلي يجذب الأنظار.",
    longDescription: "Violet Pro تصميم مستقبلي يعبّر عن شخصيتك المميزة. اللون البنفسجي العميق وحزام النايلون المضفّر يجذبان الأنظار في كل مكان، مع تقنيات احترافية لتتبع نشاطك وصحتك.",
    features: ["ألومنيوم فضائي", "حزام نايلون مضفّر", "مساعد صوتي ذكي", "شحن مغناطيسي سريع"],
    specs: [
      { label: "حجم الشاشة", value: "1.44 بوصة" },
      { label: "البطارية", value: "11 يوماً" },
      { label: "الإطار", value: "ألومنيوم" },
      { label: "التوافق", value: "iOS / Android" },
    ],
    stock: 10,
  },
  {
    id: "crimson-fire",
    name: "ساعة Crimson Fire الحمراء",
    image: watchCrimsonFire,
    color: "from-red-500/10 to-red-600/5",
    accent: "bg-red-500",
    colorKey: "red",
    colorLabel: "أحمر",
    price: 1350,
    description: "ساعة رياضية بإطار أحمر قرمزي مع شاشة ملوّنة لتتبّع التمارين — للأشخاص النشطين.",
    longDescription: "Crimson Fire تشتعل بالحماس والطاقة. الإطار الأحمر القرمزي والشاشة الحادة الألوان يحفزانك على تجاوز حدودك في كل تمرين، مع تتبّع دقيق لكل خطوة ونبضة قلب.",
    features: ["تتبّع نبض القلب 24/7", "30+ وضع رياضي", "مقاومة للعرق والماء", "تنبيهات صحية ذكية"],
    specs: [
      { label: "حجم الشاشة", value: "1.40 بوصة" },
      { label: "البطارية", value: "12 يوماً" },
      { label: "الوزن", value: "38 جم" },
      { label: "التوافق", value: "iOS / Android" },
    ],
    stock: 11,
  },
  {
    id: "onyx-stealth",
    name: "ساعة Onyx Stealth",
    image: watchOnyxStealth,
    color: "from-gray-700/10 to-gray-800/5",
    accent: "bg-gray-800",
    colorKey: "black",
    colorLabel: "أسود",
    price: 1950,
    description: "تصميم تكتيكي خفي بإطار سيراميك أسود مطفي وحزام نايلون منسوج — للقوة والأناقة.",
    longDescription: "Onyx Stealth تجسيد للقوة الخفية. السيراميك الأسود المطفي والحزام النايلون المنسوج يمنحانك مظهراً تكتيكياً فريداً، مدعوماً بأقوى المستشعرات لمختلف الظروف القاسية.",
    features: ["سيراميك تكتيكي", "مقاومة عسكرية MIL-STD", "بوصلة وارتفاع", "وضع الرؤية الليلية"],
    specs: [
      { label: "حجم الشاشة", value: "1.46 بوصة" },
      { label: "البطارية", value: "16 يوماً" },
      { label: "المعيار", value: "MIL-STD-810H" },
      { label: "التوافق", value: "iOS / Android" },
    ],
    stock: 5,
  },
];

export const getWatchById = (id: string) => WATCHES.find((w) => w.id === id);
