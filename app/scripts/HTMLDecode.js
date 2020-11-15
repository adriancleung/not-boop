/**
	{
		"api":1,
		"name":"HTML Decode",
		"description":"Decodes HTML entities in your text",
		"author":"See Source",
		"icon":"HTML",
		"tags":"html,decode,web"
	}
**/

var { decode } = require('./scripts/lib/he');

function main(input) {
	input.text = heDecode(input.text)
}
