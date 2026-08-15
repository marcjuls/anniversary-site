const PHOTO_BASE = `${import.meta.env.BASE_URL}photos/`;

const frames = [
  "hero-1.jpg",
  "hero-2.jpg",
  "hero-3.jpg",
  "hero-4.jpg",
  "hero-5.jpg",
  "photo-6.jpg",
  "photo-7.jpg",
  "photo-8.jpg",
];

const MemoryRibbon = () => {
  const loopedFrames = [...frames, ...frames];

  return (
    <div
      className="pointer-events-none absolute inset-x-[-5rem] bottom-0 z-20 rotate-[-2deg] overflow-hidden border-y border-white/20 bg-[#110b12]/88 py-2 shadow-[0_-16px_50px_rgba(16,5,13,0.35)] backdrop-blur-sm"
      aria-hidden="true"
    >
      <div className="animate-memory-ribbon flex w-max gap-2 will-change-transform">
        {loopedFrames.map((frame, index) => (
          <div
            className="relative h-18 w-24 shrink-0 overflow-hidden bg-black p-1 sm:h-22 sm:w-30"
            key={`${frame}-${index}`}
          >
            <span className="absolute inset-x-0 top-0 z-10 h-1 bg-[repeating-linear-gradient(90deg,transparent_0_8px,#f6d9e5_8px_12px)] opacity-70" />
            <img
              className="h-full w-full object-cover opacity-85 grayscale-[20%]"
              src={`${PHOTO_BASE}${frame}`}
              alt=""
            />
            <span className="absolute inset-x-0 bottom-0 z-10 h-1 bg-[repeating-linear-gradient(90deg,transparent_0_8px,#f6d9e5_8px_12px)] opacity-70" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryRibbon;
