import AnniversaryHome from "../components/AnniversaryHome";
import Foyer from "../components/Foyer";
import { isMuseumUnlocked } from "../lib/session";

export const dynamic = "force-dynamic";

export default async function AnniversaryPage() {
  return (await isMuseumUnlocked()) ? <AnniversaryHome /> : <Foyer />;
}
