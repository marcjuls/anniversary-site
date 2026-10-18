import { redirect } from "next/navigation";
import PortraitExhibit from "../../components/PortraitExhibit";
import { isMuseumUnlocked } from "../../lib/session";

export const dynamic = "force-dynamic";

export default async function PortraitStudyPage() {
  if (!(await isMuseumUnlocked())) redirect("/");

  return <PortraitExhibit />;
}
