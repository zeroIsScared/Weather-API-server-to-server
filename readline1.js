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
                let coordinates;
              try {
                coordinates= await getCoordinates(city);
              } catch (error) {
                 console.log(`!!!!11${error.message}!!!!`);
              }
                        //console.log(coordinates[0]);
                        if (coordinates[0] === undefined) {
                                console.log('\nIt seems that the city name entered is not valid, please try again!\n');
                                mainLoop();
                        } else {
                                let weather;
                                try {
                                        weather = await getWeather(coordinates);
                                       
                              } catch (error) {
                                console.log(`!!!!22${error.message}!!!!`);
                               }

                               displayCurrentCityWeather(weather);
                               mainLoop();
                       }              

               }
}

mainLoop();


