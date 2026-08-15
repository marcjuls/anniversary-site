import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const songs = [
  {
    title: "blue",
    file: "blue.mp3",
  },
  {
    title: "Balisong Transformed 2016",
    file: "Rico Blanco - Balisong Transformed 2016.mp3",
  },
  {
    title: "Here With Me ",
    file: "d4vd - Here With Me (Lyrics).mp3",
  },
];

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentSong = songs[currentSongIndex];

  const audioSrc = useMemo(
    () => encodeURI(`${import.meta.env.BASE_URL}audio/${currentSong.file}`),
    [currentSong.file],
  );

  const tryPlay = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    try {
      audio.volume = 0.72;
      await audio.play();
      setIsPlaying(true);
      setNeedsInteraction(false);
      setErrorMessage("");
    } catch {
      setIsPlaying(false);
      setNeedsInteraction(true);
    }
  }, []);

  const moveToSong = useCallback((direction: number) => {
    setIsReady(false);
    setErrorMessage("");
    setCurrentSongIndex(
      (previousIndex) =>
        (previousIndex + direction + songs.length) % songs.length,
    );
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const handleCanPlay = () => {
      setIsReady(true);
      setErrorMessage("");
      void tryPlay();
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    const handleEnded = () => {
      moveToSong(1);
    };

    const handleError = () => {
      setIsPlaying(false);
      setIsReady(false);
      setErrorMessage(
        `Song file not found: client/public/audio/${currentSong.file}`,
      );
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    audio.load();

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [audioSrc, currentSong.file, moveToSong, tryPlay]);

  useEffect(() => {
    if (!needsInteraction) {
      return;
    }

    const unlockAudio = () => {
      void tryPlay();
    };

    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, [needsInteraction, tryPlay]);

  const togglePlayback = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      await tryPlay();
      return;
    }

    audio.pause();
  };

  const goToPreviousSong = () => {
    moveToSong(-1);
  };

  const goToNextSong = () => {
    moveToSong(1);
  };

  return (
    <section
      className="relative overflow-hidden bg-midnight px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
      aria-labelledby="playlist-title"
    >
      <div
        className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_18%_20%,rgba(233,120,162,.2),transparent_28%),radial-gradient(circle_at_82%_80%,rgba(110,41,76,.4),transparent_34%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 sm:mb-16">
          <p className="font-utility text-xs uppercase tracking-[0.28em] text-rose">
            Our playlist
          </p>
          <h2
            className="mt-5 max-w-3xl text-balance font-display text-5xl leading-[0.95] tracking-[-0.035em] text-pearl sm:text-7xl"
            id="playlist-title"
          >
            Songs that sound like us
          </h2>
        </div>

        <div className="grid overflow-hidden border border-white/12 bg-[#130d15] shadow-[0_34px_90px_rgba(0,0,0,0.3)] lg:grid-cols-[0.88fr_1.12fr]">
          <div className="relative flex min-h-[24rem] items-center justify-center overflow-hidden border-b border-white/10 bg-wine/18 p-10 lg:min-h-[34rem] lg:border-b-0 lg:border-r">
            <div
              className="absolute inset-0 opacity-18 [background-image:linear-gradient(rgba(255,255,255,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.14)_1px,transparent_1px)] [background-size:40px_40px]"
              aria-hidden="true"
            />
            <div
              className="animate-record-spin relative aspect-square w-[min(72vw,21rem)] rounded-full border border-white/12 bg-[repeating-radial-gradient(circle_at_center,#151016_0_3px,#26131f_4px_6px)] shadow-[0_25px_65px_rgba(0,0,0,0.45)]"
              style={{ animationPlayState: isPlaying ? "running" : "paused" }}
              aria-hidden="true"
            >
              <div className="absolute inset-[29%] grid place-items-center rounded-full bg-rose text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,.2)]">
                <span className="max-w-[7rem] px-2 font-display text-lg leading-tight text-midnight sm:text-2xl">
                  {currentSong.title}
                </span>
              </div>
              <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pearl shadow" />
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
            <p className="font-utility text-[0.62rem] uppercase tracking-[0.24em] text-rose/70">
              Now selected
            </p>
            <h3 className="mt-4 font-display text-4xl leading-tight text-pearl sm:text-6xl">
              {currentSong.title}
            </h3>
            <p className="mt-5 max-w-md text-pretty leading-7 text-blush/60">
              Press play and let this page have its own soundtrack. These songs
              stay here with the memories they belong to.
            </p>

            <p
              className="mt-8 font-utility text-[0.68rem] uppercase tracking-[0.18em] text-blush/55"
              role="status"
              aria-live="polite"
            >
              Track {currentSongIndex + 1} of {songs.length} · {currentSong.title}
            </p>

            <div className="mt-5 flex items-center gap-3">
            <button
              className="grid size-12 place-items-center rounded-full border border-white/15 text-blush transition hover:border-rose/60 hover:bg-rose/10 hover:text-pearl focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-rose"
              type="button"
              onClick={goToPreviousSong}
              aria-label="Previous song"
            >
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M18 6 10 12l8 6V6Z" />
                <path d="M6 5v14" />
              </svg>
            </button>

            <button
              className="grid size-15 place-items-center rounded-full bg-pearl text-midnight shadow-[0_15px_40px_rgba(233,120,162,0.2)] transition hover:scale-105 hover:bg-blush focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose"
              type="button"
              onClick={() => void togglePlayback()}
              aria-label={
                isPlaying
                  ? `Pause ${currentSong.title}`
                  : `Play ${currentSong.title}`
              }
            >
              {isPlaying ? (
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M7 5h4v14H7zM14 5h4v14h-4z" />
                </svg>
              ) : (
                <svg
                  className="ml-0.5 size-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="m8 5 11 7-11 7V5Z" />
                </svg>
              )}
            </button>

            <button
              className="grid size-12 place-items-center rounded-full border border-white/15 text-blush transition hover:border-rose/60 hover:bg-rose/10 hover:text-pearl focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-rose"
              type="button"
              onClick={goToNextSong}
              aria-label="Next song"
            >
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="m6 6 8 6-8 6V6Z" />
                <path d="M18 5v14" />
              </svg>
            </button>
          </div>

          <p className="mt-5 text-sm text-blush/55">
            {needsInteraction
              ? "Tap play once if your phone blocks autoplay."
              : isPlaying
                ? "Playing now."
                : isReady
                  ? "Ready when you are."
                  : "Loading your playlist..."}
          </p>

          {errorMessage ? (
            <p className="mt-4 text-sm text-rose" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <audio
            key={audioSrc}
            ref={audioRef}
            src={audioSrc}
            controls
            playsInline
            preload="auto"
            className="mt-7 w-full opacity-80"
            aria-label="Playlist audio player"
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
      </div>
    </section>
  );
};

export default MusicPlayer;
