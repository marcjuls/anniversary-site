import { notFound, redirect } from "next/navigation";
import RoomExhibit from "../../components/RoomExhibit";
import RoomOneExhibit from "../../components/RoomOneExhibit";
import { createMuseumRooms, findMuseumRoom } from "../../data/rooms";
import { isMuseumUnlocked } from "../../lib/session";

export const dynamic = "force-dynamic";

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isMuseumUnlocked())) redirect("/");

  const { slug } = await params;
  const rooms = createMuseumRooms();
  const room = findMuseumRoom(slug, rooms);
  if (!room || room.status === "future") notFound();
  if (room.slug === "01") return <RoomOneExhibit />;

  const index = rooms.findIndex((item) => item.slug === slug);
  const previousSlug = rooms[index - 1]?.slug;
  const nextRoom = rooms[index + 1];
  const nextSlug = nextRoom?.status === "future" ? undefined : nextRoom?.slug;

  return <RoomExhibit room={room} previousSlug={previousSlug} nextSlug={nextSlug} />;
}
