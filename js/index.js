
//const btnCreate = document.querySelector('#btnCreate');
const documento = document.documentElement.style;
const btnKill = document.querySelector("#btnKill");
const ataque = document.querySelector("#ataque");
const defensa = document.querySelector("#defensa");
const vida = document.querySelector("#vida");
const createTxt01 = document.querySelector("#createTxt01");
const createTxt02 = document.querySelector("#createTxt02");
const btnPosEnemy = document.querySelector("#btnPosEnemy");
const btnArboles = document.querySelector("#btnArboles");
const btnAnimales = document.querySelector("#btnAnimales");
const btnRocas = document.querySelector("#btnRocas");
const btnCaos2 =document.querySelector("#btnCaos2"); 
const btnCaos=document.querySelector("#btnCaos");
const btnPosEnemy2 = document.querySelector("#btnPosEnemy2");
const btnArboles2 = document.querySelector("#btnArboles2");
const btnAnimales2 = document.querySelector("#btnAnimales2");
const btnRocas2 = document.querySelector("#btnRocas2")
const divArboles = document.querySelector("#divArboles");
const btnSupInicio = document.querySelector("#btnSupInicio");
const btnMapa = document.querySelector("#btnMapa");
const btnSupMapa = document.querySelector("#btnSupMapa");
const btnSupEnemigo = document.querySelector("#btnSupEnemigo");
const btnSupArbol = document.querySelector("#btnSupArbol");
const btnSupAnimal = document.querySelector("#btnSupAnimal");
const btnSupRoca = document.querySelector("#btnSupRoca");
const btnCrearBatalla = document.querySelector("#btnCrearBatalla");
const btnCamPosi = document.querySelector("#btnCamPosi");
const btnStarGame = document.querySelector("#btnStarGame");
const btnContinuar = document.querySelector("#btnContinuar");
const divCard = document.querySelector("#card");
const btnCancelar = document.querySelector("#btnCancelar");
const masDa = document.querySelector("#masDa");
const menosDa = document.querySelector("#menosDa");
const masDe = document.querySelector("#masDe");
const menosDe = document.querySelector("#menosDe");
const masVi = document.querySelector("#masVi");
const menosVi = document.querySelector("#menosVi");
const masTe = document.querySelector("#masTe");
const menosTe = document.querySelector("#menosTe");
const levelTex = document.querySelector("#enemyLevel");
const info = document.querySelector("#informacion");
const cuerpo = document.querySelector("#main");
const mapaDiv = document.querySelector("#contenedorMapa");
const menu = document.querySelector("#menu");
const contenedorJugadores = document.querySelector("#contenedorJugadores");
const inputJugUno = document.querySelector("#inputJugUno");
const inputJugDos = document.querySelector("#inputJugDos");
const inputJugTres = document.querySelector("#inputJugTres");
const inputJugCuatro = document.querySelector("#inputJugCuatro");
const inputJugCinco = document.querySelector("#inputJugCinco");
const inputJugSeis = document.querySelector("#inputJugSeis");

//Enemigos vivos
let enemigosVivos = 12;
let posEnemigo = -1;
let enemyList = [ 1, 1, 1, 1, 2, 2, 3, 3, 4, 5, 6, 7 ];
let enemigoActual;


//tablero de 30 x 20 = 600 casillas
const espaciosOcupadosSiempre = [ "A1", "A2", "B1", "B2", "A29", "A30", "B29", "B30", "S1", "S2", "T1", "T2", "S29", "S30", "T29", "T30", "I14", "I15", "I16", "I17", "J14", "J15", "J16", "J17", "K14", "K15", "K16", "K17", "L14", "L15", "L16", "L17" ];
//Con slice copiamos una tabla en otra
let celdasOcupadas = espaciosOcupadosSiempre.slice();
let celdasEnemigos = [];
let numEnemigosPosicion = 12;
let rondaPosEnemy = 0;//no usada
let enemigosCantidad = 12;
let celdasArboles = [];
let celdasAnimales = [];
let celdasRocas = [];
let jugadores = [];

