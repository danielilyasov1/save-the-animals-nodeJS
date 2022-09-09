module.exports ={
    loadCSV,
    download,
}
const csv = require('csv-parser')
const fs = require('fs')
const request = require('request')


function loadCSV(filePath){
return new Promise((resolve, reject) => {
    const results =[]
 fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    if(!results.length) reject("cant load csv")
    resolve(results)

    // [{ id: '101', name: ' Malayan Tiger', count: ' 787' },
    // { id: '102', name: ' Mountain Gorilla', count: ' 212' },
    // { id: '103', name: ' Fin Whale', count: ' 28' }]
  });
})
}


function download(url, fileName) {
  return new Promise((resolve, reject) => {
      request(url)
          .pipe(fs.createWriteStream(fileName))
          .on('close', resolve)
          .on('error', reject)
  })
}