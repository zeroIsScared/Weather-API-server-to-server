import http from 'http'
import data from "./config.json" assert {type: "json"}

//HW: read city name from console
//print to console temp min max, wind, ..
//make it interactive
// debug / prevent errors 
// Ask a question and wait for user input



 export const getCoordinates = (city) => {
    return new Promise((resolve) => {
console.log(`+++${city}`);
        const callback = (res) => {
            //console.log(res);
            /// BIND EVENT HANDLERS
            let chunks = '';

            res.on('end', () => {
                const data1 = JSON.parse(chunks);
                
                //let { lon, lat } = data1[0]

              //  console.log(`!!!${lat}`);
               // console.log(`!!!${lon}`);
                resolve(data1);

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
        // const city = cb();
        const req = http.request({
            host: data.HOST,
            path: `${data.PATH2}?q=${city}&appid=${data.KEY}`,
            method: 'GET',
            port: 80
            
        }, callback)
        //console.log(`!!!${data.PATH2}?q=${city}&appid=${data.KEY}`);
        req.end();
    });
}



export  const getWeather = (data1) => {

    return new Promise(async (resolve) => {
       //let data2 = await data1();
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
            path: `${data.PATH1}?lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}&appid=${data.KEY}`,
            method: 'GET',
            port: 80
        }, callback)

        req.end();

    });
}


export const displayCurrentCityWeather =  (weatherData) => {   

    console.log(`\nThe current weather in ${weatherData.name} is:\n`);
    console.log(`>>> min temperature ${weatherData.temp_min} F\n`);
    console.log(`>>> max tempetrature ${weatherData.temp_max} F\n`);
    console.log(`>>> wind speed ${weatherData.speed} m/s\n`);
    
}

//displayCurrentCityWeather();



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



