module.exports = app => {
    const controller = require('../controllers/admin-controller')

    var router = require('express').Router();
    
    // add new restaurant
    router.post('/add', controller.addNew);

    // fetch all the restaurants
    router.get('/findAll', controller.findAll);

    // find specific restaurant
    router.get('/find', controller.findOne);

    //update details of restaurant
    router.put('/update', controller.update);

    //delete a restaurant
    router.delete('/delete', controller.delete);

    app.use('/admin-service', router);
};