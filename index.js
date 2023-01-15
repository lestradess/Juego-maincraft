document.addEventListener("DOMContentLoaded", function () {
    const btnCreate = document.querySelector('#btnCreate');
    const btnKill = document.querySelector("#btnKill");
    const ataque = document.querySelector("#ataque");
    const defensa = document.querySelector("#defensa");
    const vida = document.querySelector("#vida");
    const tesoro = document.querySelector("#tesoro");
    //Enemigo Actual
    let currentEnemy = 0;
    //Posición enemigo actual
    let posEnemigo = -1;

    let enemyList = [ 1, 1, 1, 1, 2, 2, 3, 3, 4, 5, 6, 7 ];

    const caminos = [ 21, 40, 41, 42, 43, 44, 45, 46, 47, 54, 55, 56, 57, 58, 59, 60, 62, 67, 74, 79, 82, 87, 88, 89, 90, 91, 92, 93, 94, 99,
        102, 107, 114, 119, 122, 127, 134, 139, 142, 147, 154, 159, 162, 163, 167, 174, 178, 179, 183, 187, 194, 198, 203, 207, 214, 218,
        223, 227, 234, 238, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 263, 278, 283, 298, 303, 318, 323,
        338, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 363, 367, 374, 378, 383, 387, 394, 398, 403, 407,
        414, 418, 422, 423, 427, 434, 438, 439, 442, 447, 454, 459, 462, 467, 474, 479, 482, 487, 494, 499, 502, 507, 508, 509, 510, 511,
        512, 513, 514, 519, 522, 527, 534, 539, 541, 542, 543, 544, 545, 546, 547, 554, 555, 556, 557, 558, 559, 560, 561, 580 ];
    const espaciosOcupados = [ 1, 20, 269, 270, 271, 272, 289, 290, 291, 292, 309, 310, 311, 312, 329, 330, 331, 332, 581, 600 ];
    let caminosOcupados = [];
    let bosqueVacio = [];

    //Listerners**************************

    btnCreate.addEventListener("click", newEnemy);
    btnKill.addEventListener("click", killEnemy);

    //Funciones***********************
    function newEnemy () {
        createEnemy(eligeEnemigo(aleatorio(1, 100)));
    }
    //Enemigo muerto
    function killEnemy () {
        if (posEnemigo > -1) {
            enemyList[ posEnemigo ] = 0;
            killEnemyImg(posEnemigo);
            const vacio = [ 0, 0, 0, 0 ]
            inserProps(0, 0, 0, 0);
        }
    }
    function killEnemyImg () {
        document.querySelector(`#enemy${ posEnemigo + 1 }`).src = "images/eliminado.svg";
        document.querySelector(`#enemy${ posEnemigo + 1 }`).style.backgroundColor = '#470aab';
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

        if (existeEnemigoVivo(enemigoLevel)) {
            inserProps(selectProps(enemigoLevel));
        } else {
            console.log(`Ha pasado a condición enemigo muerto ${ enemigoLevel }`);
            enemigoLevel = 1;
            while (enemyList.findIndex(e => e == enemigoLevel) < 0) {
                enemigoLevel++;
                if (enemigoLevel > 7) break;
                console.log(`En while ${ enemigoLevel }`)
                if (existeEnemigoVivo(enemigoLevel)) {
                    inserProps(selectProps(enemigoLevel));
                    break;
                }
                if (enemigoLevel == 7) {
                    console.log("Has acabado con todos los enemigos");
                    break;
                }
            }
        }
        console.log(`ListadoActual ${ enemyList }`);
    }
    //Modifica las propiedades del enemigo
    function inserProps (prop) {
        let props = [];
        props = prop;
        console.log(`Jefe actual ${ props }`);
        ataque.textContent = props[ 0 ];
        defensa.textContent = props[ 1 ];
        vida.textContent = props[ 2 ];
        tesoro.textContent = props[ 3 ];
        //PorAquI:  ****************************************************
        //btnCreate.textContent = Escapó;
    }
    //Nos dice si el enemigo elegido está vivo
    function existeEnemigoVivo (enemigo) {
        posEnemigo = enemyList.findIndex(e => e == enemigo);
        if (posEnemigo > -1) {
            // enemyList[ posEnemigo ] = 0;
            currentEnemy = posEnemigo;
            console.log(`Pos enemy: ${ currentEnemy }`);
            return true;
        }
        return false;
    }

    //Retorna las caracteristicas de los enemigos
    function selectProps (e) {
        switch (e) {
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

    //resultado.innerText = "Hola"
    //enemy01.style.background = "black";
    // enemy01.src = "images/x.svg";
    // enemy01.src.fill = "red";
    //btnIzq.onclick = () => {}

});