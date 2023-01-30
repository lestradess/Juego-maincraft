
//const btnCreate = document.querySelector('#btnCreate');
const btnKill = document.querySelector("#btnKill");
const btnPosEnemy = document.querySelector("#btnPosEnemy");
const ataque = document.querySelector("#ataque");
const defensa = document.querySelector("#defensa");
const vida = document.querySelector("#vida");
const createTxt01 = document.querySelector("#createTxt01");
const createTxt02 = document.querySelector("#createTxt02");
//const eneCant = document.querySelector("#EnemigosCantidad");
const btnArboles = document.querySelector("#btnArboles");
const btnAnimales = document.querySelector("#btnAnimales");
const btnRocas = document.querySelector("#btnRocas");
const divArboles = document.querySelector("#divArboles");
const btnMapa = document.querySelector("#btnMapa");
const btnSupMapa = document.querySelector("#btnSupMapa");
const btnSupEnemigo = document.querySelector("#btnSupEnemigo");
const btnSupArbol = document.querySelector("#btnSupArbol");
const btnSupAnimal = document.querySelector("#btnSupAnimal");
const btnSupRoca = document.querySelector("#btnSupRoca");
const btnCrearBatalla = document.querySelector("#btnCrearBatalla");
const btnCamPosi = document.querySelector("#btnCamPosi");
const divCard = document.querySelector("#card");
const btnCancelar = document.querySelector("#btnCancelar"); 
//Enemigos vivos
let enemigosVivos = 12;
let posEnemigo = -1;
let enemyList = [ 1, 1, 1, 1, 2, 2, 3, 3, 4, 5, 6, 7 ];

//tablero de 30 x 20 = 600 casillas
const espaciosOcupadosSiempre = [ 1, 2, 21, 22, 19, 20, 39, 40, 269, 270, 271, 272, 289, 290, 291, 292, 309, 310, 311, 312, 329,
    330, 331, 332, 561, 562, 582, 579, 580, 581, 599, 600 ];
let celdasOcupadas = espaciosOcupadosSiempre.slice();
let celdasEnemigos = [];
let numEnemigosPosicion = 12;
let rondaPosEnemy = 0;
let enemigosCantidad = 12;
//eneCant.textContent = enemigosCantidad;

let celdasArboles = [];
let celdasAnimales = [];
let celdasRocas = [];

