const path = require('path')
const scaner = require('./scaner')

// const folderPath = '/Users/lonhon/Documents/lonhon.top/source/_posts/'
const folderPath = './md/'
const targetFolder = path.join(folderPath)

scaner(targetFolder)