const express=require('express');
const app=express();
const cors=require('cors')
const mysql = require('mysql') 
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({
    origin:'*'
}))

app.use(require('./routes/rutas'))

app.listen(port,()=>{
    console.log('server on port: '+ port)
})