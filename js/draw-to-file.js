const fs = require("fs")

drawSquareToFile()

function drawSquareToFile() {
  const str = getSquare(rand(3, 20))
  drawToFile(str).then(() => {
    setTimeout(drawSquareToFile, 500)
  })
}

function drawToFile(content) {
  return new Promise((resolve, reject) => {
    fs.writeFile('./data/square.txt', content, (err) => {
      if (err) reject()
      resolve("written to")
    })
  })
}

function getSquare(size) {
  var str = "*".repeat(size) + "\n"
  for (let i = 0; i < size; i++) {
    str += "*" + " ".repeat(size - 2) + "*\n"
  }
  str += "*".repeat(size) + "\n"
  return str
}

function rand(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}
