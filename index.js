const  express = require('express');
const app = express();
const PORT = 3001;

app.get('/', (req, res) =>{
    res.send('Welcome to Admin Service')
});

require("./app/routes/admin-routes.routes.js")(app);

app.listen(PORT, () =>{
    console.log(`Node running on port ${PORT}`)
});