//Listerners**************************
eventListeners();
function eventListeners () {
    //btnCreate.addEventListener("click", newEnemy);
    //btnCreate.style.display = "none";
    //btnKill.addEventListener("click", killEnemy);
    //btnKill.style.display = "none";
    btnPosEnemy.addEventListener("click", () => {
        posicionarElementos("divEnemigos", "img/skull.svg", "red", "btn-danger", "enemigoTxt", "enemigoTxtDos");
    });
    //btnCantidad.addEventListener("click", positionCantidadEnemy);
    //btnCantidad.style.display = "none";
    btnMapa.addEventListener("click", posicionarMapa);
    btnArboles.addEventListener("click", () => {
        posicionarElementos("divArboles", "img/tree.svg", "#198754", "btn-success", "arbolTxt", "arbolTxtDos");
    });
    btnAnimales.addEventListener("click", () => {
        posicionarElementos("animales", "img/animal.svg", "#ffc107", "btn-warning", "animalTxt", "animalTxtDos")
    });
    btnRocas.addEventListener("click", () => {
        posicionarElementos("rocas", "img/stone.svg", "#0d6efd", "btn-primary", "rocaTxt", "rocaTxtDos");
    });
    btnSupMapa.addEventListener("click", () => {
        botonActivo("btnSupMapa");
    });
    btnSupEnemigo.addEventListener("click", () => {
        botonActivo("btnSupEnemigo");
    });
    btnSupArbol.addEventListener("click", () => {
        botonActivo("btnSupArbol");
    });
    btnSupAnimal.addEventListener("click", () => {
        botonActivo("btnSupAnimal");
    });
    btnSupRoca.addEventListener("click", () => {
        botonActivo("btnSupRoca");
    });
    btnCamPosi.addEventListener('click', () => {
        eventoElementos(btnCamPosi.value, 'cambiarPosicionEnemigos');
    });
    btnCrearBatalla.addEventListener('click', () => {
        crearBatalla(btnCrearBatalla.value);
    });
    btnCancelar.addEventListener('click',cancelar);

}
function botonActivo (text) {
    btnSupMapa.classList.remove("active");
    btnSupEnemigo.classList.remove("active");
    btnSupArbol.classList.remove("active");
    btnSupAnimal.classList.remove("active");
    btnSupRoca.classList.remove("active");
    switch (text) {
        case "btnSupMapa":
            btnSupMapa.classList.add("active");
            break;
        case "btnSupEnemigo":
            btnSupEnemigo.classList.add("active");
            break;
        case "btnSupArbol":
            btnSupArbol.classList.add("active");
            break;
        case "btnSupAnimal":
            btnSupAnimal.classList.add("active");
            break;
        case "btnSupRoca":
            btnSupRoca.classList.add("active");
            break;
        default:
            break;
    }
}
//Funciones***********************
//ENEMIGOS*****************************************************
function crearBatalla (valor) {
    const enemigo = document.getElementById(`#divEnemigo${valor}`);
    
}
function cancelar() {
    console.log("Entró a cancelar")
    for (let i = 1; i < enemigosVivos + 1; i++) {
        const enemigo = document.querySelector(`#divEnemigos${ i }`);
        enemigo.classList.remove("disabled");
        enemigo.classList.remove("btn-warning");
        enemigo.classList.add("btn-danger");
    }
}
function newEnemy () {
    if (posEnemigo != -1) {
        document.querySelector(`#enemy${ posEnemigo + 1 }`).src = "img/skull.svg";
    }
    createEnemy(eligeEnemigo(aleatorio(1, 100)));
    console.log(`ListadoActual ${ enemyList }`);
    markEnemy();
    btnKill.style.display = "block";
}
//Enemigo muerto *******************************************
function killEnemy () {
    enemyList[ posEnemigo ] = 0;
    console.log(`ListadoActual ${ enemyList }`);
    killEnemyImg();
    inserProps(0, 0, 0, 0);
    btnKill.style.display = "none";
    eliminarPosicionEnemigo();
    enemigosVivos--;
    if (enemigosVivos <= 0) {
        nuevaPartida();
    }
    // Cambiando la cantidad si es mayor que enemigos vivos
    if (enemigosCantidad > enemigosVivos) {
        enemigosCantidad = enemigosVivos;
        eneCant.textContent = enemigosCantidad;
        btnCantidad.style.display = "none";
    }
}
function positionCantidadEnemy () {
    enemigosCantidad++;
    if (enemigosCantidad > enemigosVivos) {
        eneCant.textContent = "1";
        enemigosCantidad = 1;
    } else {
        eneCant.textContent = enemigosCantidad;
    }
    console.log(enemigosCantidad);
}
function killEnemyImg () {
    document.querySelector(`#enemy${ posEnemigo + 1 }`).style.backgroundColor = '#333';
}
// Elección de enemigo y mostrar datos ****************************************************
function markEnemy () {
    document.querySelector(`#enemy${ posEnemigo + 1 }`).src = "img/skull_2.svg";
}
//Devuelve el level del enemigo
function eligeEnemigo (e) {
    if (e <= 50) return 1;
    if (e <= 70) return 2;
    if (e <= 80) return 3;
    if (e <= 85) return 4;
    if (e <= 90) return 5;
    if (e <= 99) return 6;
    return 7;
}
// Creación del enemigo
function createEnemy (enemigoLevel) {
    inserProps(selectProps(enemigoVivo(enemigoLevel)));
}
//Modifica las propiedades del enemigo y marca el enemigo activo
function inserProps (prop) {
    let props = [];
    props = prop;
    ataque.textContent = props[ 0 ];
    defensa.textContent = props[ 1 ];
    vida.textContent = props[ 2 ];
    tesoro.textContent = props[ 3 ];
}
//Nos dice si el enemigo elegido está vivo
function enemigoVivo (enemigoLevel) {

    if (estaVivo(enemigoLevel)) return enemigoLevel;

    while (enemigoLevel >= 2) {
        enemigoLevel--;
        console.log(`while01 Level: ${ enemigoLevel }`);
        if (estaVivo(enemigoLevel)) return enemigoLevel;

    }

    while (enemigoLevel <= 6) {
        enemigoLevel++;
        console.log(`while02 Level: ${ enemigoLevel }`);
        if (estaVivo(enemigoLevel)) return enemigoLevel;
    }
    console.log("Ya no hay enemigos vivos")
}
function estaVivo (enemigoLevel) {
    //buscamos si en el array hay algun enemigo de ese level 
    // -1 es no, si lo hay nos devuelve la posicion
    posEnemigo = enemyList.findIndex(e => e == enemigoLevel);
    if (posEnemigo > -1) {
        console.log(`vivo  pos: ${ posEnemigo + 1 } level: ${ enemigoLevel }`)
        return true;
    }
    console.log(`muerto?  pos: ${ posEnemigo } level: ${ enemigoLevel }`)
    return false;
}
// crea una nueva partida
function nuevaPartida () {
    createTxt01.textContent = "Partida Terminada";
    createTxt02.textContent = "Pulsa Para Una Nueva";
    btnCreate.style.backgroundColor = "green";
    btnCreate.addEventListener("click", () => {
        location.reload();
    });
}
//Retorna las caracteristicas de los enemigos
function selectProps (enemigoLevel) {
    switch (enemigoLevel) {
        case 1:
            //    ataque, defensa,     vida,  tesoro
            return [ 5, aleatorio(5, 10), 5, aleatorio(5, 10), "LV01" ];
        case 2:
            return [ 7, aleatorio(7, 12), 7, aleatorio(7, 12), " LV02" ];
        case 3:
            return [ 9, aleatorio(9, 14), 9, aleatorio(9, 14), " LV03" ];
        case 4:
            return [ 10, aleatorio(10, 16), 5, aleatorio(10, 16), " LV04" ];
        case 5:
            return [ 11, aleatorio(11, 18), 5, aleatorio(11, 18), " LV05" ];
        case 6:
            return [ 12, aleatorio(12, 20), 5, aleatorio(12, 20), " LV06" ];
        default:
            return [ 20, 20, 20, 20, " Jefe Final" ];
    }
}
function reposicionarEnemigos () {

    for (let i = 0; i < celdasEnemigos.length; i++) {
        let celda = celdasOcupadas.findIndex(e => e == celdasEnemigos[ i ])
        celdasOcupadas.splice(celda, 1);
    }
    //Elimina todos los elementos
    while (celdasEnemigos.length > 0) {
        celdasEnemigos.shift();
    };
    posicionarMapa();
    console.log("Reposicionar enemigos");
}

