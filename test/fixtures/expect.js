var mod = {};
var item = {};

mod.keys = ['colors', 'glue_colors_tags', 'hsl', 'hsv', 'rgb', 'tags', 'titles'];

mod.tables = {};

item = {};
item.linked = ['titles'];
item.unlinked = ['glue_colors_tags', 'hsl', 'hsv', 'rgb'];
item.columns = ['id', 'title_id', 'name', 'hex', 'deleted'];
item.defaults = [0, 0, '', '', 0];
mod.tables['colors'] = item;

item = {};
item.linked = ['colors', 'tags'];
item.unlinked = [];
item.columns = ['id', 'color_id', 'tag_id', 'deleted'];
item.defaults = [0, 0, 0, 0];
mod.tables['glue_colors_tags'] = item;

item = {};
item.linked = ['colors'];
item.unlinked = [];
item.columns = ['id', 'color_id', 'hue', 'saturation', 'lightness', 'deleted'];
item.defaults = [0, 0, 0, 0, 0, 0];
mod.tables['hsl'] = item;

item = {};
item.linked = ['colors'];
item.unlinked = [];
item.columns = ['id', 'color_id', 'hue', 'saturation', 'value', 'deleted'];
item.defaults = [0, 0, 0, 0, 0, 0];
mod.tables['hsv'] = item;

item = {};
item.linked = ['colors', 'titles'];
item.unlinked = [];
item.columns = ['id', 'color_id', 'title_id', 'red', 'green', 'blue', 'deleted'];
item.defaults = [0, 0, 0, 0, 0, 0, 0];
mod.tables['rgb'] = item;

item = {};
item.linked = [];
item.unlinked = ['glue_colors_tags', 'titles'];
item.columns = ['id', 'name', 'deleted'];
item.defaults = [0, '', 0];
mod.tables['tags'] = item;

item = {};
item.linked = ['tags'];
item.unlinked = ['colors', 'rgb'];
item.columns = ['id', 'tag_id', 'name', 'deleted'];
item.defaults = [0, 0, '', 0];
mod.tables['titles'] = item;

module.exports = mod;
