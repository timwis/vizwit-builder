var $ = global.jQuery = require('jquery')
var _ = global._ = require('lodash')
require('jquery-ui-bundle')
require('gridstack/dist/gridstack')

var template = require('./widget.html')

var items = [
	{width: 12, height: 1, id: 'foo'},
	{width: 6, height: 1, id: 'bar'},
	{width: 6, height: 1}
]

var opts = {
	resizable: {
		handles: 'e, se, s, sw, w'
	}
}
var grid = $('.grid-stack').gridstack(opts).data('gridstack')
var gridItem = $(template)
_.each(items, function (node) {
	var el = gridItem.clone()
	el.attr('id', node.id)
	el.attr('data-gs-min-height', 3)
	el.attr('data-gs-min-width', 3)
	grid.add_widget(el, node.x, node.y, node.width, node.height, true)
})

$('[data-bind="add"]').on('click', function(e) {
	grid.add_widget(gridItem.clone(), null, null, 6, 1, true)
	e.preventDefault()
})

$('[data-bind="remove"]').on('click', function(e) {
	grid.remove_widget($(this).closest('.grid-stack-item'))
	e.preventDefault()
})

$('[data-bind="export"]').on('click', function(e) {
	var layout = _.map($('.grid-stack .grid-stack-item:visible'), function(el) {
		var $el = $(el)
		var node = $el.data('_gridstack_node')
		return {
			id: $el.attr('id'),
			x: node.x,
			y: node.y,
			width: node.width,
			height: node.height
		} 
	})
	console.log(layout)
	e.preventDefault()
})