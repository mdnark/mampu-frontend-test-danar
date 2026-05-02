"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "use-debounce";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  isError?: boolean;
  onSearchChange?: (value: string | null) => void;
  defaultSearch?: string | null;
  pageSize?: number;
}

type SearchableRow = {
  name?: string;
  email?: string;
};

const globalFilterFn: FilterFn<SearchableRow> = (row, _, filterValue) => {
  const search = String(filterValue).toLowerCase();

  const name = row.original.name?.toLowerCase() ?? "";
  const email = row.original.email?.toLowerCase() ?? "";

  return name.includes(search) || email.includes(search);
};

export function CustomTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  isError = false,
  defaultSearch,
  onSearchChange,
  pageSize = 5,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState(defaultSearch ?? null);
  const [debouncedFilter, setDebouncedFilter] = useDebounce(globalFilter, 500);

  const table = useReactTable<TData>({
    data,
    columns,
    filterFns: {
      globalFilterFn: globalFilterFn as unknown as FilterFn<TData>,
    },
    globalFilterFn: globalFilterFn as unknown as FilterFn<TData>,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter: debouncedFilter === "" ? null : debouncedFilter,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  const renderBody = () => {
    // Loading state
    if (isLoading) {
      return Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i}>
          {columns.map((_, j) => (
            <TableCell key={j}>
              <Skeleton className="h-4 w-full rounded-md" />
            </TableCell>
          ))}
        </TableRow>
      ));
    }

    // Error state
    if (isError) {
      return (
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className="h-24 text-center text-destructive"
          >
            Failed to load data. Please try again later.
          </TableCell>
        </TableRow>
      );
    }

    // Empty state
    if (!table.getRowModel().rows?.length) {
      return (
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className="h-24 text-center text-muted-foreground"
          >
            No results found.
          </TableCell>
        </TableRow>
      );
    }

    // Data
    return table.getRowModel().rows.map((row) => (
      <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search name, email ..."
          value={globalFilter ?? ""}
          onChange={(event) => {
            const value = event.target.value;
            setGlobalFilter(value);
            onSearchChange?.(value === "" ? null : value);
          }}
          className="max-w-sm"
        />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table style={{ tableLayout: "fixed" }}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>{renderBody()}</TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <p className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()} ({table.getFilteredRowModel().rows.length}{" "}
          data)
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage() || isLoading || isError}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage() || isLoading || isError}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
