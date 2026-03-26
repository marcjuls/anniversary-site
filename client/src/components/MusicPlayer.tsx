import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const songs = [
  {
    title: "Prettiest Thing I've Ever Seen",
    file: "LANY - Prettiest Thing I've Ever Seen (LYRICS).mp3",
  },
  {
    title: "Balisong Transformed 2016",
    file: "Rico Blanco - Balisong Transformed 2016.mp3",
  },
  {
    title: "Last Forever",
    file: "LANY - Last Forever (Official Music Video).mp3",
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

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    setIsReady(false);
    setErrorMessage("");

    const handleCanPlay = () => {
      setIsReady(true);
      setErrorMessage("");
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    const handleEnded = () => {
      setCurrentSongIndex((prev) => (prev + 1) % songs.length);
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
    void tryPlay();

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [audioSrc, currentSong.file, tryPlay]);

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
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const goToNextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  };

  return (
    <section className="section section-alt">
      <div className="container music-wrap">
        <div className="music-card">
          <p className="section-tag">Our playlist</p>
          <h2 className="section-title">{currentSong.title}</h2>
          <p className="music-text"></p>

          <div className="music-actions">
            <button
              className="music-btn"
              type="button"
              onClick={goToPreviousSong}
            >
              Previous
            </button>

            <button
              className="music-btn"
              type="button"
              onClick={() => void togglePlayback()}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>

            <button className="music-btn" type="button" onClick={goToNextSong}>
              Next
            </button>

            <p
              className={`music-status ${
                needsInteraction ? "music-status--active" : ""
              }`}
            >
              {errorMessage
                ? errorMessage
                : needsInteraction
                  ? "Tap once if your phone blocks autoplay."
                  : isPlaying
                    ? `Now playing ${currentSongIndex + 1} of ${songs.length}: ${currentSong.title}`
                    : isReady
                      ? `Ready to play ${currentSongIndex + 1} of ${songs.length}: ${currentSong.title}`
                      : "Loading your playlist..."}
            </p>
          </div>

          <audio
            key={audioSrc}
            ref={audioRef}
            src={audioSrc}
            controls
            playsInline
            preload="auto"
            className="audio-player"
            aria-label="Playlist audio player"
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </section>
  );
};

export default MusicPlayer;
