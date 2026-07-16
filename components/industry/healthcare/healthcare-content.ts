import type { Locale } from '@/lib/i18n/config'

type HealthcareLandingCopy = {
  skip: string
  industries: string
  breadcrumb: string
  heroKicker: string
  heroBadge: { value: string; label: string }
  clinicTopiaAction: string
  systemStripLabel: string
  systemStrip: readonly { value: string; label: string }[]
  principlesEyebrow: string
  principlesTitle: string
  principlesIntro: string
  principles: readonly { id: string; title: string; description: string; href: string }[]
  storyAction: string
  capabilitiesEyebrow: string
  capabilitiesTitle: string
  capabilitiesIntro: string
  securePortal: { id: string; label: string; description: string }
  carouselPrevious: string
  carouselNext: string
  clinicTopiaEyebrow: string
  clinicTopiaTitle: string
  clinicTopiaIntro: string
  clinicTopiaCapabilities: readonly string[]
  clinicTopiaBadge: string
  clinicTopiaActionLabel: string
  journeyLabel: string
  trustLabel: string
  servicesLabel: string
  learnMore: string
  healthcareWebsiteAction: string
  faqLabel: string
  consultationLabel: string
  heroDoctorAlt: string
  heroNurseAlt: string
  storyAlt: string
  operationsAlt: string
  sealMotto: string
  dashboardToday: string
  dashboardClinicOps: string
  carouselRegionLabel: string
  newTab: string
}

