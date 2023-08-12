import http from 'http'
import data from "./config.json" assert {type: "json"}
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { cityName, weatherDisplayed } from './readline1.js';


const rl = readline.createInterface({ input, output });


//HW: read city name from console
//print to console temp min max, wind, ..
//make it interactive
// debug / prevent errors 
// Ask a question and wait for user input



const getCoordinates = (city) => {
    return new Promise((resolve) => {

        const callback = (res) => {
            //console.log(res);
            /// BIND EVENT HANDLERS
            let chunks = '';

            res.on('end', () => {
                const data = JSON.parse(chunks);
                console.log(`!!!${chunks}`);
                let { lon, lat } = data[0]

                console.log(`!!!${lat}`);
                console.log(`!!!${lon}`);
                resolve(data);

            })

            res.on('data', (chunk) => {
                chunks += chunk.toString();
                console.log('API response with data');
            })

            res.on('error', () => {
                console.log('API response with error');

            })
        }

        // //preparerequest 
        const req = http.request({
            host: data.HOST,
            path: data.PATH2 + `?q=${city}&appid=${data.KEY}`,
            method: 'GET',
            port: 80
        }, callback)

        req.end();
    });
}



const getWeather = () => {

    return new Promise(async (resolve) => {
        let data1 = await getCoordinates(cityName());
        const { lat, lon } = data1[0];
        console.log(lat, lon)

        const callback = (res) => {
            //console.log(res);
            /// BIND EVENT HANDLERS
            let chunks = '';

            res.on('end', () => {
                console.log('API response ended');
                console.log(JSON.parse(chunks))
                let { main: { temp_min, temp_max }, wind: { speed }, name } = JSON.parse(chunks);
                resolve({ temp_min, temp_max, speed, name });
            })

            res.on('data', (chunk) => {

                chunks += chunk.toString();
                console.log('API response with data');

            })

            res.on('error', () => {
                console.log('API response with error');

            })
        }

        // //preparerequest 
        const req = http.request({
            host: data.HOST,
            path: data.PATH1 + `?lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}&appid=${data.KEY}`,
            method: 'GET',
            port: 80
        }, callback)

        req.end();

    });
}

//export let weatherDisplayed;

const displayCurrentCityWeather = async () => {

    const weatherData = await getWeather();

    console.log(`The current weather in ${weatherData.name} F is:\n`);
    console.log(`>>> min temperature ${weatherData.temp_min} F\n`)
    console.log(`>>> max tempetrature ${weatherData.temp_max} F\n`)
    console.log(`>>> wind speed ${weatherData.speed} m\s\n`)
    weatherDisplayed = true;
    // cityName();
    //    return  weatherDataWasDisplayed = true;
    // if weatherDisopayed = true Function to get intput
}

rl.question(
    displayCurrentCityWeather()

);



//does this send the request?
//1) node request build in
//2) node -> npm
//3) OS related (linux)

//4) REQUEST LIFECYCLE

//  IO DATA STREAMS
//WHY
// 1. chunking
// 2. process while progressing


// Stream
// Readble, Writable, Duplex(Read & Write)

//Event binding (start, end, data, error, ...)



