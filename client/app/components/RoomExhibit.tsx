import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { roomPhotosBySlug, roomPhotoSource } from "../data/roomPhotos";
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
  const photos = roomPhotosBySlug[room.slug] ?? [];

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

        <div className={`room-collection room-collection--${room.motif}`}>
          {photos.map((photo, index) => (
            <figure className="room-collection__frame" key={photo.id}>
              <Image
                alt={photo.alt}
                height={photo.height}
                priority={index === 0}
                sizes="(max-width: 760px) 88vw, (max-width: 1100px) 42vw, 30vw"
                src={roomPhotoSource(photo)}
                unoptimized
                width={photo.width}
              />
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>
                  {room.slug === "13" && index === 0
                    ? "Anniversary flowers"
                    : `Study ${String(index + 1).padStart(2, "0")}`}
                </strong>
              </figcaption>
            </figure>
          ))}
        </div>

        <aside className="museum-label">
          <span>Permanent collection</span><h2>Room concept</h2>
          <p>
            Four private photographs were selected from the archive and composed
            around this room&apos;s atmosphere, palette, and visual language.
          </p>
          <dl>
            <div><dt>Date</dt><dd>{room.dateLabel}</dd></div>
            <div><dt>Theme</dt><dd>{room.designName}</dd></div>
            <div><dt>Collection</dt><dd>{photos.length} photographs</dd></div>
            <div><dt>Status</dt><dd>Curated</dd></div>
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
