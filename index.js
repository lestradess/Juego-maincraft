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

let posicion = 1;
const caminos = [ 21, 40, 41, 42, 43, 44, 45, 46, 47, 54, 55, 56, 57, 58, 59, 60, 62, 67, 74, 79, 82, 87, 88, 89, 90, 91, 92, 93, 94, 99,
    102, 107, 114, 119, 122, 127, 134, 139, 142, 147, 154, 159, 162, 163, 167, 174, 178, 179, 183, 187, 194, 198, 203, 207, 214, 218,
    223, 227, 234, 238, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 263, 278, 283, 298, 303, 318, 323,
    338, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 363, 367, 374, 378, 383, 387, 394, 398, 403, 407,
    414, 418, 422, 423, 427, 434, 438, 439, 442, 447, 454,459,462,467,474, 479, 482, 487, 494, 499, 502, 507, 508, 509, 510, 511,
    512, 513, 514, 519, 522, 527, 534, 539, 541, 542, 543, 544, 545, 546, 547, 554, 555, 556, 557, 558, 559, 560, 561, 580 ];
const espaciosOcupados = [1,20,269,270,271,272,289,290,291,292,309,310,311,312,329,330,331,332,581,600];
let caminosOcupados = [];
let bosqueVacio = [];

//resultado.innerText = "Hola"
//enemy01.style.background = "black";
// enemy01.src = "images/x.svg";
// enemy01.src.fill = "red";
//btnIzq.onclick = () => {}
