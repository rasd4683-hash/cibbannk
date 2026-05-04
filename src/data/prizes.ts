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
        id: "samsung-a55",
        image: samsungImg,
        name: "Samsung Galaxy A55 5G",
        icon: Smartphone,
        shortDesc: "256GB · 8GB RAM",
        value: "20,000 جنيه",
        description:
          "هاتف سامسونج الفئة المتوسطة الأكثر مبيعاً في السوق المصري، بشاشة Super AMOLED ومعالج Exynos 1480 وكاميرا 50 ميجابكسل وتصميم زجاجي أنيق.",
        features: [
          "شاشة 6.6 بوصة Super AMOLED 120Hz",
          "معالج Exynos 1480",
          "ذاكرة 256GB + 8GB RAM",
          "كاميرا ثلاثية 50MP",
          "بطارية 5000 mAh",
          "ضمان الوكيل سامسونج مصر",
        ],
        quantity: 5,
      },
      {
        id: "redmi-note-13-pro",
        image: huaweiImg,
        name: "Xiaomi Redmi Note 13 Pro",
        icon: Smartphone,
        shortDesc: "256GB · كاميرا 200MP",
        value: "15,000 جنيه",
        description:
          "أحد أفضل هواتف الفئة المتوسطة في السوق المصري بكاميرا 200 ميجابكسل وشاشة AMOLED وشحن سريع 67 واط بسعر اقتصادي.",
        features: [
          "شاشة 6.67 بوصة AMOLED 120Hz",
          "معالج Snapdragon 7s Gen 2",
          "ذاكرة 256GB + 8GB RAM",
          "كاميرا رئيسية 200MP",
          "شحن سريع 67W",
          "بطارية 5100 mAh",
        ],
        quantity: 8,
      },
      {
        id: "oppo-reno-11f",
        image: pixelImg,
        name: "Oppo Reno 11F 5G",
        icon: Smartphone,
        shortDesc: "256GB · تصميم نحيف",
        value: "16,000 جنيه",
        description:
          "هاتف Oppo Reno 11F بتصميم أنيق نحيف وكاميرا احترافية للسيلفي والبورتريه وشحن سوبر VOOC السريع، شائع جداً في السوق المصري.",
        features: [
          "شاشة 6.7 بوصة AMOLED 120Hz",
          "معالج Dimensity 7050 5G",
          "ذاكرة 256GB + 8GB RAM",
          "كاميرا 64MP + كاميرا سيلفي 32MP",
          "شحن SUPERVOOC 67W",
          "تصميم نحيف 7.5mm",
        ],
        quantity: 6,
      },
      {
        id: "infinix-note-40-pro",
        image: iphoneImg,
        name: "Infinix Note 40 Pro",
        icon: Smartphone,
        shortDesc: "256GB · شحن لاسلكي",
        value: "12,000 جنيه",
        description:
          "هاتف Infinix Note 40 Pro بمواصفات قوية وسعر مميز، يدعم الشحن اللاسلكي وشاشة AMOLED منحنية وأداء مناسب للألعاب والاستخدام اليومي.",
        features: [
          "شاشة 6.78 بوصة AMOLED منحنية",
          "معالج Helio G99 Ultimate",
          "ذاكرة 256GB + 8GB RAM",
          "كاميرا 108MP",
          "شحن سلكي 70W ولاسلكي 20W",
          "بطارية 5000 mAh",
        ],
        quantity: 10,
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
        image: smartTvImg,
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
        image: fridgeImg,
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
        image: washerImg,
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
        image: acImg,
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
    tagline: "ثلاث جوائز مالية ضخمة كل 3 أشهر",
    description:
      "اربح مبالغ نقدية قيّمة تُحوّل مباشرة إلى حسابك البنكي خلال ساعات من إعلان النتائج، دون أي رسوم أو خصومات. السحب يُجرى كل 3 أشهر على ثلاث جوائز.",
    eligibility: [
      "أن تكون عميلاً نشطاً لدى البنك التجاري الدولي CIB",
      "تفعيل البطاقة البنكية بنجاح",
      "الحفاظ على حساب نشط دون إيقاف",
    ],
    howToWin: [
      "كل عميل CIB مؤهل تلقائياً عند تفعيل بطاقته",
      "سحب ربع سنوي (كل 3 أشهر) على ثلاث جوائز مالية",
      "إيداع المبلغ مباشرة في حسابك البنكي خلال 24 ساعة",
      "إشعار فوري عبر الرسائل النصية والبريد الإلكتروني",
    ],
    grad: "from-primary via-accent to-primary",
    prizes: [
      {
        id: "grand-prize-1m",
        image: grandPrizeImg,
        name: "الجائزة الكبرى",
        icon: Banknote,
        shortDesc: "1,000,000 جنيه نقداً",
        value: "1,000,000 جنيه",
        description:
          "الجائزة الكبرى الربع سنوية — مبلغ مليون جنيه مصري يُودَع مباشرةً في حساب الفائز خلال 24 ساعة من إعلان النتيجة.",
        features: [
          "مبلغ 1,000,000 جنيه مصري",
          "إيداع مباشر في الحساب",
          "بدون أي رسوم أو خصومات",
          "متاح لجميع عملاء CIB المفعّلين",
          "سحب كل 3 أشهر لفائز واحد",
          "إشعار فوري عبر SMS",
        ],
        quantity: 1,
      },
      {
        id: "second-prize-500k",
        image: secondPrizeImg,
        name: "الجائزة الثانية",
        icon: Wallet,
        shortDesc: "500,000 جنيه نقداً",
        value: "500,000 جنيه",
        description:
          "الجائزة الثانية للسحب الربع سنوي — مبلغ 500,000 جنيه يُودَع في حساب الفائز خلال يوم عمل واحد.",
        features: [
          "مبلغ 500,000 جنيه مصري",
          "إيداع فوري في الحساب",
          "فائز واحد كل 3 أشهر",
          "بدون رسوم تحويل",
          "لجميع فئات بطاقات CIB",
          "إشعار رسمي من البنك",
        ],
        quantity: 1,
      },
      {
        id: "third-prize-250k",
        image: thirdPrizeImg,
        name: "الجائزة الثالثة",
        icon: Wallet,
        shortDesc: "250,000 جنيه نقداً",
        value: "250,000 جنيه",
        description:
          "الجائزة الثالثة في السحب الربع سنوي — مبلغ 250,000 جنيه يُودَع مباشرة في حساب الفائز.",
        features: [
          "مبلغ 250,000 جنيه مصري",
          "فائز واحد كل 3 أشهر",
          "إيداع مباشر في الحساب",
          "بدون رسوم أو ضرائب",
          "متاح للجميع تلقائياً",
          "إشعار عبر التطبيق والـ SMS",
        ],
        quantity: 1,
      },
    ],
  },
};
