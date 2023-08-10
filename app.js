import http from 'http'

import  data from "./config.json" assert {type : "json"}

import {cityName}  from './readline1.js'






//HW: read city name from console
//print to console temp min max, wind, ..
//make it interactive
// debug / prevent errors 

const city = cityName;
console.log(`!!!${city}`);

const getCoordinates = () =>{
    return new Promise(()=>{
        const callback = (res) => {
            //console.log(res);
            /// BIND EVENT HANDLERS
            let chunks = '';
            res.on('end', ()=> {
                const data = JSON.parse(chunks);
                console.log(`!!!${chunks}`);
                let {lon, lat}=data[0]
                
                console.log(`!!!${lat }`);
                console.log(`!!!${lon }`);
               return data;
    
            })
        
            res.on('data', (chunk)=> {
                chunks += chunk.toString();
                console.log('API response with data');              
            })
        
            res.on('error', ()=> {
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
    })
} 

const getWeather =async (data) =>{
    return new Promise (()=>{
        const {lat, lon} = data[0];

    const callback = (res) => {
        //console.log(res);
        /// BIND EVENT HANDLERS
        res.on('end', ()=> {
            console.log('API response ended')
        })
    
        res.on('data', (chunk)=> {
            console.log('API response with data');
            
            const weatherData = JSON.parse(chunk.toString());
            console.log(`!${weatherData}` );
            return weatherData;
        })
    
        res.on('error', ()=> {
            console.log('API response with error');
            
        })

    }       
    // //preparerequest 
    const req = http.request({
        host: data.HOST,
        path: data.PATH1 + `?lat=4${lat}&lon=${lon}&appid=${data.KEY}`, 
        method: 'GET',
        port: 80
    }, callback)
    
    req.end();

    })
}
    




    
let cityCoordinates = await getCoordinates();
console.log(city);
let weatherData = await getWeather (cityCoordinates);

console.log(weatherData);


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



