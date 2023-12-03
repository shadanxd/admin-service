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
    sql.query(`INSERT INTO ${dbConfig.table} SET ?`, newRestaurant, (err, res) => {
        if(err){
            if (err.code == 'ER_DUP_ENTRY'){
                console.log({ERROR: "Duplicate entry"});
                result({kind: "duplicate"}, null);
                return;
            }
            else{
            console.log({"ERROR: ": err});
            result(err, null);
                }

        }

        else{
            console.log("Added Restaurant: ", {id: res.insertId, ...newRestaurant});
        result(null, {id: res.insertId, ...newRestaurant});
        }
        
    });
};

//querying all the restaurants from the db
Restaurant.findAll = (result) => {
    sql.query(`SELECT * FROM ${dbConfig.table}`, (err, res) => {
        if (err) {
            console.log("ERROR: ", err);
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
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
    if(res.length ==0){
        console.log({ERROR: "Restaurant not found"});
        result({kind: "not_found"}, null);

    }
    else
    result(null, res);
  });
};

//Updating restaurant
Restaurant.update = (id, updateRestaurant, result) => {
    sql.query(`SELECT * FROM ${dbConfig.table} WHERE id = ?`, [id], (err, res) =>{
        if (err) {
            console.log("ERROR: ", err);
            result(err, null);
            return;
          }
          else if (res.length == 0){
            result({kind: "not_found"}, null);
            console.log({ERROR: "Restaurant not found"});
            return;
          }
          else{
            sql.query(`UPDATE ${dbConfig.table} SET ? WHERE id = ?`, [updateRestaurant, id], (errr, ress)=>{
                if (errr) {
                    console.log("ERROR: ", errr);
                    result(err, null);
                    return;
                  };
                  if (ress.changedRows === 0){
                    console.log({ERROR: "Data Unchanged"});
                    result({kind: "data_unchanged"}, null);
        
                  }
                  else if(ress.changedRows>0)
                  result(null, {"message": "Updates Succesfully", ...updateRestaurant});
            });
          }
          
    });
    
};

//Deleting
Restaurant.delete = (id, result) => {
    sql.query(`DELETE FROM ${dbConfig.table} WHERE id = ?`, [id], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        if (res.affectedRows == 0) {
          result({kind: "not_found"}, null);
          console.log({ERROR: "Restaurant not found"});
          return;
        }
        else
        result(null, {"message": "Deleted Succesfully"});
      });
}

module.exports = Restaurant