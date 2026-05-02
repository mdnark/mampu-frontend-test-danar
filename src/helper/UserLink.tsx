"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  id: number;
  name: string;
};

export const UserLink = ({ id, name }: Props) => {
  const searchParams = useSearchParams();

  return (
    <Link
      href={`/users/${id}?${searchParams.toString()}`}
      className="font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded"
    >
      {name}
    </Link>
  );
};
