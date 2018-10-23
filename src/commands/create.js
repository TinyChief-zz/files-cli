const fs = require('fs')
const path = require('path')

module.exports = function (providedPath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(providedPath)) {
      reject('already exists')
      return
    }
    const { ext } = path.parse(providedPath)
    // styles/footer/main.scss --> [ 'styles', 'footer', 'main.scss' ]
    providedPath.replace(/\/$/, '').split('/').forEach((el, i, arr) => {
      // This checks if we actually want to create file
      if (i === arr.length - 1 && ext) {
        fs.writeFile(providedPath, '', err => {
          resolve('file')
          if (err) throw err
        })
        return
      } else if (i === arr.length - 1 && !ext) {
        resolve('directory')
      }
      const segment = arr.slice(0, i + 1).join('/')
      !fs.existsSync(segment) ? fs.mkdirSync(segment) : null
    })

  })
}
