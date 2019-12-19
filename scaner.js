const fs = require('fs')
const path = require('path')
const imgMover = require('./imgHandler')


// const folderPath = '/Users/lonhon/Documents/lonhon.top/source/_posts/'
const folderPath = './md/'
const targetFolder = path.join(folderPath)

const fileType = /.(md)$/

function scanFile (folder) {
  fs.readdir(folder, (err, data) => {
    if (err) return console.log('读取目标文件夹失败！')
    if (data && data.length) {
      data.forEach(fileName => {
        if (fileType.test(fileName)) {
          const mdFile = path.join(folder + fileName)
          checkFile(mdFile, fileName)
        }
      })
    }
  })
}

scanFile(targetFolder)

const imgReg = /<img.*?(?:>|\/>)/gi
const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i
const uriReg = /^src="http*/

function checkFile (file, fname) {
  fs.readFile(file, 'utf8', (err, d) => {
    if (err) return console.log(`读取目标:${file}失败！`)
    const transQueue = []
    let count = 0
    const matchs = d.match(imgReg)
    matchs && matchs.forEach(async (el) => {
      const srcMatched = el.match(srcReg)
      if (srcMatched[0] && uriReg.test(srcMatched[0])) {
        const imgUri = srcMatched[0].substring(5, srcMatched[0].length - 1)
        console.log(imgUri)
        const transfer = await imgMover(imgUri)
        count++
        if (transfer) transQueue.push(transfer)
        if (count === matchs.length) {
          replacer(fname, transQueue)
        }
        // console.log(newImgUri)
      }
    })
  })
}

function replacer (fname, task) {
  console.log(`${fname} img count: ` + task.length)
}