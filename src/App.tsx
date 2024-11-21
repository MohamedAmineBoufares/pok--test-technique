import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "./queries";
import Spinner from "./components/ui/spinner";
import { Input } from "./components/ui/input";
import PokemonCard from "./components/pokemon-card";
import ByTypeFilter from "./components/bytype-filter";
import type { Data } from "@/types";
import { NoPokemon } from "./components/no-pokemon";
import { Button } from "./components/ui/button";
import { useEffect } from "react";
import SortingButtons from "./components/sorting-buttons";
import SearchByStat from "./components/search-bystat";
import { RotateCcw } from "lucide-react";
import useFilterHandlers from "./hooks/useFilterHandlers";

function App() {
  const { handlers, states } = useFilterHandlers();

  const {
    handleChangeFilter,
    handleChangeSearch,
    handleChangeSearchBy,
    handleChangeSearchByValue,
    handleChangeSorting,
    handleResetFilters,
    handleIncLimit,
  } = handlers;

  const { filter, inputKey, limit, search, searchBy, sorting } = states;

  const { loading, data } = useQuery<Data>(GET_POKEMONS, {
    variables: {
      limit,
      pokeName: search,
      pokemonType: filter,
      sortByName: sorting.sortByName,
      sortByStat: sorting.sortByStat,
      statName: searchBy.label,
      stat: +searchBy.value,
    },
  });

  // whenever the data changes and the limit is > 10 (different then the initial state)
  // => jump to the bottom of the page => better UX
  useEffect(() => {
    if (limit > 10) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [limit, data]);

  const hasData = data && data.pokemons.length > 0;

  return (
    <div className="container mx-auto p-4 ">
      <div className="mb-6 space-y-4 mt-10">
        <div className="flex justify-end">
          <Button
            variant="destructive"
            onClick={handleResetFilters}
            disabled={loading}
          >
            Reset filters <RotateCcw />
          </Button>
        </div>
        <Input
          key={inputKey}
          type="search"
          placeholder="Search Pokemon by name..."
          onChange={(e) => handleChangeSearch(e.target.value)}
          className="w-full"
          disabled={!data}
        />

        {data && (
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between">
            <div className="gap-4 flex flex-wrap">
              <ByTypeFilter
                data={data?.pokemonTypes}
                handleChangeFilter={handleChangeFilter}
                currentValue={filter}
              />

              <SearchByStat
                searchBy={searchBy}
                handleChangeSearchBy={handleChangeSearchBy}
              />

              {searchBy.label && (
                <div className="flex flex-col">
                  <Input
                    type="number"
                    placeholder={`Search Pokemon by ${searchBy.label}...`}
                    onChange={(e) => handleChangeSearchByValue(e.target.value)}
                    className="w-full flex-1"
                  />
                  <small className="text-gray-500 text-xs mt-1">
                    Search for Pokémon with a value greater than...
                  </small>
                </div>
              )}
            </div>

            <SortingButtons
              handleChangeSorting={handleChangeSorting}
              sorting={sorting}
            />
          </div>
        )}
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
          <Button disabled={loading} onClick={handleIncLimit}>
            Load 10 more
            {loading && <Spinner />}
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
