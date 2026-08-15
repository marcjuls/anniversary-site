type Memory = {
  title: string;
  description: string;
  photo: string;
  photoAlt: string;
};

const PHOTO_BASE = `${import.meta.env.BASE_URL}photos/`;

const memories: Memory[] = [
  {
    title: "December 11, 2024",
    description:
      "The moment everything started, even if we did not know yet how important it would become.",
    photo: `${PHOTO_BASE}photo-6.jpg`,
    photoAlt: "A treasured photo from the beginning of the story.",
  },
  {
    title: "April 6, 2025",
    description:
      "A simple moment that turned into something unforgettable because it was with you.",
    photo: `${PHOTO_BASE}photo-7.jpg`,
    photoAlt: "A favorite memory together.",
  },
  {
    title: "The comfort stage",
    description:
      "When laughter felt easier, conversations became deeper, and you started feeling like home.",
    photo: `${PHOTO_BASE}photo-8.jpg`,
    photoAlt: "A warm photograph from the comfort stage.",
  },
  {
    title: "Still choosing you",
    description:
      "Every day since then has just made my heart more sure about you.",
    photo: `${PHOTO_BASE}hero-5.jpg`,
    photoAlt: "An elegant portrait that belongs in the story.",
  },
];

const Timeline = () => {
  return (
    <section
      className="relative bg-[#120b13] px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
      id="story"
      role="region"
      aria-label="Our story"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-18 max-w-3xl text-center sm:mb-24">
          <p className="font-utility text-xs uppercase tracking-[0.28em] text-rose">
            Our story
          </p>
          <h2
            className="mt-5 text-balance font-display text-5xl leading-[0.95] tracking-[-0.035em] text-pearl sm:text-7xl"
            id="story-title"
          >
            Moments I never want to forget
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty leading-7 text-blush/65">
            Not a highlight reel. Just the small moments that became our whole
            story.
          </p>
        </div>

        <div className="relative space-y-18 sm:space-y-24">
          <div
            className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-rose/70 via-white/15 to-transparent sm:left-1/2"
            aria-hidden="true"
          />

          {memories.map((memory, index) => (
            <article
              className="relative grid gap-7 pl-14 sm:grid-cols-2 sm:gap-18 sm:pl-0"
              key={`${memory.title}-${index}`}
            >
              <span className="absolute left-[0.82rem] top-8 z-10 flex size-7 items-center justify-center rounded-full border border-rose/60 bg-[#120b13] font-utility text-[0.56rem] text-blush sm:left-1/2 sm:-translate-x-1/2">
                {String(index + 1).padStart(2, "0")}
              </span>

              <figure
                className={`group relative aspect-[4/3] overflow-hidden border border-white/10 bg-wine/15 p-2 shadow-[0_26px_70px_rgba(0,0,0,0.25)] ${index % 2 === 1 ? "sm:order-2" : ""}`}
              >
                <img
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                  src={memory.photo}
                  alt={memory.photoAlt}
                />
                <span
                  className="absolute inset-2 border border-pearl/15"
                  aria-hidden="true"
                />
              </figure>

              <div
                className={`flex flex-col justify-center ${index % 2 === 1 ? "sm:order-1 sm:text-right" : ""}`}
              >
                <p className="font-utility text-[0.65rem] uppercase tracking-[0.24em] text-rose/80">
                  Chapter {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-3xl leading-tight text-pearl sm:text-4xl">
                  {memory.title}
                </h3>
                <p className="mt-4 max-w-md text-pretty leading-7 text-blush/65 sm:max-w-none">
                  {memory.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
