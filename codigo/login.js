const express = require('express')
const encrypt= require('bcryptjs')

const route = express.Router()
const { conexion } = require('../configuracion/database');
const jwt= require('jsonwebtoken')
const {jwt_secret}= require('../configuracion/parametro');

route.get('/',(req, res) => {
    let sql = "Select usuario,clave,Id_persona,estado from login;"
    conexion.query(sql, (err, resul) => {
        if(err) {
            console.log("Error: "+err.message);
            throw err
        }else{
            res.json(resul)
        }
    });
});


route.get('/:codigo',function(req,res) {
    let sql = 'Select usuario,clave,Id_persona,estado from login where usuario=?'
    conexion.query(sql,[req.params.codigo],function(err,resul){
        if(err){
            throw response.json(err.message)
        }else{
            res.json(resul);
        }
    });
});


route.post('/', async function(req,res) {

    let clave_encriptada = await encrypt.hash(req.body.clave, 10);

    let data = {
                usuario:req.body.usuario,
                clave : clave_encriptada,
                Id_persona: req.body.Id_persona,
                estado : req.body.estado
            }
    let sql = 'Insert into login set ?';

    conexion.query(sql,data, function(err,resul){
        if(err){
            console.log(err.message);
            res.json('Error no se adiciono');
            throw response.json(err.message)
        }else{
            res.json(resul);
            console.log('Positiva, se adiciono');
        }
    });
});


route.post('/1',async function(req,res) {
    let clave_encriptada  = await encrypt.hash(req.body.clave,10)
    let data = {
        usuario:req.body.usuario,
        clave : clave_encriptada,
        Id_persona: req.body.Id_persona,
        estado : req.body.estado
      }
    let sql = 'Insert into login set ?';
   
   conexion.query(sql,data,function(err,resul){
            if(err){
                console.log(err.message);
                res.json({ mensaje:'No se pudo adicionar un campo' });
            }else{
                jwt.sign(data, jwt_secret, function (err,token)
                {
                if(err){
                    console.log("error");
                }else{
                    res.json(token);
                }
             });
            }
        });  
    });

route.post('/compara', async (req, res) => {
    const usuario = req.body.usuario;
    let sql = 'select usuario, contraseña from login where usuario = ?';
    conexion.query(sql, [usuario], async function(error, results)  {
      if (error) {
        console.error('Error al recuperar la contraseña: ' + error.stack);
        res.json("error");
        return;
      }
      if (results.length == 0) {
        res.json('Usuario no encontrado');
        return;
      }
      const contra= results[0].contraseña;
      await encrypt.compare(req.body.contraseña, contra)
        .then((result) => {
          if (result) {
            res.json('Dato correcto');
          } else {
            res.json('Dato incorrecto');
          }
        })
      });
    });

route.put('/:codigo',async function(req,res) {
    let clave_encriptada=await encrypt.hash(req.body.clave,10);
    let codigo=req.params.codigo;
    let cla = clave_encriptada;
    let id = req.body.Id_persona;
    let es = req.body.estado;
    let sql = 'Update login set clave=?, Id_persona=?, estado=?  where usuario=?';
    conexion.query(sql,[cla,id,es,fe,usu,codigo],function(err,resul){
        if(err){
            console.log(err.message);
        }else{
            res.json(resul);
        }
    });
 });

 route.delete('/:codigo',function(req,res) {
    let codigo = req.params.codigo;
    let sql = 'Delete from login where usuario = ?';
    conexion.query(sql,[codigo],function(err,resul){
        if(err){
            console.log(err.message);
        }else{
            res.json(resul);
        }
    });
 });

 module.exports = route