#!/usr/bin/env node
'use strict'
const meow = require('meow')
const help = require('./help')
const fs = require('fs')
const client = require('./client')

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
    },
    prompt: {
      type: 'boolean',
      alias: 'p'
    },
    all: {
      type: 'boolean',
      alias: 'a'
    }
  }
})

client.init(cli)