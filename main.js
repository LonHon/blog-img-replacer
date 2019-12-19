const path = require('path')
const scaner = require('./func/scaner')

// const folderPath = '/Users/lonhon/Documents/lonhon.top/source/_posts/'
const folderPath = './source/'
const targetFolder = path.join(folderPath)

scaner(targetFolder)