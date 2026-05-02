import { Button } from "@/components/ui/button";

export type FilterType = "all" | "has-pending" | "no-completed";

interface Props {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}
export const CustomFilters = ({ filter, onFilterChange }: Props) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <Button
        size={"sm"}
        onClick={() => onFilterChange("all")}
        variant={filter === "all" ? "default" : "outline"}
      >
        All Users
      </Button>
      <Button
        size={"sm"}
        onClick={() => onFilterChange("has-pending")}
        variant={filter === "has-pending" ? "default" : "outline"}
      >
        Has Pending Todos
      </Button>
      <Button
        size={"sm"}
        onClick={() => onFilterChange("no-completed")}
        variant={filter === "no-completed" ? "default" : "outline"}
      >
        No Completed Todos
      </Button>
    </div>
  );
};
