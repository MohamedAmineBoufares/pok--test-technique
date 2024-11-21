import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  sorting: {
    sortByName: string;
    sortByStat: {
      max: {
        base_stat: string;
      };
    };
  };

  handleChangeSorting: (data: object) => void;
};

function SortingButtons({
  handleChangeSorting,
  sorting: {
    sortByName,
    sortByStat: {
      max: { base_stat },
    },
  },
}: Props) {
  return (
    <div className="flex justify-end items-center gap-4">
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                handleChangeSorting({
                  sortByName: sortByName === "asc" ? "desc" : "asc",
                })
              }
            >
              {sortByName === "asc" ? (
                <ArrowUp className="size-5" />
              ) : (
                <ArrowDown className="size-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sorting by name</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                handleChangeSorting({
                  sortByStat: {
                    max: {
                      base_stat: base_stat === "asc" ? "desc" : "asc",
                    },
                  },
                })
              }
            >
              {base_stat === "asc" ? (
                <ArrowUp className="size-5" />
              ) : (
                <ArrowDown className="size-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sorting by stats</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default SortingButtons;
