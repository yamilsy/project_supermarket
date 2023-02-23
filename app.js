const express = require('express')
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


const categorias=require('./codigo/categoria');
app.use('/categoria',categorias);

const personas=require('./codigo/persona');
app.use('/persona',personas);

const clientes=require('./codigo/cliente');
app.use('/cliente',clientes);

const empleados=require('./codigo/empleado');
app.use('/empleado',empleados);

const productos=require('./codigo/productos');
app.use('/productos',productos);

const compras=require('./codigo/compras');
app.use('/compras',compras);

const pagos=require('./codigo/pagos');
app.use('/pagos',pagos);

const login=require('./codigo/login');
app.use('/login',login);

const puerto = 3000
app.listen(puerto, function() {
    console.log('Servidor OK en puerto: '+puerto);
});