import { http } from "@/lib/http";
import { Post, Todo, User } from "../types";

const url = {
  users: () => `/users`,
  posts: () => `/posts`,
  todos: () => `/todos`,
  userByID: (id: number) => `/users/${id}`,
  postsByID: (id: number) => `/posts?userId=${id}`,
  todosByID: (id: number) => `/todos?userId=${id}`,
};

export const UserServices = {
  getUsers: () => http.get<User[]>(url.users()),
  getPosts: () => http.get<Post[]>(url.posts()),
  getTodos: () => http.get<Todo[]>(url.todos()),
  getUsersByID: (id: number) => http.get<User>(url.userByID(id)),
  getPostsByID: (id: number) => http.get<Post[]>(url.postsByID(id)),
  getTodosByID: (id: number) => http.get<Todo[]>(url.todosByID(id)),
};
