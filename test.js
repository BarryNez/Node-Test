const axios = require('axios');
const { expect } = require('chai');
const sinon = require('sinon');
const { buildEvolutionChain } = require('./evolutionChain');
const { getEvolutionChain } = require('./app');

describe('Pokémon Evolution Chain', function () {
  beforeEach(function () {
    sinon.stub(axios, 'get');
  });

  afterEach(function () {
    axios.get.restore();
  });

  it('should fetch and display the evolution chain for Caterpie', async function () {
    // Test data for Caterpie
    const pokemonData = {
      species: {
        url: 'https://pokeapi.co/api/v2/pokemon-species/10/',
      },
    };

    const speciesData = {
      evolution_chain: {
        url: 'https://pokeapi.co/api/v2/evolution-chain/10/',
      },
    };

    const evolutionChainData = {
      chain: {
        species: {
          name: 'caterpie',
        },
        evolves_to: [
          {
            species: {
              name: 'metapod',
            },
            evolves_to: [
              {
                species: {
                  name: 'butterfree',
                },
                evolves_to: [],
              },
            ],
          },
        ],
      },
    };

    axios.get.withArgs('https://pokeapi.co/api/v2/pokemon/caterpie').resolves({ data: pokemonData });
    axios.get.withArgs('https://pokeapi.co/api/v2/pokemon-species/10/').resolves({ data: speciesData });
    axios.get.withArgs('https://pokeapi.co/api/v2/evolution-chain/10/').resolves({ data: evolutionChainData });

    const expectedOutput = JSON.stringify({
      name: 'caterpie',
      variations: [
        {
          name: 'metapod',
          variations: [
            {
              name: 'butterfree',
              variations: [],
            },
          ],
        },
      ],
    });

    const evolutionChain = await getEvolutionChain('caterpie');
    expect(evolutionChain).to.equal(expectedOutput);
  });

  it('should fetch and display the evolution chain for Pikachu', async function () {
    // Test data for Pikachu
    const pokemonData = {
      species: {
        url: 'https://pokeapi.co/api/v2/pokemon-species/25/',
      },
    };

    const speciesData = {
      evolution_chain: {
        url: 'https://pokeapi.co/api/v2/evolution-chain/25/',
      },
    };

    const evolutionChainData = {
      chain: {
        species: {
          name: 'pikachu',
        },
        evolves_to: [
          {
            species: {
              name: 'raichu',
            },
            evolves_to: [],
          },
        ],
      },
    };

    axios.get.withArgs('https://pokeapi.co/api/v2/pokemon/pikachu').resolves({ data: pokemonData });
    axios.get.withArgs('https://pokeapi.co/api/v2/pokemon-species/25/').resolves({ data: speciesData });
    axios.get.withArgs('https://pokeapi.co/api/v2/evolution-chain/25/').resolves({ data: evolutionChainData });

    const expectedOutput = JSON.stringify({
      name: 'pikachu',
      variations: [
        {
          name: 'raichu',
          variations: [],
        },
      ],
    });

    const evolutionChain = await getEvolutionChain('pikachu');
    expect(evolutionChain).to.equal(expectedOutput);
  });

  it('should handle errors when fetching data', async function () {
    // Test error handling when fetching data
    axios.get.withArgs('https://pokeapi.co/api/v2/pokemon/unknown').rejects(new Error('Not found'));

    const evolutionChain = await getEvolutionChain('unknown');
    expect(evolutionChain).to.be.null;
  });

  it('should handle evolution chains without variations', async function () {
    // Test evolution chain without variations
    const pokemonData = {
      species: {
        url: 'https://pokeapi.co/api/v2/pokemon-species/4/',
      },
    };

    const speciesData = {
      evolution_chain: {
        url: 'https://pokeapi.co/api/v2/evolution-chain/4/',
      },
    };

    const evolutionChainData = {
      chain: {
        species: {
          name: 'charmander',
        },
        evolves_to: [],
      },
    };

    axios.get.withArgs('https://pokeapi.co/api/v2/pokemon/charmander').resolves({ data: pokemonData });
    axios.get.withArgs('https://pokeapi.co/api/v2/pokemon-species/4/').resolves({ data: speciesData });
    axios.get.withArgs('https://pokeapi.co/api/v2/evolution-chain/4/').resolves({ data: evolutionChainData });

    const expectedOutput = JSON.stringify({
      name: 'charmander',
      variations: [],
    });

    const evolutionChain = await getEvolutionChain('charmander');
    expect(evolutionChain).to.equal(expectedOutput);
  });
});
