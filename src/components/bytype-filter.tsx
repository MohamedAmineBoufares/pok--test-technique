import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";
import type { Type } from "../types";
import { cn } from "@/lib/utils";

type Props = {
  data: Type[];
  currentValue: string;
  handleChangeFilter: (value: string) => void;
};

function ByTypeFilter({ data, handleChangeFilter, currentValue }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="capitalize">
          {currentValue || "Filter by"} <Filter className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {data.map(({ type }) => (
          <DropdownMenuItem
            className={cn(
              "capitalize cursor-pointer",
              currentValue === type.name && "bg-gray-100"
            )}
            key={type.id}
            onClick={() => handleChangeFilter(type.name)}
          >
            {type.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ByTypeFilter;
