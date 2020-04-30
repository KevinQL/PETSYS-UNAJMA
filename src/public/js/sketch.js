/**
 * Propiedad que guarda la instancia del recurso camara
 * @type {Object} camara
 * 
 * Propiedades que guardan las dimensiones de ancho y 
 * alto del div contenedor donde se ejecutará la camara.
 * @type {number} widht
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
        if (btnentrenar.hasOwnProperty(index)) {
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
        //save(knn, "modelo.json");
        knn.save()
    }
}



/**
 * 
 */
function CargarNeurona() {
    console.log("Cargando una Neurona");
    knn.load("./modelo.json", function() {
        console.log("Neurona Cargada knn");
    })
}



/**
 * 
 * @param {*} nombreResiduo 
 */
function EnvioBasuraProcessAjax(nombreResiduo){
    
    let xhr = new XMLHttpRequest();

    let datosParam = nombreResiduo;
    let basura = nombreResiduo;
    let activar = true;
    let datosPost = "tipoBasura="+basura;
    datosPost += "&activar="+activar;

    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let data = JSON.parse(this.responseText); 
            console.log("datos llegando:",data);
        }
    }
    xhr.open('POST', "/datoReciclaje/"+datosParam, true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.send(datosPost);    
}



/**
 * 
 * @param {string} nombreResiduo 
 * @param {integer} porcentaje 
 */
let proceso=false, señal = false, envCantS = 0;
function enviarClasifiacionServidor(nombreResiduo, porcentaje){
    
    nombreResiduo = nombreResiduo.trim();
    
    let resulTxt = `${nombreResiduo}, ${porcentaje}%`;
    document.getElementById("txtResultClas").innerHTML = resulTxt;
    console.log(nombreResiduo, porcentaje,"%");
    
    if(nombreResiduo !== "NADA" && proceso === false){
        señal = true;
        proceso = true;

        if(nombreResiduo === "BOTELLA"){            
            console.log("es una botella");
            EnvioBasuraProcessAjax(nombreResiduo);            
        }else{
            EnvioBasuraProcessAjax(nombreResiduo);
            console.log("es otra cosa")
        }

        envCantS++;

        console.log("Enviando servidor...",envCantS,"veces");     

    }else{
        if(señal){
            envCantS++;
            if(envCantS==10){
                proceso = false;
                señal = false;
                envCantS = 0;
                console.log("Error, enviando otra vez");
            }
            console.log("Tardando proceso ",envCantS," veces");
        }
        if(nombreResiduo === "NADA"){
            señal = false;
            proceso = false;
            envCantS = 0;
        }
    }
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
            let etiquetaClasificada = result.label;
            etiquetaClasificada = knn.mapStringToIndex[etiquetaClasificada];//sacar nombre del objeto knn
            let valorConfianza = result.confidencesByLabel[etiquetaClasificada];
            
            console.log("1) --->",result);
            let etiqueta;
            if(etiquetaClasificada!=undefined){
                console.log("2) --->",result.label); //indice, 0,1,2,3...
                console.log("2) --->",etiquetaClasificada);
                
                etiqueta = etiquetaClasificada;
            }else{                
                let etiquetaNueva = dameEtiquetaNuevoEntrenado(result);
                console.log("####->>",etiquetaNueva)

                etiqueta = etiquetaNueva;
            }

            
            console.log("#) --->");
            console.log("#) --->");

            //valorConfianzaPorcentual = eval(valorConfianza.toFixed(2) * 100);

            //console.log("2) --->",result);
            //enviarClasifiacionServidor(etiquetaClasificada, valorConfianzaPorcentual);
            document.getElementById("txtResultClas").innerHTML = etiqueta;

        }
    })

}

/**
 * 
 * @param {Object} object 
 */
function dameEtiquetaNuevoEntrenado(object){
    let etiqueta="cargando...";
    for (const key in object.confidencesByLabel) {
        if(object.confidencesByLabel[key] == 1){
            etiqueta = key;
        }            
    }
    return etiqueta;
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
}



/**
 * Propiedad que guarda la instancia de los botones para entrenar.
 * @param {object} this
 * 
 * Funcion que se ejecuta cuando los botones son presionados. Especificamente los de entrenar.
 */
function presionandoBtn(){
    console.log("bton presionado",this.innerText);
    entrenarKnn(this.innerText);
}



/**
 * Regresa el mensaje especificado en mayuscula.
 * @param {string} msj 
 * @return {string} 
 */
function msjpruebaM(msj){
    return msj.toLocaleUpperCase();
}



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
  