let camara;
let width, height;

function setup() {
    let miCanvas = document.getElementById("canvas");
    width = miCanvas.offsetWidth;
    height = miCanvas.offsetHeight;
    let sketchCanvas = createCanvas(width,200);
    sketchCanvas.parent("canvas");
    background("#123");
    
    camara = createCapture(VIDEO);
    camara.size(width,200);
    camara.hide();

    createP("Esto es un texto");
}

function draw() {
    ellipse(100,75,80,80);
    image(camara, 0,0,200,200);
}