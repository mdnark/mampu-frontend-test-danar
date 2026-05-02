import { UsersPage } from "@/features/users/components/UsersPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users — Activity Monitor",
  description:
    "Monitor user activity including posts, completed todos, and pending todos across all users.",
  openGraph: {
    title: "Users — Activity Monitor",
    description:
      "Monitor user activity including posts, completed todos, and pending todos.",
  },
};

export default function page() {
  return <UsersPage />;
}
