import Image from "next/image";
import Link from "next/link";
import { portraitSource, portraits, type Portrait } from "../data/portraits";

function PortraitImage({ portrait, priority = false }: { portrait: Portrait; priority?: boolean }) {
  return (
    <Image
      alt={portrait.alt}
      className="portrait-image"
      height={portrait.height}
      priority={priority}
      sizes="(max-width: 720px) 100vw, (max-width: 1100px) 70vw, 50vw"
      src={portraitSource(portrait.filename)}
      unoptimized
      width={portrait.width}
    />
  );
}

function Frame({ portrait, className = "" }: { portrait: Portrait; className?: string }) {
  return (
    <figure className={`portrait-frame ${className}`}>
      <PortraitImage portrait={portrait} />
      <figcaption><span>{portrait.id}</span><span>From the private collection</span></figcaption>
    </figure>
  );
}

export default function PortraitExhibit() {
  return (
    <main className="portrait-exhibit">
      <nav className="portrait-nav" aria-label="Portrait exhibition navigation">
        <Link href="/">← Museum map</Link>
        <span>Special exhibition · Ten portraits</span>
        <span>Private collection</span>
      </nav>

      <header className="portrait-hero" aria-labelledby="portrait-title">
        <div className="portrait-hero__copy">
          <p className="eyebrow">A portrait study in ten frames</p>
          <h1 id="portrait-title">Ten Ways<br />of Seeing <em>You</em></h1>
          <p className="portrait-intro">
            Held apart from the calendar and gathered as one complete study:
            ten expressions, ten fragments of light, one unforgettable subject.
          </p>
          <a className="portrait-scroll" href="#the-study">Enter the study <span aria-hidden="true">↓</span></a>
        </div>

        <figure className="portrait-hero__frame">
          <PortraitImage portrait={portraits[0]} priority />
          <figcaption><span>Plate 01</span><span>Opening portrait</span></figcaption>
        </figure>
        <span className="portrait-hero__mark" aria-hidden="true">10</span>
      </header>

      <section className="portrait-prologue" id="the-study" aria-label="Exhibition introduction">
        <p className="eyebrow">Curator’s note</p>
        <blockquote>“Not a timeline. A constellation.”</blockquote>
        <p>
          These photographs belong together because they hold the same quiet
          magic: the instant a camera stops recording a moment and starts
          remembering a person.
        </p>
      </section>

      <section className="portrait-sequence portrait-sequence--light" aria-labelledby="light-title">
        <div className="portrait-section-label">
          <span>Sequence I · 02—04</span><h2 id="light-title">Passing light</h2>
          <p>Three close studies, composed like frames from the same small film.</p>
        </div>
        <Frame portrait={portraits[1]} className="portrait-frame--wide" />
        <Frame portrait={portraits[2]} className="portrait-frame--offset" />
        <Frame portrait={portraits[3]} className="portrait-frame--quiet" />
      </section>

      <section className="portrait-sequence portrait-sequence--mirrors" aria-labelledby="mirrors-title">
        <div className="portrait-section-label portrait-section-label--light">
          <span>Sequence II · 05 + 07</span><h2 id="mirrors-title">In the looking glass</h2>
          <p>Two self-portraits meet across the room: a pause, a glance, a private stage.</p>
        </div>
        <Frame portrait={portraits[4]} className="portrait-frame--mirror-one" />
        <Frame portrait={portraits[6]} className="portrait-frame--mirror-two" />
        <span className="portrait-mirror-line" aria-hidden="true">Her, reflected</span>
      </section>

      <section className="portrait-sequence portrait-sequence--details" aria-labelledby="details-title">
        <div className="portrait-section-label">
          <span>Sequence III · 06 + 08 + 10</span><h2 id="details-title">Near enough to notice</h2>
          <p>Expressions become the whole landscape when the frame moves closer.</p>
        </div>
        <Frame portrait={portraits[5]} className="portrait-frame--detail-one" />
        <Frame portrait={portraits[7]} className="portrait-frame--detail-two" />
        <Frame portrait={portraits[9]} className="portrait-frame--detail-three" />
      </section>

      <section className="portrait-finale" aria-labelledby="finale-title">
        <div className="portrait-finale__copy">
          <p className="eyebrow">Final plate · 09</p>
          <h2 id="finale-title">And then,<br />that smile.</h2>
          <p>The last frame refuses to be formal. It leaves the exhibition exactly as love should: lighter than it arrived.</p>
        </div>
        <Frame portrait={portraits[8]} className="portrait-frame--finale" />
      </section>

      <footer className="portrait-footer">
        <p>Special Exhibition No. 01 · Ten Ways of Seeing You</p>
        <Link href="/">Return to the museum →</Link>
      </footer>
    </main>
  );
}