function positionEnemy () {




    // if (rondaPosEnemy != 0) {
    //     reposicionarEnemigos();
    // }
    // rondaPosEnemy++;
    // //Mostramos botón cantidad enemigos
    // btnCantidad.style.display = "block";

    // //Creamos array de enemigos celdas enemigos
    // for (let i = 1; i <= numEnemigosPosicion; i++) {
    //     let n = celdaLibre();
    //     celdasEnemigos.push(n);
    // }

    // //colocamos los enemigos en orden
    // celdasEnemigos.sort((a, b) => {
    //     if (a == b) {
    //         return 0;
    //     }
    //     if (a < b) {
    //         return -1;
    //     }
    //     return 1;
    // });
    // //Posicionamos enemigos
    // let pos;
    // for (let i = 0; i < numEnemigosPosicion; i++) {
    //     pos = document.querySelector(`#posE${ i + 1 }`);
    //     pos.textContent = celdasEnemigos[ i ];
    // }
    // console.log(`CE ${ celdasEnemigos }`);
    // posicionarMapa();
    // console.log("positionEnemy");
}

function eliminarPosicionEnemigo () {
    document.querySelector(`#posE${ numEnemigosPosicion }`).remove();
    numEnemigosPosicion--;
    let pos;
    for (let i = 1; i <= numEnemigosPosicion; i++) {
        pos = document.querySelector(`#posE${ i }`);
        pos.textContent = '';
    }
}


