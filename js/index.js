
//const btnCreate = document.querySelector('#btnCreate');
const documento = document.documentElement.style;
// ? TEXTOS *****************************************************************************
const ataque = document.querySelector("#ataque");
const defensa = document.querySelector("#defensa");
const vida = document.querySelector("#vida");
const createTxt01 = document.querySelector("#createTxt01");
const createTxt02 = document.querySelector("#createTxt02");
const masDa = document.querySelector("#masDa");
const menosDa = document.querySelector("#menosDa");
const masDe = document.querySelector("#masDe");
const menosDe = document.querySelector("#menosDe");
const masVi = document.querySelector("#masVi");
const menosVi = document.querySelector("#menosVi");
const masTe = document.querySelector("#masTe");
const menosTe = document.querySelector("#menosTe");
const levelTex = document.querySelector("#enemyLevel");


// ?Botones****************************************************************************
const btnInicio = document.querySelector("#btnInicio");
const btnMapa = document.querySelector("#btnMapa");
const btnEnemigos = document.querySelector("#btnEnemigos");
const btnArboles = document.querySelector("#btnArboles");
const btnAnimales = document.querySelector("#btnAnimales");
const btnMinerales = document.querySelector("#btnMinerales");
const btnSupInicio = document.querySelector("#btnSupInicio");

const btnCrearBatalla = document.querySelector("#btnCrearBatalla");
const btnCamPosi = document.querySelector("#btnCamPosi");
const btnStarGame = document.querySelector("#btnStarGame");
const btnContinuar = document.querySelector("#btnContinuar");
const btnCancelar = document.querySelector("#btnCancelar");
const btnKill = document.querySelector("#btnKill");
const btnSucesos = document.querySelector("#btnSucesos");
const btnOtroSuceso = document.querySelector("#btnOtroSuceso");
// ? INPUTS *************************************************************************
const inputJugUno = document.querySelector("#inputJugUno");
const inputJugDos = document.querySelector("#inputJugDos");
const inputJugTres = document.querySelector("#inputJugTres");
const inputJugCuatro = document.querySelector("#inputJugCuatro");
const inputJugCinco = document.querySelector("#inputJugCinco");
const inputJugSeis = document.querySelector("#inputJugSeis");

// ? DIVS   ***************************************************************
const divMapa = document.querySelector("#mapa");
const divEnemigos = document.querySelector("#enemigos");
const divArboles = document.querySelector("#arboles");
const divAnimales = document.querySelector("#animales");
const divMinerales = document.querySelector("#minerales");
const divInicio = document.querySelector("#inicio");
const contenedorJugadores = document.querySelector("#contenedorJugadores");
const mapaDiv = document.querySelector("#contenedorMapa");
const cuerpo = document.querySelector("#main");
const divMenu = document.querySelector("#menu");
const info = document.querySelector("#informacion");
const divBatalla = document.querySelector("#batalla");
const divSucesos = document.querySelector("#sucesos");

// ? VARIABLES GLOBALES
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
let celdasMinerales = [];
let jugadores = [];


// Inicialización de eventListeners
eventListeners();
// Inicializacion de componentes
setupGame();

