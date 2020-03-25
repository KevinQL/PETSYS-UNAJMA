document.getElementById("btn-tocar").addEventListener("click",()=>{

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let data = JSON.parse(this.responseText); 
            console.log("datos llegando:",data);
        }
    }
    xhr.open('POST','/msj',true);
    xhr.send();

})

document.getElementById("btn-cambTiempo").addEventListener('click',()=>{
    
    let xhr = new XMLHttpRequest();
    let time = document.getElementById("valor").value == ""?"0":document.getElementById("valor").value;
    let = basura = "BOTELLA";
    let activar = true;
    let misdatos = "tipoBasura="+basura;
    misdatos += "&activar="+activar;

    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let data = JSON.parse(this.responseText); 
            console.log("datos llegando:",data);
        }
    }
    xhr.open('POST', "/datoReciclaje/"+time, true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //xhr.setRequestHeader("Content-length", misdatos.length);
    //xhr.setRequestHeader("Connection", "close");

    xhr.send(misdatos);
})

//OTRO TIPO
document.getElementById("btn-cambTiempo2").addEventListener('click',()=>{
    
    let xhr = new XMLHttpRequest();
    let time = document.getElementById("valor").value == ""?"0":document.getElementById("valor").value;
    let = basura = "OTRO";
    let activar = true;
    let misdatos = "tipoBasura="+basura;
    misdatos += "&activar="+activar;

    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let data = JSON.parse(this.responseText); 
            console.log("datos llegando:",data);
        }
    }
    xhr.open('POST', "/datoReciclaje/"+time, true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //xhr.setRequestHeader("Content-length", misdatos.length);
    //xhr.setRequestHeader("Connection", "close");

    xhr.send(misdatos);
})