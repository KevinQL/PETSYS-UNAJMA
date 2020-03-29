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