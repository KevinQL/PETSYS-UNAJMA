/**
 * Propiedad que guarda la instancia del recurso camara
 * @type {Object} camara
 * 
 * Propiedades que guardan las dimensiones de ancho y 
 * alto del div contenedor donde se ejecutará la camara.
 * @type {number} width
 * @type {number} height
 */
let camara,width, height;

/**
 * Propiedad que carga el modelo, archivo que contiene las caracteristicas de 
 * elementos u objetos entrenados con aticipacion.
 * @type {Object} modelo
 * 
 * Propiedad que carga el knn (algoritmo de clasificación)
 * @type {Object} knn
 */
let modelo, knn;

/**
 * Propiedad que me permite controlar si se está realizando la calsificación. 
 * Permite controlar que se guarde la neurona. Mientras no sea verdadero, no se realizará el guardado.
 * @type {boolean} clasificando
 */
let clasificando = false;




function setup() {
    /**
     * Propiedad que hace referencia al elemento DIV donde se cargará la camara
     * @type {object} miCanvas
     */
    let miCanvas = document.getElementById("canvas");
    width = miCanvas.offsetWidth; // se guarda el valor del ancho del div 
    height = miCanvas.offsetHeight; // se guarda el valor del alto del div 

    /**
     * Propiedad que guarda la instancia de la creación de una canvas de p5.js
     * @type {object} sketchCanvas
     */
    let sketchCanvas = createCanvas(width,width); // creando el canvas con p5
    sketchCanvas.parent("canvas");  // Ubicando el canvas dentro del div con el id 'canvas'
   
    background("#123"); // poniendo un color de fondo al canvas
    
    // Instancia para iniciar la camara
    camara = createCapture(VIDEO);
    camara.size(width,width);
    camara.hide(); // Ocultamos la camara, que es pintado por defecto para pintarlo en un lugar definido dentro de la función Draw()
    
    //inicializando los botones
    let btnentrenar = document.getElementsByClassName("btnentrenar");
    for (const index in btnentrenar) {       
        if (btnentrenar.hasOwnProperty(index)){
            btnentrenar[index].addEventListener('click',presionandoBtn);            
        }
    }

    //Cargando el modelo e instanciando el knn
    modelo = ml5.featureExtractor('MobileNet',modeloListo);
    knn = ml5.KNNClassifier();

    /**
     * Devuelve la cantidad de etiquetas entrenadas con posteridad desde el momento que se inició a usar el modelo.
     * @function getNumLabels() 
     * @return {integer}
     */
    //Verifica si existe algún objeto para clasificar, esto deacuerdo a un intervalo de tiempo definido. De modo que se irá ejecutando cada cierto momento, y utilizando la cámara verificara la existencia de un objeto, para posteriormente enviarlo al servidor de node para que proceda con las instrucciones correspondientes
    setInterval(()=>{

        if(knn.getNumLabels() > 0){
            clasificar();
            clasificando = true;
        } 

    },1000)

}



/**
 * Funcion que se ejecuta cada cierto tiempo.
 * Forma parte de las funciones de la libreria P5.js
 */
function draw() {
    
    image(camara, 0,0,width,width);
    
}


/**
 * 
 */
function GuardarNeurona() {
    if (clasificando) {
        save1(knn, "entrenado.json");
        //knn.save()
    }else{
        alert('Aun no tiene un modelo construido')
    }
}



/**
 * 
 */
function CargarNeurona() {
    console.log("Cargando una Neurona");
    knn.load("./public/clasificador.json", function() {
        console.log("Neurona Cargada knn");
    })
}



/**
 * Variable que guarda la información del objeto clasificado: su etiqueta, procentaje de efectividad, etc
 * @param {object} result
 * 
 * Parametro que guarda el nombre o etiqueta del residuo clasificado
 * @type {string} etiquetaClasificada
 * 
 * Variable que guarda valor númerico decimal, desde 0 hasta 1. Es el valor de confianza de la clasificación de una etiqueta.
 * @type {double} valorConfianza
 * 
 * Es el valor de confianza pero en porcentajes.
 * @type {integer} valorConfianzaPorcentual 
 * 
 * Función que realiza la clasificacion de los componenetes objetos residuos
 */
