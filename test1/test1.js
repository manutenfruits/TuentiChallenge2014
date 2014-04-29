/**
 * Challenge 1
 * Author: Manuel Díez Frutos
 * e-mail: manutenfruits@gmail.com
 */

 /**
  * Delivery notes: I just realized I didn't have to parse it, just compare the ends!
  */

var readline = require('readline'),
    fs = require('fs'),
    stream = require('stream'),
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

var processInput = function (input) {
    var splitted = input.split(',');
    return {
        gender: splitted[0],
        age: splitted[1],
        studies: splitted[2],
        academic_year: splitted[3]
    };
};

var processFile = function (input) {
    var splitted = input.split(',');
    return {
        name: splitted[0],
        gender: splitted[1],
        age: splitted[2],
        studies: splitted[3],
        academic_year: splitted[4]
    };
};

var readFile = function (fileName) {
    var rl,
        students = [],
        dfd = Q.defer();

    rl = readline.createInterface({
        input: fs.createReadStream(fileName),
        output: new stream
    });

    rl.on('line', function(line) {
        students.push(processFile(line));
    });

    rl.on('close', function() {
        dfd.resolve(students);
    });

    return dfd.promise;
};

var start = function () {
    console.log("Starting with " + nrInputs + " inputs:\n", inputs);
};

var main = function (result) {
    var students = result[0],
        input = result[1];

    _.each(input, function (std, idx) {
        var matches = _.filter(students, _.matches(std)),
            names = _.map(matches, _.property("name")),
            solution;
        if (!names.length) {
            solution = 'NONE';
        } else {
            solution = names.sort().join(',');
        }
        console.log("Case #" + (idx + 1) + ": " + solution);
    });
};

Q.all([
    readFile('students'),
    askInput()
])
.then(main)
.done(function () {
    process.exit();
});