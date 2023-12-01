const sql = require('./db.js');

// constructor
const Restaurant = function(model){
    this.title = model.title;
    this.owner = model.owner;
    this.city = model.city;
}

Restaurant.create = (newRestaurant, result) =>{
    sql.query("INSERT INTO restaurants SET ? ", newRestaurant, (err, result) => {
        if (err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Added Restaurant: ", {id: res.insertId, ...newRestaurant});
        result(null, {id: res.insertId, ...newRestaurant})
    });
};

module.exports = Restaurant