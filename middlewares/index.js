const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors')

// const hbs=require('hbs')

// const templatePath=path.join(__dirname,'../template')
module.exports = (app) => {
    app.use((req, res, next) => {
        next();
    })
    // app.use(cors({
    //     origin: 'http://localhost:8080'
    // }));
    app.use(express.json());
    // app.use(bodyParser.urlencoded({extended: true}));
    // app.use(bodyParser.json());
    // app.set('View engine','hbs')
    // app.set("views",templatePath)
}