import Link from "next/link";
import "./closing-letter.css";

const letter = [
  "sorry na wala ako masabi nung 29, nabigla lang ako non kaya dito ko na lang sasabihin lahat",
  "kaya dito ko na lang din ilagay dahil nahihiya na ko isend sayo, at sana makita mo to",
  "sorry sa lahat, lalo na nung nag away tayo tas hinayaan lang kita",
  "di ko alam na ganon pala kabigat sayo yun",
  "sorry kung naging manhid ako, at nung nasa cavite city ka na kailangan mo ng kausap, di man lang ako nag insist para kausapin ka",
  "sa sobrang komportable ko, naging pabaya ako",
  "di ko na napansin na di ka na pala okay, at may sama ka na ng loob",
  "sorry kung pinaramdam ko na mag isa ka lang, hanggang sa naging comfort zone mo na yung wala ako, at nag fade na yung love mo sakin",
  "gusto ko pa rin sana na maging tayo at ayusin natin to, pero alam ko na buong buo na desisyon mo",
  "kaya naiintindihan ko, at tama ka na kailangan mo muna bumawi sa sarili mo",
  "di na kita kukulitin para mabigay ko na yung peace of mind na hinihingi mo",
  "thank you sa 1 year and 6 months natin, at di ko makakalimutan memories natin",
  "di ko buburahin yung website hanggang sa naka usad na ko",
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
