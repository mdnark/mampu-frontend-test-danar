import { useQuery } from "@tanstack/react-query";
import { UserServices } from "../services/useServices";

export const userRepository = {
  hooks: {
    useUsers: () => {
      const user = useQuery({
        queryKey: ["users"],
        queryFn: UserServices.getUsers,
      });
      const post = useQuery({
        queryKey: ["posts"],
        queryFn: UserServices.getPosts,
      });
      const todo = useQuery({
        queryKey: ["todos"],
        queryFn: UserServices.getTodos,
      });

      const data = user?.data?.map((item) => ({
        ...item,
        totalPosts: post?.data?.filter((p) => p.userId === item.id).length ?? 0,
        completedTodos:
          todo?.data?.filter((t) => t.userId === item.id && t.completed)
            .length ?? 0,
        pendingTodos:
          todo?.data?.filter((t) => t.userId === item.id && !t.completed)
            .length ?? 0,
      }));

      return {
        data,
        isLoading: user.isLoading || post.isLoading || todo.isLoading,
        isError: user.isError || post.isError || todo.isError,
      };
    },
    useUsersDetail: (id: number) => {
      const user = useQuery({
        queryKey: ["users-detail"],
        queryFn: () => UserServices.getUsersByID(id),
        enabled: !!id || !isNaN(id),
        retry: false,
      });
      const post = useQuery({
        queryKey: ["posts-detail"],
        queryFn: () => UserServices.getPostsByID(id),
        enabled: !!id || !isNaN(id),
      });
      const todo = useQuery({
        queryKey: ["todos-detail"],
        queryFn: () => UserServices.getTodosByID(id),
        enabled: !!id || !isNaN(id),
      });

      return {
        users: user?.data,
        posts: post?.data,
        todos: todo?.data,
        isLoading: user.isLoading || post.isLoading || todo.isLoading,
        isError: user.isError,
      };
    },
  },
};
