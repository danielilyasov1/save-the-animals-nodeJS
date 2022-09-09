const fs = require("fs")
const request = require('request')


downloadCountryFlags();

function downloadCountryFlags() {
 const countries = getCountries()
 console.log('Countries:', countries.map(c => c.name));
 downloadFlags(countries)
 .then(() => {
 console.log('Your flags are ready');
 })
}

function getCountries() {
 var countries = [];
 // get the countries from file (require),
 countries = require('../data/newCountries.json')
 // sort by population (descending)
 // and return the top 5
 console.log( countries.sort((a,b)=> b.population -a.population).slice(0,5))
 return countries.sort((a,b)=> b.population -a.population).slice(0,5)
}

function downloadFlags(countries) {
 // TODO: use the download() function to download a flag
 // the name of the file should be the country name
 // TODO: use the Array.map function to generate a promise for each download
 // TODO: use Promise.all() 
 return Promise.all(
    countries.map(({flags:{png},name:{common}})=>
        download(png,`img/${common}.png`)
    )
 )
}

function download(url, fileName) {
    return new Promise((resolve, reject) => {
        request(url)
            .pipe(fs.createWriteStream(fileName))
            .on('close', resolve)
            .on('error', reject)
    })
}