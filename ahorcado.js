let palabras = ["hamburguesa", "plato", "pizza", "hipopotamo", "tren", "tercero", "tigre"];

let tamanoPalabra = 52;
let espacio = 8;

const iniciarJuego = document.querySelector(".juego");
const $botonesMenuPrincipal = document.querySelector(".botonesMenu");
const $botonesSeccionAgregar = document.querySelector(".botonesAgregar");
const agregarNuevaPalabra = document.querySelector(".nuevaPalabra");
const pantalla = document.querySelector('.lienzo');

let pantalla2 = document.querySelector('canvas');
let pincel = pantalla2.getContext('2d');
let fallos = 0;
let aciertos = 0;
let palabraAleatoria = elegirPalabra(palabras);;
let largo = palabraAleatoria.length*(tamanoPalabra+espacio);
let posX = (1150-largo)/2;

let letraPresionada = [];

function botonIniciar() {
    $botonesMenuPrincipal.style.display = "none";
    iniciarJuego.style.display = "flex";

    palabraAleatoria = elegirPalabra(palabras);
    largo = palabraAleatoria.length*(tamanoPalabra+espacio);
    posX = (1150-largo)/2;
    letraPresionada = [];

    fallos = 0;
    aciertos = 0;
    indicarLetras(palabraAleatoria);

    document.addEventListener('keypress',pantallaJuego , false);
}

function botonAbandonar() {
    $botonesMenuPrincipal.style.display = "flex";
    iniciarJuego.style.display = "none";
    pincel.clearRect(0, 0, pantalla2.width, pantalla2.height);
    location.reload();    
    aciertos=0;
    fallos=0;
}

function botonNuevo(){
    pincel.clearRect(0, 0, pantalla2.width, pantalla2.height);
    pincel.resetTransform();

    palabraAleatoria = elegirPalabra(palabras);
    largo = palabraAleatoria.length*(tamanoPalabra + espacio);
    posX = (1150-largo)/2;
    letraPresionada = [];

    aciertos=0;
    fallos=0;
    indicarLetras(palabraAleatoria);
    document.addEventListener('keypress',pantallaJuego , false);
}

function botonAgregar() {
    $botonesMenuPrincipal.style.display = "none";
    $botonesSeccionAgregar.style.display = "flex";
    agregarNuevaPalabra.style.display = "flex";
}

function botonCancelar() {
    $botonesMenuPrincipal.style.display = "flex";
    iniciarJuego.style.display = "none";
    $botonesSeccionAgregar.style.display = "none";
    agregarNuevaPalabra.style.display = "none";
    agregarNuevaPalabra.value = "";
}

function botonGuardar() {

    if (agregarNuevaPalabra.value) {
        palabras.push(agregarNuevaPalabra.value);
        palabraAleatoria = agregarNuevaPalabra.value;

        iniciarJuego.style.display = "flex";

        $botonesSeccionAgregar.style.display = "none";
        agregarNuevaPalabra.style.display = "none";
        agregarNuevaPalabra.value = "";


        largo = palabraAleatoria.length*(tamanoPalabra+espacio);
        posX = (1150-largo)/2;
        letraPresionada = [];

        fallos = 0;
        aciertos = 0;
        indicarLetras(palabraAleatoria);

        document.addEventListener('keypress',pantallaJuego , false);
    }    
}

function elegirPalabra(palabras) {
    indice = Math.floor(Math.random()*palabras.length)
    return  palabras[indice]
}

function esLetra(str) {
    return (/[a-zA-Z]/).test(str);
  }

function pertenece(letra, palabra) {

    let indices = [];

    for (let i = 0; i < palabra.length; i++) {
        if (palabra[i] == letra) {
            indices.push(i);
        }

    }
    return indices;

}

