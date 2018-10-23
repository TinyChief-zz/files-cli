const remove = require('../src/commands/remove')
const create = require('../src/commands/create')
const assert = require('assert')
const fs = require('fs')

describe('Create', function () {
  describe('#CREATE_DIR', function () {
    it('should create empty DIR', function () {
      const path = 'test/styles/header/main'
      create(path).then(() => {
        assert.equal(fs.existsSync(path), true)
      })
    })

    it('should throw error if DIR already exists', function () {
      const path = 'test/styles/header/'
      create(path).catch(err => {
        return assert.equal(err, 'already exists')
      })
    })
  })

  describe('#CREATE_FILE', function () {
    it('should create a FILE', function () {
      const path = 'test/styles/header/style.css'
      create(path).then(() => {
        assert.equal(fs.existsSync(path), true)
      })
    })

    it('should throw error if FILE already exists', function () {
      const path = 'test/styles/header/style.css'
      create(path).catch(err => {
        return assert.equal(err, 'already exists')
      })
    })
  })
})

describe('Remove', function () {
  describe('#REMOVE_DIR', function () {
    it('should remove empty directory', function () {
      const path = 'test/styles/header/main'
      remove(path).then(() => {
        assert.equal(fs.existsSync(path), false)
      })
    })

    it('should throw error if no such DIR', function () {
      const path = 'test/assets/'
      remove(path).catch(err => {
        return assert.equal(err.error, 'no')
      })
    })
  })

  describe('#REMOVE_FILE', function () {
    it('should remove FILE', function () {
      const path = 'test/styles/header/style.css'
      remove(path).then(() => {
        assert.equal(fs.existsSync(path), false)
      })
    })

    it('should throw error if no such FILE', function () {
      const path = 'test/assets/sun.png'
      remove(path).catch(err => {
        return assert.equal(err.error, 'no')
      })
    })
  })
})
