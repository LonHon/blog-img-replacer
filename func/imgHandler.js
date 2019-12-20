const fs = require('fs')
const path = require('path')
const request = require('request')
const smms = require('smms-cli')

async function imgMover (imgUri) {
  const localImgFilePath = await downloader(imgUri)
  const newImgUri = await upload(localImgFilePath)
  if (!newImgUri) {
    // TODO: 保存数据   便于二次上传
    return null
  }
  return {
    oldUri: imgUri,
    newUri: newImgUri
  }
}

function downloader (url) {
  return new Promise((resolve, reject) => {
    const arr = url.split('/')
    const fileName = arr[arr.length - 1];
    const filePath = path.resolve(__dirname, '../imgs/20191220' + fileName)
    request(url, {encoding: 'binary'}, (err, d) => {
      if (err) return console.log('err: 下载图片失败.')
      if (true) {
        try{
          fs.writeFileSync(filePath, d.body, 'binary')
          resolve(filePath)
        } catch (err) {
          console.log('err: 保存图片失败.')
          reject(null)
        }
      }
    })
  })
}

async function upload(imgPath) {
  let newPath = null
  try {
    const res = await smms.upload(imgPath)
    newPath = res.data.url
  } catch (err) {
    console.log('err: 上传失败,', err)
  }
  return newPath
}

module.exports = imgMover
