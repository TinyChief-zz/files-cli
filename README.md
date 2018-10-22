## Files-CLI

App to manage your files and directories using only `command line`, `terminal`. We provide to you CLI tool with color highlights, prompts, error handling and so on.


Installation
------------

`$ npm install -g files-cli`

Available features:
-------------------
* Deleting files 
* Creating new files

### In plan:
* Copying
* Undo last
* More interactive CLI

Usage
-----

```
$ files [command] [flags]

Commands

  remove [options] <path>	deletes file
  new [options] <path>		creates new file

Options

  -h --help	This message
  -v --version	0.0.1

  remove [options]
  -f --force 	Will remove without any prompt
  -t --try     	Shows prompt before action

  new [options]
  -f --force 	Will overwrite if already exists
  -t --try     	Shows prompt before action
```

### Examples
```
files new styles/header/main.css
// or
files remove assets/fonts
```

License
-------

Copyright (c) 2018 Vadim Yuldashbaev

Licensed under the [MIT license](http://opensource.org/licenses/MIT).