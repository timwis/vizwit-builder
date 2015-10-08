var $ = global.jQuery = require('jquery')
var _ = global._ = require('lodash')
var Backbone = require('backbone')

var HeaderView = require('./views/header')
var LayoutView = require('./views/layout')

var vent = _.clone(Backbone.Events)

var headerView = new HeaderView({el: '#page-header', vent: vent})

var layoutView = new LayoutView({el: '#layout', vent: vent})
layoutView.render()