"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserWithActivity } from "../types";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  user: UserWithActivity;
}

export default function UsersCard({ user }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() =>
        router.push(`/users/${user.id}?${searchParams.toString()}`)
      }
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{user.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </CardHeader>
      <CardContent>
        <Link
          href={`https://${user.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {user.website}
        </Link>
        <div className="flex gap-2 mt-3 flex-wrap">
          <Badge variant="secondary">{user.totalPosts} posts</Badge>
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            {user.completedTodos} completed
          </Badge>
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
            {user.pendingTodos} pending
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
