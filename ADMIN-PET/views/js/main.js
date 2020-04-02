console.log("CARGADO => main.js");

/**
 * 
 */
evalSesion();


/**
 * 
 */
function btnInsertarEtiqueta(){        

    if(evaluarInsertarEtiqueta()){
        console.log("Enviar datos");
    }else{
        console.log("No Enviar datos");
    }
}

/**
 * 
 */
function evaluarInsertarEtiqueta(){
    let progres = document.querySelector("#progreso-etiqueta");
    let txtNombre = document.querySelector("#txt-nombre");
    let txtDetalles = document.querySelector("#txt-detalles");
    let txtPeso = document.querySelector("#txt-peso");
    let txtPrecio = document.querySelector("#txt-precio");
    let progres_val = 2;
    if(txtNombre.value.trim().length == 0 && txtDetalles.value.trim().length == 0 && txtPeso.value.trim().length == 0 && txtPrecio.value.trim().length == 0 ){
        progres.style.width = progres_val+"%";        
        intercambiaClases(txtNombre,"is-valid","is-invalid");
        intercambiaClases(progres,"bg-success","bg-info")
        return false;
    }else{
        progres_val=0;
        progres_val += (txtNombre.value.trim().length != 0)? 100/4 : 0;
        progres_val += (txtDetalles.value.trim().length != 0)? 100/4 : 0;
        progres_val += (txtPeso.value.trim().length != 0)? 100/4 : 0;
        progres_val += (txtPrecio.value.trim().length != 0)? 100/4 : 0;
        
        intercambiaClases(progres,"bg-success","bg-info")
        if(progres_val >= 100){
            intercambiaClases(progres,"bg-info","bg-success");
        }
        console.log(progres_val);
        intercambiaClases(txtNombre,"is-invalid","is-valid")  

        progres.style.width = progres_val+"%";
        
        return true;      
    }
}



/**
 * 
 * @param {Object} element 
 * @param {String} removeClass 
 * @param {String} addClass 
 * 
 * Intercambia una clase por otra
 */
function intercambiaClases(element, removeClass, addClass){
    if(element.classList.contains(removeClass)){
        element.classList.add(addClass);
        element.classList.remove(removeClass);
    }
}



/**
 * 
 */
function evalSesion() {
    let el = document.querySelector("#btn-ingresar");    
    if(el){
        el.addEventListener('click',(ev)=>{
            ev.preventDefault();
            
            let user = document.querySelector("#user").value;
            let password = document.querySelector("#password").value;

            ajaxKev('post',{                   
                id:'SESSION',
                user,
                password
            },
            (data)=>{
                //console.log("naaares->",data);
                if(data.eval){
                    location.reload();
                    //console.log("datos validos :)")
                }else{
                    //console.log("datos invalidos")
                }
            });

        })        
    }
}



/**
 * 
 * @param {String} metodo 
 * @param {Object} datajson 
 * @param {Function} bloqueCode 
 * 
 * Función ajax modificado 
 */
function ajaxKev(metodo, datajson, bloqueCode){

    let method = metodo.toUpperCase().trim();
    let envget,envpost;
    if(method === "POST"){
        envpost = "data=" + JSON.stringify(datajson);
        envget = "";
    }else if (method === "GET"){
        envpost = "";
        envget = "?"+"data=" + JSON.stringify(datajson);
    }else{
        method = "POST";
        envpost = "data=" + JSON.stringify(datajson);
        envget = "";
    }
    
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){            
            let data = JSON.parse(this.responseText);            
            bloqueCode(data);
        }
    }
    xhr.open(method, "./ajax/procesarAjax.php"+envget, true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.send(envpost);
}