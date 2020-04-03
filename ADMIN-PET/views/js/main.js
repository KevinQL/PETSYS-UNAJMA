console.log("CARGADO => main.js");



/**
 * 
 */
evalSesion();
//****************************************************************************************** */
function dataHtml_Session(){
    let user = document.querySelector("#user");
    let password = document.querySelector("#password");
    return {
        element:{
            user, password
        },
        value:{
            userv: user.value.trim(),
            passwordv: password.value.trim()
        }
    };
}

function evaluar_Session(){
    let dataHtml = dataHtml_Session();
    let {userv,passwordv} = dataHtml['value'];

    if(userv.length != 0 && passwordv.length != 0){
        return true;
    }else{
        sweetModalMin('Llenar los campos','top-end',1500,'error');
        return false;
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
            
            if(evaluar_Session()){
                let dataHtml = dataHtml_Session();
                let {userv,passwordv} = dataHtml['value'];
    
                ajaxKev('post',{                   
                    id:'SESSION',
                    userv,
                    passwordv
                },
                (data)=>{                    
                    if(data.eval){
                        location.reload();                        
                    }else{                        
                        sweetModalMin('Datos incorrectos!!','top',2000,'info');
                    }
                });

            }

        })        
    }
}

//****************************************************************************************** */
//****************************************************************************************** */
//****************************************************************************************** */



//****************************************************************************************** */
/**
 * 
 */
function dataHtml_Etiqueta(){
    let progres = document.querySelector("#progreso-etiqueta");
    let txtNombre = document.querySelector("#txt-nombre");
    let txtDetalles = document.querySelector("#txt-detalles");
    let txtPeso = document.querySelector("#txt-peso");
    let txtPrecio = document.querySelector("#txt-precio");
    return {
        element:{
            progres, txtNombre, txtDetalles, txtPeso, txtPrecio
        },
        value:{
            txtNombrev: txtNombre.value.trim(),
            txtDetallesv: txtDetalles.value.trim(),
            txtPesov: txtPeso.value.trim(),
            txtPreciov:txtPrecio.value.trim()
        }
    };
}

/**
 * 
 */
function evaluarInsertarEtiqueta(){

    let dataHtml = dataHtml_Etiqueta();
    let {progres,txtNombre} = dataHtml['element'];
    let {txtNombrev,txtDetallesv,txtPesov,txtPreciov} = dataHtml['value'];
    let progres_val = 2;

    progres_val=0;
    progres_val += (txtNombrev.length != 0)? 100/4 : 0;
    progres_val += (txtDetallesv.length != 0)? 100/4 : 0;
    progres_val += (txtPesov.length != 0)? 100/4 : 0;
    progres_val += (txtPreciov.length != 0)? 100/4 : 0;    
    
    progres.style.width = progres_val+"%";     
    
    intercambiaClases(progres,"bg-success","bg-info")

    if(txtNombrev.length == 0){

        intercambiaClases(txtNombre,"is-valid","is-invalid");
        return false;

    }else{      

        if(progres_val >= 100){
            intercambiaClases(progres,"bg-info","bg-success");
        }        
        intercambiaClases(txtNombre,"is-invalid","is-valid")                  
        return true;   

    }
}


/**
 * 
 */
function btnInsertarEtiqueta(){ 

    let dataHtml = dataHtml_Etiqueta();
    let {txtNombrev,txtDetallesv,txtPesov,txtPreciov} = dataHtml['value']
        
    if(evaluarInsertarEtiqueta()){
        console.log("Enviar datos");
        ajaxKev('POST',{
            id:'I-ETIQUETA',
            txtNombrev,
            txtDetallesv,
            txtPesov,
            txtPreciov
        },(data)=>{
            console.log("resultados...",data);
            sweetModal("Se guardo exitosamente",'center','success',1500);            
        })
    }else{
        console.log("No Enviar datos");
    }
}
//****************************************************************************************** */
//****************************************************************************************** */
//****************************************************************************************** */


/**
 * 
 * @param {*} mensaje 
 * @param {*} position 
 * @param {*} icon 
 * @param {*} timer 
 */
function sweetModal(mensaje,position,icon,timer){
    Swal.fire({
        position,
        icon,
        title: `<small class='text-modal'>${mensaje}</small>`,
        showConfirmButton: false,
        backdrop: `
            rgba(0,0,0,.4)
            url("./views/images/robot.gif")
            bottom
            no-repeat
        `,
        timer
    })
}



/**
 * 
 * @param {*} mensaje 
 * @param {*} position 
 * @param {*} timer 
 * @param {*} icon 
 */
function sweetModalMin(mensaje,position,timer,icon,){
    const Toast = Swal.mixin({
        toast: true,
        position,
        showConfirmButton: false,
        timer,
        timerProgressBar: true,
        onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon,
        title: `<span class='my-3'>${mensaje}</span>`
    })
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