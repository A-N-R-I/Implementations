import { leastSquaresMethod } from "./CostEstimation.js";
import { highLowMethod } from "./CostEstimation.js";


// The variables are in the order independent and dependent respectively

let X = [ 1000, 800, 900, 950, 1300, 1100, 1000, 900, 800 ];
let Y = [ 3800, 3200, 3800, 3900, 4400, 4000, 4000, 3600, 3600];

let results1 = leastSquaresMethod(X, Y);
let results2 = highLowMethod(X, Y);


console.log('-------- LEAST SQUARES METHOD -----------\n');

console.log(results1.sums);
console.log(results1.costs);
console.log(`cost function: ${results1.costFunction}`);
console.log(`correlation:   ${results1.correlation}`);

console.log('\n\n-------- HIGH/LOW METHOD -----------\n')

console.log(`high: x: ${results2.highlow.high.x}\n      y: ${results2.highlow.high.y}`);
console.log(`low:  x: ${results2.highlow.low.x}\n      y: ${results2.highlow.low.y}`);
console.log(results2.costs);
console.log(`cost function: ${results2.costFunction}`);