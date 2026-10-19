import Foyer from "./components/Foyer";
import AnniversaryHome from "./components/AnniversaryHome";
import { isMuseumUnlocked } from "./lib/session";

export const dynamic = "force-dynamic";

export default async function Home() {
  const unlocked = await isMuseumUnlocked();
  return unlocked ? <AnniversaryHome /> : <Foyer />;
}
