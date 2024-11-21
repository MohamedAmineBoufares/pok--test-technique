import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "./queries";
import Spinner from "./components/ui/spinner";
import { Input } from "./components/ui/input";
import PokemonCard from "./components/pokemon-card";
import ByTypeFilter from "./components/bytype-filter";
import type { Data } from "@/types";
import { NoPokemon } from "./components/no-pokemon";
import { Button } from "./components/ui/button";
import { useEffect, useState } from "react";
import _ from "lodash";

function App() {
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const handleChangeSearch = _.debounce(
    (value: string) => setSearch(value),
    500
  );

  const { loading, data } = useQuery<Data>(GET_POKEMONS, {
    variables: { limit, pokeName: search },
  });

  useEffect(() => {
    if (limit > 10) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [limit, data]);

  const hasData = data && data.pokemons.length > 0;

  return (
    <div className="container mx-auto p-4 ">
      <div className="mb-6 space-y-4 mt-10">
        <Input
          type="text"
          placeholder="Search Pokemon..."
          onChange={(e) => handleChangeSearch(e.target.value)}
          className="w-full"
          disabled={!data}
        />

        <ByTypeFilter disabled={!hasData} />
      </div>

      {loading && (
        <div className="flex justify-center mt-16">
          <Spinner />
        </div>
      )}
      {data && data.pokemons.length === 0 && <NoPokemon />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {hasData &&
          data.pokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              className="flex justify-center md:justify-start"
            >
              <PokemonCard {...pokemon} />
            </div>
          ))}
      </div>

      {hasData && !search && (
        <div className="mt-5 flex justify-center">
          <Button
            disabled={loading}
            onClick={() => setLimit((prevState) => (prevState += 10))}
          >
            Load 10 more
            {loading && <Spinner />}
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
