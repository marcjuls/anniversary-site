import Link from "next/link";
import type { CSSProperties } from "react";
import { lockMuseum } from "../actions";
import type { MuseumRoom } from "../data/rooms";
import AnniversaryClock from "./AnniversaryClock";

export default function MuseumLobby({ rooms }: { rooms: MuseumRoom[] }) {
  const currentRoom = rooms.find((room) => room.status === "current");

  return (
    <main className="museum-shell">
      <header className="museum-nav">
        <Link className="wordmark" href="/museum"><span>M</span> Museum of Us</Link>
        <div className="museum-nav__meta">
          <span>Private collection</span>
          <form action={lockMuseum}>
            <button className="text-button" type="submit">Close museum</button>
          </form>
        </div>
      </header>

      <section className="lobby-hero" aria-labelledby="museum-title">
        <div className="lobby-hero__copy">
          <p className="eyebrow">Established April 6, 2025 · Open forever</p>
          <h1 id="museum-title">The Museum<br />of <em>Us</em></h1>
          <p className="lobby-deck">
            Every month becomes a room. Every photograph becomes an artifact.
            Every ordinary memory earns a place on the wall.
          </p>
          {currentRoom ? (
            <Link className="primary-link" href={`/rooms/${currentRoom.slug}`}>
              Visit the newest room <span aria-hidden="true">↗</span>
            </Link>
          ) : null}
        </div>

        <div className="lobby-installation" aria-hidden="true">
          <div className="arch arch--back" />
          <div className="arch arch--middle" />
          <div className="arch arch--front">
            <span>01</span>
            <p>One beginning.<br />A lifetime of rooms.</p>
          </div>
        </div>
      </section>

      <section className="special-exhibit" aria-labelledby="special-exhibit-title">
        <div className="special-exhibit__number" aria-hidden="true">23</div>
        <div className="special-exhibit__copy">
          <p className="eyebrow">Now showing · Special Exhibition No. 01</p>
          <h2 id="special-exhibit-title">Twenty-Three Ways of Seeing You</h2>
          <p>
            A portrait study held apart from the monthly timeline—twenty-three
            photographs gathered into one private room of light, mirrors, and quiet details.
          </p>
          <Link className="special-exhibit__link" href="/exhibits/portrait-study">
            Enter the portrait exhibit <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="special-exhibit__art" aria-hidden="true">
          <span>01</span><span>12</span><span>23</span>
        </div>
      </section>

      <section className="time-gallery" aria-labelledby="time-title">
        <div><p className="eyebrow">Permanent installation</p><h2 id="time-title">Time, collected</h2></div>
        <AnniversaryClock />
      </section>

      <section className="directory" aria-labelledby="directory-title">
        <div className="section-heading">
          <div><p className="eyebrow">Museum directory</p><h2 id="directory-title">Choose an exhibition</h2></div>
          <p>
            Each room has its own visual language. Earlier rooms are ready for
            their memories; future doors remain respectfully closed.
          </p>
        </div>

        <div className="room-grid">
          {rooms.map((room) => {
            const roomStyle = {
              "--card-bg": room.palette.background,
              "--card-ink": room.palette.surface,
              "--card-accent": room.palette.accent,
            } as CSSProperties;
            const card = (
              <>
                <div className={`room-card__art motif--${room.motif}`}><span>{room.slug}</span></div>
                <div className="room-card__body">
                  <p>{room.relationshipLabel}</p><h3>{room.designName}</h3>
                  <time dateTime={room.date}>{room.dateLabel}</time>
                </div>
                <span className="room-card__status">
                  {room.status === "future" ? "Closed" : room.status === "current" ? "Now showing" : room.roomNumber === 1 ? "Curated · 3 photographs" : "Awaiting memories"}
                </span>
              </>
            );

            return room.status === "future" ? (
              <article className="room-card room-card--future" style={roomStyle} key={room.slug}>{card}</article>
            ) : (
              <Link className="room-card" style={roomStyle} href={`/rooms/${room.slug}`} key={room.slug}>{card}</Link>
            );
          })}
        </div>
      </section>

      <footer className="museum-footer">
        <p>The collection is private. The story is ours.</p>
        <span>Room 01 opened April 6, 2025</span>
      </footer>
    </main>
  );
}
