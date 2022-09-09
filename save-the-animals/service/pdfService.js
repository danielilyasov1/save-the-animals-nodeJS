const PDFDocument = require('pdfkit')
const fs = require('fs')

module.exports = {
    buildAnimalsPDF,
}

function buildAnimalsPDF(animals, filename='SaveTheAnimals.pdf'){
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(`${filename}`));
    var y=100
    doc.fontSize(35).text('Save The Animals!', 150, 50)
    animals.forEach(animal =>{
        doc.image(`./animal/${animal.name}.png`,50,y, {fit: [200,250],align: 'center'})
        y+=150
    }
        )
    doc.end()
} 
