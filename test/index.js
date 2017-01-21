process.chdir('test');
var tap = require('agraddy.test.tap')(__filename);

var mod = require('../');

start();

function start() {
	mod.on('loaded', function() {
		var expected = require('./fixtures/expect.js');
		tap.assert.deepEqual(mod.tables, expected.tables, 'Should match expect.js.');
		tap.assert.deepEqual(mod.keys, expected.keys, 'Keys should contain each table except for _migrations.');
		alreadyLoaded();
	});
}

function alreadyLoaded() {
	var expected = require('./fixtures/expect.js');
	tap.assert.deepEqual(mod.tables, expected.tables, 'Should match expect.js.');
	tap.assert.deepEqual(mod.keys, expected.keys, 'Keys should contain each table except for _migrations.');
	end();
}

function end() {
	process.exit();
}




