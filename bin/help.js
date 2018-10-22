const chalk = require('chalk')
const pkg = require('../package.json')
const colors = {
	header: 'magentaBright'
}

module.exports = chalk`
{${colors.header}.bold  Usage}

	$ files {dim [command] [flags]}

{${colors.header}.bold Commands}

	remove {dim [options] <path>}		{dim deletes file}
	new {dim [options] <path>}		{dim creates new file}

{${colors.header}.bold Options}

	-h --help	{dim This message}
	-v --version	{dim ${pkg.version}}

	remove {dim [options]}
	-f --force 	{dim Will remove without any prompt}
	-t --try     	{dim Shows prompt before action}

	new {dim [options]}
	-f --force 	{dim Will overwrite if already exists}
	-t --try     	{dim Shows prompt before action}
`