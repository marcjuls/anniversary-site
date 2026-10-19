import { redirect } from "next/navigation";
import MuseumLobby from "../components/MuseumLobby";
import { createMuseumRooms } from "../data/rooms";
import { isMuseumUnlocked } from "../lib/session";

export const dynamic = "force-dynamic";

export default async function MuseumPage() {
  if (!(await isMuseumUnlocked())) redirect("/");

  return <MuseumLobby rooms={createMuseumRooms()} />;
}
