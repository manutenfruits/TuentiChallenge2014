#!/usr/bin/env node

if ((process.version.split('.')[1]|0) < 10) {
	console.log('Please, upgrade your node version to 0.10+');
	process.exit();
}

var net = require('net');
var util = require('util');
var crypto = require('crypto');

var options = {
	'port': 6969,
	'host': '54.83.207.90',
}

const KEYPHRASE = 'YOUR KEYPHRASE';

var dh, secret, state = 0;

var socket = net.connect(options, function() {
	socket.write('hello?');
	state++;
});

socket.on('data', function(data) {
	console.log(data.toString().trim());
	var sent, spoof;
	var splitted = data.toString().trim().split(':');
	var direction = splitted[0];
	if(splitted[1]){
		data = splitted[1].split('|');
	}

	if( direction === "SERVER->CLIENT" ){
		if (state == 1 && data[0] == 'hello!') {
			spoof = 'hello!';
			console.log("Spoofed: " + spoof);
			socket.write(direction+":"+spoof);
			//socket.write(spoof);
			state++;
		} else if (state == 2 && data[0] == 'key') {

		} else if (state == 3 && data[0] == 'result') {

		} else {
			console.log('Server Error');
			socket.end();
		}

	} else if( direction === "CLIENT->SERVER" ){
		if (state === 1 && data[0] === 'hello?') {
			spoof = 'my ass?';
			console.log("Spoofed: " + spoof);
			//socket.write(spoof);
		} else if (state == 2 && data[0] == 'key') {

		} else if (state == 3 && data[0] == 'result') {
			
		} else {
			console.log('Client Error');
			socket.end();
		}
	}
});