export const healthcareLandingCopy = {
  en: {
    skip: 'Skip to healthcare industry content',
    industries: 'Industries',
    breadcrumb: 'Breadcrumb',
    heroKicker: 'Healthcare industry systems',
    heroBadge: { value: 'Connected', label: 'Care journey' },
    clinicTopiaAction: 'See ClinicTopia',
    systemStripLabel: 'Healthcare system priorities',
    systemStrip: [
      { value: '01', label: 'Patient experience' },
      { value: '02', label: 'Booking workflows' },
      { value: '03', label: 'Clinic operations' },
      { value: '04', label: 'Bilingual delivery' },
    ],
    principlesEyebrow: 'Operating principles',
    principlesTitle: 'What a dependable healthcare experience needs.',
    principlesIntro:
      'The strongest healthcare platforms make access simple while keeping every decision, handoff, and information boundary under clinic ownership.',
    principles: [
      {
        id: 'access-clarity',
        title: 'Access clarity',
        description: 'Patients can find the right service, location, and next action without assembling the journey themselves.',
        href: '#patient-experience',
      },
      {
        id: 'approved-information',
        title: 'Approved information',
        description: 'Service details and preparation guidance stay connected to a visible clinic review path.',
        href: '#trust-boundaries',
      },
      {
        id: 'privacy-by-role',
        title: 'Privacy by role',
        description: 'Each person sees only the information and actions appropriate to their responsibility.',
        href: '#trust-boundaries',
      },
      {
        id: 'owned-handoffs',
        title: 'Owned handoffs',
        description: 'Requests arrive with the context, receiving role, and next action needed for useful follow-through.',
        href: '#patient-clinic-journey',
      },
      {
        id: 'continuity',
        title: 'Continuity',
        description: 'Booking, the visit, approved instructions, and follow-up remain part of one understandable journey.',
        href: '#patient-clinic-journey',
      },
    ],
    storyAction: 'Explore the patient journey',
    capabilitiesEyebrow: 'Connected capabilities',
    capabilitiesTitle: 'A healthcare platform is more than one screen.',
    capabilitiesIntro:
      'CloudTopia connects the public experience to clinic-owned workflows, integrations, and bilingual content operations.',
    securePortal: {
      id: 'secure-patient-portal',
      label: 'Secure patient portal',
      description:
        'A clinic-governed portal gives patients an approved route to access shared documents, instructions, and follow-up actions.',
    },
    carouselPrevious: 'Show previous healthcare capability',
    carouselNext: 'Show next healthcare capability',
    clinicTopiaEyebrow: 'CloudTopia product',
    clinicTopiaTitle: 'Our best clinic management system for modern care operations.',
    clinicTopiaIntro:
      'ClinicTopia gives healthcare teams one Arabic-first cloud workspace for the operational systems that keep a clinic moving—from the patient record and appointment schedule to financial and clinical-support departments.',
    clinicTopiaCapabilities: [
      'Patients',
      'Appointments',
      'Invoicing and insurance',
      'Laboratory',
      'Pharmacy',
      'Radiology',
      'Staff permissions',
      'Arabic-first operation',
    ],
    clinicTopiaBadge: 'Clinic management, connected',
    clinicTopiaActionLabel: 'Explore ClinicTopia',
    journeyLabel: 'Patient and clinic journey',
    trustLabel: 'Trust and operating boundaries',
    servicesLabel: 'Paths to implementation',
    learnMore: 'Explore this capability',
    healthcareWebsiteAction: 'Explore healthcare and medical website development',
    faqLabel: 'Decision questions',
    consultationLabel: 'Healthcare systems consultation',
    heroDoctorAlt: 'Doctor representing connected healthcare systems',
    heroNurseAlt: 'Nurse representing coordinated patient and clinic journeys',
    storyAlt: 'Healthcare team reviewing a connected patient journey',
    operationsAlt: 'Clinic team using digital systems to coordinate operations',
    sealMotto: 'Clarity • ownership • continuity',
    dashboardToday: 'Today',
    dashboardClinicOps: 'Clinic operations',
    carouselRegionLabel: 'Healthcare capabilities carousel',
    newTab: '(opens in new tab)',
  },
  ar: {
    skip: 'تخطَّ إلى محتوى قطاع الرعاية الصحية',
    industries: 'القطاعات',
    breadcrumb: 'مسار التنقل',
    heroKicker: 'أنظمة قطاع الرعاية الصحية',
    heroBadge: { value: 'مترابطة', label: 'رحلة الرعاية' },
    clinicTopiaAction: 'اكتشفوا كلينيك توبيا',
    systemStripLabel: 'أولويات نظام الرعاية الصحية',
    systemStrip: [
      { value: '01', label: 'تجربة المريض' },
      { value: '02', label: 'مسارات الحجز' },
      { value: '03', label: 'تشغيل العيادة' },
      { value: '04', label: 'تشغيل ثنائي اللغة' },
    ],
    principlesEyebrow: 'مبادئ التشغيل',
    principlesTitle: 'ما الذي تحتاجه تجربة رعاية صحية يمكن الاعتماد عليها؟',
    principlesIntro:
      'تجعل المنصات الصحية الأقوى الوصول بسيطاً، مع إبقاء كل قرار وتسليم وحدّ للمعلومات تحت ملكية العيادة.',
    principles: [
      {
        id: 'access-clarity',
        title: 'وضوح الوصول',
        description: 'يصل المريض إلى الخدمة والموقع والخطوة التالية دون أن يضطر إلى تجميع الرحلة بنفسه.',
        href: '#patient-experience',
      },
      {
        id: 'approved-information',
        title: 'معلومات معتمدة',
        description: 'تبقى تفاصيل الخدمات وتعليمات الاستعداد مرتبطة بمسار مراجعة واضح داخل العيادة.',
        href: '#trust-boundaries',
      },
      {
        id: 'privacy-by-role',
        title: 'خصوصية حسب الدور',
        description: 'يرى كل شخص المعلومات والإجراءات المناسبة لمسؤوليته فقط.',
        href: '#trust-boundaries',
      },
      {
        id: 'owned-handoffs',
        title: 'تسليمات مملوكة',
        description: 'تصل الطلبات بالسياق والدور المستلم والخطوة التالية اللازمة لمتابعة مفيدة.',
        href: '#patient-clinic-journey',
      },
      {
        id: 'continuity',
        title: 'استمرارية الرعاية',
        description: 'يبقى الحجز والزيارة والتعليمات المعتمدة والمتابعة ضمن رحلة واحدة مفهومة.',
        href: '#patient-clinic-journey',
      },
    ],
    storyAction: 'استكشفوا رحلة المريض',
    capabilitiesEyebrow: 'قدرات مترابطة',
    capabilitiesTitle: 'منصة الرعاية الصحية أكبر من مجرد شاشة واحدة.',
    capabilitiesIntro:
      'تربط كلاود توبيا التجربة العامة بمسارات العمل التي تملكها العيادة، والتكاملات، وتشغيل المحتوى باللغتين.',
    securePortal: {
      id: 'secure-patient-portal',
      label: 'بوابة مريض آمنة',
      description:
        'تمنح بوابة تديرها العيادة المرضى مساراً معتمداً للوصول إلى المستندات والتعليمات وإجراءات المتابعة المشتركة.',
    },
    carouselPrevious: 'عرض قدرة الرعاية الصحية السابقة',
    carouselNext: 'عرض قدرة الرعاية الصحية التالية',
    clinicTopiaEyebrow: 'منتج من كلاود توبيا',
    clinicTopiaTitle: 'أفضل نظام لدينا لإدارة العيادات الحديثة.',
    clinicTopiaIntro:
      'يمنح كلينيك توبيا فرق الرعاية مساحة عمل سحابية واحدة تبدأ بالعربية للأنظمة التشغيلية التي تحرك العيادة، من ملف المريض وجدول المواعيد إلى الشؤون المالية والأقسام الداعمة للعمل السريري.',
    clinicTopiaCapabilities: [
      'المرضى',
      'المواعيد',
      'الفوترة والتأمين',
      'المختبر',
      'الصيدلية',
      'الأشعة',
      'صلاحيات الموظفين',
      'تشغيل يبدأ بالعربية',
    ],
    clinicTopiaBadge: 'إدارة عيادات مترابطة',
    clinicTopiaActionLabel: 'استكشفوا كلينيك توبيا',
    journeyLabel: 'رحلة المريض والعيادة',
    trustLabel: 'الثقة وحدود التشغيل',
    servicesLabel: 'مسارات التنفيذ',
    learnMore: 'استكشفوا هذه القدرة',
    healthcareWebsiteAction: 'استكشفوا تطوير مواقع الرعاية الصحية والمواقع الطبية',
    faqLabel: 'أسئلة القرار',
    consultationLabel: 'استشارة أنظمة الرعاية الصحية',
    heroDoctorAlt: 'طبيب يمثل أنظمة رعاية صحية مترابطة',
    heroNurseAlt: 'ممرضة تمثل رحلة منسقة بين المريض والعيادة',
    storyAlt: 'فريق رعاية يراجع رحلة مريض مترابطة',
    operationsAlt: 'فريق عيادة يستخدم الأنظمة الرقمية لتنسيق العمليات',
    sealMotto: 'وضوح • ملكية • استمرارية',
    dashboardToday: 'اليوم',
    dashboardClinicOps: 'تشغيل العيادة',
    carouselRegionLabel: 'دوّار قدرات الرعاية الصحية',
    newTab: '(يفتح في تبويب جديد)',
  },
} as const satisfies Record<Locale, HealthcareLandingCopy>
