import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">Gallery closed</p>
      <h1>This room is not open yet.</h1>
      <p>The curators are still preparing the memories behind this door.</p>
      <Link className="primary-link" href="/museum">Return to the museum map</Link>
    </main>
  );
}
