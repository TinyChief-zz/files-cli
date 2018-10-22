const fs = require('fs')
const path = require('path')

module.exports = function (providedPath) {
  if (fs.existsSync(providedPath)) {
    console.log(
      `\n❌  The file or directory you want to create already exists\n`
    )
    return
  }
  const { ext } = path.parse(providedPath)
  // styles/footer/main.scss --> [ 'styles', 'footer', 'main.scss' ]
  providedPath.replace(/\/$/, '').split('/').forEach((el, i, arr) => {
    // This checks if we actually want to create file
    if (i === arr.length - 1 && ext) {
      fs.writeFile(providedPath, '', err => {
        console.log('\n✅  The file was succesfully created!\n')
        if (err) throw err
      })
      return
    } else if (i === arr.length - 1 && !ext) {
      console.log('\n✅  The directory was succesfully created!\n')
    }
    const segment = arr.slice(0, i + 1).join('/')
    !fs.existsSync(segment) ? fs.mkdirSync(segment) : null
  })
}