//Listerners**************************
eventListeners();
function eventListeners () {
    inputJugUno.addEventListener('blur', (e) => {
        jugadores.push(e.target.value);
        console.log("Entro a evento"+jugadores);
    });
    btnContinuar.addEventListener("click", continuar);
    btnStarGame.addEventListener("click", starGame);
    main.addEventListener("click", informacion);
    masDa.addEventListener("click", () => {
        let a = ataque.textContent;
        a++;
        if (a > 20) a = 20;
        ataque.textContent = a;
    });
    menosDa.addEventListener("click", () => {
        let a = ataque.textContent;
        a--;
        if (a < 0) a = 0;
        ataque.textContent = a;
    });
    masDe.addEventListener("click", () => {
        let a = defensa.textContent;
        a++;
        if (a > 20) a = 20;
        defensa.textContent = a;
    });
    menosDe.addEventListener("click", () => {
        let a = defensa.textContent;
        a--;
        if (a < 0) a = 0;
        defensa.textContent = a;
    });
    masVi.addEventListener("click", () => {
        let a = vida.textContent;
        a++;
        if (a > 20) a = 20;
        vida.textContent = a;
    });
    menosVi.addEventListener("click", () => {
        let a = vida.textContent;
        a--;
        if (a < 0) a = 0;
        vida.textContent = a;
    });
    masTe.addEventListener("click", () => {
        let a = tesoro.textContent;
        a++;
        if (a > 20) a = 20;
        tesoro.textContent = a;
    });
    menosTe.addEventListener("click", () => {
        let a = tesoro.textContent;
        a--;
        if (a < 0) a = 0;
        tesoro.textContent = a;
    });

    btnMapa.addEventListener("click", posicionarMapa);

    btnPosEnemy.addEventListener("click", () => {
        posicionarElementos("enemigo", "img/skull.svg", "red", "btn-danger", "enemigoTxt", "enemigoTxtDos");
        btnPosEnemy.remove();
        btnPosEnemy2.remove();
    });
    btnPosEnemy2.addEventListener("click", () => {
        posicionarElementos("enemigo", "img/skull.svg", "red", "btn-danger", "enemigoTxt", "enemigoTxtDos");
        btnPosEnemy2.remove();
        btnPosEnemy.remove();
    });
    btnArboles.addEventListener("click", () => {
        posicionarElementos("arbol", "img/tree.svg", "#198754", "btn-success", "arbolTxt", "arbolTxtDos");
        btnArboles.remove();
        btnArboles2.remove();
    });
    btnArboles2.addEventListener("click", () => {
        posicionarElementos("arbol", "img/tree.svg", "#198754", "btn-success", "arbolTxt", "arbolTxtDos");
        btnArboles.remove();
        btnArboles2.remove();
    });
    btnAnimales.addEventListener("click", () => {
        posicionarElementos("animal", "img/animal.svg", "#ffc107", "btn-warning", "animalTxt", "animalTxtDos");
        btnAnimales.remove();
        btnAnimales2.remove();
    });
    btnAnimales2.addEventListener("click", () => {
        posicionarElementos("animal", "img/animal.svg", "#ffc107", "btn-warning", "animalTxt", "animalTxtDos");
        btnAnimales.remove();
        btnAnimales2.remove();
    });
    btnRocas.addEventListener("click", () => {
        posicionarElementos("roca", "img/stone.svg", "#0d6efd", "btn-primary", "rocaTxt", "rocaTxtDos");
        btnRocas.remove();
        btnRocas2.remove();
    });
    btnRocas2.addEventListener("click", () => {
        posicionarElementos("roca", "img/stone.svg", "#0d6efd", "btn-primary", "rocaTxt", "rocaTxtDos");
        btnRocas.remove();
        btnRocas2.remove();
    });
    btnCaos.addEventListener("click", () => {
        posicionarElementos("roca", "img/stone.svg", "#ccc", "btn-secondary", "caosTxt", "caosTxtDos");
        btnCaos.remove();
        btnCaos2.remove();
    });
    btnCaos2.addEventListener("click", () => {
        posicionarElementos("roca", "img/stone.svg", "#ccc", "btn-secondary", "caosTxt", "caosTxtDos");
        btnCaos.remove();
        btnCaos2.remove();
    });
    // btnSupInicio.addEventListener("click", () => {
    //     botonActivo("btnSupInicio");
    // })
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
        console.log(btnCamPosi);
        if (btnCamPosi.textContent === "Enemigo Escapa") {
            btnCamPosi.setAttribute("href", "#card");
            btnCamPosi.textContent = "Cambiar Posición";
            btnCrearBatalla.textContent = "Crear Batalla";
            btnCrearBatalla.style.display = "none";
            btnCamPosi.classList.add("precaucion");
            return;
        }
        configurarBotonesEnemigo(true);
        btnCamPosi.classList.remove("precaucion");
        btnCrearBatalla.style.display = "block";
        eventoElementos(btnCamPosi.value, 'cambiarPosicionEnemigos');
    });
    btnCrearBatalla.addEventListener('click', () => {

        if (btnCrearBatalla.textContent === "Enemigo Muere") {
            console.log("Enemigo muerto");
            btnCamPosi.textContent = "Cambiar Posición";
            btnCrearBatalla.textContent = "Crear Batalla";
            document.querySelector("#card").classList.remove("show");
            killEnemy();
            configurarBotonesEnemigo(true);
            return;
        }
        crearBatalla(btnCrearBatalla.value);
    });
    btnCancelar.addEventListener('click', cancelar);

}
function informacion () {

    while (info.firstChild) {
        info.removeChild(info.firstChild);
    }
    const celdasVacias = document.createElement("div");
    celdasVacias.textContent = `Celdas vacias: ${ 600 - celdasOcupadas.length }`;
    memoVacias = 600 - celdasOcupadas.length;
    info.appendChild(celdasVacias);
    const infoCeldasEnemigos = document.createElement("div");
    infoCeldasEnemigos.textContent = "Enemigos: ";
    celdasEnemigos.forEach(e => {
        infoCeldasEnemigos.textContent += `${ e }, `;
    });
    info.appendChild(infoCeldasEnemigos);
    const infoCeldasArboles = document.createElement("div");
    infoCeldasArboles.textContent = "Árboles: ";
    celdasArboles.forEach(e => {
        infoCeldasArboles.textContent += `${ e }, `;
    });
    info.appendChild(infoCeldasArboles);
    const infoCeldasAnimales = document.createElement("div");
    infoCeldasAnimales.textContent = "Animales: ";
    celdasAnimales.forEach(e => {
        infoCeldasAnimales.textContent += `${ e }, `;
    });
    info.appendChild(infoCeldasAnimales);
    const infoCeldasRocas = document.createElement("div");
    infoCeldasRocas.textContent = "Minas: ";
    celdasRocas.forEach(e => {
        infoCeldasRocas.textContent += `${ e }, `;
    });
    info.appendChild(infoCeldasRocas);

}
function starGame () {
    btnStarGame.remove();
    document.querySelector("#calavera").remove();
    //contenedorJugadores.classList.remove("invisible");
    btnMapa.classList.remove("invisible");
    
    
}
function continuar () {
    console.log("continuar");
}
function botonActivo (text) {
    btnSupMapa.classList.remove("activeGris");
    btnSupEnemigo.classList.remove("activeRojo");
    btnSupArbol.classList.remove("activeVerde");
    btnSupAnimal.classList.remove("activeAmarillo");
    btnSupRoca.classList.remove("active");
    // btnSupInicio.classList.remove("active");
    switch (text) {
        // case "btnSupInicio":
        //     btnSupMapa.classList.add("active");
        //     break;
        case "btnSupMapa":
            btnSupMapa.classList.add("activeGris");
            break;
        case "btnSupEnemigo":
            console.log("entró en rojo")
            btnSupEnemigo.classList.add("activeRojo");
            break;
        case "btnSupArbol":
            btnSupArbol.classList.add("activeVerde");
            break;
        case "btnSupAnimal":
            btnSupAnimal.classList.add("activeAmarillo");
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
    console.log(`valor crearBatalla ${ valor }`);
    enemigoActual = valor;
    console.log(`Enemigo actual= ${ valor }`);
    btnCancelar.style.display = "none";
    btnCrearBatalla.textContent = "Enemigo Muere";
    btnCamPosi.textContent = "Enemigo Escapa";
    btnCamPosi.setAttribute("href", "#batalla");
    console.log(`ariacontrol ${ btnCamPosi }`);
    newEnemy();
}
//Creada para el btnCancelar usada para salir de la card de batalla de enemigos.
function cancelar () {
    console.log("Entró a cancelar")
    configurarBotonesEnemigo(true);
}
//Crea los skills de un enemigo.
function newEnemy () {
    if (posEnemigo != -1) {
        document.querySelector(`#enemy${ posEnemigo + 1 }`).src = "img/skull.svg";
    }
    createEnemy(eligeEnemigo(aleatorio(1, 100)));
    console.log(`ListadoActual ${ enemyList }`);
    markEnemy();
}
//Mata un enemigo y lo elimina de las imagenes gracias a killEnemyImg
function killEnemy () {
    enemyList[ posEnemigo ] = 0;
    console.log(`ListadoActual ${ enemyList }`);
    killEnemyImg();
    celdasEnemigos[ enemigoActual - 1 ] = 0;
    document.querySelector(`#enemigoTxtDos${ enemigoActual }`).style.color = "rgb(68, 68, 68)";
    posicionarMapa();
    inserProps(0, 0, 0, 0);
    enemigosVivos--;
    if (enemigosVivos <= 0) {
        nuevaPartida();
    }
}
//Controla las imágenes de los enemigos.
function killEnemyImg () {
    document.querySelector(`#enemy${ posEnemigo + 1 }`).style.backgroundColor = '#333';
}
// Marca el enemigo actual.
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
    levelTex.textContent = `Enemigo Level ${ enemigoLevel }`;
}
//imprime las skills del enemigo
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
//Nos dice si un enemigo esta vivo (true o false)
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
            return [ aleatorio(4,9), aleatorio(5, 10), 5, aleatorio(5, 10), "LV01" ];
        case 2:
            return [ aleatorio(5,12), aleatorio(7, 12), 7, aleatorio(7, 12), " LV02" ];
        case 3:
            return [ aleatorio(6,16), aleatorio(9, 14), 9, aleatorio(9, 14), " LV03" ];
        case 4:
            return [ aleatorio(7,19), aleatorio(10, 16), 5, aleatorio(10, 16), " LV04" ];
        case 5:
            return [ aleatorio(8,20), aleatorio(11, 18), 5, aleatorio(11, 18), " LV05" ];
        case 6:
            return [ aleatorio(12,25), aleatorio(12, 20), 5, aleatorio(12, 20), " LV06" ];
        default:
            return [ aleatorio(20,30), 20, 20, 25, " Jefe Final" ];
    }
}
//Configura los botones de enemigo modo true cuando estan activos false inactivos(cuando aparece el card)
function configurarBotonesEnemigo (modo, valor) {

    if (modo) {
        celdasEnemigos.forEach((element, i) => {
            const enemigo = document.querySelector(`#enemigo${ i + 1 }`);
            if (element === 0) {
                enemigo.classList.add("disabled");
                enemigo.classList.remove("btn-warning");
                enemigo.classList.remove("btn-danger");
                enemigo.classList.add('btn-secondary');
            } else {
                enemigo.classList.remove("disabled");
                enemigo.classList.remove("btn-warning");
                enemigo.classList.add("btn-danger");
            }
        });
    } else {
        celdasEnemigos.forEach((element, i) => {
            const enemigo = document.querySelector(`#enemigo${ i + 1 }`);
            if (element === 0) {
                enemigo.classList.add("disabled");
                enemigo.classList.remove("btn-warning");
                enemigo.classList.remove("btn-danger");
                enemigo.classList.add('btn-secondary');
            } else {
                enemigo.classList.add("disabled");
                enemigo.classList.remove("btn-warning");
                enemigo.classList.add("btn-danger");
            };
        });
        let enemigo = document.querySelector(`#enemigo${ valor }`);
        enemigo.classList.remove("btn-danger");
        enemigo.classList.add("btn-warning");
    }
}
function crearCardEnemigo (valor, div) {
    console.log(`entró a crearCard ${ div + valor }`);
    configurarBotonesEnemigo(false, valor);
    //Pasarle los valores a los botones
    btnCamPosi.value = valor;
    btnCrearBatalla.value = valor;
    console.log(`valor de enemigo: ${ valor }`);

}

