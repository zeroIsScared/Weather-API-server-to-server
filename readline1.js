import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { displayCurrentCityWeather, getCoordinates, getWeather } from './app.js';


const rl = readline.createInterface({ input, output });


let mainLoop = async () => {

        const city = await rl.question(`Enter a city name >> `);
        //console.log(`!!!<<<<<<${city}`)
        const coordinates = await getCoordinates(city);
        console.log(coordinates)
        const weather = await getWeather(coordinates);
        displayCurrentCityWeather(weather);
        mainLoop();

}

mainLoop();



