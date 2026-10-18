import Link from "next/link";
import type { CSSProperties } from "react";
import type { MuseumRoom } from "../data/rooms";

export default function RoomExhibit({ room, previousSlug, nextSlug }: {
  room: MuseumRoom;
  previousSlug?: string;
  nextSlug?: string;
}) {
  const style = {
    "--room-bg": room.palette.background,
    "--room-paper": room.palette.surface,
    "--room-accent": room.palette.accent,
    "--room-ink": room.palette.ink,
  } as CSSProperties;

  return (
    <main className={`exhibit exhibit--${room.motif}`} style={style}>
      <nav className="exhibit-nav" aria-label="Exhibition navigation">
        <Link href="/museum">← Museum map</Link><span>Room {room.slug} of 25</span><span>{room.dateLabel}</span>
      </nav>

      <section className="exhibit-stage" aria-labelledby="exhibit-title">
        <div className="exhibit-number" aria-hidden="true">{room.slug}</div>
        <div className="exhibit-copy">
          <p className="eyebrow">{room.relationshipLabel}</p>
          <h1 id="exhibit-title">{room.designName}</h1>
          <p>{room.description}</p>
        </div>

        <div className="empty-frame">
          <div className="empty-frame__inner">
            <span aria-hidden="true">✦</span>
            <p>This wall is reserved for your photographs.</p>
            <small>Exhibit curation begins when the memories arrive.</small>
          </div>
        </div>

        <aside className="museum-label">
          <span>Permanent collection</span><h2>Room concept</h2>
          <p>
            This room already has its own atmosphere and visual direction. Its
            final layout, captions, music, and interactions will be composed
            around the real memories from this month.
          </p>
          <dl>
            <div><dt>Date</dt><dd>{room.dateLabel}</dd></div>
            <div><dt>Theme</dt><dd>{room.designName}</dd></div>
            <div><dt>Status</dt><dd>Awaiting curation</dd></div>
          </dl>
        </aside>
      </section>

      <footer className="room-pagination">
        {previousSlug ? <Link href={`/rooms/${previousSlug}`}>← Previous room</Link> : <span />}
        <Link href="/museum">Museum directory</Link>
        {nextSlug ? <Link href={`/rooms/${nextSlug}`}>Next room →</Link> : <span />}
      </footer>
    </main>
  );
}
