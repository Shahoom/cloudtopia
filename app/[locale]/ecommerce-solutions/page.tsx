"use client"

import ContainerScroll from "@/components/ui/container-scroll"
import InfiniteGallery from "@/components/ui/3d-gallery"
import EcommerceServiceSection from "@/components/ui/ecommerce-service-section"
import { useLanguage } from "@/lib/i18n/LanguageContext"

const content = {
  en: {
    sections: [
      {
        subtitle: "Launch Your Online Store",
        title: "E-Commerce Solutions",
        highlight: "That Drive Sales",
        image: "/images/services/ecommerce-solutions/1.jpg",
        alt: "Modern e-commerce website interface with product listings and shopping cart"
      },
      {
        subtitle: "Seamless Shopping Experience",
        title: "Convert Visitors Into",
        highlight: "Loyal Customers",
        image: "/images/services/ecommerce-solutions/2.webp",
        alt: "E-commerce checkout process and payment gateway interface"
      },
      {
        subtitle: "Scalable & Secure Platform",
        title: "Built to Grow",
        highlight: "With Your Business",
        image: "/images/services/ecommerce-solutions/3.avif",
        alt: "E-commerce analytics dashboard showing sales performance and growth metrics"
      }
    ],
    gallery: {
      badge: "Product Showcase",
      title: "Stunning Product Displays",
      highlight: "That Sell Themselves",
      description: "Captivate your customers with immersive 3D product galleries, high-quality imagery, and interactive shopping experiences that boost engagement and conversions.",
      hint: "Use mouse wheel, arrow keys, or touch to navigate"
    }
  },
  ar: {
    sections: [
      {
        subtitle: "أطلق متجرك الإلكتروني",
        title: "حلول التجارة الإلكترونية",
        highlight: "التي تزيد المبيعات",
        image: "/images/services/ecommerce-solutions/1.jpg",
        alt: "واجهة متجر إلكتروني حديثة مع قوائم المنتجات وسلة التسوق"
      },
      {
        subtitle: "تجربة تسوق سلسة",
        title: "حوّل الزوار إلى",
        highlight: "عملاء أوفياء",
        image: "/images/services/ecommerce-solutions/2.webp",
        alt: "عملية الدفع في المتجر الإلكتروني وواجهة بوابة الدفع"
      },
      {
        subtitle: "منصة قابلة للتوسع وآمنة",
        title: "مصممة لتنمو",
        highlight: "مع عملك",
        image: "/images/services/ecommerce-solutions/3.avif",
        alt: "لوحة تحليلات المتجر الإلكتروني تعرض أداء المبيعات ومقاييس النمو"
      }
    ],
    gallery: {
      badge: "عرض المنتجات",
      title: "عروض منتجات مذهلة",
      highlight: "تبيع نفسها بنفسها",
      description: "اجذب عملاءك بمعارض منتجات ثلاثية الأبعاد غامرة، وصور عالية الجودة، وتجارب تسوق تفاعلية تعزز المشاركة والتحويلات.",
      hint: "استخدم عجلة الماوس أو مفاتيح الأسهم أو اللمس للتنقل"
    }
  }
}

// E-commerce product images for the gallery
const ecommerceImages = [
  { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80', alt: 'Smart watch product photography' },
  { src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80', alt: 'Headphones product display' },
  { src: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80', alt: 'Camera product showcase' },
  { src: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&auto=format&fit=crop&q=80', alt: 'Sneakers product photography' },
  { src: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80', alt: 'Sunglasses product display' },
  { src: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&auto=format&fit=crop&q=80', alt: 'Perfume bottle product' },
  { src: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80', alt: 'Cosmetics product arrangement' },
  { src: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80', alt: 'Luxury bag product' },
  { src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80', alt: 'Red Nike sneaker' },
  { src: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80', alt: 'Lipstick cosmetics' },
  { src: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&auto=format&fit=crop&q=80', alt: 'White sneakers pair' },
  { src: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80', alt: 'Luxury watch closeup' },
  { src: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=800&auto=format&fit=crop&q=80', alt: 'iPhone product shot' },
  { src: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80', alt: 'Wireless earbuds' },
  { src: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=80', alt: 'Colorful sneakers' },
  { src: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&auto=format&fit=crop&q=80', alt: 'Skincare products' },
]

export default function EcommerceSolutionsPage() {
  const { dir } = useLanguage()
  const isRTL = dir === 'rtl'
  const t = isRTL ? content.ar : content.en

  // Different accent colors for each section
  const accentColors = [
    "from-blue-600 to-cyan-500",
    "from-purple-600 to-pink-500",
    "from-emerald-600 to-teal-500"
  ]

  return (
    <main className="flex-grow">
      <div
        className="flex flex-col overflow-hidden bg-gradient-to-b from-lavender via-lavender to-lavender text-slate-900"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Container Scroll Sections */}
        {t.sections.map((section, index) => (
          <ContainerScroll
            key={index}
            titleComponent={
              <div className="space-y-4 sm:space-y-6 md:space-y-8 mb-8 sm:mb-12 md:mb-16">
                {/* Subtitle with gradient background */}
                <span className={`inline-block px-4 py-2 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r ${accentColors[index]}`}>
                  {section.subtitle}
                </span>

                {/* Main title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
                  {section.title}
                </h1>

                {/* Highlighted part with gradient text */}
                <p className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r ${accentColors[index]} bg-clip-text text-transparent leading-tight`}>
                  {section.highlight}
                </p>
              </div>
            }
          >
            <img
              src={section.image}
              alt={section.alt}
              className="mx-auto rounded-2xl object-cover h-full w-full object-center"
              draggable={false}
            />
          </ContainerScroll>
        ))}

        {/* 3D Gallery Section */}
        <section className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
          {/* Header Content */}
          <div className="relative z-10 text-center pt-16 sm:pt-20 md:pt-24 px-4">
            <span className="inline-block px-4 py-2 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 mb-6">
              {t.gallery.badge}
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t.gallery.title}
            </h2>

            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-6">
              {t.gallery.highlight}
            </p>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              {t.gallery.description}
            </p>
          </div>

          {/* 3D Gallery */}
          <div className="relative">
            <InfiniteGallery
              images={ecommerceImages}
              speed={1.2}
              visibleCount={14}
              className="h-[60vh] sm:h-[70vh] md:h-[80vh] w-full"
            />

            {/* Overlay Text */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <h3 className="font-serif text-4xl sm:text-5xl md:text-7xl tracking-tight text-white/10 mix-blend-overlay">
                <span className="italic">{isRTL ? "تجارة إلكترونية" : "E-Commerce"}</span>
              </h3>
            </div>
          </div>

          {/* Navigation Hint */}
          <div className="text-center pb-12 sm:pb-16 relative z-10">
            <p className="text-xs sm:text-sm text-slate-400 font-medium uppercase tracking-wider">
              {t.gallery.hint}
            </p>
          </div>
        </section>

        {/* Service Explanation Section */}
        <EcommerceServiceSection isRTL={isRTL} locale={isRTL ? 'ar' : 'en'} />
      </div>
    </main>
  )
}