//Mapa*************************************************************
//Se crea el mapa por primera vez.
function crearMapa () {
    const contenedorMapa = document.querySelector("#contenedorMapa");
    for (let i = 0; i < 20; i++) {
        const divFila = document.createElement("tr");
        divFila.className = "";

        for (let z = 0; z < 30; z++) {
            const img = document.createElement("td");
            img.className = "miFuente icons text-center";
            img.style.background = "white";
            img.style.color = "black";
            img.textContent = String.fromCharCode(i + 65) + (z + 1);
            img.setAttribute("id", `mapa${ String.fromCharCode(i + 65) + (z + 1) }`);
            divFila.appendChild(img);
        }
        contenedorMapa.appendChild(divFila);
    }

}
//Hay que limpiar el HTML del mapa al cambiar elementos de posición
function limpiarMapa () {
    const contenedorMapa = document.querySelector("#contenedorMapa");
    while (contenedorMapa.firstChild) {
        contenedorMapa.removeChild(contenedorMapa.firstChild);
    }
}
//Posiciona todos los elementos en el mapa, cada vez que se manda llamar la función.
function posicionarMapa () {
    btnMapa.style.display = "none";
    mapaDiv.classList.remove("invisible");
    if (celdasEnemigos.length <= 0) {
        btnPosEnemy.remove();
        btnPosEnemy2.classList.remove("invisible");
    }
    if (celdasArboles.length <= 0) {
        btnArboles.remove();
        btnArboles2.classList.remove("invisible");
    }
    if (celdasAnimales.length <= 0) {
        btnAnimales.remove();
        btnAnimales2.classList.remove("invisible");
    }
    if (celdasRocas.length <= 0) {
        btnRocas.remove();
        btnRocas2.classList.remove("invisible");
    }
    limpiarMapa();
    crearMapa();
    espaciosOcupadosSiempre.forEach(e => {

        document.querySelector(`#mapa${ e }`).style.background = "#333";
    })
    celdasEnemigos.forEach(e => {
        if (e === 0) return;
        //document.querySelector(`#mapa${ e }`).src = "img/skull.svg";
        document.querySelector(`#mapa${ e }`).style.background = "red";
    })
    celdasArboles.forEach(e => {
        //document.querySelector(`#mapa${ e }`).src = "img/tree.svg";
        document.querySelector(`#mapa${ e }`).style.background = "green";
    })
    celdasAnimales.forEach(e => {
        //document.querySelector(`#mapa${ e }`).src = "img/animal.svg";
        document.querySelector(`#mapa${ e }`).style.background = "#ffc107";
    })
    celdasRocas.forEach(e => {
        //document.querySelector(`#mapa${ e }`).src = "img/stone.svg";
        document.querySelector(`#mapa${ e }`).style.background = "#0d6efd";
    })
}
//Funciones comunes********************************************************************************

