const Model = require('../models/admin-model.js');

// adding new restauarant in the db
exports.addNew = (req, res) => {
    if(!req.body){
        res.status(400).send({
            messsage: "Content Cannot be empty"
        });
        return;
    }
    // creating data model using Restuarant object
    const Restaurant = new Model({
        name: req.body.name,
        owner: req.body.owner,
        city: req.body.city
    });
    
    Model.create(Restaurant, (err, data) => {
        if(err){
            if(err.kind == 'duplicate'){
                res.status(200).send({
                    message: "Restaurant with same name owner and same city exists"
                });
                return;
            }
            else{
                res.status(500).send({
                    message: err.message|| "Some error"});
                    return;
            }
        }
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
    if(!req.body){
        res.status(400).send({
            messsage: "Content Cannot be empty"
        });
        return;
    }
    const Restaurant = new Model ({
        name: req.body.name,
        owner: req.body.owner
    });

    Model.findOne(Restaurant, (err, data) =>{
        if(err){
            if (err.kind == 'not_found'){
                res.status(404).send({"message": "restaurant not found"});
            }
            else
            res.status(500).send({
                message: err.message|| "Some error"});
        }
        
    else
    res.send(data);
    });
};

// updating details of one restaurant
exports.update = (req, res) =>{
    if(!req.body || !req.query.id){
        res.status(400).send({
            messsage: "Content or ID Cannot be empty"
        });
        return;
    }
    id = req.query.id;
    const Restaurant = new Model ({
        name: req.body.name,
        owner: req.body.owner,
        city: req.body.city
    });
    Model.update(id, Restaurant, (err, data) =>{
        if(err){
            if (err.kind === 'not_found'){
                res.status(404).send({"message": "restaurant not found"});
            }
            else if(err.kind=== 'data_unchanged'){
                res.status(200).send({"message":"data unchanged"});
            }
            else
            res.status(500).send({
                message: err.message|| "Some error"});
        }
    else
    res.send(data);
    });
};

//updating restaurant status
exports.status = (req, res) => {
    if (!req.query.id || !req.query.status || (req.query.status !== 'online' && req.query.status !== 'offline')) {
        res.status(400).send({
            message: "id or status missing, status should be either 'online' or 'offline'"
        });
        return;
    }    
    const id = req.query.id;
    const status = req.query.status
    Model.status(id, status, (err, data) =>{
        if(err){
            if (err.kind === 'not_found'){
                res.status(404).send({"message": "restaurant not found"});
            }
            else
            res.status(500).send({
                message: err.message|| "Some error"});
        }
        else
        res.send(data);

    })
}

exports.delete = (req, res) =>{
    if (!req.query.id){
        res.status(400).send({
            messsage: "Content or ID Cannot be empty"
    })
    return;
}

    Model.delete(req.query.id, (err, data)=>{
        if(err){
            if (err.kind === 'not_found'){
                res.status(404).send({"message": "restaurant not found"});
            }
            else
            res.status(500).send({
                message: err.message|| "Some error"});
        }

        else
        res.send(data);
    });

};
