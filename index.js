const  express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) =>{
    res.send('Welcome to Admin Service')
});

require("./app/routes/admin-routes.js")(app);

app.listen(PORT, () =>{
    console.log(`Node running on port ${PORT}`)
});
