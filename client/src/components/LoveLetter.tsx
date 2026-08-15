const LoveLetter = () => {
  return (
    <section
      className="relative overflow-hidden bg-blush px-5 py-24 text-midnight sm:px-8 sm:py-32 lg:px-12"
      aria-labelledby="letter-title"
    >
      <div
        className="absolute -right-28 -top-24 size-96 rounded-full border border-wine/10"
        aria-hidden="true"
      />
      <div
        className="absolute -right-18 -top-14 size-72 rounded-full border border-wine/10"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div className="lg:sticky lg:top-14">
          <p className="font-utility text-xs uppercase tracking-[0.28em] text-wine/85">
            A letter for you
          </p>
          <h2
            className="mt-5 text-balance font-display text-5xl leading-[0.92] tracking-[-0.04em] text-wine sm:text-7xl"
            id="letter-title"
          >
            Happy 13th Monthsary, Love!
          </h2>
          <div className="mt-8 flex items-center gap-3 font-utility text-[0.62rem] uppercase tracking-[0.22em] text-wine/85">
            <span className="h-px w-12 bg-wine/35" />
            Read slowly
          </div>
        </div>

        <article className="relative bg-pearl px-6 py-10 shadow-[0_32px_80px_rgba(69,21,46,0.17)] sm:px-12 sm:py-14 lg:px-16">
          <div
            className="absolute inset-y-0 left-8 w-px bg-rose/18 sm:left-12"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 top-0 h-3 bg-[repeating-linear-gradient(135deg,#6e294c_0_8px,transparent_8px_16px)] opacity-12"
            aria-hidden="true"
          />

          <div className="relative space-y-6 pl-7 text-[1.02rem] leading-8 text-midnight/76 sm:pl-8 sm:text-lg sm:leading-9 [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:font-display [&>p:first-of-type]:first-letter:text-6xl [&>p:first-of-type]:first-letter:leading-[0.8] [&>p:first-of-type]:first-letter:text-wine">

          <p>
            I can’t believe how fast time has passed since we started this
            beautiful journey together. Every single moment with you has been
            such a blessing, and I am beyond thankful that you’re the one I get
            to share all of this with.
          </p>

          <p>
            I’m so grateful that you’re my girlfriend. Hindi ko na kayang isipin
            kung paano magiging buhay ko kung hindi ka dumating. You’ve filled
            my life with so much love, happiness, and joy. Sa bawat araw mas
            narerealize ko kung gaano ako kaswerte na ikaw yung kasama ko.
          </p>

          <p>
            Thank you for always being there for me, for all the laughter, for
            your patience, for your care, and for the love you give me every
            day. I can’t imagine going through life with anyone else by my side
            but you.
          </p>

          <p>
            Sana magtagal pa tayo, and I hope that one day, I get to call you my
            wife. I can’t wait for all the beautiful things that the future
            holds for us. I know that with you, everything will only get better.
            I love you more than words can ever express, Love.
          </p>

          <p>
            Thank you for being my partner in this journey. I am beyond grateful
            that you’re mine and I can’t wait to spend forever with you.
          </p>
          </div>

          <footer className="mt-10 flex justify-end border-t border-wine/10 pt-7">
            <div className="-rotate-2 text-right">
              <p className="font-utility text-[0.6rem] uppercase tracking-[0.22em] text-wine/75">
                Always yours
              </p>
              <p className="mt-1 font-display text-3xl italic text-wine">
                with all my love ♡
              </p>
            </div>
          </footer>
        </article>
      </div>
    </section>
  );
};

export default LoveLetter;
