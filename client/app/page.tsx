export default function Home() {
  return (
    <main
      style={{
        display: "grid",
        minHeight: "100svh",
        placeItems: "center",
        padding: "3rem 1.5rem",
        textAlign: "center",
      }}
    >
      <section style={{ maxWidth: "36rem" }}>
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-display), serif",
            fontSize: "clamp(2.5rem, 7vw, 4rem)",
            fontWeight: 400,
            lineHeight: 1.15,
            textWrap: "balance",
          }}
        >
          Our story has come to an end.
        </h1>
        <p style={{ margin: "1.5rem 0 0", lineHeight: 1.8, textWrap: "pretty" }}>
          This wasn’t the ending I hoped for, but I respect your decision.
        </p>
      </section>
    </main>
  );
}
