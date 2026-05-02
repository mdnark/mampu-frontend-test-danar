"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { userRepository } from "../hooks/useUsers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ArrowBigLeft } from "lucide-react";
import { useState } from "react";

type Props = {
  id: number;
};
export const UsersDetailPage = ({ id }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const backUrl = `/users?${searchParams.toString()}`;

  const [showAllPosts, setShowAllPosts] = useState<boolean>(false);
  const [showAllTodos, setShowAllTodos] = useState<boolean>(false);

  const { users, posts, todos, isError, isLoading } =
    userRepository.hooks.useUsersDetail(id);

  console.log(users);

  return (
    <div className="container mx-auto flex flex-col items-center py-8 px-40 gap-6">
      <div className="flex gap-3 items-center w-full">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(backUrl)}
        >
          <ArrowBigLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Detail Users</h1>
      </div>

      {/* Users Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            {isLoading ? <Skeleton className="h-6 w-50" /> : users?.name}
          </CardTitle>
          {!isLoading && (
            <p className="text-muted-foreground text-sm">@{users?.username}</p>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <p className="text-sm">
                <span className="font-medium">Email: </span>
                {users?.email}
              </p>
              <p className="text-sm">
                <span className="font-medium">Phone: </span>
                {users?.phone}
              </p>
              <p className="text-sm">
                <span className="font-medium">Website: </span>
                <a
                  href={`https://${users?.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {users?.website}
                </a>
              </p>
              <div className="space-y-2">
                <p className="text-sm font-medium">Company:</p>
                <p className="text-sm">{users?.company.name}</p>
                <p className="text-sm text-muted-foreground italic">
                  {users?.company.catchPhrase}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Address:</p>
                <p className="text-sm text-muted-foreground">
                  {users?.address.street}, {users?.address.suite}
                </p>
                <p className="text-sm text-muted-foreground">
                  {users?.address.city}, {users?.address.zipcode}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Posts Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">
            Posts
            {!isLoading && (
              <Badge variant="secondary" className="ml-2">
                {posts?.length ?? 0}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : posts?.length === 0 ? (
            <p className="text-muted-foreground text-sm">No posts found</p>
          ) : (
            <div className="space-y-3">
              {(showAllPosts ? posts : posts?.slice(0, 5))?.map((post) => (
                <div key={post.id} className="border rounded-md p-3">
                  <p className="font-medium text-sm capitalize">{post.title}</p>
                  <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                    {post.body}
                  </p>
                </div>
              ))}
              <div className="w-full flex justify-center">
                {(posts?.length ?? 0) > 5 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm text-muted-foreground text-center"
                    onClick={() => setShowAllPosts((prev) => !prev)}
                  >
                    {showAllPosts
                      ? "Show less"
                      : `+${(posts?.length ?? 0) - 5} more posts`}
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Todos Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">
            Todos
            {!isLoading && (
              <div className="inline-flex gap-2 ml-2">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  {todos?.filter((t) => t.completed).length ?? 0} completed
                </Badge>
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  {todos?.filter((t) => !t.completed).length ?? 0} pending
                </Badge>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          ) : todos?.length === 0 ? (
            <p className="text-muted-foreground text-sm">No todos found</p>
          ) : (
            <div className="space-y-2">
              {(showAllTodos ? todos : todos?.slice(0, 10))?.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 py-2 border-b last:border-0"
                >
                  <div
                    className={`w-3 h-3 rounded-full shrink-0 ${
                      todo.completed ? "bg-green-500" : "bg-orange-400"
                    }`}
                  />
                  <p
                    className={`text-sm ${
                      todo.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {todo.title}
                  </p>
                </div>
              ))}
              <div className="w-full flex justify-center">
                {(todos?.length ?? 0) > 10 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm text-muted-foreground text-center"
                    onClick={() => setShowAllTodos((prev) => !prev)}
                  >
                    {showAllTodos
                      ? "Show less"
                      : `+${(todos?.length ?? 0) - 10} more todos`}
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