function setupGame () {
    esconderDivs()
    divInicio.style.display = "block";
    // divBatalla.style.display = "none";
    // divMapa.style.display = "none";
    // divAnimales.style.display = "none";
    // divArboles.style.display = "none";
    // divEnemigos.style.display = "none";
    // divMinerales.style.display = "none";
    contenedorJugadores.style.display = "none";
    divMenu.style.display = "none";


}
// ?Listerners**************************
// ?Se asignan todos los eventListeners de los botones
function eventListeners () {
    console.log("entra en el eventListener");
    // inputJugUno.addEventListener('blur', (e) => {
    //     jugadores.push(e.target.value);
    //     console.log("Entro a evento" + jugadores);
    // });
    //btnContinuar.addEventListener("click", continuar);
    btnInicio.addEventListener("click", starGame);
    btnInicio.addEventListener("click", posicionarMapa);
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
    //? Activa el div del mapa
    btnMapa.addEventListener("click", () => { botonActivo("btnMapa") })
    //? posiciona enemigos
    btnEnemigos.addEventListener("click", () => {
        if (btnEnemigos.classList.contains("pos")) {
            btnEnemigos.classList.remove("pos");
            posicionarElementos("enemigo", "img/skull.svg", "red", "btn-danger", "enemigoTxt", "enemigoTxtDos");
            textEnemigos.textContent = "Ver Enemigos";
            esconderDivs()
            divMapa.style.display = "block";
        } else {
            botonActivo("btnEnemigos");
        }
    });
    // ?Activa el div de los arboles
    btnArboles.addEventListener("click", () => {
        if (btnArboles.classList.contains("pos")) {
            btnArboles.classList.remove("pos");
            posicionarElementos("arbol", "img/tree.svg", "#198754", "btn-success", "arbolTxt", "arbolTxtDos");
            textArboles.textContent = "Ver Arboles";
            //divArboles.style.display = "none";
            esconderDivs()
            divMapa.style.display = "block";
        } else {
            botonActivo("btnArboles");
        }
    });
    // ?Activa el dic de los animales
    btnAnimales.addEventListener("click", () => {
        if (btnAnimales.classList.contains("pos")) {
            btnAnimales.classList.remove("pos");
            posicionarElementos("animal", "img/animal.svg", "#ffc107", "btn-warning", "animalTxt", "animalTxtDos");
            textAnimales.textContent = "Ver Animales";
            //divAnimales.style.display = "none";
            esconderDivs()
            divMapa.style.display = "block";
        } else {
            botonActivo("btnAnimales");
        }
    });
    // ?Activa el div de los minerales
    btnMinerales.addEventListener("click", () => {

        if (btnMinerales.classList.contains("pos")) {
            btnMinerales.classList.remove("pos");
            posicionarElementos("mineral", "img/stone.svg", "#0d6efd", "btn-primary", "mineralTxt", "mineralTxtDos");
            const textMinerales = document.querySelector("#textMinerales");
            textMinerales.textContent = "Ver Minerales";
            //divMinerales.style.display = "none";
            esconderDivs()
            divMapa.style.display = "block";
        } else {
            botonActivo("btnMinerales");
        }
    });
    // ?activa el div de sucesos
    btnSucesos.addEventListener("click", () => {
        esconderDivs();
        divSucesos.style.display = "block";
        const sucesoTitulo = suceso();
        sucesos(sucesoTitulo);
    })

    btnOtroSuceso.addEventListener("click", () => {
        esconderDivs();
        divSucesos.style.display = "block";
        const sucesoTitulo = suceso();
        sucesos(sucesoTitulo);
    })

    // ?Cambia la posicion del enemigo
    btnCamPosi.addEventListener('click', () => {
        console.log(btnCamPosi);
        //Si el enemigo escapa hay que vambiar la posicion
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
        divBatalla.style.display = "none";
        eventoElementos(btnCamPosi.value, 'cambiarPosicionEnemigos');
    });
    // ?Empieza la batalla
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
    // ? cancela la batalla
    btnCancelar.addEventListener('click', cancelar);

}
// ?FUNCIONES DE PANTALLA
// ?Se ejecuta despues de dar al boton empezar juego
function starGame () {
    esconderDivs();
    document.querySelector("#calavera").remove();
    divMenu.style.display = "block";
    divMapa.style.display = "block";
}
// ?Informacion de los elementos
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
    const infoceldasMinerales = document.createElement("div");
    infoceldasMinerales.textContent = "Minas: ";
    celdasMinerales.forEach(e => {
        infoceldasMinerales.textContent += `${ e }, `;
    });
    info.appendChild(infoceldasMinerales);

}
// ?Mapa*************************************************************
// ?Se crea el mapa por primera vez.
function crearMapa () {
    const contenedorMapa = document.querySelector("#contenedorMapa");
    for (let i = 0; i < 20; i++) {
        const divFila = document.createElement("tr");
        divFila.className = "tr";

        for (let z = 0; z < 30; z++) {
            const img = document.createElement("td");
            img.className = "miFuente celda text-center";
            img.style.background = "white";
            img.style.color = "black";
            img.textContent = String.fromCharCode(i + 65) + (z < 9 ? '0' + (z + 1) : z + 1);
            img.setAttribute("id", `mapa${ String.fromCharCode(i + 65) + (z + 1) }`);
            divFila.appendChild(img);
        }
        contenedorMapa.appendChild(divFila);
    }
}
// ?Hay que limpiar el HTML del mapa al cambiar elementos de posición
function limpiarMapa () {
    const contenedorMapa = document.querySelector("#contenedorMapa");
    while (contenedorMapa.firstChild) {
        contenedorMapa.removeChild(contenedorMapa.firstChild);
    }
}
//? Posiciona todos los elementos en el mapa, cada vez que se manda llamar la función.
function posicionarMapa () {
    btnInicio.style.display = "none";
    //divMapa.style.display = "block";
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
    celdasMinerales.forEach(e => {
        //document.querySelector(`#mapa${ e }`).src = "img/stone.svg";
        document.querySelector(`#mapa${ e }`).style.background = "#0d6efd";
    })

}
// Sin uso aun
function continuar () {
    console.log("continuar");
}
// ?Esconde todos los divs 
function esconderDivs () {
    divMapa.style.display = "none";
    divBatalla.style.display = "none";
    divEnemigos.style.display = "none";
    divArboles.style.display = "none";
    divAnimales.style.display = "none";
    divMinerales.style.display = "none";
    divInicio.style.display = "none";
    divSucesos.style.display = "none";
}
// ?Controla que div mostrar
function botonActivo (text) {
    console.log("entra a botonActivo");
    esconderDivs();
    switch (text) {

        case "btnMapa":
            console.log("Entra a mapa");
            divMapa.style.display = "block";
            break;
        case "btnEnemigos":
            divEnemigos.style.display = "block";
            break;
        case "btnArboles":
            divArboles.style.display = "block";
            break;
        case "btnAnimales":
            divAnimales.style.display = "block";
            break;
        case "btnMinerales":
            divMinerales.style.display = "block";
            break;
        default:
            break;
    }
}
//Funciones***********************
//?ENEMIGOS*****************************************************
// ? Crea la batalla
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
// ?Creada para el btnCancelar usada para salir de la card de batalla de enemigos.
function cancelar () {
    console.log("Entró a cancelar")
    divBatalla.style.display = "none";
    configurarBotonesEnemigo(true);
}
//? Crea los skills de un enemigo.
function newEnemy () {
    if (posEnemigo != -1) {
        document.querySelector(`#enemy${ posEnemigo + 1 }`).src = "img/skull.svg";
    }
    createEnemy(eligeEnemigo(aleatorio(1, 100)));
    console.log(`ListadoActual ${ enemyList }`);
    markEnemy();
}
//? Mata un enemigo y lo elimina de las imagenes gracias a killEnemyImg
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
// ?Controla las imágenes de los enemigos.
function killEnemyImg () {
    document.querySelector(`#enemy${ posEnemigo + 1 }`).style.backgroundColor = '#333';
}
// ?Marca el enemigo actual.
function markEnemy () {
    document.querySelector(`#enemy${ posEnemigo + 1 }`).src = "img/skull_2.svg";
}
//?Devuelve el level del enemigo
function eligeEnemigo (e) {
    if (e <= 50) return 1;
    if (e <= 70) return 2;
    if (e <= 80) return 3;
    if (e <= 85) return 4;
    if (e <= 90) return 5;
    if (e <= 99) return 6;
    return 7;
}
// ?Creación del enemigo
function createEnemy (enemigoLevel) {
    inserProps(selectProps(enemigoVivo(enemigoLevel)));
    levelTex.textContent = `Enemigo Level ${ enemigoLevel }`;
}
//?imprime las skills del enemigo
function inserProps (prop) {
    let props = [];
    props = prop;
    ataque.textContent = props[ 0 ];
    defensa.textContent = props[ 1 ];
    vida.textContent = props[ 2 ];
    tesoro.textContent = props[ 3 ];
}
//?Nos dice si el enemigo elegido está vivo
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
// ?Nos dice si un enemigo esta vivo (true o false)
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
// ?crea una nueva partida
function nuevaPartida () {
    createTxt01.textContent = "Partida Terminada";
    createTxt02.textContent = "Pulsa Para Una Nueva";
    btnCreate.style.backgroundColor = "green";
    btnCreate.addEventListener("click", () => {
        location.reload();
    });
}
//? Retorna las caracteristicas de los enemigos
function selectProps (enemigoLevel) {
    switch (enemigoLevel) {
        case 1:
            //    ataque, defensa,     vida,  tesoro
            return [ aleatorio(4, 9), aleatorio(5, 10), 5, aleatorio(5, 10), "LV01" ];
        case 2:
            return [ aleatorio(5, 12), aleatorio(7, 12), 7, aleatorio(7, 12), " LV02" ];
        case 3:
            return [ aleatorio(6, 16), aleatorio(9, 14), 9, aleatorio(9, 14), " LV03" ];
        case 4:
            return [ aleatorio(7, 19), aleatorio(10, 16), 5, aleatorio(10, 16), " LV04" ];
        case 5:
            return [ aleatorio(8, 20), aleatorio(11, 18), 5, aleatorio(11, 18), " LV05" ];
        case 6:
            return [ aleatorio(12, 25), aleatorio(12, 20), 5, aleatorio(12, 20), " LV06" ];
        default:
            return [ aleatorio(20, 30), 20, 20, 25, " Jefe Final" ];
    }
}
//?Configura los botones de enemigo modo true cuando estan activos false inactivos(cuando aparece el card)
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
// ?Abre el div de batalla o cambio de posición
function crearCardEnemigo (valor, div) {
    console.log(`entró a crearCard ${ div + valor }`);
    divBatalla.style.display = "block";
    configurarBotonesEnemigo(false, valor);
    //Pasarle los valores a los botones
    btnCamPosi.value = valor;
    btnCrearBatalla.value = valor;
    console.log(`valor de enemigo: ${ valor }`);

}



