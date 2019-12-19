// 初始化项目，创建所需要目录
const fs = require('fs')
const path = require('path')

fs.mkdirSync(path.join('./source'))
fs.mkdirSync(path.join('./imgs'))
fs.mkdirSync(path.join('./result'))
console.log('创建目录成功.')