//Arboles Animales y rocas************************************
function posicionarElementos (div, imagen, colorA, btnClass, idA, idB) {
    const contenedorTotal = document.querySelector(`#${ div }`);
    let contador = 1;
    for (let z = 0; z < 1; z++) {
        const divBotones = document.createElement("div");
        divBotones.className = "row divBotones p-2";
        for (let i = 0; i < 12; i++) {
            const divBoton = document.createElement("div");
            divBoton.className = "d-grid col-3 col-lg-2 p-1";
            const boton = document.createElement("a");
            boton.className = `btn boton btn-lg ${ btnClass }`;
            boton.setAttribute("value", contador);
            boton.setAttribute("type", "button");
            boton.setAttribute("id", div + contador);
            boton.textContent = contador;
            boton.onclick = () => eventoElementos(boton.getAttribute("value"), div);
            const img = document.createElement("img");
            img.src = imagen;
            img.className = "icons";
            const celdaOld = document.createElement("h1");
            celdaOld.style.color = "#444";
            celdaOld.style.border = `1px solid #444`;
            celdaOld.textContent = "000";
            celdaOld.style.textAlign = "center";
            celdaOld.style.borderRadius = "0.5rem";
            celdaOld.setAttribute("id", idA + contador);
            const celdaDos = document.createElement("h1");
            celdaDos.className = "mt-2";
            celdaDos.style.color = colorA;
            celdaDos.style.border = `1px solid ${ colorA }`;
            celdaDos.textContent = contador;
            celdaDos.style.textAlign = "center";
            celdaDos.style.borderRadius = "0.5rem";
            celdaDos.setAttribute("id", idB + contador);
            boton.appendChild(img);
            divBoton.appendChild(celdaOld);
            divBoton.appendChild(boton);
            divBoton.appendChild(celdaDos);
            divBotones.appendChild(divBoton);
            contador++;
        }
        contenedorTotal.appendChild(divBotones);
    }
    switch (div) {
        case "divEnemigos":
            btnPosEnemy.style.display = "none";
            posicionarItemsEnArrays('enemigo', 12);
            celdasEnemigos.forEach((e, i) => {
                document.querySelector(`#enemigoTxtDos${ i + 1 }`).textContent = e;
            });
            posicionarMapa();
            for (let i = 1; i < enemigosVivos + 1; i++) {
                const enemigo = document.querySelector(`#divEnemigos${ i }`);
                enemigo.setAttribute("href", "#card");
                enemigo.setAttribute('data-bs-toggle', "collapse");
                enemigo.setAttribute("aria-expanded", "false");
                enemigo.setAttribute("aria-controls", "#card");
            }
            console.log("Posicionar elementos enemigos");
            break;
        case "divArboles":
            btnArboles.style.display = "none";
            posicionarItemsEnArrays('arbol', 12);
            celdasArboles.forEach((e, i) => {
                document.querySelector(`#arbolTxtDos${ i + 1 }`).textContent = e;
            });
            posicionarMapa();
            console.log("Posicionar elementos arboles");
            break;
        case "animales":
            btnAnimales.style.display = "none";
            posicionarItemsEnArrays('animal', 12);
            celdasAnimales.forEach((e, i) => {
                document.querySelector(`#animalTxtDos${ i + 1 }`).textContent = e;
            });
            posicionarMapa();
            console.log("Posicionar elementos animales");
            break;
        case "rocas":
            btnRocas.style.display = "none";
            posicionarItemsEnArrays('roca', 12);
            celdasRocas.forEach((e, i) => {
                document.querySelector(`#rocaTxtDos${ i + 1 }`).textContent = e;
            });
            posicionarMapa();
            console.log("Posicionar elementos rocas");
            break;

        default:
            break;
    }


}
//Se usa para cambiar de posición a un elemento al darle al botón div es el nombre e es el puesto.
function eventoElementos (e, div) {
    console.log("eventoElementos");
    switch (div) {
        case "cambiarPosicionEnemigos":
            const celdaEnemigos = document.querySelector(`#enemigoTxtDos${ e }`);
            document.querySelector(`#enemigoTxt${ e }`).textContent = celdaEnemigos.textContent;
            eliminarItemEnArrays("enemigo", celdaEnemigos.textContent);
            celdaEnemigos.textContent = celdaLibre();
            reposicionarItemEnArray("enemigo", celdaEnemigos.textContent);
            let enemigo = document.querySelector(`#divEnemigos${ e }`);
            enemigo.classList.remove("btn-warning");
            enemigo.classList.add("btn-danger");
            for (let i = 1; i < enemigosVivos + 1; i++) {
                enemigo = document.querySelector(`#divEnemigos${ i }`);
                enemigo.classList.remove("disabled");
            }
            break;
        case "divEnemigos":
            crearCardEnemigo(e, div);
            break;
        case "divArboles":
            const celdaDos = document.querySelector(`#arbolTxtDos${ e }`);
            document.querySelector(`#arbolTxt${ e }`).textContent = celdaDos.textContent;
            eliminarItemEnArrays("arbol", celdaDos.textContent);
            celdaDos.textContent = celdaLibre();
            reposicionarItemEnArray("arbol", celdaDos.textContent);
            break;
        case "animales":
            const celdaAnimales = document.querySelector(`#animalTxtDos${ e }`);
            document.querySelector(`#animalTxt${ e }`).textContent = celdaAnimales.textContent;
            eliminarItemEnArrays("animal", celdaAnimales.textContent);
            celdaAnimales.textContent = celdaLibre();
            reposicionarItemEnArray("animal", celdaAnimales.textContent);
            break;
        case "rocas":
            const celdaRocas = document.querySelector(`#rocaTxtDos${ e }`);
            document.querySelector(`#rocaTxt${ e }`).textContent = celdaRocas.textContent;
            eliminarItemEnArrays("roca", celdaRocas.textContent);
            celdaRocas.textContent = celdaLibre();
            reposicionarItemEnArray("roca", celdaRocas.textContent);
            break;
        default:
            break;
    }

}
function crearCardEnemigo (valor, div) {
    console.log(`entró a crearCard ${ div + valor }`);
    let enemigo = document.querySelector(`#${ div + valor }`);
    enemigo.classList.remove("btn-danger");
    enemigo.classList.add("btn-warning");
    //Pasarle los valores a los botones
    btnCamPosi.value = valor;
    btnCrearBatalla.value = valor;
    console.log(`valor de enemigo: ${ valor }`);
    //inhabilitar los demás botones

    for (let i = 1; i < enemigosVivos + 1; i++) {
        enemigo = document.querySelector(`#${ div + i }`);
        enemigo.classList.add("disabled");
    }
}

