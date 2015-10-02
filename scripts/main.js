var $ = require('jquery')
var serialize = require('form-serialize')

// On form submit
$('form').on('change', function(e) {
	var input = serialize(this, {hash: true})
	$('#json').val(JSON.stringify(input, null, 4))
	e.preventDefault()
})

// When chart type changes
$('#chartType').on('change', function(e) {
	if(this.value) {
		$('[data-chart-type]').hide()
		$('[data-chart-type="' + this.value + '"]').show()
	}
})

// When result box changes
$('#json').on('change', function(e) {
	var json = JSON.parse(this.value)
	var i
	for(i in json) {
		$('#' + i).val(json[i])
	}
})