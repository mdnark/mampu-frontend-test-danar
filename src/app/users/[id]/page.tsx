import { UsersDetailPage } from "@/features/users/components/UsersDetailPage";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  try {
    const user = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      { cache: "force-cache" },
    ).then((r) => {
      if (!r.ok) throw new Error("Not found");
      return r.json();
    });

    return {
      title: `${user.name} — User Detail`,
      description: `Profile of ${user.name} from ${user.company.name}`,
    };
  } catch {
    return {
      title: "User Not Found",
    };
  }
}

export default async function page({ params }: Props) {
  const { id } = await params;
  const numericId = Number(id);

  return <UsersDetailPage id={numericId} />;
}
