'use strict'

// Simple two equations evaluation function
function twoEquations(a1, b1, c1, a2, b2, c2) {

    let result = {};

    // Solve for a and b by elimination
    result.a = ((c1 * b2) - (c2 * b1))/((a1 * b2) - (a2 * b1));
    result.b = ((c1 * a2) - (c2 * a1))/((b1 * a2) - (b2 * a1));

    return result;
}


// X and Y are arrays describing the different values of the independent and dependent variables respectively
export function leastSquaresMethod(X, Y) {

    console.assert(X.length == Y.length);
    
    // Will contain all the sumaations, the fixed cost (a) and variable cost per unit (b), and the cost function
    let results = {};

    let sums = {};

    sums.EX = aggregate(X);
    sums.EY = aggregate(Y);
    sums.EXSQR = sqrAggregate(X);
    sums.EYSQR = sqrAggregate(Y);
    sums.EXY = aggregate2(X, Y);
    sums.N = X.length;

    results.sums = sums;

    // going by the equations:
    //  na + bEX = EY
    //  aEX + bE(X*X) = EXY
    results.costs = twoEquations(sums.N, sums.EX, sums.EY, sums.EX, sums.EXSQR, sums.EXY);
    results.costFunction = `Y = ${results.costs.a} + ${results.costs.b}X`;
    results.correlation = correlation(sums.N, sums.EX, sums.EY, sums.EXSQR, sums.EYSQR, sums.EXY);

    return results;
}


// X and Y are arrays describing the different values of the independent and dependent variables respectively
export function highLowMethod(X, Y) {

    console.assert(X.length == Y.length);
    
    // Will contain all the sumaations, the fixed cost (a) and variable cost per unit (b), and the cost function
    let results = {};
    let costs = {};

    let maxmin = maxminIndex(X);

    costs.b = (Y[maxmin.maxI] - Y[maxmin.minI])/(X[maxmin.maxI] - X[maxmin.minI]);
    costs.a = Y[maxmin.maxI] - costs.b*X[maxmin.maxI];

    // The data for the high and low values of both variables
    results.highlow = {
        high: {
            x: X[maxmin.maxI],
            y: Y[maxmin.maxI]
        },
        low: {
            x: X[maxmin.minI],
            y: Y[maxmin.minI]
        }
    };

    results.costs = costs;
    results.costFunction = `Y = ${results.costs.a} + ${results.costs.b}X`;

    return results;
}

function correlation(N, EX, EY, EXSQR, EYSQR, EXY) {
    return (N*EXY - EX*EY)/((N*EXSQR - EX**2)**0.5 * (N*EYSQR - EY**2)**0.5);
}


function maxminIndex(array) {
    let maxmin = {maxI: 0, minI: 0};

    for (let i = 1; i < array.length; ++i) {
        maxmin.maxI = (array[maxmin.maxI] < array[i])? i : maxmin.maxI;
        maxmin.minI = (array[maxmin.minI] > array[i])? i : maxmin.minI;
    }

    return maxmin;
}


// Sum up all the items in the arrays

function aggregate(intArray) {
    return intArray.reduce((a, b) => a + b);
}

function sqrAggregate(intArray) {
    return intArray.reduce((a, b) => a + b**2, 0);
}

function aggregate2(intArrayX, intArrayY) {
    let sum = 0;

    for (let i = 0; i < intArrayX.length; ++i)
        sum += intArrayX[i] * intArrayY[i];
    
    return sum;
}