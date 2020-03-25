const express = require("express");

const routes = express.Router();

//renderizando el aplicativo principal IA
routes.get('/',(req, res)=>{
    res.render("index");
})

let valor = "";
let ExiteElemento = false;

routes.post('/datoReciclaje/:dni',(req,res)=>{
    
    console.log("-->",req.body,req.params);

    valor =  req.body.tipoBasura; // BOTELLA o OTROS
    ExiteElemento = req.body.activar;//true or false

    res.json("Datos actualizados!!");
})


routes.post('/msj',(req, res)=>{

    const {Board, Led, Servo} = require('johnny-five');
    let myBoard, myLed, servo;
    myBoard = new Board();

    myBoard.on("ready", function() {
        // Create a standard `led` component instance
        myLed = new Led(13);
        
        servo = new Servo({
            pin:8,
            startAt:90
        });
    
        // Sweep from 0-180 and repeat.
        //servo.sweep()
    
        // Add servo to REPL (optional)
        myBoard.repl.inject({
            servo:servo
        });
        
        let clasificarB;
        setInterval(() => {
            clasificarB=valor;        
            console.log(msj(valor))
    
            if(ExiteElemento){
                if(clasificarB == "BOTELLA"){
                    myLed.on();
                    servo.to(0, 500, 10);
                    setTimeout(() => {
                        servo.to(90, 500, 10);                    
                    }, 2000);
        
                }else{
                    myLed.off()
                    servo.to(180, 500, 10);
                    setTimeout(() => {
                        servo.to(90, 500, 10);                    
                    }, 3000);
                }
                ExiteElemento=false;
            }
        }, 2000);
        
    });

    console.log("Robot listo en servidor!!");
    res.json({
        msj:'Robot en acción',
        origen: 'server'
    });
})

function msj(nombre){
    return "valor enviado: "+nombre;
}

module.exports = routes;