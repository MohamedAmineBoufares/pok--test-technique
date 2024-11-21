/*

{
    "__typename": "pokemon_v2_pokemon",
    "id": 1,
    "name": "bulbasaur",
    "weight": 69,
    "height": 7,
    "abilities": [
        {
            "__typename": "pokemon_v2_pokemonability",
            "ability": {
                "__typename": "pokemon_v2_ability",
                "name": "overgrow",
                "id": 65
            }
        },
        {
            "__typename": "pokemon_v2_pokemonability",
            "ability": {
                "__typename": "pokemon_v2_ability",
                "name": "chlorophyll",
                "id": 34
            }
        }
    ]

    states: [
    {
    "__typename": "pokemon_v2_pokemonstat",
    "value": 45,
    "state": {
        "__typename": "pokemon_v2_stat",
        "name": "hp"
    }
}]
}
 */

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

type Type = {
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
