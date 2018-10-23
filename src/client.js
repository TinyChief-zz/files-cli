const pkg = require('../package.json')
const remove = require('./commands/remove')
const create = require('./commands/create')
var Enquirer = require('enquirer')
var enquirer = new Enquirer()

enquirer.register('radio', require('prompt-radio'))


const client = {
  init: function ({ input, flags, help }) {
    if (flags.help) {
      console.log(help)
    } else if (flags.version) {
      console.log(pkg.version)
    }
    switch (input[0]) {
      case 'remove':
        flags.prompt
          ? this.flags.prompt('remove', input[1])
          : this.commands.clientRemove(input[1])
        break
      case 'create':
        flags.prompt
          ? this.flags.prompt('create', input[1])
          : this.commands.clientCreate(input[1])
        break
      default:
        this.flags.all()
      // .....
    }
  },
  commands: {
    clientRemove: function (inputPath) {
      return remove(inputPath)
        .then(path => {
          console.log(`\n✅  ${path} was deleted!\n`)
        })
        .catch(err => {
          if (err.error === 'no') {
            console.log(`\n❌  No such file or directory, stat '${err.path}'\n`)
          } else {
            console.log(err)
          }
        })
    },
    clientCreate: function (inputPath) {
      return create(inputPath)
        .then(value => {
          console.log(`\n✅  The ${value} was succesfully created!\n`)
        })
        .catch(err => {
          if (err === 'already exists') {
            console.log(
              '\n❌  The file or directory you want to create already exists\n'
            )
          }
        })
    }
  },
  flags: {
    prompt: function (action, path) {
      enquirer.question('surePrompt', `Do you want to ${action} ${path}?`, {
        type: 'radio',
        choices: ['yes', 'no'],
        default: 'no'
      })

      enquirer.ask(['surePrompt']).then(function (answers) {
        // console.log(answers)
        if (answers.surePrompt === 'yes') {
          switch (action) {
            case 'remove':
              client.commands.clientRemove(path)
              break
            case 'create':
              client.commands.clientCreate(path)
              break
            // .....
          }
        } else {
          console.log()
        }
      })
    },
    all: function () {
      const mapCommandToText = [
        {
          command: 'clientRemove',
          text: ' remove what you want',
          question: 'Please enter the path for FILE/FOLDER you want to remove:'
        },
        {
          command: 'clientCreate',
          text: ' create stuff',
          question: 'Please enter the path where you want to create new FILE/FOLDER:'
        }
      ]

      enquirer.question('all', `Hello! I can do:`, {
        type: 'radio',
        choices: mapCommandToText.map(el => el.text)
      })
      const self = this
      enquirer.ask(['all']).then(answers => {
        const { command, question } = mapCommandToText.find(
          el => el.text === answers.all
        )
        enquirer.question('inputPath', question, {
          type: 'input'
        })

        enquirer.ask(['inputPath']).then(answers => {
          client.commands[command](answers.inputPath)
        }) 
      })
    }
  }
}

module.exports = client
