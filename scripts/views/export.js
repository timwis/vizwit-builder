var $ = require('jquery')
var Backbone = require('backbone')
var Template = require('../templates/export.html')
var hljs = require('highlight.js')
var Clipboard = require('clipboard')
require('backbone.modal/backbone.modal')

module.exports = Backbone.Modal.extend({
	template: Template,
	cancelEl: '.cancel',
	initialize: function() {
		this.config = {
			version: '2',
			header: {
				title: 'VizWit',
				description: 'Lorem ipsum dolor sit amet'
			},
			cards: this.model.get('layout')
		}
		this.model.set('json', JSON.stringify(this.config, null, 2))
	},
	onShow: function() {
		hljs.highlightBlock(this.$('code').get(0))
		new Clipboard('.copy')
	}
})