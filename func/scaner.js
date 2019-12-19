const fs = require('fs')
const path = require('path')
const imgMover = require('./imgHandler')

const fileType = /.(md)$/

function scanFile (folder) {
  fs.readdir(folder, async (err, data) => {
    if (err) return console.log('读取目标文件夹失败！')
    if (data && data.length) {
      for (let i = 0; i < data.length; i++) {
        const fileName = data[i]
        if (fileType.test(fileName)) {
          const fileFullPath = folder + fileName
          const mdFile = path.join(fileFullPath)
          const checkResult = await checkFileSync(mdFile, fileName)
          if (checkResult) await replacer(fileName, checkResult.content, checkResult.task)
        }
      }
      // data.forEach(fileName => {
      //   if (fileType.test(fileName)) {
      //     const mdFile = path.join(folder + fileName)
      //     checkFile(mdFile, fileName)
      //   }
      // })
    }
  })
}

const imgReg = /<img.*?(?:>|\/>)/gi
const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i
const uriReg = /^src="http*/

function checkFile (file, fname) {
  fs.readFile(file, 'utf8', async (err, d) => {
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

async function checkFileSync (fullPath) {
  const d = fs.readFileSync(fullPath, 'utf-8')
  const matchs = d.match(imgReg)
  if (!matchs || matchs.length === 0) return false
  const transQueue = []
  for (let i = 0; i < matchs.length; i++) {
    const el = matchs[i]
    const srcMatched = el.match(srcReg)
    if (srcMatched[0] && uriReg.test(srcMatched[0])) {
      const imgUri = srcMatched[0].substring(5, srcMatched[0].length - 1)
      const transfer = await imgMover(imgUri)
      if (transfer) transQueue.push(transfer)
      else {
        return null
        break;
      }
    }
  }
  return {
    content: d,
    task: transQueue
  }
}

function replacer (fname, content, task) {
  let newContent = content
  task.forEach(img => {
    newContent = newContent.replace(img.oldUri, img.newUri)
  })
  fileWriter(fname, newContent)
}

function fileWriter (fname, value) {
  fs.writeFileSync(path.join('../result/' + fname), value)
  console.log('写入文件成功: ', fname)
}

module.exports = scanFile
