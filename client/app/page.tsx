import Foyer from "./components/Foyer";
import MuseumLobby from "./components/MuseumLobby";
import { createMuseumRooms } from "./data/rooms";
import { isMuseumUnlocked } from "./lib/session";

export const dynamic = "force-dynamic";

export default async function Home() {
  const unlocked = await isMuseumUnlocked();
  return unlocked ? <MuseumLobby rooms={createMuseumRooms()} /> : <Foyer />;
}
