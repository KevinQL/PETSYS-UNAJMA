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
                            <td>${elem.user}</td>
                            <td>******</td>
                            <td>
                                <button type="button" class="btn btn-warning" onclick="actualizarUsuario('${elem.id}')">
                                    Actualizar
                                </button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" onclick="eliminarUsuario('${elem.id}')">
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
    let reg = document.querySelector(".reg-"+$id);

    let idv, dniv, nombrev, apellidov;
    idv = $id
    dniv = reg.cells[1].innerText
    nombrev = reg.cells[2].innerText
    apellidov = reg.cells[3].innerText

    console.log({idv, dniv, nombrev, apellidov});
    data = {id:'actualizar-usuario', idv, dniv, nombrev, apellidov};
    let url = './ajax/procesarAjax.php';
    fetchKev('POST',
        data,
        res =>{
            console.log(res);
            if(res.eval){
                sweetModal('Usuario actualizado!','center','success',1500);
                cargar_usuarios();
            }else{
                sweetModal('Usuario no actualizado!','center','warning',1500);
            }
        },
        url
    )

}

function eliminarUsuario($id){
    console.log('eliminar', $id)

    Swal.fire({
            title: 'Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
        }).then((result) => {
            
            if (result.isConfirmed) {

                let idv = $id;
                let data = {id:'eliminar-usuario', idv};
                let url = './ajax/procesarAjax.php';

                fetchKev('POST',
                    data,
                    res =>{
                        console.log(res);
                        if(res.eval){
                            sweetModal('Usuario eliminado!','center','success',1500);
                            cargar_usuarios();
                        }else{
                            sweetModal('Usuario no eliminado!','center','warning',1500);
                        }
                    },
                    url
                )


                
            }
        }
    );

}