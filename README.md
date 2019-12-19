# markdown文档图片替换工具
## 产生背景
之前博客用的新浪相册存放文章中的图片，最近发现新浪把外链封了导致博客里的图片都不能显示，所以想写个工具把文章中的图片替换成别的图床，目前使用的sm.ms

## 主要功能&流程
- 遍历source目录下所有md文件，过滤出包含img标签内容的文件
- 根据下载所有img标签的图片文件到本地 imgs 目录
- 上传图片到图床，获取新的图片url地址
- 替换md文件中的img.src并生成新的md文件到 result 目录

## 使用方法
``` bash
# download repo
git clone git@github.com:LonHon/blog-img-replacer.git

cd blog-img-replacer/

npm install

npm run init

npm run start
```
