const express = require("express");
const path = require("path");
const morgan = require('morgan');

const app = express("express");

//declarando rutas
const routeApp = require('./routes/routes');

//configuraciones
app.set('port', process.env.PORT || 3000);
app.set("views",path.join(__dirname,'views'));
app.set("view engine","ejs");

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

//routes
app.use('/',routeApp);


//static files
app.use(express.static(path.join(__dirname,'public')));



//levantando el servidor en el puerto 3000
app.listen(app.get('port'), ()=>{
    console.log('Server on port ',app.get('port'));
});