//? Funciones comunes********************************************************************************

//? Posiciona Enemigos, Arboles, Animales y minerales************************************
function posicionarElementos (div, imagen, colorA, btnClass, idA, idB) {
    const contenedorTotal = document.querySelector(`#${ div }`);
    for (let z = 0; z < 1; z++) {
        const divBotones = document.createElement("div");
        divBotones.className = "row divBotones p-2";
        for (let i = 1; i < 12 + 1; i++) {
            //boton
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
            //texto posicion anterior
            const celdaOld = document.createElement("h1");
            celdaOld.style.color = "#444";
            celdaOld.style.border = `1px solid #444`;
            celdaOld.textContent = "000";
            celdaOld.style.textAlign = "center";
            celdaOld.style.borderRadius = "0.5rem";
            celdaOld.setAttribute("id", idA + i);
            celdaOld.classList.add("posOld");
            //texto posicion actual
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
        case "mineral":
            posicionarItemsEnArrays('mineral', 12);
            celdasMinerales.forEach((e, i) => {
                document.querySelector(`#mineralTxtDos${ i + 1 }`).textContent = e;
            });
            posicionarMapa();
            console.log("Posicionar elementos minerales");
            break;
        default:
            break;
    }
}
// ? Se cambia de posicon los elementos
// e=   div
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
    textoSuperior = document.querySelector(`#${ div }Txt${ e }`);
    textoSuperior.textContent = celdaTxtDos.textContent;
    colorTextoSuperior();
    textoSuperior.style.color = "#FF9C00";
    //Buscamos el valor en las celdas ocupadas para borrarlo
    const celda = celdasOcupadas.findIndex(valor => valor === celdaTxtDos.textContent);
    //Crea valor que no esté presente en array celdasOcupadas.
    const libre = celdaLibre();

    switch (div) {
        case "arbol":
            //Elimina el valor en el array de celdas ocupadas
            celdasArboles[ e - 1 ] = libre;
            celdaLibre = document.querySelector(`#${ div }TxtDos${ e }`)
            celdaLibre.textContent = libre;
            posicionarMapa();
            break;
        case "animal":
            celdasOcupadas.splice(celda, 1);
            celdasAnimales[ e - 1 ] = libre;
            document.querySelector(`#${ div }TxtDos${ e }`).textContent = libre;
            posicionarMapa();
            break;
        case "mineral":
            celdasOcupadas.splice(celda, 1);
            celdasMinerales[ e - 1 ] = libre;
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

// ? Se utiliza para cambiar el color de todos los textos superiores 
function colorTextoSuperior () {
    const elements = document.querySelectorAll('.posOld');
    for (const element of elements) {
        element.style.color = '#444'; // Change to your desired color
    }
}
// ?Utilizado para la primera vez que posicionamos
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
        case 'mineral':
            for (let i = 1; i <= cantidad; i++) {
                let n = celdaLibre();
                celdasMinerales.push(n);
                celdasOcupadas.push(n);
            }
            celdasMinerales = colocarArray(celdasMinerales);
            console.log("PosicionarItemsEnArrays minerales");
            break;
        default:
            break;
    }
}
//? Nos da un número aleatorio entre un mínimo y un máximo incluidos
function aleatorio (min, max) {
    if (Number.isInteger(min)) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const letra = String.fromCharCode(64 + Math.floor(Math.random() * (20)) + 1);
    const numero = Math.floor(Math.random() * (max)) + 1;
    return letra + numero;

}
// ?devuelve true si está ocupada
function buscaEnCeldas (n) {
    celda = celdasOcupadas.findIndex(e => e === n)
    if (celda > -1) {
        return true;
    }
    return false;
}
// ?devuelve una celda aleatoria no ocupada
function celdaLibre () {
    let n = aleatorio("a", 30);
    while (buscaEnCeldas(n)) {
        n = aleatorio("a", 30);
    }
    return n;
}
//?Coloca el array en orden se usa solo al principio
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
//SUCESOS
function sucesos (title) {
    console.log("Entra en sucesos");
    fetch('/data/sucesos.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const titleSucesos = document.querySelector("#titulo");
            const textSucesos = document.querySelector("#texto");
            titleSucesos.textContent = title;
            textSucesos.innerHTML = data[ title ].replace(/\n/g, "<br>");
        })
        .catch(error => {
            // Manejo de errores
            console.error('Error:', error);
        });
}
//? Devuelve el suceso
function suceso () {
    const numero = Math.floor(Math.random() * 34);
    let dato= 0;
    console.log("numero: " + numero);
    if (numero >7 & numero < 30) {
        console.log("entra en mayor de 12: "+numero);
        dato = numero-8;
    } else if (numero > 29) {
        dato = 23;
    }

    const titulos = [ "Rio","Ladron", "Apuesta", "Tropiezo", "Poción", "Alijo", "Ladronzuelo", "Caravana", "Maleantes", "A casa", "Comerciantes", "Hurto", "Mendigo", "Vegetales", "Animalitos", "Bosque", "Cantera", "Olvido", "Cuero", "Juncos", "Barrizal", "Bandidos", "Restos", "Suerte" ]
    console.log("titulo suceso: "+dato+" "+titulos[dato],)
    return titulos[ dato ];


}
