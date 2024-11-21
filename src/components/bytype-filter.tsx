import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

type Props = {
  disabled: boolean;
};

function ByTypeFilter({ disabled }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button variant="outline">
          Sort by <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Name</DropdownMenuItem>
        <DropdownMenuItem>HP</DropdownMenuItem>
        <DropdownMenuItem>Attack</DropdownMenuItem>
        <DropdownMenuItem>Defense</DropdownMenuItem>
        <DropdownMenuItem>Speed</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ByTypeFilter;
