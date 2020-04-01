console.log("CARGADO => main.js");

/**
 * 
 */
evalSesion();



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