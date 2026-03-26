import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const audioSrc = useMemo(
    () =>
      encodeURI(
        `${import.meta.env.BASE_URL}audio/Rico Blanco - Balisong (Lyrics).mp3`,
      ),
    [],
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

    const handleCanPlay = () => setIsReady(true);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    void tryPlay();

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [tryPlay]);

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

  return (
    <section className="section section-alt">
      <div className="container music-wrap">
        <div className="music-card">
          <p className="section-tag">Our song</p>
          <h2 className="section-title">Balisong</h2>
          <p className="music-text"></p>

          <div className="music-actions">
            <button
              className="music-btn"
              type="button"
              onClick={() => void togglePlayback()}
            >
              {isPlaying ? "Pause song" : "Play our song"}
            </button>

            <p
              className={`music-status ${
                needsInteraction ? "music-status--active" : ""
              }`}
            >
              {needsInteraction
                ? "Tap the button once to start the music on this device."
                : isPlaying
                  ? "Now playing softly in the background."
                  : isReady
                    ? "The song is ready whenever you want it."
                    : "Loading our song..."}
            </p>
          </div>

          <audio
            ref={audioRef}
            controls
            loop
            playsInline
            preload="auto"
            className="audio-player"
            aria-label="Balisong audio player"
          >
            <source src={audioSrc} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </section>
  );
};

export default MusicPlayer;
