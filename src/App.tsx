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
import SortingButtons from "./components/sorting-buttons";
import SearchByStat from "./components/search-bystat";
import { RotateCcw } from "lucide-react";

function App() {
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState({
    label: "",
    value: "",
  });
  const [filter, setFilter] = useState("");
  const [sorting, setSorting] = useState({
    sortByName: "asc",
    sortByStat: {
      max: { base_stat: "desc" },
    },
  });

  /* 
    this is used as a hack to reset the input value when clicking the reset button
    if the key changes => input will rerender => resting his own value
    I didn't opt for a value={search} approach, since I'm debouncing the search => the input will lag
    => UNCONTROLLED INPUT
    */
  const [inputKey, setInputKey] = useState(1);

  const handleChangeFilter = (value: string) => {
    setFilter((prevState) => (prevState === value ? "" : value));
  };

  const handleChangeSorting = (data: object) => {
    setSorting((prevState) => ({ ...prevState, ...data }));
  };

  const handleChangeSearchBy = (name: "label" | "value", value: string) => {
    if (name === "label") {
      setSearchBy((prevState) =>
        searchBy.label === value
          ? { label: "", value: "" }
          : {
              ...prevState,
              label: value,
            }
      );
    }
  };

  const handleChangeSearchByValue = _.debounce(
    (value: string) => setSearchBy((prevState) => ({ ...prevState, value })),
    500
  );

  const handleResetFilters = () => {
    setInputKey((prevState) => (prevState += 1));
    setLimit(() => 10);
    setSearch(() => "");
    setSearchBy(() => ({
      label: "",
      value: "",
    }));
    setFilter(() => "");
    setSorting(() => ({
      sortByName: "asc",
      sortByStat: {
        max: { base_stat: "desc" },
      },
    }));
  };

  const handleChangeSearch = _.debounce(
    (value: string) => setSearch(value),
    500
  );

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
