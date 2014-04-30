/**
 * Challenge 4
 * Author: Manuel Díez Frutos
 * e-mail: manutenfruits@gmail.com
 */

 /**
  * Delivery notes: dijkstra algorithm courtesy of 
  * https://github.com/andrewhayward/dijkstra
  */

var readline = require('readline'),
//    _ = require('underscore'),
    Q = require('q');

var askInput = function () {
    var rl,
        nrLine = 0,
        map = [],
        dfd = Q.defer();

    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', function(input) {
        map.push(input.split(''));
        if(nrLine++ <= 8){
            dfd.resolve(map);
        }
    });

    return dfd.promise;
};

var nextGen = function (map) {
    var x, y;

    for (y = 0; y < 8; y++) {
        for (x = 0; x < 8; x++) {
            //Do something
        }
    }

};

var aliveNeighbors = function (map, x, y) {
    var a, b,
        count = 0,
        xMax = x >= 7 ? 7 : x + 1,
        xMin = x <= 0 ? 0 : x - 1,
        yMax = y >= 7 ? 7 : y + 1,
        yMin = y <= 0 ? 0 : y - 1;

    for (a = yMin; a <= yMax; a++) {
        for (b = xMin; b <= xMax; b++) {
            if (a !== y && b !== x && map[a][b] === 'X') {
                count++;
            }
        }
    }

    return count;
};

var main = function (map) {
    console.log(map);
    nextGen(map);
};

askInput()
    .then(main)
    .done(function () {
        process.exit();
    });