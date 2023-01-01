const enemy01 = document.getElementById("enemy01");
const enemy02 = document.getElementById("enemy02");
const enemy03 = document.getElementById("enemy03");
const enemy04 = document.getElementById("enemy04");
const enemy05 = document.getElementById("enemy05");
const enemy06 = document.getElementById("enemy06");
const enemy07 = document.getElementById("enemy07");
const enemy08 = document.getElementById("enemy08");
const enemy09 = document.getElementById("enemy09");
const enemy10 = document.getElementById("enemy10");
const enemy11 = document.getElementById("enemy11");
const enemy12 = document.getElementById("enemy12");
const btnCrear = document.getElementById("btnCrear");
const btnMatar = document.getElementById("btnMatar");
const btnLanzar = document.getElementById("btnLanzar");
const btnCantidad = document.getElementById("btnCantidad");
const btnLados = document.getElementById("btnLados");
const resultado = document.getElementById("resultado");
const btnDer = document.getElementById("btnIzq");
const btnIzq = document.getElementById("btnDer");
const btnLadoMas = document.getElementById("btnLadoMas");
const btnLadoMenos = document.getElementById("btnLadoMenos");
const item = document.getElementById("item");
const arbol = "images/tree.svg";
const animal = "images/animal.svg";
const piedra = "images/stone.svg";
let posicion = 1;
//resultado.innerText = "Hola"


//enemy01.style.background = "black";
// enemy01.src = "images/x.svg";
// enemy01.src.fill = "red";
btnIzq.onclick = () => {
    
    switch (posicion) {
        case 1:
            item.src= piedra;
            posicion = 3;
            console.log(posicion);
            break;
        case 2:
            item.src = animal;
            posicion = 1;
            console.log(posicion);
            break;
        case 3:
            item.src = arbol;
            posicion = 2;
            console.log(posicion);
            break;
    }

}
btnDer.onclick = () => {
    switch (posicion) {
        case 1:
            item.src = piedra;
            posicion = 2;
            console.log(posicion);
            break;
        case 2:
            item.src = animal;
            posicion = 3;
            console.log(posicion);
            break;
        case 3:
            item.src = arbol;
            posicion = 1;
            console.log(posicion);
            break;
    }
}

btnIzq.on
