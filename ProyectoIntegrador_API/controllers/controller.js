require('dotenv').config()
const bcrypt=require('bcrypt')
const mysql = require('mysql')

const cryptimes=parseInt(process.env.ROUNDS);

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'200116qw',
    database:'integrador' 
})
  
const getUsers =  (req,res) => { 
    connection.query('SELECT * FROM usuarios', function (error, results, fields) {
        if (error) throw error;
        console.log(results)
        res.json(results[0])
    });  
}

const getUsersByUsername = async (req,res) => {
    const password=req.body.password
    const user=req.body.user
    connection.query("SELECT * FROM usuarios WHERE user ='"+user+"'", function (error, results, fields) {
        if (error) throw error;
        if(results[0]==undefined){
            res.status(404).json({
                "error":1,
                "message":"Usuario no encontrado"
            })
        }
        else{
            if (results[0].password==password){
                res.status(200).json(results[0])
            }else{
                res.status(404).json({
                        "error":2,
                        "message":"Contraseña invalida"
                    })
            }
        }
    });
}

const getDatos=async (req,res)=>{

    connection.query('SELECT * FROM datos', function (error, results, fields) {
        if (error) throw error;
        console.log(results)
        res.json(results)
    });
}

const frecuencia=async (req,res)=>{

    connection.query('SELECT humedad FROM datos', function (error,results,fields){
        if (error) throw error;
        console.log(results)
        res.json(results)
    });
}
const insertDatos=async (req,res)=>{
    const {humedad,temp,h_suelo,n_agua,e_bomba,}=req.body
    const date=  new Date().toISOString()
    fecha=date.slice(0,10)
    hora=date.slice(11,19)

    connection.query("INSERT INTO datos (humedad,temp,h_suelo,n_agua,e_bomba) VALUES ("+humedad+","+temp+","+h_suelo+","+n_agua+",'"+e_bomba+"')", function (error, results, fields) {
        if (error) throw error;
        console.log(results)
        res.json(results[0])
    });
    
}

module.exports={
    getUsers,
    getUsersByUsername,
    getDatos,
    insertDatos,
    frecuencia
}