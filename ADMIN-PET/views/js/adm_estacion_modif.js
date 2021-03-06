console.log("adm_estacion_modif.js loader");

function cargar_estacion(){
    console.log('CARGANDO ESTACION')
    let tbl_res = document.querySelector("#res-tbl-estacion");

    let data = {id:'obtener-estacion'};
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
                        <tr class="reg-${elem.idestacion}">
                            <th scope="row">${++cont}</th>
                            <td contenteditable="true">${elem.nombre}</td>
                            <td contenteditable="true">${elem.ubicacion}</td>
                            <td>${elem.departamento}</td>
                            <td>${elem.provincia}</td>
                            <td>${elem.distrito}</td>
                            <td>
                                <button type="button" class="btn btn-warning" onclick="actualizarEstacion('${elem.idestacion}')">
                                    Actualizar
                                </button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" onclick="eliminarEstacion('${elem.idestacion}')">
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


function actualizarEstacion($id){
    console.log("id actualizar ", $id )
    let reg = document.querySelector(".reg-"+$id);

    let idv, nombrev, ubicacionv, departamentov, provinciav, distritov;
    idv = $id
    nombrev = reg.cells[1].innerText
    ubicacionv = reg.cells[2].innerText
    departamentov = reg.cells[3].innerText
    provinciav = reg.cells[4].innerText
    distritov = reg.cells[5].innerText

    console.log({idv, nombrev, ubicacionv, departamentov, provinciav, distritov});
    data = {id:'actualizar-estacion', idv, nombrev, ubicacionv, departamentov, provinciav, distritov};
    let url = './ajax/procesarAjax.php';
    fetchKev('POST',
        data,
        res =>{
            console.log(res);
            if(res.eval){
                sweetModal('Estación actualizado!','center','success',1500);
                cargar_estacion();
            }else{
                sweetModal('Estación no actualizado!','center','warning',1500);
            }
        },
        url
    )

}


function eliminarEstacion($id){
    console.log("id eliminar ", $id )

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
                let data = {id:'eliminar-estacion', idv};
                let url = './ajax/procesarAjax.php';

                fetchKev('POST',
                    data,
                    res =>{
                        console.log(res);
                        if(res.eval){
                            sweetModal('Estación eliminado!','center','success',1500);
                            cargar_estacion();
                        }else{
                            sweetModal('Estación no eliminado!','center','warning',1500);
                        }
                    },
                    url
                )
            }
        }
    );

}