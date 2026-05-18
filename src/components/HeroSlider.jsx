import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function HeroSlider({ slides }) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  if (!slides || slides.length === 0) {
    return null;
  }

  const slide = slides[activeIndex];

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === slides.length - 1;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
    }, 6000);
    return () => window.clearInterval(interval);
  }, [slides.length]);

  const pagination = useMemo(
    () => slides.map((item, index) => ({ ...item, active: index === activeIndex })),
    [activeIndex, slides]
  );

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-slate-900 text-white shadow-soft">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-transparent" />
      <div className="relative mx-auto flex max-w-7xl items-center gap-6 px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[0.8fr_0.4fr]">
          <button
            type="button"
            onClick={() => setActiveIndex((current) => (isFirst ? slides.length - 1 : current - 1))}
            className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => setActiveIndex((current) => (isLast ? 0 : current + 1))}
            className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 self-start lg:self-end"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            className="group relative h-[420px] overflow-hidden rounded-[2rem] bg-cover bg-center bg-no-repeat shadow-2xl sm:h-[480px]"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
            onClick={() => navigate(slide.link)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => event.key === 'Enter' && navigate(slide.link)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 max-w-2xl rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-transparent sm:p-8">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-200">Featured category</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{slide.title}</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-200">{slide.subtitle}</p>
              <span className="mt-6 inline-flex rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-indigo-400">
                Explore {slide.title}
              </span>
            </div>
          </div>

          <div className="hidden h-full flex-col justify-between gap-4 lg:flex">
            <div className="space-y-4 rounded-[2rem] bg-white/5 p-5 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-300">Quick select</p>
              {pagination.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`w-full rounded-3xl px-4 py-4 text-left transition ${
                    item.active ? 'bg-white/15 text-white shadow-inner' : 'bg-white/5 text-slate-200 hover:bg-white/10'
                  }`}
                >
                  <span className="text-sm font-semibold">{item.title}</span>
                  <p className="mt-1 text-xs text-slate-300">Tap to shop {item.title}</p>
                </button>
              ))}
            </div>

            <div className="rounded-[2rem] bg-white/5 p-5 text-sm text-slate-300">
              <p className="font-semibold text-white">Ready to browse?</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Use the category cards or the slider to jump directly into curated collections and special deals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSlider;
