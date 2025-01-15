/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page

    function addGamesToPage(games) {
        for (let game of games) {
            // Create a new div element
            const gameCard = document.createElement("div");
    
            // Add the class 'game-card' to the div
            gameCard.classList.add("game-card");
    
            // Set the inner HTML using a template literal
            gameCard.innerHTML = `
                <img src="${game.img}" alt="${game.name}" class="game-img" />
                <h3>${game.name}</h3>
                <p>${game.description}</p>
            `;
    
            // Append the game card to the games container
            gamesContainer.appendChild(gameCard);
        }
    }

    addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with comma
contributionsCard.innerHTML = `${totalContributions}`;



// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// Calculate total amount raised using reduce
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * Skills used: functions, filter
*/

// Step 1: Show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    console.log(unfundedGames.length); // Log the number of unfunded games
    addGamesToPage(unfundedGames);
}

// Step 2: Show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    console.log(fundedGames.length); // Log the number of funded games
    addGamesToPage(fundedGames);
}

// Step 3: Show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

// Step 4: Select each button and add event listeners
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/
// Calculate the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// Calculate the total amount of money raised
const totalRaisedAmount = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// Use a template string with a ternary operator to create the display message
const displayMessage = `
    A total of $${totalRaisedAmount.toLocaleString()} has been raised for ${GAMES_JSON.length} games.
    Currently, ${unfundedGamesCount} ${unfundedGamesCount === 1 ? "game remains" : "games remain"} unfunded.
    We need your help to fund these amazing games!
`;

// Grab the description container and add the message to it
const descriptionContainer = document.getElementById("description-container");
const messageElement = document.createElement("p");
messageElement.innerHTML = displayMessage;
descriptionContainer.appendChild(messageElement);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */
// Step 1: Sort the games by the pledged amount
const sortedGames = GAMES_JSON.sort((a, b) => b.pledged - a.pledged);

// Step 2: Use destructuring to grab the top two games
const [topGame, secondGame] = sortedGames;

// Step 3: Display the top two games on the page
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const topGameElement = document.createElement("p");
topGameElement.innerHTML = topGame.name;
firstGameContainer.appendChild(topGameElement);

const secondGameElement = document.createElement("p");
secondGameElement.innerHTML = secondGame.name;
secondGameContainer.appendChild(secondGameElement);
console.log(topGame.name);
console.log(secondGame.name);
