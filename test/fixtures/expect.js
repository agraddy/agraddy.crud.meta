var mod = {};
var item = {};

mod.keys = ['colors', 'glue_colors_tags', 'hsl', 'hsv', 'rgb', 'tags', 'titles'];

mod.tables = {};

item = {};
item.linked = ['titles'];
item.unlinked = ['glue_colors_tags', 'hsl', 'hsv', 'rgb'];
mod.tables['colors'] = item;

item = {};
item.linked = ['colors', 'tags'];
item.unlinked = [];
mod.tables['glue_colors_tags'] = item;

item = {};
item.linked = ['colors'];
item.unlinked = [];
mod.tables['hsl'] = item;

item = {};
item.linked = ['colors'];
item.unlinked = [];
mod.tables['hsv'] = item;

item = {};
item.linked = ['colors', 'titles'];
item.unlinked = [];
mod.tables['rgb'] = item;

item = {};
item.linked = [];
item.unlinked = ['glue_colors_tags', 'titles'];
mod.tables['tags'] = item;

item = {};
item.linked = ['tags'];
item.unlinked = ['colors', 'rgb'];
mod.tables['titles'] = item;

module.exports = mod;
