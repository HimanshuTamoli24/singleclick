import { redirect } from "next/navigation";

export default function RoadmapPage() {
  redirect("/updates?tab=roadmap");
}
