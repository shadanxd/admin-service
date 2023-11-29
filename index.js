const  express = require('express');
const app = express();
const PORT = 3001;

app.get('/', (req, res) =>{
    res.send('Welcome to Admin Srvice')
});

app.post('/restaurant/add', (req, res)=> {

})

app.get('/restaurant/feth', (req, res) =>{
    
})

app.listen(PORT, () =>{
    console.log(`Node running on port ${PORT}`)
});
