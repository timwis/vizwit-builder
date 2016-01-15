var $ = global.jQuery = require('jquery')
var _ = global._ = require('lodash')
var Backbone = require('backbone')
var deparam = require('node-jquery-deparam')

var HeaderView = require('./views/header')
var BuilderView = require('./views/builder')
var LayoutView = require('./views/layout')
var Gist = require('./collections/gist')

var params = window.location.search.substr(1) ? deparam(window.location.search.substr(1)) : {};

var vent = _.clone(Backbone.Events)
var headerView = new HeaderView({el: '#page-header', vent: vent})
var layoutView = new LayoutView({el: '#layout', vent: vent})

if(params.gist) {
	console.log('gist specified')
	;(new Gist(null, {id: params.gist})).fetch({
		success: function(collection, response, options) {
			if( ! collection.length) return console.error('No files in gist', params.gist)
			
			// If a file was provided, use that one; otherwise use the first file in the gist
			var model = params.file && collection.get(params.file) ? collection.get(params.file) : collection.at(0)
			var config = JSON.parse(model.get('content'))
			
			if( ! config.version || config.version !== '2') return
			
			// Otherwise, we're good
			layoutView.items = config.cards
			layoutView.render()
		}
	})
} else {
	layoutView.render()
}