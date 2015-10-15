var Backbone = require('backbone')

module.exports = Backbone.View.extend({
	initialize: function(options) {
		this.vent = options.vent
	},
	events: {
		'click [data-bind="add"]': function(e) {
			this.vent.trigger('add', e)
			e.preventDefault()
		},
		'click [data-bind="export"]': function(e) {
			this.vent.trigger('export', e)
			e.preventDefault()
		}
	}
})