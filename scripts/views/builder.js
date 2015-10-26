var $ = require('jquery')
var Backbone = require('backbone')
var Template = require('../templates/builder.html')
var serialize = require('form-serialize')

module.exports = Backbone.View.extend({
	template: Template,
	className: 'builder',
	serialize: function() {
		return serialize(this.$('form').get(0), {hash: true})
	},
	events: {
		'change #chartType': function(e) {
			if(e.currentTarget.value) {
				$('[data-chart-type]').hide()
				$('[data-chart-type="' + e.currentTarget.value + '"]').show()
			}
		},
		'change form': function(e) {
			this.trigger('submit', this.serialize())
		},
		'click .cancel': function(e) {
			this.destroy()
			e.preventDefault()
		},
		'hidden.bs.offcanvas': function(e) {
			this.trigger('destroy')
		}
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()))
		return this
	}
})