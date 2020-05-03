


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
 * @param {*} etiqueta 
 */
function tratarEtiqueta(etiqueta){
    let nombre_tag, id_tag;
    let arrayResult = etiqueta.split(",");
    nombre_tag = arrayResult[0];
    id_tag = arrayResult[1];

    return { 
        nombre_tag, 
        id_tag
    };    

}