import { Heart, Shield, Swords, Zap } from "lucide-react";
import Stat from "./stat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Pokemon } from "@/types";
import { cn } from "@/lib/utils";
import Chip from "./ui/chip";

const IconMap = {
  hp: { Component: Heart, color: "text-red-500" },
  attack: { Component: Swords, color: "text-orange-500" },
  defense: { Component: Shield, color: "text-blue-500" },
  speed: { Component: Zap, color: "text-yellow-500" },
};

function PokemonCard({ name, stats, types }: Pokemon) {
  return (
    <Card className="w-80 hover:scale-105 duration-300 ease-in-out">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center capitalize">
          {name}
        </CardTitle>
      </CardHeader>
      <div className="flex gap-2 px-4">
        {types.slice(0, 2).map(({ type }) => (
          <Chip key={type.id} title={type.name} />
        ))}
      </div>
      <CardContent className="p-4">
        {/* <p className="text-center mb-2 font-semibold">{type}</p> */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map(({ state, value }) => {
            // @ts-expect-error: I don't need to display all the stats...
            const Icon = IconMap[state.name];

            if (!Icon) {
              return null;
            }

            return (
              <Stat
                key={state.name}
                icon={<Icon.Component className={(cn("size-5"), Icon.color)} />}
                name="HP"
                value={value}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default PokemonCard;
