type State = {
  value: number;
  state: {
    name: string;
  };
};

type Ability = {
  ability: {
    id: number;
    name: string;
  };
};

export type Type = {
  type: {
    id: number;
    name: string;
  };
};

export type Pokemon = {
  id: number;
  name: string;
  weight: number;
  height: number;
  abilities: Ability[];
  stats: State[];
  types: Type[];
};

export type Data = {
  pokemons: Pokemon[];
  pokemonTypes: Type[];
};
