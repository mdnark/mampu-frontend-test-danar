"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { CustomFilters, FilterType } from "@/shared/components/CustomFilters";
import { userRepository } from "../hooks/useUsers";
import { UserWithActivity } from "../types";
import { CustomTable } from "@/shared/components/CustomTable";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import UsersCard from "./UsersCard";
import { UsersColumns } from "./UsersColumns";

export const UsersPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filter, setFilter] = useState<FilterType>(
    (searchParams.get("filter") as FilterType) ?? null,
  );
  const [search, setSearch] = useState<string | null>(
    searchParams.get("search") ?? null,
  );

  const { data, isError, isLoading } = userRepository.hooks.useUsers();

  const updateParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (value === null || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.replace(`/users?${params.toString()}`);
  };

  const handleSearch = (value: string | null) => {
    setSearch(value);
    updateParams("search", value);
  };

  const handleFilter = (value: FilterType) => {
    setFilter(value);
    updateParams("filter", value);
  };

  const datas = useMemo(() => {
    if (!data) return [];

    let result: UserWithActivity[] = [...data];

    if (search) {
      result = result.filter(
        (f) =>
          f.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
          f.email.toLowerCase().includes(search.toLocaleLowerCase()),
      );
    }

    if (filter === "has-pending") {
      result = result.filter((u) => u.pendingTodos > 0);
    } else if (filter === "no-completed") {
      result = result.filter((u) => u.completedTodos === 0);
    }

    return result;
  }, [data, filter, search]);

  return (
    <div className="container mx-auto flex flex-col py-8 px-6 xl:px-32 2xl:px-40">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-6 w-full">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground mt-1">Monitor user activity</p>
        </div>
        <div>
          <CustomFilters filter={filter} onFilterChange={handleFilter} />
        </div>
      </div>

      <div className="hidden w-full sm:flex">
        <CustomTable
          columns={UsersColumns}
          data={datas}
          isError={isError}
          isLoading={isLoading}
          onSearchChange={handleSearch}
          defaultSearch={searchParams.get("search") ?? null}
          pageSize={5}
        />
      </div>

      <div className="flex flex-col w-full gap-4 sm:hidden">
        <Input
          placeholder="Search name, email..."
          value={search ?? ""}
          onChange={(e) => handleSearch(e.target.value)}
          disabled={isLoading || isError}
        />

        {isError ? (
          <div className="text-center py-8">
            <p className="text-destructive font-medium">Failed to load users</p>
            <p className="text-muted-foreground text-sm mt-1">
              Please try again later
            </p>
          </div>
        ) : isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-35 w-full rounded-lg" />
            ))}
          </div>
        ) : datas.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No users found
          </div>
        ) : (
          datas.map((user) => <UsersCard key={user.id} user={user} />)
        )}
      </div>
    </div>
  );
};
