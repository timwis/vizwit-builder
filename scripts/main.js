var editor = new JSONEditor(document.getElementById('page-content'), {
	ajax: true,
	schema: {
		$ref: '../card.json'
	},
	theme: 'bootstrap3',
	iconlib: 'fontawesome4',
	disable_collapse: true
})