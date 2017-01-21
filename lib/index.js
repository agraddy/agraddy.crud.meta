var db = require('agraddy.db.mysql');
var each = require('agraddy.async.each');
var events = require('events');
var path = require('path');
var pluralize = require('pluralize');
var series = require('agraddy.async.series');

var mod = new events.EventEmitter();

var tables = {};
var keys = [];

var loaded = false;

function main() {
	if(!loaded) {
		series([getTables, getLinked, getUnlinked], finished);
	}

	function getTables(cb) {
		db.query('SHOW TABLES', function(err, rows, fields) {
			var i;

			if(err || rows.length == 0) {
				cb(new Error('There were no tables in the database.'));
			} else {
				for(i = 0; i < rows.length; i++) {
					if(rows[i][fields[0].name] != '_migrations') {
						keys.push(rows[i][fields[0].name]);
						tables[keys[keys.length - 1]] = {};
						tables[keys[keys.length - 1]].linked = [];
						tables[keys[keys.length - 1]].unlinked = [];
					}
				}
			}

			cb();
		});
	}

	function getLinked(cb) {
		each(keys, function(item, index, cb2) {
			db.query('SHOW COLUMNS FROM ??', item, function(err, rows, fields) {
				var i;
				var index_of;
				var table;

				if(err) {
					cb(err);
				} else {
					for(i = 0; i < rows.length; i++) {
						index_of = rows[i].Field.indexOf('_id');
						if(index_of != -1 && index_of == rows[i].Field.length - 3) {
							table = pluralize(rows[i].Field.slice(0, -3));
							tables[item].linked.push(table);
						}
					}
					cb2();
				}

			});

		}, cb);
	}

	function getUnlinked(cb) {
		each(keys, function(item, index, cb2) {
			db.query('SHOW COLUMNS FROM ??', item, function(err, rows, fields) {
				var i;
				var index_of;
				var table;

				if(err) {
					cb(err);
				} else {
					for(i = 0; i < rows.length; i++) {
						index_of = rows[i].Field.indexOf('_id');
						if(index_of != -1 && index_of == rows[i].Field.length - 3) {
							table = pluralize(rows[i].Field.slice(0, -3));
							tables[table].unlinked.push(item);
						}
					}
					cb2();
				}

			});

		}, cb);
	}

	function finished(err) {
		loaded = true;
		mod.tables = tables;
		mod.keys = keys;
		mod.emit('loaded');
	}
}

main();

module.exports = mod;

