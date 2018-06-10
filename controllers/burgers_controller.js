var express = require('express');
var router = express.Router();

var burger = require('../models/burgers.js');

router.get('/', (request, response) => {
    burger.selectAll((data) => {
        var viewObject = {
            burgers: data
        };
        response.render('index', viewObject);
    });
});

router.post('/burgers', (request, response) => {
    burger.insertOne([
        'burger_name'
    ], [
            request.body.burger_name
        ], (data) => {
            response.redirect('/');
        });
});

router.put('/burgers/:id', (request, response) => {
    var condition = 'id = ' + request.params.id;

    burger.updateOne({
        devoured: true
    }, condition, (data) => {
        response.redirect('/');
    });
});

module.exports = router;