function clasificar(){

    const Imagen = modelo.infer(camara);
    knn.classify(Imagen, function(err, result){
        if(err){
            console.log("que paso", err)
            console.error();

        }else{
            console.log("-->>>",result);
            let etiquetaClasificada_result = result.label; //indice, 0,1,2,3... #Cuando se entrena por primera vez, estos son NOMBRES, NO indices
            let etiquetaClasificada = knn.mapStringToIndex[etiquetaClasificada_result];//sacar NOMBRE del la etiqueta del objeto KNN
            let valorConfianza = 0;
            //Guardará el nombre de la etiqueta clasificada
            let etiqueta;
            //Esto pasa generalmente cuando se reentrena al modelo
            if(etiquetaClasificada != undefined){                                
                etiqueta = etiquetaClasificada;
                valorConfianza = result.confidencesByLabel[etiquetaClasificada];
            }else{
                let {etiqueta_n, val_confianza_n} = dameEtiquetaNuevoEntrenado(result);
                etiqueta = etiqueta_n;
                valorConfianza = val_confianza_n;
            }
            //Convertir en porcentaje
            valorConfianza = eval(valorConfianza.toFixed(2) * 100);
            //separa el NOMBRE del ID. 
            let {nombre_tag, id_tag} = tratarEtiqueta(etiqueta);
            //resultado por pantalla
            let resulTxt = `${nombre_tag} / ${valorConfianza}%`;
            //valorConfianzaPorcentual = eval(valorConfianza.toFixed(2) * 100);
            document.getElementById("txtResultClas").innerHTML = resulTxt;

        }
    })

}



/**
 * Sacamos el nombre de la etiqueta, 
 * Esto sirve para poder sacar el nombre de la etiqueta cuando se VUELVE A ENTRENAR
 * @param {Object} object 
 */
function dameEtiquetaNuevoEntrenado(object){
    let etiqueta_n = "cargando...";
    let val_confianza_n = 0;
    for (const key in object.confidencesByLabel) {
        if(object.confidencesByLabel[key] > 0.35){
            etiqueta_n = key;
            val_confianza_n = object.confidencesByLabel[key];
        }            
    }
    return {etiqueta_n, val_confianza_n};
}



/**
 * La etiqueta nombre del componenete residuo a entrenar
 * @param {object} objetoEntrenar 
 * 
 * Función que permitirá entrenar al modelo con otros tipos de componenetes de residuos.
 */
function entrenarKnn(objetoEntrenar){
    let Imagen = modelo.infer(camara); // infiera la fotografia convirtiendolo en 0 y 1 's para pasarselo al modelo y asi poder etiquetarlo.
    knn.addExample(Imagen, objetoEntrenar); // etiqueta con un nombre la imagen inferida, para guardarlo en el modelo como un nuevo elemento para clasificar
}



/**
 * Se ejecuta cuando el modelo knn está listo
 * @return {string}
 */
function modeloListo(){
    
    console.log(msjpruebaM("modelo listo"));
    
    //cargando modelo propio
    CargarNeurona();    
    //para que no exista el retraso... 
    setTimeout(() => {
        sweetModalMin('Modelo cargado!!','top-start',5000,'success');
    }, 1700);
}



/**
 * Propiedad que guarda la instancia de los botones para entrenar.
 * @param {object} this
 * 
 * Funcion que se ejecuta cuando los botones son presionados. Especificamente los de entrenar.
 */
function presionandoBtn(){

    let element = document.querySelector("#etiqueta_select");
    let nombre = element.selectedOptions.item(0).innerText; // se selecciona el nombre de la etiqueta
    let id = element.value; // Se selecciona el id de la etiqueta.

    if(id != "-1"){
        let etiqueta = `${nombre},${id}`; // Se entrena con el NOMBRE y el ID 
        entrenarKnn(etiqueta);
    } else{
        alert('Etiqueta no selccionada')
    }
}




//-----------------------------------------------------------------

/**
 * 
 * @param {object} knn 
 * @param {string} name 
 */
// Temporary save code until ml5 version 0.2.2
const save1 = (knn, name) => {
    const dataset = knn.knnClassifier.getClassifierDataset();
    if (knn.mapStringToIndex.length > 0) {
      Object.keys(dataset).forEach(key => {
        if (knn.mapStringToIndex[key]) {
          dataset[key].label = knn.mapStringToIndex[key];
        }
      });
    }
    const tensors = Object.keys(dataset).map(key => {
      const t = dataset[key];
      if (t) {
        return t.dataSync();
      }
      return null;
    });
    let fileName = 'myKNN.json';
    if (name) {
      fileName = name.endsWith('.json') ? name : `${name}.json`;
    }
    saveFile(fileName, JSON.stringify({
      dataset,
      tensors
    }));
};
  


const saveFile = (name, data) => {
    const downloadElt = document.createElement('a');
    const blob = new Blob([data], {
    type: 'octet/stream'
    });
    const url = URL.createObjectURL(blob);
    downloadElt.setAttribute('href', url);
    downloadElt.setAttribute('download', name);
    downloadElt.style.display = 'none';
    document.body.appendChild(downloadElt);
    downloadElt.click();
    document.body.removeChild(downloadElt);
    URL.revokeObjectURL(url);
};