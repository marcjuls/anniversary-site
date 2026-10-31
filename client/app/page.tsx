import Link from "next/link";
import "./closing-letter.css";

const letter = [
  "wala akong nasabi nung 29, nabigla lang talaga ako non kaya dito ko na lang sasabihin lahat",
  "nilagay ko na rin dito kasi nahihiya na kong isend directly sayo, at sana makita mo to",
  "naiintindihan ko na kung bakit napagod ka",
  "aminado ako sa naging pagkukulang ko nung nag away tayo at hinayaan lang kita",
  "at nung nasa cavite city ka na kailangan mo ng kausap, di ko man lang napansin yun at di ako nag insist na kausapin ka",
  "sa sobrang komportable ko, di ko na nakita na di ka na pala okay",
  "mali ko na pinaramdam ko na mag isa ka lang, hanggang sa nasanay ka na na wala ako, at nag fade na yung love mo",
  "gusto ko pa sana ayusin natin to, pero nirerespeto ko yung naging desisyon mo",
  "naiintindihan ko na kailangan mo munang bumawi sa sarili mo",
  "kaya ako na muna yung lalayo, di na kita kukulitin para mabigay ko sayo yung space na kailangan mo",
  "thank you sa 1 year and 6 months natin",
  "di ko buburahin tong website na to hanggang sa naka usad na ko",
  "keep clapping for me silently, i'll do the same for you",
  "ingat palagi",
];

export default function Home() {
  return (
    <main className="closing-page">
      <article className="closing-letter" aria-labelledby="closing-title">
        <header className="closing-letter__heading">
          <p className="eyebrow">A letter for you</p>
          <h1 id="closing-title">Our story has come to an end.</h1>
        </header>
        <div className="closing-letter__body" lang="fil">
          {letter.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <nav className="closing-letter__actions" aria-label="Continue to our memories">
          <Link className="closing-letter__button" href="/anniversary#countdown">
            Continue to the countdown <span aria-hidden="true">→</span>
          </Link>
          <Link className="closing-letter__button closing-letter__button--secondary" href="/museum">
            Visit the museum <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </article>
    </main>
  );
}
