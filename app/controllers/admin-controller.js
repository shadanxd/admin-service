const Model = require('../models/admin-model.js');

// adding new restauarant in the db
exports.addNew = (req, res) => {
    if(!req.body){
        res.status(400).send({
            messsage: "Content Cannot be empty"
        });
    }

    const Restaurant = new Model({
        name: req.body.name,
        owner: req.body.owner,
        city: req.body.city
    });

    Model.create(Restaurant, (err, data) => {
        if(err)
        res.status(500).send({
    message: err.message|| "Some error"});
    else
    res.send(data);
    });
};

// fetching all the restaurants 
exports.findAll = (req, res) =>{
    Model.findAll((err, data)=>{
        if(err)
        res.status(500).send({
            message: err.message|| "Some error"});
            else
            res.send(data);
            });
        };

// finding one restaurant based on restaurant name and owner name
exports.findOne = (req, res) =>{
    const Restaurant = new Model ({
        name: req.body.name,
        owner: req.body.owner
    });

    Model.findOne(Restaurant, (err, data) =>{
        if(err)
        res.status(500).send({
    message: err.message|| "Some error"});
    else
    res.send(data);
    });
};

// updating details of one restaurant
exports.update = (req, res) =>{

};

exports.delete = (req, res) =>{

};
