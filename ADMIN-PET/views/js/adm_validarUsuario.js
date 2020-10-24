//Probando fuunciones de archivo main.js
//Console.log(pruebaArchivo("hola mundo"));

/**
 * 
 * @param {*} $this 
 * @param {*} id 
 */
function actualizar_tipoUsuario($this, id){
    
    let valor_tipoUser = $this.value;
    let id_user = id; 

    // console.log('ok enviar tipo!!',id_user, valor_tipoUser)
    //enviar datos al servidor para que se actualicen!!
    ajaxKev('POST',
        {
            id:'UPDATE_TIPOUSUARIOS_ADM',
            id_user,
            valor_tipoUser
        },
        (data)=>{
            $res = data.data;
            if(data.eval){
                // background para el registro modificado
                $id_reg = `.reg-${$res.id}`;
                let el = document.querySelector($id_reg)
                el.style.background = '#2B9EB3';
                
                sweetModalMin('Dato actualizado!',"top-right",2500,'success')
            }
            
        }
    )
}

/**
 * 
 * @param {*} $this 
 * @param {*} id 
 */
function actualizar_validarUsuario($this, id){
    let valor_validarUser = ($this.checked)?1:0;
    let id_user = id;

    console.log('ok enviar validar!!',id_user, valor_validarUser)
    //enviar datos al servidor para que se actualicen!!
    ajaxKev('POST',
        {
            id:'UPDATE_VALIDARUSUARIOS_ADM',
            id_user,
            valor_validarUser
        },
        (data)=>{
            console.log(data);
            $res = data.data;
            if(data.eval){
                // background para el registro modificado
                $id_reg = `.reg-${$res.id}`;
                let el = document.querySelector($id_reg)
                el.style.background = '#44AF69';

                sweetModalMin('Dato actualizado!',"top-right",2500,'success')
            }
            
        }
    )
}

