"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { CustomFilters, FilterType } from "@/shared/components/CustomFilters";
import { userRepository } from "../hooks/useUsers";
import { UserWithActivity } from "../types";
import { columns } from "./columns";
import { CustomTable } from "@/shared/components/CustomTable";

export const UsersPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filter, setFilter] = useState<FilterType>(
    (searchParams.get("filter") as FilterType) ?? null,
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
    updateParams("search", value);
  };

  const handleFilter = (value: FilterType) => {
    setFilter(value);
    updateParams("filter", value);
  };

  const datas = useMemo(() => {
    if (!data) return [];

    let result: UserWithActivity[] = [...data];

    if (filter === "has-pending") {
      result = result.filter((u) => u.pendingTodos > 0);
    } else if (filter === "no-completed") {
      result = result.filter((u) => u.completedTodos === 0);
    }

    return result;
  }, [data, filter]);

  return (
    <div className="container mx-auto flex flex-col items-center py-8 px-40">
      <div className="flex flex-row justify-between items-center mb-6 gap-6 w-full">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground mt-1">Monitor user activity</p>
        </div>
        <div>
          <CustomFilters filter={filter} onFilterChange={handleFilter} />
        </div>
      </div>
      <div className="hidden sm:flex">
        <CustomTable
          columns={columns}
          data={datas}
          isError={isError}
          isLoading={isLoading}
          onSearchChange={handleSearch}
          defaultSearch={searchParams.get("search") ?? null}
          pageSize={5}
        />
      </div>
    </div>
  );
};
