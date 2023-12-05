const sql = require('./db.js');
const dbConfig = require('../config/db-config.js')

// constructor
const Restaurant = function(model){
    this.name = model.name;
    this.owner = model.owner;
    this.city = model.city;
}

Restaurant.create = (newRestaurant, result) =>{
    //adding data into db using the created database model being sent
    sql.query(`INSERT INTO ${dbConfig.table} SET ?`, newRestaurant, (err, res) => {
        if(err){
            //checks if a duplicate restaurant exists in the db
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
        result(null, {"message": "success", id: res.insertId, ...newRestaurant});
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
Restaurant.find= (conditions, result)=>{
  //creating sql string by joining all the condtions
  const conditions_string = `WHERE ${conditions.join(' AND ')}`
    sql.query(`SELECT * FROM ${dbConfig.table} ${conditions_string}`,
  [], 
  (err, res) => {
    if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
    if(res.length ==0){
        //checks if there are no restaurant with the input name and owners
        console.log({ERROR: "Restaurant not found"});
        result({kind: "not_found"}, null);

    }
    else
    result(null, res);
  });
};

//Updating restaurant
Restaurant.update = (id, updateRestaurant, result) => {
    //checks if the restaurant with this specific id exists
    sql.query(`SELECT * FROM ${dbConfig.table} WHERE id = ?`, [id], (err, res) =>{
        if (err) {
            console.log("ERROR: ", err);
            result(err, null);
            return;
          }
          //updates user if it doesnt exists in the first place
          else if (res.length == 0){
            result({kind: "not_found"}, null);
            console.log({ERROR: "Restaurant not found"});
            return;
          }
          else{
            // if it exists then updates the db
            sql.query(`UPDATE ${dbConfig.table} SET ? WHERE id = ?`, [updateRestaurant, id], (errr, ress)=>{
                if (errr) {
                    console.log("ERROR: ", errr);
                    result(err, null);
                    return;
                  };
                  //checks if the updates data and already existing data are same in the database
                  if (ress.changedRows === 0){
                    console.log({ERROR: "Data Unchanged"});
                    result({kind: "data_unchanged"}, null);
        
                  }
                  else if(ress.changedRows>0)
                  result(null, {"message": "success", ...updateRestaurant});
            });
          }
          
    });
    
};

//updating restaurant status in Database
Restaurant.status = (id, res_status, result) =>
{
  //checks if the restaurant with this specific id exists
  sql.query(`SELECT * FROM ${dbConfig.table} WHERE id = ?`, [id], (err, res) =>{
      if (err) {
          console.log("ERROR: ", err);
          result(err, null);
          return;
        }
        //updates user if it doesnt exists in the first place
        else if (res.length == 0){
          result({kind: "not_found"}, null);
          console.log({ERROR: "Restaurant not found"});
          return;
        }
        else{
          // if it exists then updates the db
          let res_status_db;
          if (res_status == 'online')
          res_status_db = true;
          else
          res_status_db = false;
          sql.query(`UPDATE ${dbConfig.table} SET is_active = ? WHERE id = ?`, [res_status_db, id], (errr, ress)=>{
              if (errr) {
                  console.log("ERROR: ", errr);
                  result(err, null);
                  return;
                }
                
                else
                result(null, {"message": "success"});
          });
        }
        
  });
  
};

//Deleting restaurant based on id 
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
        result(null, {"message": "success"});
      });
}

module.exports = Restaurant