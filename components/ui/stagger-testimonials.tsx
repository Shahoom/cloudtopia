"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const SQRT_5000 = Math.sqrt(5000);

export type StaggerTestimonial = {
  tempId: number;
  testimonial: string;
  by: string;
  imgSrc: string;
};

// Bilingual, realistic Arab client profiles praising CloudTopia
const testimonialsEn: StaggerTestimonial[] = [
  {
    tempId: 0,
    testimonial: "My favorite solution in the market. We work 5x faster with CloudTopia.",
    by: "Omar Al Hinai, Operations Director at Oman Service Co",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 1,
    testimonial: "I'm confident our data is safe with CloudTopia. I can't say that about other providers.",
    by: "Mariam Al Nuaimi, Founder at UAE Retail Hub",
    imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 2,
    testimonial: "I know it's cliché, but we were lost before we found CloudTopia. Can't thank their team enough!",
    by: "Fahad Al Qahtani, Managing Partner at KSA Consulting",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 3,
    testimonial: "CloudTopia's custom systems make planning for the future seamless. Can't recommend them enough!",
    by: "Noura Al Sabah, Customer Experience Lead at Kuwait Health",
    imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 4,
    testimonial: "If I could give 11 stars to CloudTopia, I'd give 12.",
    by: "Tariq Al Saeed, Head of Digital at Bahrain Finance",
    imgSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 5,
    testimonial: "SO SO SO HAPPY WE FOUND THEM!!!! I'd bet they have saved me 100 hours of manual work so far.",
    by: "Khaled Al Ghamdi, IT Director at Riyadh Logistics",
    imgSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 6,
    testimonial: "Took some convincing, but now that we're on CloudTopia, we're never going back.",
    by: "Fatima Al Hashimi, CTO at Qatar Tech",
    imgSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 7,
    testimonial: "I would be lost without CloudTopia's CRM analytics. The ROI is EASILY 100X for us.",
    by: "Zaid Al Harbi, Sales Director at Arab Business Systems",
    imgSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 8,
    testimonial: "It's just the best cloud migration team. Period.",
    by: "Faisal Al Otaibi, Head of Infrastructure at Gulf Trading Co",
    imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 9,
    testimonial: "I switched our hosting to CloudTopia 3 years ago and never looked back.",
    by: "Reem Al Dossary, E-commerce Lead at Oman E-com",
    imgSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 10,
    testimonial: "I've been searching for a custom portal like CloudTopia's for YEARS. So glad I finally found one!",
    by: "Majed Al Subaie, Founder at Jeddah Digital",
    imgSrc: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 11,
    testimonial: "It's so simple and intuitive, we got the operations team up to speed in 10 minutes.",
    by: "Layla Al Fadhli, HR Manager at Dubai Logistics",
    imgSrc: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 12,
    testimonial: "CloudTopia's support is unparalleled. They are always there when we need them.",
    by: "Sarah Al Jaber, Customer Success at Kuwait Retail",
    imgSrc: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 13,
    testimonial: "The efficiency gains we've seen since implementing CloudTopia are off the charts!",
    by: "Hamad Al Thani, Operations VP at Qatar Group",
    imgSrc: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 14,
    testimonial: "CloudTopia has revolutionized how we handle our booking workflow. It's a game-changer!",
    by: "Lina Haddad, Clinic Manager at Amman Care",
    imgSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 15,
    testimonial: "The scalability of CloudTopia's app architecture is impressive. It grows with our business.",
    by: "Faisal Al Saud, Product Lead at Riyadh Estate",
    imgSrc: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 16,
    testimonial: "I appreciate how CloudTopia continually innovates. They are always one step ahead.",
    by: "Youssef Al Mansoori, Tech Director at Dubai SaaS",
    imgSrc: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 17,
    testimonial: "The ROI we've seen with CloudTopia is incredible. It has paid for itself many times over.",
    by: "Mona Al Musa, Financial Director at Bahrain Group",
    imgSrc: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 18,
    testimonial: "CloudTopia's custom ERP platform is so robust, yet easy to use. It is the perfect balance.",
    by: "Zaid Al Nahyan, General Manager at Abu Dhabi Partners",
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 19,
    testimonial: "We've tried many solutions, but CloudTopia stands out in terms of reliability and performance.",
    by: "Huda Al Rasheed, Supply Chain Manager at Sharjah Log",
    imgSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  }
];

