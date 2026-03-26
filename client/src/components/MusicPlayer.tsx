const MusicPlayer = () => {
  return (
    <section className="section section-alt">
      <div className="container music-wrap">
        <div className="music-card">
          <p className="section-tag">Our song</p>
          <h2 className="section-title">Balisong</h2>
          <p className="music-text">
            I added our song here so it can be part of this little space for
            you.
          </p>

          <audio controls autoPlay preload="metadata" className="audio-player">
            <source
              src="/audio/Rico Blanco - Balisong (Lyrics).mp3"
              type="audio/mp3"
            />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </section>
  );
};

export default MusicPlayer;
