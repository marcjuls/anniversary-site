"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { legacyMediaSource } from "../data/legacyMedia";

const START_DATE = new Date("2025-04-06T00:00:00+08:00");

const stagePhotos = [
  ["hero-1.jpg", "Beautiful portrait by the water."],
  ["hero-2.jpg", "Portrait with flowers."],
  ["hero-3.jpg", "Soft smiling portrait."],
  ["hero-4.jpg", "Close-up portrait."],
  ["hero-5.jpg", "Elegant portrait."],
] as const;

const memories = [
  {
    title: "December 11, 2024",
    description: "The moment everything started, even if we did not know yet how important it would become.",
    photo: "photo-6.jpg",
    alt: "A treasured photo from the beginning of the story.",
  },
  {
    title: "April 6, 2025",
    description: "A simple moment that turned into something unforgettable because it was with you.",
    photo: "photo-7.jpg",
    alt: "A favorite memory together.",
  },
  {
    title: "The comfort stage",
    description: "When laughter felt easier, conversations became deeper, and you started feeling like home.",
    photo: "photo-8.jpg",
    alt: "A warm photograph from the comfort stage.",
  },
  {
    title: "Still choosing you",
    description: "Every day since then has just made my heart more sure about you.",
    photo: "hero-5.jpg",
    alt: "An elegant portrait that belongs in the story.",
  },
] as const;

const songs = [
  { title: "blue", file: "blue.mp3" },
  { title: "Balisong Transformed 2016", file: "Rico Blanco - Balisong Transformed 2016.mp3" },
  { title: "Here With Me", file: "d4vd - Here With Me (Lyrics).mp3" },
] as const;

const ribbonPhotos = [
  "hero-1.jpg",
  "hero-2.jpg",
  "hero-3.jpg",
  "hero-4.jpg",
  "hero-5.jpg",
  "photo-6.jpg",
  "photo-7.jpg",
  "photo-8.jpg",
] as const;