//Mapa*************************************************************

function crearMapa () {
    let contador = 20;
    const contenedorMapa = document.querySelector("#contenedorMapa");
    for (let i = 0; i < 30; i++) {
        const divFila = document.createElement("div");
        divFila.className = "col flex-nowrap p-0";
        for (let z = 0; z < 20; z++) {
            const img = document.createElement("img");
            img.src = "img/x.svg";
            img.className = "icons";
            img.style.background = "white";
            img.textContent = contador;
            img.setAttribute("id", `mapa${ contador }`);
            divFila.appendChild(img);
            contador--;
        }
        contador += 40;
        contenedorMapa.appendChild(divFila);
    }
}
function limpiarMapa () {
    const contenedorMapa = document.querySelector("#contenedorMapa");
    while (contenedorMapa.firstChild) {
        contenedorMapa.removeChild(contenedorMapa.firstChild);
    }
}
function posicionarMapa () {
    btnMapa.style.display = "none";
    limpiarMapa();
    crearMapa();
    console.log("posicionar mapa")
    espaciosOcupadosSiempre.forEach(e => {
        document.querySelector(`#mapa${ e }`).style.background = "#333";
    })
    celdasEnemigos.forEach(e => {
        document.querySelector(`#mapa${ e }`).src = "img/skull.svg";
        document.querySelector(`#mapa${ e }`).style.background = "red";
    })
    celdasArboles.forEach(e => {
        document.querySelector(`#mapa${ e }`).src = "img/tree.svg";
        document.querySelector(`#mapa${ e }`).style.background = "green";
    })
    celdasAnimales.forEach(e => {
        document.querySelector(`#mapa${ e }`).src = "img/animal.svg";
        document.querySelector(`#mapa${ e }`).style.background = "#ffc107";
    })
    celdasRocas.forEach(e => {
        document.querySelector(`#mapa${ e }`).src = "img/stone.svg";
        document.querySelector(`#mapa${ e }`).style.background = "#0d6efd";
    })
}
//Funciones comunes-------------------------

