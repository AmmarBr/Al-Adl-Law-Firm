import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, Shield, Scale, Users, Award, Star, Quote } from "lucide-react";
import dbConnect from "@/lib/db";
import Service from "@/models/Service";
import BlogPost from "@/models/BlogPost";

// Fetch data directly in server component
async function getData() {
  await dbConnect();

  // Parallel fetching
  const [services, posts] = await Promise.all([
    Service.find({}).limit(6).lean(), // Increased limit to 6 for better grid
    BlogPost.find({ isPublished: true }).sort({ createdAt: -1 }).limit(3).lean()
  ]);

  return {
    services: JSON.parse(JSON.stringify(services)),
    posts: JSON.parse(JSON.stringify(posts))
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('HomePage');
  const h = await getTranslations('Home');
  const { services, posts } = await getData();
  const isAr = locale === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-primary-950 text-white overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 transform scale-105 animate-slow-zoom"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary-950/90 via-primary-950/80 to-background"></div>
        </div>

        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-sm font-semibold uppercase tracking-wider backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
              Excellence in Legal Practice
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight font-serif">
              {t('title')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                {t('subtitle')}
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
              Defending your rights with integrity and precision. The leading law firm in the Sultanate of Oman for complex litigation and corporate counsel.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/contact" className="btn btn-primary btn-lg rounded-full px-10 text-lg shadow-gold-500/20 shadow-lg hover:shadow-gold-500/40 transform hover:-translate-y-1 transition-all duration-300">
                {t('cta')}
              </Link>
              <Link href="/services" className="btn btn-outline btn-lg rounded-full px-10 text-lg border-white/20 text-white hover:bg-white/10 hover:border-white backdrop-blur-sm transform hover:-translate-y-1 transition-all duration-300">
                Our Practice Areas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-white dark:bg-primary-950 relative overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl skew-y-3 transform lg:rotate-3 border-4 border-white dark:border-primary-800">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop"
                  alt="Law Office"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl -z-10"></div>
            </div>

            <div className="space-y-8">
              <div>
                <span className="text-gold-600 font-bold uppercase tracking-widest text-sm block mb-2">About Al-Adl Law</span>
                <h2 className="heading-2">Unwavering Commitment to Justice</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Since our founding, Al-Adl Law Firm has been at the forefront of legal excellence in Oman. We believe that every client deserves a dedicated advocate who not only understands the law but also understands their business and personal goals.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-600 mb-2">
                    <Shield size={28} />
                  </div>
                  <h4 className="font-bold text-lg dark:text-white">Protected Rights</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Your security is our priority.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-600 mb-2">
                    <Scale size={28} />
                  </div>
                  <h4 className="font-bold text-lg dark:text-white">Fair Representation</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Balanced and honest counsel.</p>
                </div>
              </div>

              <div className="pt-6">
                <Link href="/about" className="text-gold-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">
                  Read Our Full Story <Arrow size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gray-50 dark:bg-primary-900">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold-600 font-bold uppercase tracking-widest text-sm block mb-2">Areas of Practice</span>
            <h2 className="heading-2 mb-4">{h('featuredServices')}</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We offer comprehensive legal solutions tailored to meet the diverse needs of our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.length > 0 ? services.map((s: any) => (
              <Link href={`/services`} key={s._id} className="group relative bg-white dark:bg-primary-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gold-500/30 overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <img src={s.icon} className="w-24 h-24 object-contain grayscale group-hover:grayscale-0 transition-all" />
                </div>

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-primary-50 dark:bg-primary-700/50 flex items-center justify-center text-gold-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {s.icon ? (
                      <img src={s.icon} className="w-10 h-10 object-contain" />
                    ) : (
                      <Scale size={32} />
                    )}
                  </div>
                  <h3 className="heading-3 mb-3 group-hover:text-gold-600 transition-colors">{isAr ? s.title.ar : s.title.en}</h3>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-6 leading-relaxed">
                    {isAr ? s.description.ar : s.description.en}
                  </p>
                  <span className="inline-flex items-center text-sm font-bold text-gold-600 gap-1 group-hover:gap-2 transition-all">
                    View Details <Arrow size={14} />
                  </span>
                </div>
              </Link>
            )) : (
              // Fallback Design if no data
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-primary-800 p-8 rounded-2xl shadow-sm border border-dashed border-gray-300 dark:border-primary-700 flex items-center justify-center h-64">
                  <p className="text-gray-400">Service Placeholder</p>
                </div>
              ))
            )}
          </div>

          <div className="mt-12 text-center">
            <Link href="/services" className="btn btn-outline rounded-full px-8 hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all">
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-950 text-white relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container-custom relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2">15+</div>
            <div className="text-sm md:text-base text-gray-400 uppercase tracking-widest">Years Experience</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2">500+</div>
            <div className="text-sm md:text-base text-gray-400 uppercase tracking-widest">Cases Won</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2">50+</div>
            <div className="text-sm md:text-base text-gray-400 uppercase tracking-widest">Expert Attorneys</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2">24/7</div>
            <div className="text-sm md:text-base text-gray-400 uppercase tracking-widest">Support</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white dark:bg-primary-950">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold-600 font-bold uppercase tracking-widest text-sm block mb-2">Testimonials</span>
            <h2 className="heading-2">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-primary-900 p-8 rounded-2xl relative">
              <Quote className="absolute top-8 right-8 text-gold-500/20" size={64} />
              <div className="flex gap-1 text-gold-500 mb-6">
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-6 relative z-10">
                "Dealing with corporate litigation is stressful, but Al-Adl Law provided clarity and confidence. Their strategic approach is unmatched in Oman."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                  <img src="https://ui-avatars.com/api/?name=Ahmed+Ali&background=cca354&color=fff" alt="Client" />
                </div>
                <div>
                  <h4 className="font-bold dark:text-white">Ahmed Al-Balushi</h4>
                  <p className="text-sm text-gray-500">CEO, Muscat Tech</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-primary-900 p-8 rounded-2xl relative">
              <Quote className="absolute top-8 right-8 text-gold-500/20" size={64} />
              <div className="flex gap-1 text-gold-500 mb-6">
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-6 relative z-10">
                "Professional, compassionate, and highly effective. They handled my family law case with the utmost sensitivity and skill."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                  <img src="https://ui-avatars.com/api/?name=Sarah+S&background=1e293b&color=fff" alt="Client" />
                </div>
                <div>
                  <h4 className="font-bold dark:text-white">Sarah Al-Said</h4>
                  <p className="text-sm text-gray-500">Private Client</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      <section className="section-padding bg-gray-50 dark:bg-primary-900">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-gold-600 font-bold uppercase tracking-widest text-sm block mb-2">Legal Insights</span>
              <h2 className="heading-2 mb-0">{h('recentPosts')}</h2>
            </div>
            <Link href="/blog" className="text-primary-600 dark:text-gold-400 hover:text-gold-600 font-medium flex items-center gap-2">
              View All Articles <Arrow size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.length > 0 ? posts.map((p: any) => (
              <Link href={`/blog/${p.slug}`} key={p._id} className="group flex flex-col h-full bg-white dark:bg-primary-950 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ring-1 ring-black/5 dark:ring-white/5">
                <div className="h-48 relative overflow-hidden">
                  {p.coverImage ? (
                    <img src={p.coverImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-primary-300">
                      <Scale size={48} />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-md text-xs font-bold text-primary-900 uppercase tracking-widest shadow-sm">
                    {p.tags?.[0] || 'Insight'}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs text-gray-500 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-gold-600 transition-colors line-clamp-2 leading-tight dark:text-white">
                    {isAr ? p.title.ar : p.title.en}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed mb-6 flex-1">
                    {isAr ? p.excerpt.ar : p.excerpt.en}
                  </p>
                  <span className="text-gold-600 text-sm font-bold flex items-center gap-2 mt-auto">
                    Read Article <Arrow size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            )) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500">No updates currently available.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gold-600/10 mix-blend-overlay"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl"></div>

        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif">Ready to Secure Your Future?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
            Contact us today for a confidential consultation. Our experts are ready to provide the legal clarity you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary btn-lg rounded-full px-12 text-lg shadow-gold-500/20 shadow-xl">
              Schedule Consultation
            </Link>
            <Link href="tel:+96812345678" className="btn btn-outline btn-lg rounded-full px-12 text-lg border-white/20 text-white hover:bg-white hover:text-primary-950">
              Call Us Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
