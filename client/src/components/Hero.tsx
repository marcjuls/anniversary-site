import { useEffect, useState } from "react";
import MemoryRibbon from "./MemoryRibbon";

const START_DATE = new Date("2025-04-06T00:00:00");
const PHOTO_BASE = `${import.meta.env.BASE_URL}photos/`;

const stagePhotos = [
  {
    src: `${PHOTO_BASE}hero-1.jpg`,
    alt: "Beautiful portrait by the water.",
    className:
      "left-[14%] top-[8%] z-20 w-[52%] -rotate-3 sm:left-[17%] sm:w-[48%]",
  },
  {
    src: `${PHOTO_BASE}hero-2.jpg`,
    alt: "Portrait with flowers.",
    className:
      "right-[3%] top-[2%] z-10 w-[29%] rotate-7 sm:right-[5%] sm:w-[27%]",
  },
  {
    src: `${PHOTO_BASE}hero-3.jpg`,
    alt: "Soft smiling portrait.",
    className:
      "bottom-[6%] right-[8%] z-30 w-[32%] rotate-4 sm:right-[12%] sm:w-[29%]",
  },
  {
    src: `${PHOTO_BASE}hero-4.jpg`,
    alt: "Close-up portrait.",
    className:
      "bottom-[3%] left-[2%] z-10 w-[29%] -rotate-7 sm:left-[5%] sm:w-[26%]",
  },
  {
    src: `${PHOTO_BASE}hero-5.jpg`,
    alt: "Elegant portrait.",
    className:
      "left-[1%] top-[2%] z-0 w-[25%] -rotate-10 sm:left-[4%] sm:w-[23%]",
  },
];

function getElapsedTime() {
  const now = new Date();
  const diff = Math.max(0, now.getTime() - START_DATE.getTime());

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

const Hero = () => {
  const [elapsed, setElapsed] = useState(getElapsedTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(getElapsedTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-midnight pb-28 text-pearl sm:pb-32"
      aria-labelledby="hero-title"
    >
      <div
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_75%_25%,rgba(110,41,76,0.55),transparent_32%),radial-gradient(circle_at_15%_78%,rgba(233,120,162,0.16),transparent_30%),linear-gradient(145deg,#170d18_0%,#24101e_48%,#100a12_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-18 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-10 lg:px-12 lg:py-22">
        <div className="relative z-30 animate-rise-in lg:pr-4">
          <div className="mb-8 flex items-center gap-4 font-utility text-[0.66rem] uppercase tracking-[0.26em] text-blush/75 sm:text-xs">
            <span className="h-px w-10 bg-rose/70" />
            For my prettiest girl
          </div>

          <p className="mb-3 font-utility text-xs uppercase tracking-[0.28em] text-rose sm:text-sm">
            A love letter, still unfolding
          </p>
          <h1
            className="text-balance font-display text-[clamp(5.5rem,19vw,10.5rem)] leading-[0.72] tracking-[-0.06em] text-pearl"
            id="hero-title"
          >
            <span className="block text-[0.42em] tracking-[-0.03em] text-blush">
              My
            </span>
            Love
          </h1>

          <p className="mt-8 max-w-xl text-pretty text-base leading-8 text-blush/80 sm:text-lg">
              You are the softest part of my life, the calm in my heart, and the
              prettiest reason everything feels more beautiful every day.
            </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              className="group inline-flex items-center gap-3 rounded-full bg-pearl px-6 py-3.5 text-sm font-bold text-midnight shadow-[0_18px_50px_rgba(233,120,162,0.18)] transition hover:-translate-y-0.5 hover:bg-blush focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
              href="#story"
            >
              Begin our story
              <span
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </a>
            <p className="font-display text-xl italic text-blush/75">
              every picture feels like a love letter ♡
            </p>
          </div>

          <div className="mt-10 border-y border-white/12 py-5">
            <p className="mb-4 font-utility text-[0.64rem] uppercase tracking-[0.24em] text-blush/60 sm:text-xs">
              Loving you since April 6, 2025
            </p>

            <dl
              className="grid max-w-2xl grid-cols-4 gap-3"
              aria-label="Time spent loving you"
            >
              {[
                [elapsed.days, "Days"],
                [elapsed.hours, "Hours"],
                [elapsed.minutes, "Minutes"],
                [elapsed.seconds, "Seconds"],
              ].map(([value, label]) => (
                <div className="min-w-0" key={label}>
                  <dd className="font-utility text-xl font-medium tabular-nums text-pearl sm:text-3xl">
                    {value}
                  </dd>
                  <dt className="mt-1 truncate font-utility text-[0.56rem] uppercase tracking-[0.16em] text-blush/60 sm:text-[0.65rem]">
                    {label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="relative mx-auto aspect-[0.92] w-full max-w-[42rem] animate-rise-in [animation-delay:180ms] lg:max-w-none">
          <div
            className="absolute left-[12%] top-[10%] h-[72%] w-[72%] rounded-full bg-wine/50 blur-[90px]"
            aria-hidden="true"
          />

          {stagePhotos.map((photo, index) => (
            <figure
              className={`absolute aspect-[4/5] animate-photo-drift overflow-hidden rounded-[0.2rem] border-[6px] border-pearl bg-pearl p-1 shadow-[0_30px_70px_rgba(5,1,5,0.45)] sm:border-8 ${photo.className}`}
              key={photo.src}
              style={{ animationDelay: `${index * 380}ms` }}
            >
              <img
                className="h-full w-full object-cover"
                src={photo.src}
                alt={photo.alt}
              />
              <span className="absolute bottom-2 right-3 font-display text-lg text-wine/70">
                ♡
              </span>
            </figure>
          ))}

          <div className="absolute bottom-[4%] left-[30%] z-40 -rotate-3 border border-rose/25 bg-midnight/90 px-5 py-3 shadow-xl backdrop-blur-md">
            <p className="font-utility text-[0.58rem] uppercase tracking-[0.22em] text-rose">
              Frame by frame
            </p>
            <p className="mt-1 font-display text-lg italic text-pearl sm:text-2xl">
              still choosing you
            </p>
          </div>
        </div>
      </div>

      <MemoryRibbon />
    </section>
  );
};

export default Hero;
