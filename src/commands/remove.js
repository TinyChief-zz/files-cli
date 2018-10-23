/* eslint-disable prefer-promise-reject-errors */

const fs = require('fs')

module.exports = function (path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      // ERROR HANDLING
      if (err && err.errno === -2) {
        reject({ error: 'no', path })
        return
      } else if (err) {
        reject(err)
      }
      /* IF provided path is DIR then call delete DIR recursevly
       * Else if provided path is file, then just delete it
       */
      if (stats.isDirectory()) {
        deleteFolderRecursive(path)
        resolve(path)
      } else {
        fs.unlink(path, err => {
          if (err) throw err
          resolve(path)
        })
      }
    })
  })
}

const deleteFolderRecursive = path => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(file => {
      const curPath = path + '/' + file
      fs.lstatSync(curPath).isDirectory()
        ? deleteFolderRecursive(curPath)
        : fs.unlinkSync(curPath)
    })
    fs.rmdirSync(path)
  }
}
