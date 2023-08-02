const axios = require('axios');

// Recursive function to build the evolution chain and variations
function buildEvolutionChain(chainData) {
  const name = chainData.species.name;
  const variations = [];

  if (chainData.evolves_to && chainData.evolves_to.length > 0) {
    for (const evolution of chainData.evolves_to) {
      variations.push(buildEvolutionChain(evolution));
    }
  }

  return {
    name,
    variations,
  };
}

module.exports = { buildEvolutionChain };
