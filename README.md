# Pokémon Evolution Chain - Getting Started

This is a simple Node.js application that helps users find the evolution chain and variations of Pokémon using the Poke API. The application fetches data from the API and provides the evolution details in JSON format.

## Requirements

- Node.js (https://nodejs.org)

## Installation

1. Download or clone the repository to your local machine.

2. Open a terminal or command prompt and navigate to the project directory.

3. Install the project dependencies using npm (Node Package Manager) by running the following command:

npm install

## Usage

After installing the dependencies, you can run the application to find the evolution chain for a Pokémon.

In the example.js replace the value of the pokemonName const with the name of the pokemon yow wish to fetch the Evolution chain for. It is currently set as follows:- 

const pokemonName = 'charmander';


### Fetch Evolution Chain for a Pokemon

To fetch the evolution chain for a Pokemon, open the `example.js` file:

1. Open the `example.js` file.

2. Run the `example.js` file using the following command:

node example.js 

The output will be displayed in JSON format, showing the evolution chain and its variations.

## Running Tests

The application includes unit tests to ensure its correctness. To run the tests, use the following command:

npm test

Make sure you have already installed the project dependencies using `npm install` before running the tests.



## Note

- This application uses the Poke API to fetch Pokémon data. If you encounter any issues while running the application, please ensure that you have a stable internet connection.

- If you encounter any errors or have any questions, feel free to reach out to the developer or check the project repository for possible updates and bug fixes.

## Contributing

Contributions are welcome! If you have any suggestions, bug fixes, or improvements, feel free to create a pull request on the project repository.

## License

This project is licensed under the MIT License. You can find the license information in the LICENSE file.
