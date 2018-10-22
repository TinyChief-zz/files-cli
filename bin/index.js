#!/usr/bin/env node
'use strict'
const meow = require('meow')
const help = require('./help')
const fs = require('fs')
const remove = require('./commands/remove')
const createNew = require('./commands/createNew')
const pkg = require('../package.json')


const cli = meow(help, {
  flags: {
    help: {
      type: 'boolean',
      alias: 'h'
    },
    version: {
      type: 'boolean',
      alias: 'v'
    },
    force: {
      type: 'boolean',
      alias: 'f'
    }
  }
})
/*
{
	input: ['unicorns'],
	flags: {rainbow: true},
	...
}
*/

// cli.flags.forEach((el) => {
//   switch (el) {
//     case: 
//   }
// })

if (cli.flags.help) {
  console.log(cli.help)
} else if (cli.flags.version) {
  console.log(pkg.version)
}



if (cli.input.includes('remove') || cli.input.includes('r')) {
  remove(cli.input[1])
}

if (cli.input.includes('new') || cli.input.includes('n')) {
  createNew(cli.input[1])
}


// foo(cli.input[0], cli.flags);
