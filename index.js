document.addEventListener("DOMContentLoaded", function () {
    const btnCreate = document.querySelector('#btnCreate');
    const btnKill = document.querySelector("#btnKill");
    const btnPosEnemy = document.querySelector("#btnPosEnemy");
    const ataque = document.querySelector("#ataque");
    const defensa = document.querySelector("#defensa");
    const vida = document.querySelector("#vida");
    const createTxt01 = document.querySelector("#createTxt01");
    const createTxt02 = document.querySelector("#createTxt02");
    const btnArboles = document.querySelector("#btnArboles");
    const btnAnimales = document.querySelector("#btnAnimales");
    const btnRocas = document.querySelector("#btnRocas");

    const caminos = [ 21, 40, 41, 42, 43, 44, 45, 46, 47, 54, 55, 56, 57, 58, 59, 60, 62, 67, 74, 79, 82, 87, 88, 89, 90, 91, 92, 93, 94, 99,
        102, 107, 114, 119, 122, 127, 134, 139, 142, 147, 154, 159, 162, 163, 167, 174, 178, 179, 183, 187, 194, 198, 203, 207, 214, 218,
        223, 227, 234, 238, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 263, 278, 283, 298, 303, 318, 323,
        338, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 363, 367, 374, 378, 383, 387, 394, 398, 403, 407,
        414, 418, 422, 423, 427, 434, 438, 439, 442, 447, 454, 459, 462, 467, 474, 479, 482, 487, 494, 499, 502, 507, 508, 509, 510, 511,
        512, 513, 514, 519, 522, 527, 534, 539, 541, 542, 543, 544, 545, 546, 547, 554, 555, 556, 557, 558, 559, 560, 561, 580 ];
    //tablero de 30 x 20 = 600 casillas
    const espaciosOcupadosSiempre = [ 1, 2, 21, 22, 19, 20, 39, 40, 269, 270, 271, 272, 289, 290, 291, 292, 309, 310, 311, 312, 329,
        330, 331, 332, 561, 562, 582, 579, 580, 581, 599, 600 ];
    let celdasOcupadas = espaciosOcupadosSiempre;

    //Variables de enemigos
    let hayVivos = 12;
    let posEnemigo = -1;
    let enemyList = [ 1, 1, 1, 1, 2, 2, 3, 3, 4, 5, 6, 7 ];
    let celdasEnemigos = [];
    let numEnemigosPosicion = 12;
    let rondaPosEnemy = 0;
    // Variables árboles
    let celdasArboles = [];
    let numArbolesPosicion = 12;
    // Variables animales
    let celdasAnimales = [];
    let numAnimalesPosicion = 12;
    // Variables rocas
    let celdasRocas = [];
    let numRocasPosicion = 12;


    //Listerners**************************
    eventListeners();
    function eventListeners () {
        document.addEventListener('DOMContentLoaded', prepararInicio);
        btnCreate.addEventListener("click", newEnemy);
        btnKill.addEventListener("click", killEnemy);
        btnPosEnemy.addEventListener("click", positionEnemy);
        btnKill.style.display = "none";
        btnArboles.addEventListener("click", () => {
            posicionarElementos('#arbol');
        });
        btnAnimales.addEventListener("click", () => {
            posicionarElementos('#animal');
        });
        btnRocas.addEventListener("click", () => {
            posicionarElementos('#roca');
        });
    }
    //Funciones***********************
    function prepararInicio () {
        //TODO: 

    }
    function newEnemy () {
        if (posEnemigo != -1) {
            document.querySelector(`#enemy${ posEnemigo + 1 }`).src = "images/skull.svg";
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
        hayVivos--;
        if (hayVivos <= 0) {
            nuevaPartida();
        }
    }
    function killEnemyImg () {
        document.querySelector(`#enemy${ posEnemigo + 1 }`).style.backgroundColor = '#333';
    }
    // Elección de enemigo y mostrar datos ****************************************************
    function markEnemy () {
        document.querySelector(`#enemy${ posEnemigo + 1 }`).src = "images/skull_2.svg";
    }
    //Nos da un número aleatorio entre un mínimo y un máximo incluidos
    function aleatorio (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
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
                return [ 10, aleatorio(10, 16), 10, aleatorio(10, 16), " LV04" ];
            case 5:
                return [ 11, aleatorio(11, 18), 11, aleatorio(11, 18), " LV05" ];
            case 6:
                return [ 12, aleatorio(12, 20), 12, aleatorio(12, 20), " LV06" ];
            default:
                return [ 20, 20, 20, 20, " Jefe Final" ];
        }
    }
    function nuevaPartida () {
        createTxt01.textContent = "Partida Terminada";
        createTxt02.textContent = "Pulsa Para Una Nueva";
        btnCreate.style.backgroundColor = "green";
        btnCreate.addEventListener("click", () => {
            location.reload();
        });
    }
    //POSICIONANDO ENEMIGOS*****************************************************
    function reposicionarEnemigos () {
        if (rondaPosEnemy === 0) {
            rondaPosEnemy++;
            return;
        }
        rondaPosEnemy++;
        //borramos las celdas del array general (Descomentar si queremos que el enemigo no deje tierra impisable)
        // for (let i = 0; i < celdasEnemigos.length; i++) {
        //     let celda = celdasOcupadas.findIndex(e => e == celdasEnemigos[ i ])
        //     celdasOcupadas.splice(celda, 1);
        // }
        console.log(celdasOcupadas.length);
        //Borramos las celdas del array de enemigos
        while (celdasEnemigos.length > 0) {
            celdasEnemigos.shift();
        };
    }
    function positionEnemy () {
        reposicionarEnemigos();
        let pos;
        for (let i = 1; i <= numEnemigosPosicion; i++) {
            pos = document.querySelector(`#posE${ i }`);
            pos.textContent = ocupacion(aleatorio(3, 598));
        }
        console.log(`CE ${ celdasEnemigos }`);
    }
    // devuelve una celda no ocupada
    function ocupacion (n, obj) {
        while (buscaEnCeldas(n)) {
            n = aleatorio(3, 598);
        }
        celdasOcupadas.push(n);
        switch (obj) {
            case '#arbol':
                crearArboles();
                celdasArboles.push(n);
                btnArboles.remove();
                break;
            case '#animal':
                crearAnimales();
                celdasAnimales.push(n);
                btnAnimales.remove();
                break;
            case '#roca':
                crearRocas();
                celdasRocas.push(n);
                btnRocas.remove();
                break;

            default:
                celdasEnemigos.push(n);
                break;
        }

        return n;
    }
    //devuelve true si está ocupada
    function buscaEnCeldas (n) {
        celda = celdasOcupadas.findIndex(e => e === n)
        if (celda > -1) {
            return true;
        }
        return false;
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
    function posicionarElementos (obj) {
        let pos;
        for (let i = 1; i <= numEnemigosPosicion; i++) {
            pos = document.querySelector(obj + i);
            pos.textContent = ocupacion(aleatorio(3, 598), obj);
        }
        console.log(`AR ${ celdasArboles }`);
        console.log(`AN ${ celdasAnimales }`);
        console.log(`RO ${ celdasRocas }`);
    }
    function crearArboles () {
        for (let i = 0; i >= 3; i++) {

            for (let z = 0; z >= 3; z++) {
                const element = array[ z ];

            }

        }
    }
    function crearAnimales () {

    }
    function crearRocas () {

    }
});