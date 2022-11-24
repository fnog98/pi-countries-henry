const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Sequelize, Op} = require('sequelize')
const router = Router();
const axios = require('axios');

//modelos
const{Activity, Country} = require('../db');
const e = require('express');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async()=>{
    const apiURL = await axios.get('https://restcountries.com/v3/all');
    const apiInfo = await apiURL.data.map(e => {
        let languages="";
        if(e.languages) {languages = Object.values(e.languages).join(', ')}

        let country = {
            id: e.cca3,
            name: e.name.common,
            continent: e.continents[0],
            capital: !e.capital? '' : e.capital.join(),
            subregion: e.subregion,
            arear: e.area,
            population: e.population,
            languages
        }
        return country
    });
    return apiInfo;
}

//veo si esta completa la DB sino la completo
const dbComp = async() =>{
    let countries = await Country.findAll();

    //si esta vacia cargo datos
    if(countries.length === 0){
        const arrCountries = await infoCountries();

        await Country.bulkCreate(arrCountries);
    }
}

module.exports = router;
