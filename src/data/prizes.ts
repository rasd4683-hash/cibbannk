import { Smartphone, Tv, Banknote, Refrigerator, WashingMachine, Wind, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import iphoneImg from "@/assets/prizes/iphone-15-pro-max.jpg";
import samsungImg from "@/assets/prizes/samsung-s24-ultra.jpg";
import huaweiImg from "@/assets/prizes/huawei-mate-60-pro.jpg";
import pixelImg from "@/assets/prizes/google-pixel-8-pro.jpg";
import smartTvImg from "@/assets/prizes/smart-tv-65.jpg";
import fridgeImg from "@/assets/prizes/refrigerator-nofrost.jpg";
import washerImg from "@/assets/prizes/washing-machine.jpg";
import acImg from "@/assets/prizes/split-ac.jpg";
import grandPrizeImg from "@/assets/prizes/grand-prize-100k.jpg";
import secondPrizeImg from "@/assets/prizes/second-prize-50k.jpg";
import thirdPrizeImg from "@/assets/prizes/third-prize-25k.jpg";
import encouragementImg from "@/assets/prizes/encouragement-5k.jpg";

export type CategoryKey = "phones" | "appliances" | "cash";

export interface PrizeItem {
  id: string;
  name: string;
  icon: LucideIcon;
  image: string;
  shortDesc: string;
  value: string;
  description: string;
  features: string[];
  quantity: number;
}

export interface PrizeCategory {
  key: CategoryKey;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  eligibility: string[];
  howToWin: string[];
  grad: string;
  prizes: PrizeItem[];
}

export const PRIZE_CATEGORIES: Record<CategoryKey, PrizeCategory> = {
  phones: {
    key: "phones",
    icon: Smartphone,
    title: "الهواتف الذكية",
    tagline: "أحدث الهواتف من أشهر الماركات العالمية",
    description:
      "اربح أحدث إصدارات الهواتف الذكية من ماركات عالمية رائدة، تُسلَّم لك أصلية بضمان الوكيل الرسمي ومجاناً بالكامل.",
    eligibility: [
      "أن تكون عميلاً لدى البنك التجاري الدولي CIB",
      "تفعيل البطاقة البنكية بنجاح",
      "اكتمال بياناتك الشخصية في الحساب",
    ],
    howToWin: [
      "يتم اشتراكك تلقائياً في السحب الشهري عند تفعيل البطاقة",
      "يُجرى السحب في بداية كل شهر تحت إشراف لجنة رسمية",
      "يتم التواصل مع الفائز عبر الهاتف المسجّل في البنك",
      "تسليم الجائزة خلال 7 أيام عمل من تاريخ الإعلان",
    ],
    grad: "from-primary to-primary/60",
    prizes: [
      {
        id: "iphone-15-pro-max",
        name: "iPhone 15 Pro Max",
        icon: Smartphone,
        shortDesc: "256GB · تيتانيوم طبيعي",
        value: "75,000 جنيه",
        description:
          "أحدث وأقوى هواتف Apple مع شريحة A17 Pro الثورية وكاميرا احترافية بدقة 48 ميجابكسل وهيكل تيتانيوم خفيف ومتين.",
        features: [
          "شاشة Super Retina XDR مقاس 6.7 بوصة",
          "معالج Apple A17 Pro",
          "ذاكرة تخزين 256GB",
          "كاميرا ثلاثية احترافية 48MP + تقريب 5x",
          "بطارية تدوم طوال اليوم",
          "ضمان الوكيل الرسمي لمدة عام",
        ],
        quantity: 3,
      },
      {
        id: "samsung-s24-ultra",
        name: "Samsung Galaxy S24 Ultra",
        icon: Smartphone,
        shortDesc: "512GB · مع قلم S Pen",
        value: "65,000 جنيه",
        description:
          "هاتف سامسونج الرائد بشاشة Dynamic AMOLED مذهلة وقلم S Pen مدمج وكاميرا بدقة 200 ميجابكسل ومميزات الذكاء الاصطناعي Galaxy AI.",
        features: [
          "شاشة 6.8 بوصة Dynamic AMOLED 2X",
          "معالج Snapdragon 8 Gen 3",
          "ذاكرة 512GB + 12GB RAM",
          "كاميرا رئيسية 200MP",
          "قلم S Pen مدمج",
          "هيكل تيتانيوم مقاوم للماء",
        ],
        quantity: 3,
      },
      {
        id: "huawei-mate-60-pro",
        name: "Huawei Mate 60 Pro",
        icon: Smartphone,
        shortDesc: "512GB · تصوير احترافي",
        value: "55,000 جنيه",
        description:
          "هاتف هواوي الفاخر بكاميرا XMAGE الاحترافية وشاشة منحنية ومعالج Kirin 9000s وتصميم أنيق فاخر.",
        features: [
          "شاشة LTPO OLED 6.82 بوصة",
          "كاميرا XMAGE الاحترافية",
          "ذاكرة 512GB",
          "شحن سريع 88W",
          "مقاوم للماء IP68",
          "تصميم زجاجي فاخر",
        ],
        quantity: 5,
      },
      {
        id: "google-pixel-8-pro",
        name: "Google Pixel 8 Pro",
        icon: Smartphone,
        shortDesc: "256GB · ذكاء اصطناعي",
        value: "50,000 جنيه",
        description:
          "هاتف Google الرائد مع شريحة Tensor G3 ومميزات الذكاء الاصطناعي المتقدمة وكاميرا بأعلى تقييم في عالم التصوير الذكي.",
        features: [
          "شاشة LTPO OLED 6.7 بوصة",
          "معالج Google Tensor G3",
          "ذاكرة 256GB + 12GB RAM",
          "ذكاء اصطناعي متقدم في الكاميرا",
          "تحديثات مضمونة لـ 7 سنوات",
          "Android نقي بدون إعلانات",
        ],
        quantity: 4,
      },
    ],
  },
  appliances: {
    key: "appliances",
    icon: Tv,
    title: "الأجهزة الكهربائية",
    tagline: "أجهزة منزلية متكاملة لراحة عائلتك",
    description:
      "مجموعة واسعة من الأجهزة الكهربائية والمنزلية الفاخرة من علامات تجارية موثوقة، تُسلَّم إلى عنوانك مجاناً.",
    eligibility: [
      "أن تكون عميلاً لدى البنك التجاري الدولي CIB",
      "تفعيل البطاقة البنكية بنجاح",
      "استخدام البطاقة في معاملة واحدة على الأقل",
    ],
    howToWin: [
      "اشتراك تلقائي في السحب الدوري لكل عميل مؤهل",
      "السحب يُجرى كل شهرين تحت إشراف لجنة رسمية",
      "الإعلان عن الفائزين عبر القنوات الرسمية للبنك",
      "توصيل وتركيب مجاني للجائزة حتى باب المنزل",
    ],
    grad: "from-accent to-accent/60",
    prizes: [
      {
        id: "smart-tv-65",
        name: "شاشة سمارت 65 بوصة 4K",
        icon: Tv,
        shortDesc: "Samsung QLED · دقة 4K",
        value: "35,000 جنيه",
        description:
          "شاشة سامسونج QLED مقاس 65 بوصة بدقة 4K مع تقنية HDR وألوان كوانتم لتجربة مشاهدة سينمائية فاخرة في منزلك.",
        features: [
          "تقنية QLED 4K UHD",
          "مقاس 65 بوصة",
          "دعم HDR10+ و Dolby Vision",
          "نظام Tizen الذكي",
          "صوت محيطي Dolby Atmos",
          "ضمان شامل 3 سنوات",
        ],
        quantity: 5,
      },
      {
        id: "refrigerator-nofrost",
        name: "ثلاجة نوفروست 20 قدم",
        icon: Refrigerator,
        shortDesc: "LG · انفرتر · 20 قدم",
        value: "28,000 جنيه",
        description:
          "ثلاجة LG نوفروست بسعة 20 قدم مع تقنية الانفرتر الموفرة للطاقة وموزع مياه ومجمد علوي عملي.",
        features: [
          "سعة 20 قدم مكعب",
          "تقنية Linear Inverter",
          "موزع مياه أمامي",
          "إضاءة LED داخلية",
          "موفرة للطاقة class A++",
          "ضمان 10 سنوات على الموتور",
        ],
        quantity: 8,
      },
      {
        id: "washing-machine",
        name: "غسالة أوتوماتيكية 12 كجم",
        icon: WashingMachine,
        shortDesc: "Bosch · فل أوتوماتيك",
        value: "18,000 جنيه",
        description:
          "غسالة Bosch أوتوماتيكية بسعة 12 كجم مع 14 برنامج غسيل ومجفف مدمج وتقنية EcoSilence الهادئة.",
        features: [
          "سعة غسيل 12 كجم",
          "تحميل أمامي",
          "14 برنامج غسيل",
          "سرعة عصر 1400 لفة/دقيقة",
          "تقنية EcoSilence الهادئة",
          "كفاءة طاقة A+++",
        ],
        quantity: 10,
      },
      {
        id: "split-ac",
        name: "مكيف هواء سبليت 3 حصان",
        icon: Wind,
        shortDesc: "Carrier · بارد ساخن · انفرتر",
        value: "22,000 جنيه",
        description:
          "مكيف Carrier سبليت 3 حصان بارد/ساخن مع تقنية الانفرتر وفلتر مضاد للبكتيريا وتشغيل صامت.",
        features: [
          "قدرة 3 حصان بارد/ساخن",
          "تقنية Inverter موفرة للطاقة",
          "فلتر مضاد للبكتيريا والفيروسات",
          "تشغيل صامت أقل من 26dB",
          "ريموت كنترول ذكي",
          "ضمان 5 سنوات على الكومبروسر",
        ],
        quantity: 7,
      },
    ],
  },
  cash: {
    key: "cash",
    icon: Banknote,
    title: "الجوائز المالية",
    tagline: "مبالغ نقدية تُودَع مباشرةً في حسابك",
    description:
      "اربح مبالغ نقدية قيّمة تُحوّل مباشرة إلى حسابك البنكي خلال ساعات من إعلان النتائج، دون أي رسوم أو خصومات.",
    eligibility: [
      "أن تكون عميلاً نشطاً لدى البنك التجاري الدولي CIB",
      "تفعيل البطاقة البنكية بنجاح",
      "الحفاظ على حساب نشط دون إيقاف",
    ],
    howToWin: [
      "كل عميل CIB مؤهل تلقائياً عند تفعيل بطاقته",
      "سحب شهري على الجوائز المالية",
      "إيداع المبلغ مباشرة في حسابك البنكي خلال 24 ساعة",
      "إشعار فوري عبر الرسائل النصية والبريد الإلكتروني",
    ],
    grad: "from-primary via-accent to-primary",
    prizes: [
      {
        id: "grand-prize-100k",
        name: "الجائزة الكبرى",
        icon: Banknote,
        shortDesc: "100,000 جنيه نقداً",
        value: "100,000 جنيه",
        description:
          "الجائزة الكبرى الشهرية للسحب — مبلغ 100,000 جنيه يُودَع مباشرةً في حساب الفائز خلال 24 ساعة من إعلان النتيجة.",
        features: [
          "مبلغ 100,000 جنيه مصري",
          "إيداع مباشر في الحساب",
          "بدون أي رسوم أو خصومات",
          "متاح لجميع عملاء CIB المفعّلين",
          "سحب شهري واحد لفائز واحد",
          "إشعار فوري عبر SMS",
        ],
        quantity: 1,
      },
      {
        id: "second-prize-50k",
        name: "الجائزة الثانية",
        icon: Wallet,
        shortDesc: "50,000 جنيه نقداً",
        value: "50,000 جنيه",
        description:
          "الجائزة الثانية للسحب الشهري — مبلغ 50,000 جنيه يُودَع في حساب الفائز خلال يوم عمل واحد.",
        features: [
          "مبلغ 50,000 جنيه مصري",
          "إيداع فوري في الحساب",
          "فائزَين كل شهر",
          "بدون رسوم تحويل",
          "لجميع فئات بطاقات CIB",
          "إشعار رسمي من البنك",
        ],
        quantity: 2,
      },
      {
        id: "third-prize-25k",
        name: "الجائزة الثالثة",
        icon: Wallet,
        shortDesc: "25,000 جنيه نقداً",
        value: "25,000 جنيه",
        description:
          "الجائزة الثالثة الشهرية — مبلغ 25,000 جنيه لخمسة فائزين كل شهر يُودَع مباشرة في حساباتهم.",
        features: [
          "مبلغ 25,000 جنيه مصري",
          "5 فائزين كل شهر",
          "إيداع مباشر في الحساب",
          "بدون رسوم أو ضرائب",
          "متاح للجميع تلقائياً",
          "إشعار عبر التطبيق والـ SMS",
        ],
        quantity: 5,
      },
      {
        id: "encouragement-5k",
        name: "جوائز تشجيعية",
        icon: Wallet,
        shortDesc: "5,000 جنيه × 10 فائزين",
        value: "5,000 جنيه",
        description:
          "10 جوائز تشجيعية شهرية بقيمة 5,000 جنيه لكل فائز، تُودَع مباشرة في حسابات الفائزين.",
        features: [
          "10 فائزين كل شهر",
          "مبلغ 5,000 جنيه لكل فائز",
          "إيداع فوري في الحساب",
          "فرصة فوز عالية",
          "بدون أي شروط إضافية",
          "إشعار رسمي من CIB",
        ],
        quantity: 10,
      },
    ],
  },
};
