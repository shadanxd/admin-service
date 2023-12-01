const sql = require('./db.js');
const dbConfig = require('../config/db-config.js')

// constructor
const Restaurant = function(model){
    this.name = model.name;
    this.owner = model.owner;
    this.city = model.city;
}

Restaurant.create = (newRestaurant, result) =>{
    //check if restaurant with same name and owner name in city exists or not
    sql.query(`SELECT name, city, owner FROM ${dbConfig.table} WHERE name=? AND owner=? AND city=?`,
  [newRestaurant.name, newRestaurant.owner, newRestaurant.city], 
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if(res.length ==0)
    {   //insert new restaurant in the db
        sql.query(`INSERT INTO ${dbConfig.table} SET ?`, newRestaurant, (errr, ress) => {
            if (errr){
                console.log("error: ", errr);
                result(errr, null);
                return;
            }
            console.log("Added Restaurant: ", {id: ress.insertId, ...newRestaurant});
            result(null, {id: ress.insertId, ...newRestaurant})
        });
        return;
    }
    
    else{
        result(null, {"message": "Already exists"})
    }

  });
   
};

module.exports = Restaurant