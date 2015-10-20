var $ = global.jQuery = require('jquery')
var _ = global._ = require('lodash')
var Backbone = require('backbone')
var Template = require('../templates/widget.html')
var BuilderView = require('./builder')
var ExportView = require('./export')
require('jquery-ui-bundle')
require('gridstack/dist/gridstack')

var items = [
	{width: 12, height: 1}
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
		this.listenTo(this.vent, 'add', this.addCard)
		this.listenTo(this.vent, 'export', this.exportCards)
	},
	render: function() {
		// Initialize grid
		this.grid = this.$el.gridstack(this.settings).data('gridstack')
		
		// Add items
		items.forEach(this.addCard, this)
		
		return this
	},
	events: {
		'click [data-bind="remove"]': function(e) {
			this.removeCard($(e.currentTarget).closest('.grid-stack-item'))
			e.preventDefault()
		},
		'click [data-bind="configure"]': function(e) {
			this.configureCard($(e.currentTarget).closest('.grid-stack-item'))
			e.preventDefault()
		}
	},
	configureCard: function(card) {
		var cardData = this.getCardData(card)
		
		// Initialize a builder view with the card's current data and show it
		var builderView = new BuilderView({model: new Backbone.Model(cardData.vizwit)})
		this.$el.after(builderView.render().el)
		
		// Listen to submit event and update the card's config
		this.listenTo(builderView, 'submit', function(builderData) {
			console.log('submitted via layout', builderData)
			cardData.vizwit = builderData
			this.setCardData(card, cardData)
		})
		
		// Listen to destroy event and then stop listening
		this.listenTo(builderView, 'destroy', function() {
			this.stopListening(builderView)
		})
	},
	addCard: function(config) {
		var markup = this.template({
			minHeight: 3,
			minWidth: 3
		})
		this.grid.add_widget(markup, config.x || null, config.y || null, config.width || 6, config.height || 1, true)
	},
	removeCard: function(card) {
		this.grid.remove_widget(card)
	},
	getCardData: function(card) {
		return card.data('_gridstack_node')
	},
	setCardData: function(card, cardData) {
		card.data('_gridstack_node', cardData)
	},
	exportCards: function() {
		var layout = _.map(this.$el.children('.grid-stack-item:visible'), function(el) {
			var node = this.getCardData($(el))
			return {
				x: node.x,
				y: node.y,
				width: node.width,
				height: node.height,
				vizwit: node.vizwit || null
			}
		}, this)
		var exportConfig = {
			version: 1,
			header: {
				title: 'VizWit',
				description: 'Lorem ipsum dolor sit amet'
			},
			cards: layout
		}
		var exportView = new ExportView({model: new Backbone.Model({json: JSON.stringify(exportConfig, null, 2)})})
		this.$el.after(exportView.render().el)
	}
})