var $ = require('jquery')
var _ = require('underscore')
var Backbone = require('backbone')

var model = Backbone.Model.extend({
	idAttribute: 'filename'
})
	
module.exports = Backbone.Collection.extend({
	model: model,
	initialize: function(models, options) {
		options = options || {}
		this.id = options.id
	},
	url: function() {
		var url = 'https://api.github.com/gists'
		if(this.id) url += '/' + this.id
		return url
	},
	parse: function(response) {
		return _.values(response.files)
	}
})