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

//querying all the restaurants from the db
Restaurant.findAll = (result) => {
    sql.query(`SELECT * FROM ${dbConfig.table}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Querying restaurants with name and owner on db
Restaurant.findOne = (findRestaurant, result)=>{
    sql.query(`SELECT * FROM ${dbConfig.table} WHERE LOWER(name)=LOWER(?) AND LOWER(owner)=LOWER(?)`,
  [findRestaurant.name, findRestaurant.owner], 
  (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    if(res.length ==0)
    result({kind: "not_found"}, null);
    else
    result(null, res);
  });
};

//
Restaurant.update = (id, updateRestaurant, result) => {
    sql.query(`SELECT * FROM ${dbConfig.table} WHERE id = ?`, [id], (err, res) =>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          };
          if (res.length == 0){
            result({kind: "not_found"}, null);
            return;
          };
          
    });
    sql.query(`UPDATE ${dbConfig.table} SET ? WHERE id = ?`, [updateRestaurant, id], (err, res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          };
          if (res.changedRows === 0)
          result({kind: "data_unchanged"}, null);
          else if(res.changedRows>0)
          result(null, {"message": "Updates Succesfully", ...updateRestaurant});
    });
};

Restaurant.delete = (id, result) => {
    sql.query(`DELETE FROM ${dbConfig.table} WHERE id = ?`, [id], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        if (res.affectedRows == 0) {
          result({kind: "not_found"}, null);
          return;
        }
        else
        result(null, {"message": "Deleted Succesfully"});
      });
}

module.exports = Restaurant