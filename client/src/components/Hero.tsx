import { useEffect, useState, type CSSProperties } from "react";

const START_DATE = new Date("2025-04-06T00:00:00");
const PHOTO_BASE = `${import.meta.env.BASE_URL}photos/`;

const stagePhotos = [
  {
    src: `${PHOTO_BASE}hero-1.jpg`,
    alt: "Beautiful portrait by the water.",
    className: "aesthetic-hero__card aesthetic-hero__card--main",
  },
  {
    src: `${PHOTO_BASE}hero-2.jpg`,
    alt: "Portrait with flowers.",
    className: "aesthetic-hero__card aesthetic-hero__card--top-left",
  },
  {
    src: `${PHOTO_BASE}hero-3.jpg`,
    alt: "Soft smiling portrait.",
    className: "aesthetic-hero__card aesthetic-hero__card--top-right",
  },
  {
    src: `${PHOTO_BASE}hero-4.jpg`,
    alt: "Close-up portrait.",
    className: "aesthetic-hero__card aesthetic-hero__card--bottom-left",
  },
  {
    src: `${PHOTO_BASE}hero-5.jpg`,
    alt: "Elegant portrait.",
    className: "aesthetic-hero__card aesthetic-hero__card--bottom-right",
  },
];

const fallingPhotos = [
  {
    src: `${PHOTO_BASE}hero-1.jpg`,
    left: "5%",
    delay: "0s",
    duration: "24s",
    size: "52px",
    rotate: "-8deg",
  },
  {
    src: `${PHOTO_BASE}hero-2.jpg`,
    left: "18%",
    delay: "5s",
    duration: "26s",
    size: "48px",
    rotate: "6deg",
  },
  {
    src: `${PHOTO_BASE}hero-3.jpg`,
    left: "34%",
    delay: "2s",
    duration: "22s",
    size: "50px",
    rotate: "-6deg",
  },
  {
    src: `${PHOTO_BASE}hero-4.jpg`,
    left: "52%",
    delay: "7s",
    duration: "25s",
    size: "54px",
    rotate: "8deg",
  },
  {
    src: `${PHOTO_BASE}hero-5.jpg`,
    left: "69%",
    delay: "1s",
    duration: "23s",
    size: "50px",
    rotate: "-7deg",
  },
  {
    src: `${PHOTO_BASE}hero-2.jpg`,
    left: "84%",
    delay: "4s",
    duration: "27s",
    size: "46px",
    rotate: "7deg",
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
    <section className="hero aesthetic-hero">
      <div className="hero__bg" />

      <div className="aesthetic-hero__falling-layer" aria-hidden="true">
        {fallingPhotos.map((photo, index) => (
          <figure
            key={`${photo.src}-${index}`}
            className="aesthetic-hero__falling-card"
            style={
              {
                "--left": photo.left,
                "--delay": photo.delay,
                "--duration": photo.duration,
                "--size": photo.size,
                "--rotate": photo.rotate,
              } as CSSProperties
            }
          >
            <img src={photo.src} alt="" />
          </figure>
        ))}
      </div>

      <div className="container hero__content aesthetic-hero__content">
        <div className="aesthetic-hero__grid">
          <div className="aesthetic-hero__copy">
            <p className="section-tag">For my prettiest girl</p>

            <h1 className="aesthetic-hero__title">
              <span className="aesthetic-hero__title-small">My</span>
              <span className="aesthetic-hero__title-big">Love</span>
            </h1>

            <p className="hero__text aesthetic-hero__text">
              You are the softest part of my life, the calm in my heart, and the
              prettiest reason everything feels more beautiful every day.
            </p>

            <div className="aesthetic-hero__note">
              every picture of you feels like a love letter ♡
            </div>

            <div className="timer-box aesthetic-hero__timer">
              <p className="timer-label">Loving you since April 6, 2025</p>

              <div className="timer-grid">
                <div className="timer-card">
                  <span>{elapsed.days}</span>
                  <small>Days</small>
                </div>
                <div className="timer-card">
                  <span>{elapsed.hours}</span>
                  <small>Hours</small>
                </div>
                <div className="timer-card">
                  <span>{elapsed.minutes}</span>
                  <small>Minutes</small>
                </div>
                <div className="timer-card">
                  <span>{elapsed.seconds}</span>
                  <small>Seconds</small>
                </div>
              </div>
            </div>
          </div>

          <div className="aesthetic-hero__stage">
            <span className="aesthetic-hero__glow aesthetic-hero__glow--pink" />
            <span className="aesthetic-hero__glow aesthetic-hero__glow--purple" />

            {stagePhotos.map((photo) => (
              <figure className={photo.className} key={photo.src}>
                <img src={photo.src} alt={photo.alt} />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
