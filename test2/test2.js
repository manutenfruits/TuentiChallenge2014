/**
 * Challenge 2
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
    var dfd = Q.defer();

    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', function(line) {
        dfd.resolve(line);
    });

    return dfd.promise;
};

var main = function (input) {
    var p = {
            x: 0,
            y: 0
        },
        map = [],
        success = true,
        dir = 1;
    /*
     * Direction: U R D L
     * Value:     0 1 2 3
     */

    var advance = function (){
        var i;

        switch(dir) {
            case 0: p.y--; break;
            case 1: p.x++; break;
            case 2: p.y++; break;
            case 3: p.x--; break;
        }

        //shifting
        if (p.x < 0) {
            for (i = 0; i < map.length; i++) {
                map[i].unshift(' ');
            }
            p.x = 0;
        }
        if (p.y < 0) {
            map.unshift([]);
            p.y = 0;
        }
        if (!map[p.y]) {
            map[p.y] = [];
        }
    };

    var turn = function (right) {
        if (right) { // (/)
            if ( dir % 2 === 0 ) { //Vertical
                dir = (dir + 1) % 4;
            } else { //Horizontal
                dir = (dir - 1 +4) % 4;
            }
        } else { // (\)
            if ( dir % 2 === 0 ) { //Vertical
                dir = (dir - 1 +4) % 4;
            } else { //Horizontal
                dir = (dir + 1) % 4;
            }
        }
    };

    var paint = function (track) {
        map[p.y][p.x] = track;
    };

    _.every(input, function (track) {
        advance();
        //Can follow last track
        switch (track) {
            //Start
            case '#':
                paint(track);
                break;
            //Horizontal
            case '-':
                if ( dir%2 === 0 ) { //Vertical
                    paint('|');
                } else { //Horizontal
                    paint('-');
                }
                break;
            case '/':
                paint(track);
                turn(true); break;
            //Curve
            case '\\':
                paint(track);
                turn(false); break;
            //Fail
            default:
                success = false;
                return false;
        }

        return true;
    });

    //Print this!
    var i, j, printed = [];
    for (i = 0; i < map.length; i++) {
        var v = map[i],
            h = [];
        for (j = 0; j < v.length; j++) {
            h[j] = v[j] || ' ';
        }
        printed.push(h.join(''));
    }

    console.log(printed.join('\n'));

};

askInput()
    .then(main)
    .done(function () {
        process.exit();
    });