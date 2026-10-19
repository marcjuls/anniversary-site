import Image from "next/image";
import Link from "next/link";
import { roomOnePhotos, roomPhotoSource, type RoomPhoto } from "../data/roomPhotos";

function RoomOneImage({ photo, priority = false }: { photo: RoomPhoto; priority?: boolean }) {
  return (
    <Image
      alt={photo.alt}
      height={photo.height}
      priority={priority}
      sizes="(max-width: 760px) 92vw, 50vw"
      src={roomPhotoSource(photo)}
      unoptimized
      width={photo.width}
    />
  );
}

export default function RoomOneExhibit() {
  return (
    <main className="room-one">
      <nav className="room-one__nav" aria-label="Room navigation">
        <Link href="/museum">← Museum map</Link>
        <span>Room 01 of 25</span>
        <span>April 6, 2025</span>
      </nav>

      <header className="room-one__hero" aria-labelledby="room-one-title">
        <div className="room-one__intro">
          <p>The Beginning · Permanent Collection</p>
          <h1 id="room-one-title">First Light<br /><em>Rotunda</em></h1>
          <span>Three portraits open the museum: a distant reflection, a closer look, and one more quiet frame held between them.</span>
          <a href="#room-one-gallery">Walk into the room <b aria-hidden="true">↓</b></a>
        </div>

        <figure className="room-one__mirror room-one__mirror--main">
          <RoomOneImage photo={roomOnePhotos[0]} priority />
          <figcaption><span>Opening plate</span><span>01</span></figcaption>
        </figure>
        <figure className="room-one__portrait-orbit">
          <RoomOneImage photo={roomOnePhotos[1]} priority />
        </figure>
        <span className="room-one__sun" aria-hidden="true" />
        <span className="room-one__room-number" aria-hidden="true">01</span>
      </header>

      <section className="room-one__threshold" aria-label="Curator note">
        <p>Curator’s note · Room 01</p>
        <blockquote>“Every collection begins with the wish to keep one moment close.”</blockquote>
        <span>
          This first room is built around reflections. Each frame changes the distance,
          but the person at the center remains unmistakable.
        </span>
      </section>

      <section className="room-one__gallery" id="room-one-gallery" aria-labelledby="room-one-gallery-title">
        <div className="room-one__gallery-heading">
          <p>Three studies · 01—03</p>
          <h2 id="room-one-gallery-title">The first<br />three frames</h2>
        </div>

        <figure className="room-one__plate room-one__plate--one">
          <RoomOneImage photo={roomOnePhotos[0]} />
          <figcaption><span>01</span><strong>At a distance</strong><small>A room inside a room.</small></figcaption>
        </figure>
        <figure className="room-one__plate room-one__plate--two">
          <RoomOneImage photo={roomOnePhotos[1]} />
          <figcaption><span>02</span><strong>Near enough</strong><small>The portrait fills the frame.</small></figcaption>
        </figure>
        <figure className="room-one__plate room-one__plate--three">
          <RoomOneImage photo={roomOnePhotos[2]} />
          <figcaption><span>03</span><strong>Reflected again</strong><small>A second mirror closes the circle.</small></figcaption>
        </figure>
      </section>

      <footer className="room-one__footer">
        <Link href="/museum">← Museum directory</Link>
        <p>Room 01 · The Beginning</p>
        <Link href="/rooms/02">Continue to Room 02 →</Link>
      </footer>
    </main>
  );
}
