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
      sizes="(max-width: 720px) 92vw, (max-width: 1100px) 58vw, 42vw"
      src={portraitSource(portrait.filename)}
      unoptimized
      width={portrait.width}
    />
  );
}

function Frame({ portrait }: { portrait: Portrait }) {
  return (
    <figure className="portrait-frame">
      <PortraitImage portrait={portrait} />
      <figcaption><span>Plate {portrait.id}</span><span>Private collection</span></figcaption>
    </figure>
  );
}

function Chapter({
  className,
  kicker,
  title,
  copy,
  ids,
}: {
  className: string;
  kicker: string;
  title: string;
  copy: string;
  ids: readonly string[];
}) {
  const selected = ids.map((id) => portraits.find((portrait) => portrait.id === id));

  if (selected.some((portrait) => !portrait)) return null;

  return (
    <section className={`portrait-chapter ${className}`} aria-labelledby={`${className}-title`}>
      <div className="portrait-section-label">
        <span>{kicker}</span>
        <h2 id={`${className}-title`}>{title}</h2>
        <p>{copy}</p>
      </div>
      {selected.map((portrait) => <Frame portrait={portrait as Portrait} key={portrait?.id} />)}
    </section>
  );
}

export default function PortraitExhibit() {
  return (
    <main className="portrait-exhibit">
      <nav className="portrait-nav" aria-label="Portrait exhibition navigation">
        <Link href="/museum">← Museum map</Link>
        <span>Uncatalogued exhibit · Twenty-four portraits</span>
        <span>Private collection</span>
      </nav>

      <header className="portrait-hero" aria-labelledby="portrait-title">
        <div className="portrait-hero__copy">
          <p className="eyebrow">A portrait study in twenty-four frames</p>
          <h1 id="portrait-title">Ways of<br />Seeing <em>You</em></h1>
          <p className="portrait-intro">
            Held apart from the calendar and gathered as one complete study:
            changing light, familiar expressions, and one unforgettable subject.
          </p>
          <a className="portrait-scroll" href="#the-study">Enter the study <span aria-hidden="true">↓</span></a>
        </div>

        <figure className="portrait-hero__frame">
          <PortraitImage portrait={portraits[10]} priority />
          <figcaption><span>Plate 11</span><span>Opening portrait</span></figcaption>
        </figure>
        <span className="portrait-hero__mark" aria-hidden="true">24</span>
      </header>

      <section className="portrait-prologue" id="the-study" aria-label="Exhibition introduction">
        <p className="eyebrow">Curator’s note</p>
        <blockquote>“Not a timeline.<br />A constellation.”</blockquote>
        <p>
          Chosen from eighty-seven photographs, these twenty-four belong together
          because each one remembers a different kind of light.
        </p>
      </section>

      <Chapter
        className="portrait-chapter--sunlit"
        kicker="Chapter I · Open air"
        title="Where the light found you"
        copy="Water, gardens, sunlight, and a little color—portraits that feel like an open window."
        ids={["12", "14", "16", "17", "21", "22"]}
      />

      <Chapter
        className="portrait-chapter--mirrors"
        kicker="Chapter II · Reflections"
        title="The looking glass"
        copy="Five self-portraits meet across the room: a pause, a glance, a private stage."
        ids={["05", "07", "13", "20", "23"]}
      />

      <Chapter
        className="portrait-chapter--near"
        kicker="Chapter III · Close studies"
        title="Near enough to notice"
        copy="When the frame moves closer, an expression becomes the whole landscape."
        ids={["01", "02", "03", "04", "08", "15"]}
      />

      <Chapter
        className="portrait-chapter--film"
        kicker="Chapter IV · Familiar scenes"
        title="A small film of you"
        copy="School halls, car windows, soft smiles, and black-and-white frames—the everyday made cinematic."
        ids={["06", "09", "10", "18", "19", "24"]}
      />

      <section className="portrait-finale" aria-labelledby="finale-title">
        <div className="portrait-finale__copy">
          <p className="eyebrow">Final wall · All twenty-four</p>
          <h2 id="finale-title">Still looking.<br />Still choosing you.</h2>
          <p>The exhibit ends without assigning a date. When the months are known, each memory can find its permanent room.</p>
        </div>
        <div className="portrait-contact" aria-label="All portraits in the special exhibition">
          {portraits.map((portrait) => (
            <figure key={portrait.id}>
              <PortraitImage portrait={portrait} />
              <figcaption>{portrait.id}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer className="portrait-footer">
        <p>Special Exhibition No. 01 · Twenty-Four Ways of Seeing You</p>
        <Link href="/museum">Return to the museum →</Link>
      </footer>
    </main>
  );
}
