/**
	{
		"api":1,
		"name":"Kebab Case",
		"description":"converts-your-text-to-kebab-case.",
		"author":"Ivan",
		"icon":"kebab",
		"tags":"kebab,case,function,lodash"
	}
**/

var { kebabCase } = require('./scripts/lib/lodash.boop');

function main(input) {
	
    input.text = kebabCase(input.text)
	
}
