const fs = require("fs")

sumFromFile("data/nums.txt")
  .then((sum) => console.log("Sum:", sum))
  .catch((err) => console.log("Cannot sum:", err))

function sumFromFile(url) {
  return new Promise((resolve, reject) =>
    fs.readFile(url, "utf8", (err, sum) => {
      if (err) reject(console.log("Cannot read file"))
      sum = sum.split("\r\n")
      console.log(sum)
      resolve(sum.reduce((acc, cur) => acc + +cur, 0))
    })
  )
}
