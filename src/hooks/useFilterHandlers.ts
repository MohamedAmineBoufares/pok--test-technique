import { useState } from "react";
import _ from "lodash";

/**
 * This is a custom hook, that exposes input handlers to avoid bloating the component
 * @returns {object} handlers and states
 */
function useFilterHandlers() {
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

  const handleChangeSearch = _.debounce(
    (value: string) => setSearch(value),
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

  const handleIncLimit = () => {
    setLimit((prevState) => (prevState += 10));
  };

  const handlers = {
    handleChangeFilter,
    handleChangeSorting,
    handleChangeSearchBy,
    handleResetFilters,
    handleChangeSearch,
    handleChangeSearchByValue,
    handleIncLimit,
  };

  const states = {
    limit,
    search,
    filter,
    inputKey,
    sorting,
    searchBy,
  };

  return { handlers, states };
}

export default useFilterHandlers;
