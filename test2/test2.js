/**
 * Challenge 2
 * Author: Manuel Díez Frutos
 * e-mail: manutenfruits@gmail.com
 */

 /**
  * Delivery notes: 
  */

var readline = require('readline'),
    fs = require('fs'),
    stream = require('stream'),
    _ = require('underscore'),
    Q = require('q');

var askInput = function () {
    var dfd = Q.defer();

    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', function(line) {
        dfd.resolve(line);
    });

    return dfd.promise;
};

var main = function (input) {
    var pos = [1, 1],
        map = [],
        success = true,
        vertBound = 0,
        dir = 1,
        lastTrack,
        followMap;
    /*
     * Direction: U R D L
     * Value:     0 1 2 3
     */

    var advance = function (){
        switch(dir) {
            case 0: pos[0]--; break;
            case 1: pos[1]++; break;
            case 2: pos[0]++; break;
            case 3: pos[1]--; break;
        }

        if (!map[pos[0]]) {
            map[pos[0]] = new Array()
        }
        if(pos[1] > vertBound){
            vertBound = pos[1];
        }
    };

    var turn = function (right) {
        if (right) { // (/)
            if ( dir%2 === 0 ) { //Vertical
                dir = (dir + 1) % 4;
            } else { //Horizontal
                dir = (dir - 1 +4) % 4;
            }
        } else { // (\)
            if ( dir%2 === 0 ) { //Vertical
                dir = (dir - 1 +4) % 4;
            } else { //Horizontal
                dir = (dir + 1) % 4;
            }
        }
    };

    _.every(input, function (track) {
        advance();
        //Can follow last track
        switch (track) {
            //Start
            case '#':
                map[pos[0]][pos[1]] = track;
                break;
            //Horizontal
            case '-':
                if ( dir%2 === 0 ) { //Vertical
                    map[pos[0]][pos[1]] = '|';
                } else { //Horizontal
                    map[pos[0]][pos[1]] = '-';
                }
                break;
            case '/':
                map[pos[0]][pos[1]] = track;
                turn(true); break;
            //Curve
            case '\\':
                map[pos[0]][pos[1]] = track;
                turn(false); break;
            //Fail
            default:
                success = false;
                return false;
        }

        return true;
    });

    //Print this!
    var printed = _.map(map, function (v) {
        var h = [],
            i;
        for(i = 0;i<v.length;i++){
            h[i] = v[i] || ' ';
        }
        return h.join('');
    }).join('\n');

    console.log(printed);

};

askInput()
    .then(main)
    .done(function () {
        process.exit();
    });