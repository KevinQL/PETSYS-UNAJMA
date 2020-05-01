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


// Registro de usuarios para que sean verificados por un administrador
//****************************************************************************************** */
function btnInsertarUsuario_inicio(){

    if(evaluarInsertarUsuario()){
        
        let dataHtml = dataHtml_Usuario();
        let {txtDniv,txtNombrev,txtApellidov,txtUsuariov,txtPasswordv,radioNivelUsuariov,switchEstadov} = dataHtml['value']

        ajaxKev('POST',{
            id:'I-USUARIO-INICIO',
            txtDniv,
            txtNombrev,
            txtApellidov,
            txtUsuariov,
            txtPasswordv,
            radioNivelUsuariov:'usuario',
            switchEstadov:false
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
function dataHtml_Estacion(){
    let progresoEstacion = document.querySelector("#progresoEstacion");
    let txtNombre = document.querySelector("#txtNombre");
    let txtUbicacion = document.querySelector("#txtUbicacion");
    let txtDepartamento = document.querySelector("#txtDepartamento");
    let txtProvincia = document.querySelector("#txtProvincia");
    let txtDistrito = document.querySelector("#txtDistrito");

    return {
        element:{progresoEstacion,txtNombre,txtUbicacion,txtDepartamento,txtProvincia,txtDistrito},
        value:{
            txtNombrev: txtNombre.value.trim().toLowerCase(),
            txtUbicacionv: txtUbicacion.value.trim().toLowerCase(),
            txtDepartamentov: txtDepartamento.value.trim().toLowerCase(),
            txtProvinciav: txtProvincia.value.trim().toLowerCase(),
            txtDistritov: txtDistrito.value.trim().toLowerCase(),
            estadov:true
        }
    };
}
function evaluar_Estacion(){
    let dataHtml = dataHtml_Estacion();
    let {progresoEstacion,txtNombre,txtUbicacion,txtDepartamento,txtProvincia,txtDistrito} = dataHtml['element'];
    let {txtNombrev,txtUbicacionv,txtDepartamentov,txtProvinciav,txtDistritov,estadov} = dataHtml['value'];
    let progres_val = 0;

    intercambiaClases(progresoEstacion,'bg-success','bg-info',false);
    progresoEstacion.style.width = progres_val + '%';

    let arrElement = [txtNombre,txtUbicacion,txtDepartamento,txtProvincia,txtDistrito];
    
    let tempElmentv;
    arrElement.forEach(element => {
        intercambiaClases(element,'is-valid','is-invalid',false); 
        tempElmentv = element.value.trim().toLowerCase()
        if(tempElmentv != 0){
            if(element.id === "txtDepartamento"){
                let departament = ['apurimac','amazonas','áncash','arequipa','ayacucho','cajamarca','callao','cusco','huancavelica','huánuco','ica','junín','la libertad','lambayeque','lima','loreto','madre de dios','moquegua','pasco','piura','puno','san martín','tacna','tumbes','ucayali'];
                if(departament.includes(tempElmentv)){
                    progres_val += 100/6;
                    intercambiaClases(element,'is-invalid','is-valid',true); 
                }
            } else if(element.id === "txtProvincia"){
                if(txtDepartamentov === "apurimac"){
                    let province = ['andahuaylas','abancay','antabamba','aymaraes','chincheros','cotabambas','grau'];
                    if(province.includes(tempElmentv)){
                        progres_val += 100/6;
                        intercambiaClases(element,'is-invalid','is-valid',true); 
                    }
                }
            } else if(element.id === "txtDistrito"){
                if(txtProvinciav === "andahuaylas" && txtDepartamentov === "apurimac"){
                    let distrite = ['andahuaylas','san jerónimo','talavera de la reina'];
                    if(distrite.includes(tempElmentv)){
                        progres_val += 100/6;
                        intercambiaClases(element,'is-invalid','is-valid',true); 
                    }
                }
            }
            else{
                progres_val += 100/6;
                intercambiaClases(element,'is-invalid','is-valid',true);   
            }           
        }     
    });

    progres_val += (estadov)? 100/6 : 0;

    progresoEstacion.style.width = progres_val + '%';
    if(progres_val >= 100){
        intercambiaClases(progresoEstacion,'bg-info','bg-success',true);
        return true;
    }else{        
        return false;
    }
}
function execute_Estacion(){
    if(evaluar_Estacion()){

        let dataHtml = dataHtml_Estacion();
        let {txtNombrev,txtUbicacionv,txtDepartamentov,txtProvinciav,txtDistritov,estadov} = dataHtml['value'];

        ajaxKev('post',{
            id:'I-ESTACION',
            txtNombrev,
            txtUbicacionv,
            txtDepartamentov,
            txtProvinciav,
            txtDistritov,
            estadov
        }, data => {   
            console.log(data);
            if(data.eval){
                sweetModal('Datos procesados correctamente!','center','success',1500);            
            }else{
                sweetModal('Error al procesar datos!','center','error',1500);
            }
        });
    }else{
        sweetModalMin('Falta completar los campos!','top',1500,'warning');
    }
}

//****************************************************************************************** */
//****************************************************************************************** */
//****************************************************************************************** */


//****************************************************************************************** */
function dataHtml_Estacion_Asignar(){
    let txtbuscar = document.querySelector("#txtbuscarEstacion");
    let tblEstacion = document.querySelector("#tblEstacion");

    return {
        element : {txtbuscar, tblEstacion},
        value : {
            txtbuscarv:txtbuscar.value.trim().toLowerCase()
        }
    };
}
function evaluar_Estación_Asignar(){
    let dataHtml = dataHtml_Estacion_Asignar();
    let {txtbuscarv} = dataHtml['value'];

    if( txtbuscarv.length != 0 ){
        return true;
    }else{
        return false;
    }

}
//puede llamarse a la función si ninguna dependencia de la fn-evaluacion. 
function execute_Estacion_Asignar(){    
 
    let dataHtml = dataHtml_Estacion_Asignar();
    let {tblEstacion} = dataHtml['element'];
    let {txtbuscarv} = dataHtml['value'];
    
    if(!evaluar_Estación_Asignar()){
        txtbuscarv="";
    }

    ajaxKev('POST',{
        id:'S-ESTACION',
        txtbuscarv
    }, data => {
        // codigo que se ejecuta después de realizar la consulta en la db
        console.log(data);
        let my_html="";
        data['data'].forEach(element => {
            my_html +=`
            <tr class="table-secondary">
                <th scope="row" class="">${element.nombre}</th>
                <td>${element.ubicacion}</td>
                <td>${element.provincia}</td>
                <td>${element.departamento}</td>
                <td class="text-center" >
                    <button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#exampleModal" onclick="id_estation(${element.idestacion})">ASIGNAR</button>
                </td>
            </tr>  
            `;   
            
        });
        tblEstacion.innerHTML = my_html;
    })

}
//---------------------
function dataHtml_Estacion_usuario(){
    let txtDni = document.querySelector("#aueM_txtDni");
    let txtNombre = document.querySelector("#aueM_txtNombre");
    let txtApellido = document.querySelector("#aueM_txtApellido");
    let btnAsignar = document.querySelector("#aueM_btnAsignar");
    let id_station = document.querySelector("#aueM_id_station");
    let id_user = document.querySelector("#aueM_id_user");
    let btncloseModal = document.querySelector('#cerrarModal');

    return {
        element : {txtDni, txtNombre, txtApellido, btnAsignar, id_station, id_user, btncloseModal},
        value : {
            txtDniv: txtDni.value.trim(),
            txtNombrev: txtNombre.value.trim().toLowerCase(),
            txtApellidov: txtApellido.value.trim().toLowerCase(),
            id_stationv: id_station.value.trim(),
            id_userv: id_user.value.trim()
        }
    };
}

function evaluar_Estacion_usuario(){
    let dataHtml = dataHtml_Estacion_usuario();
    let {txtDniv} = dataHtml['value'];
    let {txtDni, txtNombre, txtApellido} = dataHtml['element'];

    if(!isNaN(txtDniv) && txtDniv.length == 8){        
        intercambiaClases(txtDni,'is-invalid','is-valid',false);        
        return true;
    }else{
        if(isNaN(txtDniv)){
            sweetModalMin('Ingrese un Dni!',"top",1000,'warning')
        }        
        intercambiaClases(txtDni,'is-valid','is-invalid',false);
        txtNombre.value = "";
        txtApellido.value = "";
        return false;
    }
}

function execute_obtener_Usuario_Est(){
    //funcion que trae usuario      
    if(evaluar_Estacion_usuario()){
        let dataHtml = dataHtml_Estacion_usuario()
        let {txtDniv} = dataHtml['value'];
        let {txtNombre, txtApellido, id_user} = dataHtml['element'];
        
        ajaxKev('POST',{
            id:'S-USUARIO-ESTACION',
            txtDniv
        }, data=>{     
            console.log(data)   
            if(data.eval){
                txtNombre.value = data.data.nombre;
                txtApellido.value = data.data.apellido;
                id_user.value = data.data.id;
                sweetModalMin('Usuario Encontrado!',"top",1000,'success')
            }else{
                txtNombre.value = "";
                txtApellido.value = "";
                sweetModalMin('No se encontró usuario!',"top",1000,'info')
            }
        })
    }
}
//obtiene el id de la estación seleccionada. Esto ocurre cuando le dan click al btn de ASIGNAR
function id_estation($id_station){
    //add id_station in the modal for every buttom
    let dataHtml = dataHtml_Estacion_usuario();
    let {txtNombre,txtApellido,txtDni,id_station,id_user} = dataHtml['element'];
    id_station.value = $id_station;
    //clean the inputs. Limpia el formulario del modal
    id_user.value="";

    txtNombre.value = "";
    txtApellido.value = "";
    txtDni.value = "";
    intercambiaClases(txtDni,'is-invalid','',false);
    intercambiaClases(txtDni,'is-valid','',false);
}
//btn enviar guardar asignacion
function execute_Usuario_Estacion(){

    if(evaluar_Estacion_usuario()){
        let dataHtml = dataHtml_Estacion_usuario();
        let {btncloseModal} = dataHtml['element'];
        let {txtNombrev,txtApellidov,id_stationv,id_userv} = dataHtml['value'];

        //evaluar que nombre y apellido estén vacios para INSERTAR
        if(txtNombrev.length != 0 && txtApellidov.length != 0 && id_stationv.length != 0 && id_userv.length != 0){
            ajaxKev('POST',{
                id:'I-ESTACION-USUARIO',
                id_stationv,
                id_userv
            },data=>{
                if(data.eval){
                    execute_Estacion_Asignar();
                    sweetModal('Se proceso la petición!','center','success',1500)
                    setTimeout(()=>{
                        btncloseModal.click();
                    },1000);
                }else{
                    sweetModalMin('No se pudo procesar la petición!','top-end',1500,'error');
                }
            });            
        }
    }else{
        sweetModalMin('debe completar los datos!','top-end',1500,'warning');
    }

}

//****************************************************************************************** */
//****************************************************************************************** */
//****************************************************************************************** */

function dataHtml_update_Estacion_Asignar(){
    let txtBuscar = document.querySelector("#txtupdate-estacion");
    let tblres = document.querySelector("#tblres-update");
    
    let closeModal = document.querySelector("#UPD_cerrarModal");

    let txtDni = document.querySelector("#UPD_aueM_txtDni");
    let txtNombre = document.querySelector("#UPD_aueM_txtNombre");
    let txtApellido = document.querySelector("#UPD_aueM_txtApellido");
    let id_station = document.querySelector("#UPD_aueM_id_station");
    let id_user = document.querySelector("#UPD_aueM_id_user");

    let id_user_select = document.querySelector("#UPD_aueM_id_user_select");

    return {
        element:{ txtBuscar, tblres, txtDni, txtNombre, txtApellido, id_station, id_user, closeModal, id_user_select },
        value:{
            txtBuscarv: txtBuscar.value.trim().toLowerCase(),
            txtDniv: txtDni.value.trim().toLowerCase(),
            txtNombrev: txtNombre.value.trim().toLowerCase(),
            txtApellidov: txtApellido.value.trim().toLowerCase(),
            id_stationv: id_station.value.trim().toLowerCase(),
            id_userv: id_user.value.trim().toLowerCase(),
            id_user_selectv: id_user_select.value.trim().toLowerCase() 
        }
    }
}

/**
 * Trae los rgstros de las estaciones que ya están configurados con un usuario
 */
function execute_update_Estacion_Asignar(){
    
    let dataHtml = dataHtml_update_Estacion_Asignar();
    let { tblres } = dataHtml['element'];
    let { txtBuscarv } = dataHtml['value'];

    ajaxKev('POST',{
        id:'S-ESTACION-CONFIG',
        txtBuscarv
    },
    data=>{        
        let my_html = ``;        
        if(data.eval){
            data.data.forEach(element => {
                my_html += `
                    <tr class="table-secondary" id="regis-${element.idestacion}">
                        <th scope="row" class="modif-name" contenteditable>${element.nombre}</th>
                        <td class="modif-ubicacion" contenteditable>${element.ubicacion}</td>
                        <td class="bg-warning">${element.nombre_usuario} ${element.apellido}</td>
                        <td>${element.provincia}</td>
                        <td class="text-center">
                            <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#updateUEModal" onclick="upd_id_estation(${element.idestacion},${element.id})">ACTUALIZAR</button>                                            
                        </td>
                    </tr>                
                `;
            });
        }
        
        tblres.innerHTML = my_html;

    })
}

//Imprime el id de la stacion y limpia los inputs después de hacer click en los botnes
function upd_id_estation(id, id_user_s){
    let dataHtml = dataHtml_update_Estacion_Asignar();
    let {id_station,id_user, txtNombre, txtApellido, txtDni, id_user_select} = dataHtml['element'];
    id_station.value = id; // Id de la Stación seleccionado
    id_user_select.value = id_user_s; // imprime el id del usuario que ya estaba asignado a la estación
    //clean the inputs xd. Limpia el formulario del modal
    cleanInputs( [id_user, txtNombre, txtApellido, txtDni] )
    intercambiaClases(txtDni,'is-invalid','',false);
    intercambiaClases(txtDni,'is-valid','',false);
}

//Evalua el input buscar usuario por dni
function evaluar_update_Estacion_usuario(){
    let dataHtml = dataHtml_update_Estacion_Asignar();
    let {txtDniv} = dataHtml['value'];
    let {txtDni, txtNombre, txtApellido, id_user} = dataHtml['element'];

    if(!isNaN(txtDniv) && txtDniv.length == 8){        
        intercambiaClases(txtDni,'is-invalid','is-valid',false);   
        return true;
    }else{
        if(isNaN(txtDniv)){
            sweetModalMin('Ingrese un Dni!',"top",1000,'warning')
        }        
        intercambiaClases(txtDni,'is-valid','is-invalid',false);
        cleanInputs( [txtNombre, txtApellido, id_user] )
        return false;
    }
}

//Obtiene el usuario del dni introducido en el buscador
function execute_upd_obtener_Usuario_Est(){
    if(evaluar_update_Estacion_usuario()){
        let dataHtml = dataHtml_update_Estacion_Asignar();

        let {txtDniv, id_userv, id_user_selectv} = dataHtml['value'];
        let {txtNombre, txtApellido, id_user} = dataHtml['element'];
        
        ajaxKev('POST',{
            id:'S-USUARIO-ESTACION',
            txtDniv
        }, data=>{     
            if(data.eval){
                txtNombre.value = data.data.nombre;               
                txtApellido.value = data.data.apellido;
                id_user.value = data.data.id;
                //evalua que el usuario solicitado sea diferente al registrado
                if(id_user_selectv == data.data.id){
                    sweetModalMin('El usuario ya está registrado!',"top",1000,'warning')                    
                }
            }else{
                cleanInputs([txtNombre,txtApellido,id_user])
                sweetModalMin('No se encontró usuario!',"top",1000,'info')
            }
        })

    }

}

//Actualiza el usuario para la estación
function execute_upd_Usuario_Estacion(){

    let dataHtml = dataHtml_update_Estacion_Asignar();
    let {closeModal} = dataHtml['element'];

    if(evaluar_update_Estacion_usuario()){
        let {id_userv, id_stationv} = dataHtml['value'];
        
        if(id_userv.length != 0 && id_stationv.length != 0){

            let data = {id:'UPDATE_USER_STATION', id_userv, id_stationv};
            let url = './ajax/procesarAjax.php';

            fetchKev('POST',
                data,
                ( data ) => {

                    if(data.eval){

                        sweetModal('Usuario Actualizado!','center','success',1500);
                        execute_update_Estacion_Asignar(); //actualizar tabla con el nuevo usuario
                        // Cerrar modal                
                        setTimeout(()=>{
                            closeModal.click();
                            sweetModalMin('Se proceso correctamente!','bottom-end',5000,'success');
                        },1500);

                    }else{
                        sweetModalMin('Ya registrado!','top',1500,'warning');
                    }
                },
                url
            );
        }else{
            sweetModalMin('Usuario no seleccionado!','center',1500,'warning')
        }
    }else{
        sweetModalMin('No se ingreso Datos!','bottom-end',1500,'error')
        setTimeout(()=>{
            closeModal.click();
        },1500);
    }    
}

//PRUEBA PARA REALIZAR ACTUALIZACIONES POR FILAS-REGISTROS--------
function estudiarEtiqueta($this,id){
    let mod_nombre = $this.parentNode.parentNode.querySelector(".modif-name").innerText;
    let mod_ubicacion = $this.parentNode.parentNode.querySelector(".modif-ubicacion").innerText;
    console.log(mod_nombre,mod_ubicacion);

    /*
    // 1. solucion alternativa para obtener los datos a actualizar 
    // 2. recibo el id del regsitro, luego hago ubico el regiatro con el apoyo del id, para acceder a los datos a modificar

    let idElement = "#regis-"+id;
    let tr = document.querySelector(idElement);

    let dta_name = tr.querySelector(".modif-name").innerText;
    let dta_adress = tr.querySelector(".modif-ubicacion").innerText;

    console.log(dta_name,dta_adress);
    */

}


//****************************************************************************************** */
//****************************************************************************************** */
//****************************************************************************************** */
//****************************************************************************************** */
//****************************************************************************************** */

/**
 * Elementos inputs para ser limpiados.
 * @param {Array} arrElement 
 */
//funcion para limpiar
function cleanInputs(arrElement){
    arrElement.forEach( element => {
        element.value = "";
    })
}



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
 * @param {Object} element Etiqueta HTML. Podría  ser un 'input', o cualquier etiqueta, pero como objeto, osea un (documen.querySelector(id);)
 * @param {String} removeClass Nombre de la clase que se quiere eliminar, quitar de la Etiqueta.
 * @param {String} addClass Nombre de la clase que se quiere agregar, o concatenar al conjunto de clases existentes en la Etiqueta.
 * 
 * Intercambia una clase una por otra
 * en el intento de que no exista las calses que se quiere eliminar y agregar, se intará agregar una clase
 */
function intercambiaClases(element, removeClass, addClass, existe){
    if(element.classList.contains(removeClass) && !element.classList.contains(addClass) && existe){
        if(removeClass.trim() != "")element.classList.remove(removeClass);
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
 * @param {String} metodo Que puede ser GET o POST / o también se puede dejar vacio, valor por defaul POST
 * @param {Object} datajson Los datos que se enviarán al servidor
 * @param {Function} bloqueCode Función que procesará los datos que retornan del servidor
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



//FETCH MODIFICADOS
//-----------------------------

/**
 * 
 * @param {String} meth Que puede ser 'POST' o 'GET'
 * @param {Object} jsonData Datos que se enviarán al servidor para que sena procesados
 * @param {Function} fnRquest Aquí se tratarán los datos devueltos del servidor
 */
function fetchKev(meth, jsonData, fnRquest, urlProcess){
    let formData = new FormData();

    formData.append("data", JSON.stringify(jsonData));

    fetch(urlProcess,{
        method: meth,
        body: formData
    }).then( data => data.json())
    .then(data => {
        fnRquest(data);
    })
}



/**
 * 
 * @param {String} meth Que puede ser 'POST' o 'GET'
 * @param {Object} jsonData Datos que se enviarán al servidor para que sena procesados
 * @param {Object} jsonFile Datos de los archivos de cualquier tipo: png, .sql, .pdf... Etc
 * @param {Function} fnRquest Aquí se tratarán los datos devueltos del servidor
 */
function fetchFileKev(meth, jsonData, jsonFile, fnRquest, url){
    let formData = new FormData();

    for(nameIN in jsonFile){
        formData.append(nameIN, jsonFile[nameIN]);
    }    
    
    formData.append("data", JSON.stringify(jsonData));

    fetch(url,{
        method: meth,
        body: formData
    }).then( data => data.json())
    .then(data => {
        fnRquest(data);
    })
}



//funcion pruebaa en otros archivos 
function pruebaArchivo($msj){
    return "na memes-> "+$msj;
}