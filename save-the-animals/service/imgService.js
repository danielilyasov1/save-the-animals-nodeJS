module.exports = {
  suggestImgs,
}

const axios = require("axios")
const cheerio = require("cheerio")

function suggestImgs(name) {
  return axios
    .get(`http://www.istockphoto.com/il/photos/${name}`)
    .then((res) => {
      const $ = cheerio.load(res.data)
      return $(`[class*="GatewayAsset-module__thumb"]`).attr('src')
    })
}
