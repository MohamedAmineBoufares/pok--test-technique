import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  handleChangeSearchBy: (name: "label" | "value", value: string) => void;

  searchBy: {
    label: string;
    value: string;
  };
};

function SearchByStat({ handleChangeSearchBy, searchBy }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="capitalize">
          Search by <p className="uppercase">{searchBy.label}</p>
          <Search className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {["hp", "attack", "defense", "speed"].map((stat) => (
          <DropdownMenuItem
            className={cn(
              "uppercase cursor-pointer",
              searchBy.label === stat && "bg-gray-100"
            )}
            key={stat}
            onClick={() => handleChangeSearchBy("label", stat)}
          >
            {stat}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SearchByStat;
