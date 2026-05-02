import { UsersDetailPage } from "@/features/users/components/UsersDetailPage";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: Props) {
  const { id } = await params;
  const numericId = Number(id);

  return <UsersDetailPage id={numericId} />;
}