//Utilizado para la primera vez que posicionamos
function posicionarItemsEnArrays (tipo, cantidad) {
    switch (tipo) {
        case 'enemigo':
            for (let i = 1; i <= cantidad; i++) {
                let n = celdaLibre();
                celdasEnemigos.push(n);
                celdasOcupadas.push(n);
            }
            celdasArboles = colocarArray(celdasArboles);
            break;
        case 'arbol':
            for (let i = 1; i <= cantidad; i++) {
                let n = celdaLibre();
                celdasArboles.push(n);
                celdasOcupadas.push(n);
            }
            celdasArboles = colocarArray(celdasArboles);

            console.log("PosicionarItemsEnArrays arboles");
            break;
        case 'animal':
            for (let i = 1; i <= cantidad; i++) {
                let n = celdaLibre();
                celdasAnimales.push(n);
                celdasOcupadas.push(n);
            }
            celdasAnimales = colocarArray(celdasAnimales);

            console.log("PosicionarItemsEnArrays animales");
            break;
        case 'roca':
            for (let i = 1; i <= cantidad; i++) {
                let n = celdaLibre();
                celdasRocas.push(n);
                celdasOcupadas.push(n);
            }
            celdasRocas = colocarArray(celdasRocas);
            console.log("PosicionarItemsEnArrays rocas");
            break;
        default:
            break;
    }
}

function eliminarItemEnArrays (tipo, valor) {
    const celda = celdasOcupadas.findIndex(e => e === valor);
    switch (tipo) {
        case 'enemigo':
            console.log(`Elimina celda con valor: ${ valor }`)
            console.log(celdasEnemigos);
            const celdaEnemigo = celdasEnemigos.findIndex(e => e == valor);
            celdasOcupadas.splice(celda, 1);
            celdasEnemigos.splice(celdaEnemigo, 1);
            break;
            break;
        case 'arbol':
            console.log("Entra a eliminar celdas arbol")
            console.log(celdasArboles);
            const celdaArbol = celdasArboles.findIndex(e => e == valor);
            celdasOcupadas.splice(celda, 1);
            celdasArboles.splice(celdaArbol, 1);
            break;
        case 'animal':
            const celdaAnimal = celdasAnimales.findIndex(e => e == valor);
            celdasOcupadas.splice(celda, 1);
            celdasAnimales.splice(celdaAnimal, 1);
            break;
        case 'roca':
            const celdaRoca = celdasRocas.findIndex(e => e == valor);
            celdasOcupadas.splice(celda, 1);
            celdasRocas.splice(celdaRoca, 1);
            break;
        default:
            break;
    }
}
//Utilizado para reposicionar un elemento en los arrays
function reposicionarItemEnArray (tipo, valor) {
    celdasOcupadas.push(valor);
    switch (tipo) {
        case 'enemigo':
            celdasEnemigos.push(valor);
            console.log(celdasEnemigos);
            console.log(`Crea celda con valor ${ valor }`);
            posicionarMapa();
            break;
        case 'arbol':
            celdasArboles.push(valor);
            console.log(celdasArboles);
            posicionarMapa();
            console.log("reposicionarItemEnArray  arboles");
            break;
        case 'animal':
            celdasAnimales.push(valor);
            posicionarMapa();
            console.log("reposicionarItemEnArray  animales");
            break;
        case 'roca':
            celdasRocas.push(valor);
            posicionarMapa();
            console.log("reposicionarItemEnArray  rocas");
            break;
        default:
            break;
    }
}
//Nos da un número aleatorio entre un mínimo y un máximo incluidos
function aleatorio (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//devuelve true si está ocupada
function buscaEnCeldas (n) {
    celda = celdasOcupadas.findIndex(e => e === n)
    if (celda > -1) {
        return true;
    }
    return false;
}
// devuelve una celda aleatoria no ocupada
function celdaLibre () {
    let n = aleatorio(3, 598);
    while (buscaEnCeldas(n)) {
        n = aleatorio(3, 598);
    }
    celdasOcupadas.push(n);

    return n;
}
//Coloca el array en orden
function colocarArray (e) {
    e.sort((a, b) => {
        if (a == b) {
            return 0;
        }
        if (a < b) {
            return -1;
        }
        return 1;
    });
    return e;
}