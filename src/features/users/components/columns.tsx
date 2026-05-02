import { ColumnDef } from "@tanstack/react-table";
import { UserWithActivity } from "../types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const columns: ColumnDef<UserWithActivity>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Link
        href={`/users/${row.original.id}`}
        className="font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded"
      >
        {row.getValue("name")}
      </Link>
    ),
    size: 120,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.getValue("email")}</span>,
    size: 150,
  },
  {
    accessorKey: "website",
    header: "Website",
    cell: ({ row }) => (
      <a
        href={`https://${row.getValue("website")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
        onClick={(e) => e.stopPropagation()}
      >
        {row.getValue("website")}
      </a>
    ),
    size: 90,
  },
  {
    accessorKey: "totalPosts",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Posts
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge variant="secondary" className="py-2 px-6">
        {row.getValue("totalPosts")}
      </Badge>
    ),
    size: 70,
  },
  {
    accessorKey: "completedTodos",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Completed
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge className="bg-green-50 text-green-500 py-2 px-6 ">
        {row.getValue("completedTodos")}
      </Badge>
    ),
    size: 70,
  },
  {
    accessorKey: "pendingTodos",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Pending
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge className="bg-orange-50 text-orange-500 py-2 px-6">
        {row.getValue("pendingTodos")}
      </Badge>
    ),
    size: 70,
  },
];
