import http from 'node:http'
import data from "./config.json" assert {type: "json"}

//HW: read city name from console
//print to console temp min max, wind, ..
//make it interactive
// debug / prevent errors 
// Ask a question and wait for user input



export const getCoordinates = (city) => {
    return new Promise((resolve, reject) => {

        const callback = (res) => {
            //console.log(res);
            /// BIND EVENT HANDLERS
            let chunks = [];

            res.on('data', chunk => chunks.push(chunk));

            res.on('error', error => reject(`Something went wrong ${error.message}, please check your network connection!1 `));

            res.on('end', () => {
                const buffer = Buffer.concat(chunks);
                const json_string = buffer.toString();
                const reqData = JSON.parse(json_string);

                resolve(reqData);               
            });
        }
        // //preparerequest        
        const req = http.request({
            host: data.HOST,
            path: `${data.PATH2}?q=${city}&appid=${data.KEY}`,
            method: 'GET',
            port: 80

        }, callback)

        req.end();
    });
}


export const getWeather = (data1) => {

    return new Promise( (resolve, reject) => {

        const { lat, lon } = data1[0];
        //console.log(lat, lon)

        const callback = (res) => {
            /// BIND EVENT HANDLERS
            let chunks = [];

            res.on('end', () => {
                console.log('API response ended');
                const buffer = Buffer.concat(chunks);
                const json_string = buffer.toString();
                const reqData = JSON.parse(json_string);
               
                resolve(reqData);                
            })

            res.on('data', chunk => chunks.push(chunk));

           res.on('error', error => reject(console.log(`Something went wrong ${error.message}, please check your network connection! 2`)));
        }

        // //preparerequest 
        const req = http.request({
            host: data.HOST,
            path: `${data.PATH1}?lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}&appid=${data.KEY}&units=metric`,
            method: 'GET',
            port: 80
        }, callback)

        req.end();

    });
}


export const displayCurrentCityWeather = (weatherData) => {

    const { main: { temp_min, temp_max }, wind: { speed }, name } = weatherData;

    console.log(`\nThe current weather in ${name} is:\n`);
    console.log(`>>> min temperature ${temp_min} C\n`);
    console.log(`>>> max tempetrature ${temp_max} C\n`);
    console.log(`>>> wind speed ${speed} m/s\n`);

}
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



