

function obtenerEtiqueta_s(){
    console.log("salid")
    let element = document.querySelector("#etiqueta_select");
    let nombre = element.selectedOptions.item(0).innerText;
    let id = element.value;
    document.querySelector(".btnEntrenarTxt").innerHTML = `${nombre}`;   
}



function buscarEtiqueta($this){
        
    if($this.value.trim().length == 8 ){
        // Estilos Elemento input: Ingrese DNI
        $this.style.background = "transparent";
        $this.style.border = "1px solid #00bc8c";    
        $this.style.color = "white";  
        // datos obtenidos del input
        let dni = $this.value;
        let url = './ajax/procesarAjax.php'; //dirección archivo que va procesar la consulta
        fetchKev('POST',{
            id:'S-ETIQUETAS-MN',
            dni
        },data=>{

            let myHtml = ``;//guarda el resultado Select-etiqeuta de la consulta
            //Se evalua que exista resultados de etiquetas del dni-usuari consultado
            if(data.eval){
                myHtml=`
                    <select class="custom-select form-control text-uppercase" id="etiqueta_select" onclick="obtenerEtiqueta_s()">
                        <option selected="0" value="-1" class="form-control form-control-lg p-2 bg-light ">Seleccionar Etiqueta</option> 
                `;
                let name_lastname; //nombre y apellido del usuario de la consulta
                data.data.forEach(element => {
                    name_lastname =`${ element.user_name } ${element.user_lastname}`;
                    myHtml +=`
                        <option value='${element.idresiduo}' class='form-control p-2 bg-light' >${element.nombre}</option>
                    `;
                });
                myHtml +=`</select>`;
                //mensaje modal sweet
                sweetModalMin('Usuario encontrado!','top-start',1500,'success');
                //Escribe el nombre y apellido del usuario consultado a traves del input-dni
                document.querySelector(".usuario-nombre").innerHTML = `${name_lastname}`;
                // CARGANDO... para que de la impreion de que cargan los datos  
                document.querySelector("#option-select").innerHTML = `
                    <p class="text-center">
                        <i class="fas fa-spinner fa-spin fa-3x"></i> </br>
                        Cargando...
                    </p>
                `; 
                // Imprime las etiquetas option-select después de un tiempo, reemplazando el CARGANDO...
                setTimeout(()=>{
                    document.querySelector("#option-select").innerHTML = myHtml; 
                },5000)

            //No existen etiquetas, o usuario del dni ingresado
            }else{                                
                myHtml = `
                <select class="custom-select form-control text-uppercase" id="etiqueta_select" onclick="obtenerEtiqueta_s()">
                    <option selected="0" value="-1" class="form-control form-control-lg p-2 bg-light ">Seleccionar Etiqueta</option>                     
                </select>
                `;
                
                // mensaje modal de no encontrado 
                sweetModalMin('Usuario No encontrado!','top-start',1500,'warning');
                //Imprimer select
                document.querySelector("#option-select").innerHTML = myHtml; 
                //Nombre y apellido no encontrado
                document.querySelector(".usuario-nombre").innerHTML = "usuario No Encontrado...";
            }
            
            //texto del boton entrenar
            document.querySelector(".btnEntrenarTxt").innerHTML = "Etiqueta sin seleccionar"; 

        },url);

    }else{
        // Estilos Elemento input
        $this.style.background = "transparent";
        $this.style.border = "1px solid #375a7f";    
        $this.style.color = "white";
    }

}



/*

function tratarEtiqueta(etiqueta){
    let nombre, id;
    let arrayResult = etiqueta.split(",");
    nombre = arrayResult[0];
    id = arrayResult[1];

    return {nombre,id};    
}

let res = tratarEtiqueta("kevin,3");
console.log(res.nombre);
*/