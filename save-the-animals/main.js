const fileService = require("./service/fileService.js")
const imgService = require("./service/imgService.js")
const pdfService = require("./service/pdfService.js")
// const PdfService = require('./service/PdfService.js')

fileService
  .loadCSV("./RareAnimals.csv")
  .then((animals) => {
    return Promise.all(
      animals.map((animal) => {
        return imgService.suggestImgs(animal.name).then((url) => {
          animal.url = url
          return animal
        })
      })
    )
    // TODO: for every animal you shoud call the imgService.suggestImgs,
    // when you get back a url in the response, store it in the animal object
    // then return a promise that resolved when ALL img urls are set.
  })
  .then((animalsWithImgUrls) => {
    return Promise.all(
      animalsWithImgUrls.map((animal) => {
        return fileService.download(animal.url, `animal/${animal.name}.png`)
      })
    ).then(() => animalsWithImgUrls)
    //   TODO: For each animal, for each of his imgUrl, download the file
    //   then return a promise that resolved when ALL imgs were downloaded.
  })
  .then((animalsWithImgs) => {
    pdfService.buildAnimalsPDF(animalsWithImgs)
    // TODO: Use the PdfService to build the animals PDF
  })
