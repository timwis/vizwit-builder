var $ = require('jquery')
var Backbone = require('backbone')
var Template = require('../templates/export.html')
var hljs = require('highlight.js')
var Clipboard = require('clipboard')
require('backbone.modal/backbone.modal')

module.exports = Backbone.Modal.extend({
	template: Template,
	cancelEl: '.cancel',
	onShow: function() {
		hljs.highlightBlock(this.$('code').get(0))
		new Clipboard('.copy')
	}
})