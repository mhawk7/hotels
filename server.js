const express = require('express');
const app = express();
const db = require('./db');
const MenuItem = require('./model/Menu');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu',menuRoutes);

app.get('/',(req,res)=>{
    res.send('Welcome to my hotel....oyo');  
})

app.listen(3000,()=>console.log('listening at 3000'));