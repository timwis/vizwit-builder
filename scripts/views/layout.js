var $ = global.jQuery = require('jquery')
var _ = global._ = require('lodash')
var Backbone = require('backbone')
var Template = require('../templates/widget.html')
require('jquery-ui-bundle')
require('gridstack/dist/gridstack')

var items = [
	{width: 12, height: 1, id: 'foo'},
	{width: 6, height: 1, id: 'bar'},
	{width: 6, height: 1}
]

module.exports = Backbone.View.extend({
	settings: {
		resizable: {
			handles: 'e, se, s, sw, w'
		}
	},
	template: Template,
	initialize: function(options) {
		this.vent = options.vent
		this.listenTo(this.vent, 'add', this.onAdd)
		this.listenTo(this.vent, 'export', this.onExport)
	},
	render: function() {
		// Initialize grid
		this.grid = this.$el.gridstack(this.settings).data('gridstack')
		
		// Add items
		items.forEach(function(item) {
			var markup = this.template({
				id: item.id,
				minHeight: 3,
				minWidth: 3
			})
			this.grid.add_widget(markup, item.x, item.y, item.width, item.height, true)
		}, this)
		
		return this
	},
	events: {
		'click [data-bind="remove"]': 'onClickRemove'
	},
	onClickRemove: function(e) {
		this.grid.remove_widget($(e.currentTarget).closest('.grid-stack-item'))
		e.preventDefault()
	},
	onAdd: function() {
		console.log('added')
		var markup = this.template({
			minHeight: 3,
			minWidth: 3
		})
		this.grid.add_widget(markup, null, null, 6, 1, true)
	},
	onExport: function() {
	var layout = _.map(this.$el.children('.grid-stack-item:visible'), function(el) {
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
	}
})