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
    _ = require('underscore'),
    Graph = require('./dijkstra/graph'),
    Q = require('q');

var askInput = function () {
    var orig, dest, rl,
        nrLine = 0,
        allowed = [],
        dfd = Q.defer();

    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', function(input) {
        if(nrLine === 0){
            orig = input;
        } else if (nrLine === 1) {
            dest = input;
        } else {
            allowed.push(input);
        }
        nrLine++;
    });

    process.stdin.on('end', function() {
        dfd.resolve([orig, dest, allowed]);
    });

    return dfd.promise;
};

var main = function (args) {
    var orig = args[0],
        dest = args[1],
        allowed = args[2],
        states = allowed.slice(0),
        map;

    states.push(orig, dest);

    map = _.chain(states)
        .map(function (state) {
            var reach = {},
                neighbors = _.without(states, state);

            _.each(neighbors, function (neighbor) {
                if (canTransition(state, neighbor)) {
                    reach[neighbor] = 1;
                }
            });

            return [state, reach];
        }).object().value();

    var graph = new Graph(map);
    var solution = graph.findShortestPath(orig, dest);

    console.log(solution.join('->'));

};

var canTransition = function (a, b) {
    var differences = 0;
    _.each(a, function (l, i) {
        if (l !== b[i]) {
            differences++;
        }
    });
    return differences <= 1;
};

askInput()
    .then(main)
    .done(function () {
        process.exit();
    });