const testimonialsAr: StaggerTestimonial[] = [
  {
    tempId: 0,
    testimonial: "الحل المفضل لدينا في السوق. نعمل بسرعة أكبر بـ 5 أضعاف مع كلاود توبيا.",
    by: "عمر الهنائي، مدير العمليات في شركة عُمان للخدمات",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 1,
    testimonial: "أنا واثقة من أن بياناتنا آمنة مع كلاود توبيا. لا يمكنني قول ذلك عن المزودين الآخرين.",
    by: "مريم النعيمي، المؤسسة لمنصة تجارة في الإمارات",
    imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 2,
    testimonial: "أعلم أنه أمر مكرر، ولكننا كنا تائهين قبل أن نجد كلاود توبيا. لا يمكننا شكر فريقهم بما يكفي!",
    by: "فهد القحطاني، الشريك الإداري في الاستشارات السعودية",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 3,
    testimonial: "أنظمة كلاود توبيا المخصصة تجعل التخطيط للمستقبل سلساً للغاية. نوصي بهم بشدة!",
    by: "نورة الصباح، قائدة تجربة العملاء في صحة الكويت",
    imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 4,
    testimonial: "لو كان بإمكاني إعطاء 11 نجماً لكلاود توبيا، لأعطيتها 12 نجماً.",
    by: "طارق السعيد، رئيس القسم الرقمي في مالية البحرين",
    imgSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 5,
    testimonial: "سعيد جداً جداً لأننا وجدناهم! أراهن أنهم وفروا عليّ 100 ساعة من العمل اليدوي حتى الآن.",
    by: "خالد الغامدي، مدير تقنية المعلومات في الرياض للوجستيات",
    imgSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 6,
    testimonial: "تطلب الأمر بعض الإقناع، ولكن الآن بعد أن انتقلنا إلى كلاود توبيا، لن نعود للوراء أبداً.",
    by: "فاطمة الهاشمي، المديرة التقنية في قطر تك",
    imgSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 7,
    testimonial: "كنا سنضيع لولا تحليلات نظام CRM من كلاود توبيا. العائد على الاستثمار يتجاوز 100 ضعف بسهولة.",
    by: "زيد الحربي، مدير المبيعات في الأنظمة العربية",
    imgSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 8,
    testimonial: "إنهم ببساطة أفضل فريق ترحيل سحابي. نقطة انتهى.",
    by: "فيصل العتيبي، رئيس البنية التحتية في الخليج التجارية",
    imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 9,
    testimonial: "نقلت استضافتنا إلى كلاود توبيا منذ 3 سنوات ولم أنظر إلى الوراْء أبداً.",
    by: "ريم الدوسري، قائدة التجارة الإلكترونية في عُمان إيكوم",
    imgSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 10,
    testimonial: "لقد كنت أبحث عن بوابة مخصصة مثل بوابة كلاود توبيا لسنوات. سعيد جداً لأنني وجدتها أخيراً!",
    by: "ماجد السبيعي، المؤسس في جدة الرقمية",
    imgSrc: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 11,
    testimonial: "إنه بسيط وسهل الاستخدام للغاية، جعلنا فريق العمليات يتقنه في غضون 10 دقائق فقط.",
    by: "ليلى الفضلي، مديرة الموارد البشرية في دبي للوجستيات",
    imgSrc: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 12,
    testimonial: "دعم كلاود توبيا لا مثيل له. إنهم متواجدون دائماً عندما نحتاج إليهم.",
    by: "سارة الجابر، نجاح العملاء في الكويت للتجزئة",
    imgSrc: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 13,
    testimonial: "مكاسب الكفاءة التي رأيناها منذ تطبيق حلول كلاود توبيا تفوق كل التوقعات!",
    by: "حمد آل ثاني، نائب رئيس العمليات في مجموعة قطر",
    imgSrc: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 14,
    testimonial: "لقد أحدثت كلاود توبيا ثورة في طريقة إدارتنا لتدفق الحجوزات. إنها نقطة تحول حقيقية!",
    by: "لينا حداد، مديرة عيادة في عمان كير",
    imgSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 15,
    testimonial: "قدرة بنية تطبيقات كلاود توبيا على التوسع مبهرة حقاً. إنها تنمو مع أعمالنا بسلاسة.",
    by: "فيصل آل سعود، قائد المنتج في الرياض العقارية",
    imgSrc: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 16,
    testimonial: "أقدر كيف تبتكر كلاود توبيا باستمرار. إنهم دائماً خطوة إلى الأمام.",
    by: "يوسف المنصوري، المدير التقني في دبي SaaS",
    imgSrc: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 17,
    testimonial: "العائد على الاستثمار الذي رأيناه مع كلاود توبيا لا يصدق. لقد استرددنا التكلفة أضعافاً مضاعفة.",
    by: "منى الموسى، المديرة المالية في مجموعة البحرين",
    imgSrc: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 18,
    testimonial: "نظام ERP المخصص من كلاود توبيا قوي للغاية ولكنه سهل الاستخدام. التوازن المثالي.",
    by: "زيد آل نهيان، المدير العام في شركاء أبوظبي",
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 19,
    testimonial: "لقد جربنا العديد من الحلول، ولكن كلاود توبيا تبرز بشكل لافت من حيث الموثوقية والأداء.",
    by: "هدى الرشيد، مديرة سلاسل الإمداد في الشارقة للخدمات اللوجستية",
    imgSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: StaggerTestimonial;
  handleMove: (steps: number) => void;
  cardSize: number;
  dir: 'ltr' | 'rtl';
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize,
  dir
}) => {
  const isCenter = position === 0;
  const isRTL = dir === 'rtl';
  const visualPosition = isRTL ? -position : position;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out select-none",
        isCenter 
          ? "z-20 bg-primary-600 text-white border-primary-600" 
          : "z-10 bg-white text-eerie border-neutral-200 hover:border-primary-400"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * visualPosition}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px rgba(2, 132, 199, 0.15)" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className={cn("absolute block origin-top-right rotate-45", isCenter ? "bg-white/30" : "bg-neutral-200")}
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <h3 className={cn(
        "text-base sm:text-lg font-black leading-relaxed text-start line-clamp-6 mt-4",
        isCenter ? "text-white" : "text-eerie"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <div className={cn(
        "absolute bottom-8 left-8 right-8 border-t pt-4 text-start flex items-center gap-3",
        isCenter ? "border-white/20 text-white/90" : "border-neutral-200 text-neutral-600"
      )}>
        <img
          src={testimonial.imgSrc || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"}
          alt={`${testimonial.by.split(',')[0]}`}
          className="h-11 w-11 shrink-0 rounded-full bg-muted object-cover object-top border border-neutral-200"
        />
        <div>
          <p className="text-sm font-black">
            {testimonial.by.split(',')[0]}
          </p>
          <p className={cn("text-xs font-semibold mt-0.5 line-clamp-2", isCenter ? "text-sky-200" : "text-primary-700")}>
            {testimonial.by.split(',').slice(1).join(',').trim()}
          </p>
        </div>
      </div>
    </div>
  );
};

export interface TestimonialInput {
  id: string;
  quote: string;
  name: string;
  role: string;
  service: string;
  imgSrc?: string;
}

interface StaggerTestimonialsProps {
  testimonials?: TestimonialInput[];
}

export const StaggerTestimonials: React.FC<StaggerTestimonialsProps> = ({ testimonials }) => {
  const { locale, dir } = useLanguage();
  
  const rawTestimonials = testimonials 
    ? testimonials.map((t, idx) => ({
        tempId: idx,
        testimonial: t.quote,
        by: `${t.name}, ${t.role}`,
        imgSrc: t.imgSrc || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      }))
    : locale === 'ar' ? testimonialsAr : testimonialsEn;
  
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState<StaggerTestimonial[]>(rawTestimonials);

  useEffect(() => {
    setTestimonialsList(rawTestimonials);
  }, [locale, testimonials]);

  const handleMove = (steps: number) => {
    if (steps === 0) return;
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-transparent"
      style={{ height: 600 }}
      dir={dir}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length - 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
            dir={dir}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-30">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center text-xl transition-colors border-2 rounded-xl",
            "bg-white border-neutral-200 text-eerie hover:bg-primary-600 hover:text-white hover:border-primary-600",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className={cn("h-5 w-5", dir === 'rtl' && "rotate-180")} />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center text-xl transition-colors border-2 rounded-xl",
            "bg-white border-neutral-200 text-eerie hover:bg-primary-600 hover:text-white hover:border-primary-600",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight className={cn("h-5 w-5", dir === 'rtl' && "rotate-180")} />
        </button>
      </div>
    </div>
  );
};