//Posiciona Enemigos, Arboles, Animales y rocas************************************
function posicionarElementos (div, imagen, colorA, btnClass, idA, idB) {
    const contenedorTotal = document.querySelector(`#${ div }`);
    for (let z = 0; z < 1; z++) {
        const divBotones = document.createElement("div");
        divBotones.className = "row divBotones p-2";
        for (let i = 1; i < 12 + 1; i++) {
            const divBoton = document.createElement("div");
            divBoton.className = "d-grid col-3 col-lg-2 p-1";
            const boton = document.createElement("a");
            boton.className = `btn boton btn-lg ${ btnClass }`;
            boton.setAttribute("type", "button");
            boton.setAttribute("id", div + i);
            boton.textContent = i;
            boton.onclick = () => eventoElementos(i, div);
            const img = document.createElement("img");
            img.src = imagen;
            img.className = "icons";
            const celdaOld = document.createElement("h1");
            celdaOld.style.color = "#444";
            celdaOld.style.border = `1px solid #444`;
            celdaOld.textContent = "000";
            celdaOld.style.textAlign = "center";
            celdaOld.style.borderRadius = "0.5rem";
            celdaOld.setAttribute("id", idA + i);
            const celdaDos = document.createElement("h1");
            celdaDos.className = "mt-2";
            celdaDos.style.color = colorA;
            celdaDos.style.border = `1px solid ${ colorA }`;
            celdaDos.textContent = i;
            celdaDos.style.textAlign = "center";
            celdaDos.style.borderRadius = "0.5rem";
            celdaDos.setAttribute("id", idB + i);
            boton.appendChild(img);
            divBoton.appendChild(celdaOld);
            divBoton.appendChild(boton);
            divBoton.appendChild(celdaDos);
            divBotones.appendChild(divBoton);
        }
        contenedorTotal.appendChild(divBotones);
    }
    switch (div) {
        case "enemigo":
            posicionarItemsEnArrays('enemigo', 12);
            celdasEnemigos.forEach((e, i) => {
                document.querySelector(`#enemigoTxtDos${ i + 1 }`).textContent = e;
            });
            posicionarMapa();
            for (let i = 1; i < enemigosVivos + 1; i++) {
                const enemigo = document.querySelector(`#${ div + i }`);
                enemigo.setAttribute("href", "#card");
                enemigo.setAttribute('data-bs-toggle', "collapse");
                enemigo.setAttribute("aria-expanded", "false");
                enemigo.setAttribute("aria-controls", "#card");
            }
            console.log("Posicionar elementos enemigos");
            break;
        case "arbol":
            posicionarItemsEnArrays('arbol', 12);
            celdasArboles.forEach((e, i) => {
                document.querySelector(`#arbolTxtDos${ i + 1 }`).textContent = e;
            });
            posicionarMapa();
            console.log("Posicionar elementos arboles");
            break;
        case "animal":
            posicionarItemsEnArrays('animal', 12);
            celdasAnimales.forEach((e, i) => {
                document.querySelector(`#animalTxtDos${ i + 1 }`).textContent = e;
            });
            posicionarMapa();
            console.log("Posicionar elementos animales");
            break;
        case "roca":
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
function eventoElementos (e, div) {
    console.log("eventoElementos");
    if (div === "enemigo") {
        crearCardEnemigo(e, div);
        return;
    }
    if (div === "cambiarPosicionEnemigos") div = "enemigo";
    const celdaTxtDos = document.querySelector(`#${ div }TxtDos${ e }`);
    const btn = document.querySelector(`#${ div + e }`);
    //Ponemos la posición en el texto superior
    console.log(`buscando #${ div }Txt${ e }`)
    document.querySelector(`#${ div }Txt${ e }`).textContent = celdaTxtDos.textContent;
    //Buscamos el valor en las celdas ocupadas para borrarlo
    const celda = celdasOcupadas.findIndex(valor => valor === celdaTxtDos.textContent);
    //Crea valor que no esté presente en array celdasOcupadas.
    const libre = celdaLibre();
    switch (div) {
        case "arbol":
            //Elimina el valor en el array de celdas ocupadas
            celdasOcupadas.splice(celda, 1);
            celdasArboles[ e - 1 ] = libre;
            document.querySelector(`#${ div }TxtDos${ e }`).textContent = libre;
            posicionarMapa();
            break;
        case "animal":
            celdasOcupadas.splice(celda, 1);
            celdasAnimales[ e - 1 ] = libre;
            document.querySelector(`#${ div }TxtDos${ e }`).textContent = libre;
            posicionarMapa();
            break;
        case "roca":
            celdasOcupadas.splice(celda, 1);
            celdasRocas[ e - 1 ] = libre;
            document.querySelector(`#${ div }TxtDos${ e }`).textContent = libre;
            posicionarMapa();
            break;
        case "enemigo":
            celdasOcupadas.splice(celda, 1);
            celdasEnemigos[ e - 1 ] = libre;
            document.querySelector(`#${ div }TxtDos${ e }`).textContent = libre;
            posicionarMapa();
            configurarBotonesEnemigo(true, 0);

            break;
        default:
            break;
    }
}
//Utilizado para la primera vez que posicionamos
function posicionarItemsEnArrays (tipo, cantidad) {
    switch (tipo) {
        case 'enemigo':
            for (let i = 1; i <= cantidad; i++) {
                let n = celdaLibre();
                celdasEnemigos.push(n);
                celdasOcupadas.push(n);
            }
            celdasEnemigos = colocarArray(celdasEnemigos);
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
//Nos da un número aleatorio entre un mínimo y un máximo incluidos
function aleatorio (min, max) {
    if (Number.isInteger(min)) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const letra = String.fromCharCode(64 + Math.floor(Math.random() * (20)) + 1);
    const numero = Math.floor(Math.random() * (max)) + 1;
    return letra + numero;

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
    let n = aleatorio("a", 30);
    while (buscaEnCeldas(n)) {
        n = aleatorio("a", 30);
    }
    return n;
}
//Coloca el array en orden se usa solo al principio
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