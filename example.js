const { getEvolutionChain } = require('./app');

// Example usage: Fetch the evolution chain for Pikachu
const pokemonName = 'charmander';

// Call the getEvolutionChain function with the Pokémon name
getEvolutionChain(pokemonName)
  .then((evolutionChain) => {
    if (evolutionChain) {
      console.log(`Evolution Chain for ${pokemonName}:\n`, evolutionChain);
    } else {
      console.log(`Unable to fetch the evolution chain for ${pokemonName}.`);
    }
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
