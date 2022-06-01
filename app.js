const express = require('express');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://n-decressac:NkrOVf4cq61yKHwL@cluster0.wmnsk.mongodb.net/?retryWrites=true&w=majority',
    {useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB écouchée !'));

const app = express();

app.use((req, res, next) => {
    console.log('Requête reçue');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({
        message: 'Votre requête a bien été reçue !'
    });
    next();
});

app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !')
});

module.exports = app;