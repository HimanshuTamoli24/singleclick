import { redirect } from "next/navigation";

export default function ChangelogPage() {
  redirect("/updates?tab=changelog");
}