function dibujarHombre(fallos){
    switch (fallos) {
        case 1:                    
            pincel.fillRect(300, 450, 600, 10);
            break;
        case 2:                    
            pincel.fillRect(450, 0, 10, 460);
            break;
        case 3:                    
            pincel.fillRect(450, 0, 250, 10);
            break;
        case 4:                    
            pincel.fillRect(690, 0, 10, 60);
            break;
        case 5:                    
            pincel.beginPath();
            pincel.arc(695, 100, 40, 0, 2*3.14);
            pincel.fill();
            pincel.fillStyle = '#f3f5fc';
            pincel.beginPath();
            pincel.arc(695, 100, 35, 0, 2*3.14);
            pincel.fill();
            pincel.fillStyle = '#0A3871';
            break;
        case 6:                    
            pincel.fillStyle = '#0A3871';
            pincel.fillRect(690, 140, 10, 130);
            break;
        case 7:                    
            pincel.translate(695,155);    
            pincel.rotate(45* Math.PI / 180);
            pincel.fillRect(0,0,100,10);
            break;
        case 8:
            pincel.translate(695,155);    
            pincel.rotate(315* Math.PI / 180);     
            pincel.fillRect(0,0,-100,10);
            break;
        case 9:
            pincel.translate(695,260);                
            pincel.rotate(45* Math.PI / 180);
            pincel.fillRect(0,0,100,10);
            break;
        case 10:
            pincel.translate(695,260);                                    
            pincel.rotate(315* Math.PI / 180);
            pincel.fillRect(0,0,-100,10);
            break;
        default:
            break;
    }
}

function ganar(aciertos,palabraAleatoria){
    if (aciertos == palabraAleatoria.length) {
        pincel.resetTransform();
        pincel.fillStyle = 'green';
        pincel.font = "30px Arial";
        pincel.fillText("Felicidades, ganaste!", 500, 400);
        document.removeEventListener('keypress',pantallaJuego , false);
    }

}

function perder(fallos){
    if (fallos == 10) {
        pincel.resetTransform();
        pincel.fillStyle = 'red';
        pincel.font = "30px Arial";
        pincel.fillText("¡Perdiste!", 500, 400);
        document.removeEventListener('keypress',pantallaJuego , false);
    }
}

function indicarLetras(palabraAleatoria) {

    pincel.resetTransform();
    pincel.fillStyle = '#0A3871'; 

    for (let i = 0; i < palabraAleatoria.length; i++) {
        pincel.resetTransform();
        pincel.fillRect(posX+((tamanoPalabra*i)+espacio*i),550,tamanoPalabra,10);        
    }   
}

function letraRepetida(letraPresionada,letra){
    let estado = false;
    for (let i = 0; i < letraPresionada.length; i++) {
        if(letra == letraPresionada[i]){
            estado = true;
        }     
    }
    return estado;
}

function pantallaJuego(event) {
    let letra = event.key;
    let indices = pertenece(letra, palabraAleatoria);

    console.log(indices.length)
    console.log(letra)
    pincel.resetTransform();

    if (iniciarJuego.style.display == "flex") {

        nonuevaLetra = letraRepetida(letraPresionada,letra)
        console.log(nonuevaLetra);
        console.log(letraPresionada);
        if (nonuevaLetra == false) {

            letraPresionada.push(letra);

            if (indices.length != 0) {
                for (let i = 0; i < indices.length; i++) {
                    aciertos+=1;
                    pincel.font = "40px Arial";
                    pincel.fillText(palabraAleatoria[indices[i]].toUpperCase(), (tamanoPalabra/5) + posX + ((tamanoPalabra*indices[i]) + espacio*indices[i]), 540);
                }
            }
            
            else{
                fallos+=1;
                console.log(fallos);

                pincel.fillStyle = '#0A3871';
                pincel.font = "20px Arial";
                pincel.fillText(letra.toUpperCase(), (tamanoPalabra/5) + posX + ((tamanoPalabra*(fallos-1)) + espacio*(fallos-1)), 600);

                dibujarHombre(fallos);
            } 
            perder(fallos);
            ganar(aciertos,palabraAleatoria);
        }
    }
}
