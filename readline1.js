import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
//import { weatherDisplayed } from './app.js';
//import { displayCurrentCityWeather } from './app.js';

const rl = readline.createInterface({ input, output });

let weatherDisplayed;

export let cityName = async () => {
    if (weatherDisplayed === true) {
        await rl.question(`Enter a city name >> `);
        return weatherDisplayed = false;
    }
}

export { weatherDisplayed };

// rl.on('line', (cityName) => {
//     displayCurrentCityWeather();
// }); 