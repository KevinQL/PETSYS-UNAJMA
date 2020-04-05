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
    let {user,password} = dataHtml['element'];

    if(userv.length != 0 && passwordv.length != 0){
        intercambiaClases(user,'is-invalid','is-valid',false);
        intercambiaClases(password,'is-invalid','is-valid',false);
        return true;
    }else{
        (userv.length == 0)?intercambiaClases(user,'is-valid','is-invalid',false):intercambiaClases(user,'is-invalid','is-valid',false);
        (passwordv.length == 0)?intercambiaClases(password,'is-valid','is-invalid',false):intercambiaClases(password,'is-invalid','is-valid',false);        
        sweetModalMin('Llenar los campos','top-end',1500,'info');
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
                let {user,password} = dataHtml['element'];
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
                        sweetModalMin('Datos incorrectos!!','top',2000,'error');
                        intercambiaClases(user,'is-valid',"",false);                      
                        intercambiaClases(password,'is-valid',"",false);                      
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
    
    intercambiaClases(progres,"bg-success","bg-info",true)

    if(txtNombrev.length == 0){

        intercambiaClases(txtNombre,"is-valid","is-invalid",true);
        return false;

    }else{      

        if(progres_val >= 100){
            intercambiaClases(progres,"bg-info","bg-success",true);
        }        
        intercambiaClases(txtNombre,"is-invalid","is-valid",true)                  
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
        
        ajaxKev('POST',{
            id:'I-ETIQUETA',
            txtNombrev,
            txtDetallesv,
            txtPesov,
            txtPreciov
        },
        (data)=>{
            //console.log("resultados...",data);
            if(data.eval){
                sweetModal(`Se guardo exitosamente.`,'center','success',1500);            
            }else{
                sweetModal(`Error! No se pudo procesar la peticion.`,'center','error',1500);            
            }
        })

    }else{        
        sweetModalMin('Error! Rellenar campos.','top-end',1500,'error');
    }
}
//****************************************************************************************** */
//****************************************************************************************** */
//****************************************************************************************** */



//****************************************************************************************** */

function dataHtml_Usuario() {
    let progress = document.querySelector("#progresoUsuario");
    let btnGuardarUsuario = document.querySelector("#btnGuardarUsuario");
    let txtDni = document.querySelector("#txtDni");
    let txtNombre = document.querySelector("#txtNombre");
    let txtUsuario = document.querySelector("#txtUsuario");
    let txtPassword = document.querySelector("#txtPassword");
    let txtApellido = document.querySelector("#txtApellido");
    let radioNivelUsuario = document.querySelector("input[name='radioNivelUsuario']:checked"); //value
    let switchEstado = document.querySelector("#switchEstado"); //checked

    return {
        element : {
            progress, btnGuardarUsuario, txtDni,txtNombre,txtUsuario,txtPassword,txtApellido,radioNivelUsuario,switchEstado
        },
        value:{
            txtDniv: txtDni.value.trim(),
            txtNombrev: txtNombre.value.trim(),
            txtUsuariov: txtUsuario.value.trim(),
            txtPasswordv: txtPassword.value.trim(),
            txtApellidov: txtApellido.value.trim(),
            radioNivelUsuariov: radioNivelUsuario.value.trim(),
            switchEstadov: switchEstado.checked
        }
    };
}

function evaluarInsertarUsuario(){
    let dataHtml = dataHtml_Usuario();
    let {progress,txtDni,txtNombre,txtUsuario,txtPassword,txtApellido,radioNivelUsuario} = dataHtml['element'];
    let {txtDniv,txtNombrev,txtUsuariov,txtPasswordv,txtApellidov,radioNivelUsuariov,switchEstadov} = dataHtml['value'];
    let progres_val = 0;    

    intercambiaClases(txtDni,'is-valid','is-invalid',false);
    intercambiaClases(txtNombre,'is-valid','is-invalid',false);
    intercambiaClases(txtUsuario,'is-valid','is-invalid',false);
    intercambiaClases(txtPassword,'is-valid','is-invalid',false);
    intercambiaClases(txtApellido,'is-valid','is-invalid',false);


    if(txtDniv.length != 0 || txtNombrev.length != 0 || txtUsuariov.length != 0 || txtPasswordv.length != 0 || txtApellidov.length != 0 || radioNivelUsuariov.length != 0){
        
        if(txtDniv.length == 8){
            intercambiaClases(txtDni,'is-invalid','is-valid',true)
            progres_val += 100/7;
        }
        
        (switchEstadov) ? progres_val += 100/7 : progres_val += 100/7;
        
        var obj = [txtNombre,txtUsuario,txtPassword,txtApellido,radioNivelUsuario];          
        obj.forEach(element => {   
            if(element.value.trim().length != 0){
                intercambiaClases(element,'is-invalid','is-valid',true)
                progres_val += 100/7;
            }
        });
        
        progress.style.width = progres_val+'%';
        console.log(progres_val);
        if(progres_val >= 100){
            intercambiaClases(progress,'bg-info','bg-success',true);
            return true;
        }else{
            intercambiaClases(progress,'bg-success','bg-info',true);
            return false;
        }

    }else{        
        return false;        
    }

}
function btnInsertarUsuario(){

    if(evaluarInsertarUsuario()){
        
        let dataHtml = dataHtml_Usuario();
        let {txtDniv,txtNombrev,txtApellidov,txtUsuariov,txtPasswordv,radioNivelUsuariov,switchEstadov} = dataHtml['value']

        ajaxKev('POST',{
            id:'I-USUARIO',
            txtDniv,
            txtNombrev,
            txtApellidov,
            txtUsuariov,
            txtPasswordv,
            radioNivelUsuariov,
            switchEstadov
        },
        data=>{
            console.log(data)
            if(data.eval){
                sweetModal('Se Guardo un Usuario!','center','success',1500);
            }else{
                sweetModal('No Se pudo procesar la informacion!','center','error',1500);

            }
        })
        
    }else{
        sweetModal('Error! Llenar los campos vacios.','center','error',1500);
    }
}

//****************************************************************************************** */
//****************************************************************************************** */
//****************************************************************************************** */




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
 * Intercambia una clase una por otra
 * en el intento de que no exista las calses que se quiere eliminar y agregar, se intará agregar una clase
 */
function intercambiaClases(element, removeClass, addClass, existe){
    if(element.classList.contains(removeClass) && !element.classList.contains(addClass) && existe){
        element.classList.remove(removeClass);
        if(addClass.trim() != "")element.classList.add(addClass);        
    }else{
        if(!existe){
            if(element.classList.contains(removeClass) && !element.classList.contains(addClass)){
                intercambiaClases(element, removeClass, addClass, true);
            }else{
                if(element.classList.contains(removeClass)){
                    element.classList.remove(removeClass);
                }
                if(!element.classList.contains(addClass)){
                    if(addClass.trim() != "")element.classList.add(addClass);
                }
            }
        }
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