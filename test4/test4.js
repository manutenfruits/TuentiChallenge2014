/**
 * Challenge 4
 * Author: Manuel Díez Frutos
 * e-mail: manutenfruits@gmail.com
 */

 /**
  * Delivery notes: 
  */

var readline = require('readline'),
    _ = require('underscore'),
    Q = require('q');

var askInput = function () {
    var nrInputs, inputs, rl,
        nrLine = 0,
        dfd = Q.defer();

    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', function(input) {
        if(nrLine === 0){
            nrInputs = Number(input);
            inputs = new Array(nrInputs - 1);
        } else if (nrLine <= nrInputs) {
            inputs[nrLine - 1] = processInput(input);
        }
        if (nrLine++ >= nrInputs) {
            dfd.resolve(inputs);
        }
    });

    return dfd.promise;
};

var processInput = function (input){
    return input.split(' ');
};

var magic = function (a, b) {
    var result = Math.sqrt(a*a + b*b);
    return Number(result.toFixed(2));
};

var main = function (inputs) {
    _.each(inputs, function (pair){
        console.log(magic(pair[0], pair[1]));
    });
};

askInput()
    .then(main)
    .done(function () {
        process.exit();
    });