import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { displayCurrentCityWeather, getCoordinates, getWeather } from './app.js';


const rl = readline.createInterface({ input, output });


let mainLoop = async () => {

        const city = await rl.question(`Enter a city name >> `);
        //console.log(`!!!<<<<<<${city}`)
        if (city.trim() === '' || city.trim() === undefined) {
                console.log(`\nYou've entered an invalid city name, please try again!\n`);
                mainLoop();
        } else {
                try {
                        const coordinates = await getCoordinates(city);
                        //console.log(coordinates[0]);
                        if (coordinates[0] === undefined) {
                                console.log('\nIt seems that the city name entered is not valid, please try again!\n');
                                mainLoop();
                        } else {
                                try {
                                        const weather = await getWeather(coordinates);
                                        displayCurrentCityWeather(weather);
                                        mainLoop();
                                } catch (error) {
                                        console.error(error);
                                }
                        }

                } catch (error) {
                        console.error(error);

                }
        }
}

mainLoop();



