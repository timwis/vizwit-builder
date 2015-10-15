var $ = require('jquery')
var Backbone = require('backbone')
var Template = require('../templates/builder.html')
var serialize = require('form-serialize')
require('backbone.modal/backbone.modal')

module.exports = Backbone.Modal.extend({
	template: Template,
	submitEl: '[type="submit"]',
	cancelEl: '.cancel',
	serialize: function() {
		return serialize(this.$('form').get(0), {hash: true})
	},
	events: {
		'change #chartType': function(e) {
			if(e.currentTarget.value) {
				$('[data-chart-type]').hide()
				$('[data-chart-type="' + e.currentTarget.value + '"]').show()
			}
		}
	},
	submit: function() {
		this.trigger('submit', this.serialize())
	},
	onDestroy: function() {
		this.trigger('destroy')
	}
})