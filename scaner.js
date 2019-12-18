const fs = require('fs')
const path = require('path')
import imgMover from './imgHander.js'


const folderPath = '/Users/lonhon/Documents/lonhon.top/source/_posts/'
const targetFolder = path.join(folderPath)

const fileType = /.(md)$/

function scanFile (folder) {
  fs.readdir(folder, (err, data) => {
    if (err) return console.log('读取目标文件夹失败！')
    if (data && data.length) {
      data.forEach(fileName => {
        if (fileType.test(fileName)) {
          const mdFile = path.join(folder + fileName)
          checkFile(mdFile)
        }
      })
    }
  })
}

scanFile(targetFolder)

const imgReg = /<img.*?(?:>|\/>)/gi
const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i
const uriReg = /^src="http*/

function checkFile (file) {
  fs.readFile(file, 'utf8', (err, d) => {
    if (err) return console.log(`读取目标:${file}失败！`)
    const matchs = d.match(imgReg)
    matchs && matchs.forEach(async (el) => {
      const srcMatched = el.match(srcReg)
      if (srcMatched[0] && uriReg.test(srcMatched[0])) {
        const imgUri = srcMatched[0].substring(5, srcMatched[0].length - 1)
        const newImgUri = await imgMover(imgUri)
        console.log(newImgUri)
      }
    })
  })
}