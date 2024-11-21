import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query samplePokeAPIquery(
    $limit: Int!
    $pokeName: String = ""
    $stat: Int = 0
    $statName: String = ""
    $pokemonType: String = ""
    $sortByName: order_by = asc
    $sortByStat: pokemon_v2_pokemonstat_aggregate_order_by = {
      max: { base_stat: desc }
    }
  ) {
    pokemons: pokemon_v2_pokemon(
      limit: $limit
      offset: 0
      order_by: {
        name: $sortByName
        pokemon_v2_pokemonstats_aggregate: $sortByStat
      }
      where: {
        pokemon_v2_pokemonstats: {
          base_stat: { _gte: $stat }
          pokemon_v2_stat: { name: { _regex: $statName } }
        }
        name: { _regex: $pokeName }
        pokemon_v2_pokemontypes: {
          pokemon_v2_type: { name: { _regex: $pokemonType } }
        }
      }
    ) {
      id
      name
      weight
      height
      abilities: pokemon_v2_pokemonabilities {
        ability: pokemon_v2_ability {
          name
          id
        }
      }
      stats: pokemon_v2_pokemonstats {
        value: base_stat
        state: pokemon_v2_stat {
          name
        }
      }
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          id
          name
        }
      }
    }

    pokemonTypes: pokemon_v2_pokemonformtype(limit: 10) {
      type: pokemon_v2_type {
        name
        id
      }
    }
  }
`;
