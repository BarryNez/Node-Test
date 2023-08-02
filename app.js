const axios = require('axios');

// Function to fetch the evolution chain and variations for a given Pokémon
async function getEvolutionChain(pokemonName) {
  try {
    // Make a request to get the Pokemon data
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonData = response.data;

    // Extract the species URL from the Pokemon data
    const speciesURL = pokemonData.species.url;

    // Make a request to get the species data
    const speciesResponse = await axios.get(speciesURL);
    const speciesData = speciesResponse.data;

    // Extract the evolution chain URL from the species data
    const evolutionChainURL = speciesData.evolution_chain.url;

    // Make a request to get the evolution chain data
    const evolutionChainResponse = await axios.get(evolutionChainURL);
    const evolutionChainData = evolutionChainResponse.data;

    // Call the recursive function to traverse the evolution chain and build the output
    const evolutionChain = buildEvolutionChain(evolutionChainData.chain);

    // Return the result as a JSON string
    return JSON.stringify(evolutionChain);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
}

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

module.exports = { getEvolutionChain };




// const axios = require('axios');

// // Function to fetch the evolution chain and variations for a given Pokémon
// async function getEvolutionChain(pokemonName) {
//   try {
//     // Make a request to get the Pokemon data
//     const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
//     const pokemonData = response.data;

//     // Extract the species URL from the Pokemon data
//     const speciesURL = pokemonData.species.url;

//     // Make a request to get the species data
//     const speciesResponse = await axios.get(speciesURL);
//     const speciesData = speciesResponse.data;

//     // Extract the evolution chain URL from the species data
//     const evolutionChainURL = speciesData.evolution_chain.url;

//     // Make a request to get the evolution chain data
//     const evolutionChainResponse = await axios.get(evolutionChainURL);
//     const evolutionChainData = evolutionChainResponse.data;

//     // Call the recursive function to traverse the evolution chain and build the output
//     const evolutionChain = buildEvolutionChain(evolutionChainData.chain);

//     // Return the result as a JSON string
//     return JSON.stringify(evolutionChain);
//   } catch (error) {
//     console.error('Error fetching data:', error.message);
//     return null;
//   }
// }

// // Recursive function to build the evolution chain and variations
// function buildEvolutionChain(chainData) {
//   const name = chainData.species.name;
//   const variations = [];

//   if (chainData.evolves_to && chainData.evolves_to.length > 0) {
//     for (const evolution of chainData.evolves_to) {
//       variations.push(buildEvolutionChain(evolution));
//     }
//   }

//   return {
//     name,
//     variations,
//   };
// }
// module.exports = { getEvolutionChain };

// // Example usage:
// const pokemonName = 'caterpie';
// getEvolutionChain(pokemonName)
//   .then((evolutionChain) => {
//     console.log(evolutionChain);
//   })
//   .catch((error) => {
//     console.error('Error:', error.message);
//   });
