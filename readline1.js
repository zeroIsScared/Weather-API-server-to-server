import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });


 export  const cityName = await rl.question(`Enter a city name >> `);

