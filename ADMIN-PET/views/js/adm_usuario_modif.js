console.log("adm_usuario_modif.js loader");

console.log(pruebaArchivo("OK msj"))

// cargamos la lista de los usuario de la base de datos

function cargar_usuarios(){
    console.log('CARGANDO USUARIOS')
    let tbl_res = document.querySelector("#res-tbl-usuario");

    let data = {id:'obtener-usarios'};
    let url = './ajax/procesarAjax.php';
    fetchKev('POST',
        data,
        res=>{
            console.log(res);
            if(res.eval){
                let res_html = ``;
                let data = res.data;
                let cont = 0;
                data.forEach(elem => {
                    console.log(elem)
                    res_html += `
                        <tr class="reg-${elem.id}">
                            <th scope="row">${++cont}</th>
                            <td contenteditable="true">${elem.dni}</td>
                            <td contenteditable="true">${elem.nombre}</td>
                            <td contenteditable="true">${elem.apellido}</td>
                            <td contenteditable="true">${elem.user}</td>
                            <td>******</td>
                            <td>
                                <button type="button" class="btn btn-warning" onclick="actualizarUsuario('reg-${elem.id}')">
                                    Actualizar
                                </button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" onclick="eliminarUsuario('reg-${elem.id}')">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    `;
                });
                tbl_res.innerHTML = res_html;
            }
        },
        url
    );
}

function actualizarUsuario($id){
    console.log('actualizar', $id)
}

function eliminarUsuario($id){
    console.log('eliminar', $id)
}