const path = require('path')
const fs = require('fs')
const request = require('request')

const options = {}
process.argv.forEach((arg) => {
  if (arg.indexOf('--url') !== -1) {
    const _arg = arg.split('--')[1].split('=')
    options[_arg[0]] = _arg[1]
  }
})

const ICON_CONFIG = {
  aliUrl: options.url || '', // 阿里巴巴的 iconfont 地址,有新加入的iconfont 时跟新此地址
  dir: 'src/public/style/iconfont'
}

// 下载 CSS 文件
const postUrl = (url, callback) => {
  request(url, (error, res, body) => {
    if (!error && res.statusCode === 200) {
      callback(body)
    } else {
      throw new Error(error)
    }
  })
}

// 下载文件到本地
const downLoadFile = (uri, fileName, callback) => {
  if (uri.indexOf('https:') !== -1) {
    const stream = fs.createWriteStream(`${path.resolve(ICON_CONFIG.dir)}/${fileName}`)
    request(uri).pipe(stream).on('close', callback)
  } else {
    const base64Data = uri.replace(/^data:image\/\w+;base64,/, '')
    const dataBuffer = Buffer.from(base64Data, 'base64')
    fs.writeFile(`${path.resolve(ICON_CONFIG.dir)}/${fileName}`, dataBuffer, callback)
  }
}

// 处理下载的 CSS 文件
const resolveFile = (url, dir) => {
  postUrl(`https:${url}`, (chunk) => {
    let from = 0
    let end = from
    let urlList = []
    let count = 0
    while (from !== -1 && end !== -1) {
      count++
      if (count > 3000) {
        throw new Error('处理超时')
      }
      from = end + 1
      from = chunk.indexOf('url(', from)
      end = chunk.indexOf(')', from + 1)
      if (from !== -1 && end !== -1) {
        urlList.push(chunk.substr(from + 5, end - from - 6))
      }
    }
    urlList = [...new Set(urlList.map((_url) => _url.split('#')[0]))]
    urlList.forEach((_url) => {
      let __url = _url.split('?')[0]
      let { ext } = path.parse(__url)
      let fileName = `iconfont${ext || '.woff2'}`
      const uri = ext ? `https:${__url}` : __url
      downLoadFile(uri, fileName, (error) => {
        if (error) {
          throw new Error(error)
        }
      })
      if (ext) {
        chunk = chunk.replace(_url, `iconfont${ext}`)
      } else {
        chunk = chunk.replace(_url, `iconfont.woff`)
      }
    })
    chunk = `:global {${chunk}}`
    fs.writeFileSync(path.join(dir, 'iconfont.less'), chunk)
  })
}

resolveFile(ICON_CONFIG.aliUrl, ICON_CONFIG.dir)

// 使用
// node icon.js --url= iconfont 的URL