function elapsedTime() {
  const seconds = Math.max(0, Math.floor((Date.now() - START_DATE.getTime()) / 1000));
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

function MemoryRibbon() {
  return (
    <div className="anniv-ribbon" aria-hidden="true">
      <div className="anniv-ribbon__track">
        {[...ribbonPhotos, ...ribbonPhotos].map((photo, index) => (
          <div className="anniv-ribbon__frame" key={`${photo}-${index}`}>
            <Image
              alt=""
              fill
              sizes="120px"
              src={legacyMediaSource("photos", photo)}
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [track, setTrack] = useState(0);
  const [playing, setPlaying] = useState(false);
  const current = songs[track];
  const source = useMemo(() => legacyMediaSource("audio", current.file), [current.file]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    setPlaying(false);
  }, [source]);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  function moveTrack(direction: number) {
    setPlaying(false);
    setTrack((value) => (value + direction + songs.length) % songs.length);
  }

  return (
    <section className="anniv-music" aria-labelledby="playlist-title">
      <div className="anniv-section-heading anniv-section-heading--dark">
        <p>Our playlist</p>
        <h2 id="playlist-title">Songs that sound like us</h2>
      </div>
      <div className="anniv-player">
        <div className="anniv-record-stage">
          <div className={`anniv-record${playing ? " is-playing" : ""}`} aria-hidden="true">
            <div><span>{current.title}</span></div>
          </div>
        </div>
        <div className="anniv-player__controls">
          <p className="anniv-kicker">Now selected</p>
          <h3>{current.title}</h3>
          <p className="anniv-player__intro">
            Press play and let this page have its own soundtrack. These songs stay here with the memories they belong to.
          </p>
          <p className="anniv-track-status" role="status">Track {track + 1} of {songs.length} · {current.title}</p>
          <div className="anniv-control-row">
            <button type="button" onClick={() => moveTrack(-1)} aria-label="Previous song">←</button>
            <button className="anniv-play" type="button" onClick={() => void togglePlayback()} aria-label={playing ? `Pause ${current.title}` : `Play ${current.title}`}>
              {playing ? "Ⅱ" : "▶"}
            </button>
            <button type="button" onClick={() => moveTrack(1)} aria-label="Next song">→</button>
          </div>
          <p className="anniv-player__hint">{playing ? "Playing now." : "Ready when you are."}</p>
          <audio
            ref={audioRef}
            src={source}
            preload="metadata"
            onEnded={() => moveTrack(1)}
            onPause={() => setPlaying(false)}
            onPlay={() => setPlaying(true)}
          />
        </div>
      </div>
    </section>
  );
}

export default function AnniversaryHome() {
  const [elapsed, setElapsed] = useState(elapsedTime);

  useEffect(() => {
    const timer = window.setInterval(() => setElapsed(elapsedTime()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="anniversary-home">
      <nav className="anniv-nav" aria-label="Anniversary navigation">
        <a className="anniv-nav__mark" href="#top">M + J</a>
        <span>Our love letter · Since 06.04.25</span>
        <Link className="anniv-museum-link" href="/museum">Enter the museum <span aria-hidden="true">↗</span></Link>
      </nav>

      <section className="anniv-hero" id="top" aria-labelledby="anniv-title">
        <div className="anniv-hero__copy">
          <p className="anniv-overline"><span />For my prettiest girl</p>
          <p className="anniv-kicker">A love letter, still unfolding</p>
          <h1 id="anniv-title"><small>My</small>Love</h1>
          <p className="anniv-deck">
            You are the softest part of my life, the calm in my heart, and the prettiest reason everything feels more beautiful every day.
          </p>
          <div className="anniv-hero__actions">
            <a className="anniv-primary-button" href="#story">Begin our story <span aria-hidden="true">→</span></a>
            <p>every picture feels like a love letter ♡</p>
          </div>
          <div className="anniv-clock" id="countdown">
            <p>Loving you since April 6, 2025</p>
            <dl aria-label="Time spent loving you">
              {[
                [elapsed.days, "Days"],
                [elapsed.hours, "Hours"],
                [elapsed.minutes, "Minutes"],
                [elapsed.seconds, "Seconds"],
              ].map(([value, label]) => (
                <div key={label}><dd>{value}</dd><dt>{label}</dt></div>
              ))}
            </dl>
          </div>
        </div>

        <div className="anniv-photo-stage" aria-label="A collage of favorite portraits">
          <div className="anniv-photo-glow" aria-hidden="true" />
          {stagePhotos.map(([photo, alt], index) => (
            <figure className={`anniv-polaroid anniv-polaroid--${index + 1}`} key={photo}>
              <Image
                alt={alt}
                fill
                priority={index < 2}
                sizes="(max-width: 800px) 55vw, 32vw"
                src={legacyMediaSource("photos", photo)}
                unoptimized
              />
              <span aria-hidden="true">♡</span>
            </figure>
          ))}
          <div className="anniv-photo-note"><small>Frame by frame</small><strong>still choosing you</strong></div>
        </div>
        <MemoryRibbon />
      </section>

      <section className="anniv-story" id="story" aria-labelledby="story-title">
        <div className="anniv-section-heading">
          <p>Our story</p>
          <h2 id="story-title">Moments I never want to forget</h2>
          <span>Not a highlight reel. Just the small moments that became our whole story.</span>
        </div>
        <div className="anniv-timeline">
          {memories.map((memory, index) => (
            <article className={index % 2 ? "is-reversed" : ""} key={memory.title}>
              <span className="anniv-timeline__number">{String(index + 1).padStart(2, "0")}</span>
              <figure>
                <Image alt={memory.alt} fill sizes="(max-width: 760px) 85vw, 44vw" src={legacyMediaSource("photos", memory.photo)} unoptimized />
              </figure>
              <div className="anniv-memory-copy">
                <p>Chapter {String(index + 1).padStart(2, "0")}</p>
                <h3>{memory.title}</h3>
                <span>{memory.description}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="anniv-letter" aria-labelledby="letter-title">
        <div className="anniv-letter__heading">
          <p>A letter for you</p>
          <h2 id="letter-title">Happy 13th Monthsary, Love!</h2>
          <span>Read slowly</span>
        </div>
        <article>
          <div>
            <p>I can’t believe how fast time has passed since we started this beautiful journey together. Every single moment with you has been such a blessing, and I am beyond thankful that you’re the one I get to share all of this with.</p>
            <p>I’m so grateful that you’re my girlfriend. Hindi ko na kayang isipin kung paano magiging buhay ko kung hindi ka dumating. You’ve filled my life with so much love, happiness, and joy. Sa bawat araw mas narerealize ko kung gaano ako kaswerte na ikaw yung kasama ko.</p>
            <p>Thank you for always being there for me, for all the laughter, for your patience, for your care, and for the love you give me every day. I can’t imagine going through life with anyone else by my side but you.</p>
            <p>Sana magtagal pa tayo, and I hope that one day, I get to call you my wife. I can’t wait for all the beautiful things that the future holds for us. I know that with you, everything will only get better. I love you more than words can ever express, Love.</p>
            <p>Thank you for being my partner in this journey. I am beyond grateful that you’re mine and I can’t wait to spend forever with you.</p>
          </div>
          <footer><small>Always yours</small><strong>with all my love ♡</strong></footer>
        </article>
      </section>

      <MusicPlayer />

      <section className="anniv-museum-cta" aria-labelledby="museum-cta-title">
        <p>The story continues</p>
        <h2 id="museum-cta-title">Twenty-five rooms.<br />One love story.</h2>
        <span>The anniversary lives here. The memories are collected next door.</span>
        <Link href="/museum">Enter the Museum of Us <span aria-hidden="true">↗</span></Link>
      </section>

      <footer className="anniv-footer">
        <p>Made with love, only for you ❤️</p>
        <span>Our story · Still unfolding</span>
      </footer>
    </main>
  );
}
