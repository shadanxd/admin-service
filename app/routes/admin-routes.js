module.exports = app => {
    const controller = require('../controllers/admin-controller')

    var router = require('express').Router();
    
    // add new restaurant
    router.post('/add', controller.addNew);

    // fetch all the restaurants
    router.get('/findAll', controller.findAll);

    // find specific restaurant
    router.get('/findOne', controller.findOne);

    //update details of restaurant by Id
    router.put('/update', controller.update);

    //update restaurant active status
    router.put('/status', controller.status);

    //delete a restaurant
    router.delete('/delete', controller.delete);

    app.use('/admin-service', router);
};