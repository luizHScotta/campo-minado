var linhas, colunas, bombas, matriz, tabela;
var centesimas = 0;
var segundos = 0;
var minutos = 0;
var horas = 0;

var tempo = 10;
var cron; 


function gerarMatriz(l, c) {
    matriz = [];
    for (var i = 0; i < l; i++) {
        matriz[i] = new Array(c).fill(0);
    }
    console.log(matriz);
}
function gerarTabela(l, c) {
    gerarMatriz(l, c);
    var str = "";
    for (var i = 0; i < l; i++) {
        str += "<tr>";
        for (var j = 0; j < c; j++) {
            str += "<td class='blocked'></td>";
        }
        str += "</tr>";
    }
    tabela.innerHTML = str;
}
function mostrarMatriz() {
    for (var i = 0; i < linhas; i++) {
        for (var j = 0; j < colunas; j++) {
            if (matriz[i][j] === -1) {
                tabela.rows[i].cells[j].innerHTML = "&#128163;";
            } else {
                tabela.rows[i].cells[j].innerHTML = matriz[i][j];
            }
        }
    }
}
function gerarBombas() {
    for (var i = 0; i < bombas;) {
        var linha = Math.floor((Math.random() * linhas));
        var coluna = Math.floor((Math.random() * colunas));
        if (matriz[linha][coluna] === 0) {
            matriz[linha][coluna] = -1;
            i++;
        }
    }
}
function gerarNumero(l, c) {
    var count = 0;
    for (var i = l - 1; i <= l + 1; i++) {
        for (var j = c - 1; j <= c + 1; j++) {
            if (i >= 0 && i < linhas && j >= 0 && j < colunas) {
                if (matriz[i][j] === -1) {
                    count++;
                }
            }
        }
    }
    matriz[l][c] = count;
}
function gerarNumeros() {
    for (var i = 0; i < linhas; i++) {
        for (var j = 0; j < colunas; j++) {
            if (matriz[i][j] !== -1) {
                gerarNumero(i, j);
            }
        }
    }
}
function bandeira(event) {
    var cell = event.target;
    var linha = cell.parentNode.rowIndex;
    var coluna = cell.cellIndex;
    if (cell.className === "blocked") {
        cell.className = "flag";
        cell.innerHTML = "&#128681;";//&#9873;
    } else if (cell.className === "flag") {
        cell.className = "blocked";
        cell.innerHTML = "";
    }
    return false;
}
function init() {
    tabela = document.getElementById("tabela");
    tabela.onclick = verificar;
    tabela.oncontextmenu = bandeira;
    var diff = document.getElementById("dificuldade");
    switch (parseInt(diff.value)) {
        case 0:
            linhas = 8;
            colunas = 10;
            bombas = 10;
            break;
        case 1:
            linhas = 14;
            colunas = 18;
            bombas = 40;
            break;
        default:
            linhas = 20;
            colunas = 24;
            bombas = 99;
            break;
    }
    gerarTabela(linhas, colunas);
    gerarBombas();
    gerarNumeros();
    ligarRelogio()
    //    mostrarMatriz();
}
function limparCelulas(l, c) {
    for (var i = l - 1; i <= l + 1; i++) {
        for (var j = c - 1; j <= c + 1; j++) {
            if (i >= 0 && i < linhas && j >= 0 && j < colunas) {
                var cell = tabela.rows[i].cells[j];
                if (cell.className !== "blank") {
                    switch (matriz[i][j]) {
                        case -1:
                            break;
                        case 0:
                            cell.innerHTML = "";
                            cell.className = "blank";
                            limparCelulas(i, j);
                            break;
                        default:
                            cell.innerHTML = matriz[i][j];
                            cell.className = "n" + matriz[i][j];
                    }
                }
            }
        }
    }
}
function mostrarBombas() {
    for (var i = 0; i < linhas; i++) {
        for (var j = 0; j < colunas; j++) {
            if (matriz[i][j] === -1) {
                var cell = tabela.rows[i].cells[j];
                cell.innerHTML = "&#128163;";
                cell.className = "blank";
            }
        }
    }
}
function verificar(event) {
    var cell = event.target;
    if (cell.className !== "flag") {
        var linha = cell.parentNode.rowIndex;
        var coluna = cell.cellIndex;
        switch (matriz[linha][coluna]) {
            case -1:
                mostrarBombas();
                cell.style.backgroundColor = "red";
                tabela.onclick = undefined;
                tabela.oncontextmenu = undefined;
                alert("Você perdeu!");
                voltar();
                break;
            case 0:
                limparCelulas(linha, coluna);
                break;
            default:
                cell.innerHTML = matriz[linha][coluna];
                cell.className = "n" + matriz[linha][coluna];
        }
        fimDeJogo();
    }
}
function fimDeJogo() {
    var cells = document.querySelectorAll(".blocked, .flag");
    if (cells.length === bombas) {
        mostrarBombas();
        tabela.onclick = undefined;
        tabela.oncontextmenu = undefined;
        alert("Você venceu!");
        voltar();
    }
}
function registerEvents() {
    init();
    var diff = document.getElementById("dificuldade");
    diff.onchange = init;
}
onload = registerEvents;

function voltar(){
    if (window.confirm("Você realmente quer sair?")) {
        window.open("index.html");
      }
}

function ligarRelogio(){
    cron = setInterval(() => {
        relogio();
    }, tempo);
}

function relogio(){

    if (centesimas < 99) {
        centesimas++;
        if (centesimas < 10) { centesimas = "0"+centesimas }
        Centesimas.innerHTML = ":"+centesimas;
    }
    if (centesimas == 99) {
        centesimas = -1;
    }
    if (centesimas == 0) {
        segundos ++;
        if (segundos < 10) { segundos = "0"+segundos }
        Segundos.innerHTML = ":"+segundos;
    }
    if (segundos == 59) {
        segundos = -1;
    }
    if ( (centesimas == 0)&&(segundos == 0) ) {
        minutos++;
        if (minutos < 10) { minutos = "0"+minutos }
        Minutos.innerHTML = ":"+minutos;
    }
    if (minutos == 59) {
        minutos = -1;
    }
    if ( (centesimas == 0)&&(segundos == 0)&&(minutos == 0) ) {
        horas ++;
        if (horas < 10) { horas = "0"+horas }
        Horas.innerHTML = horas;
    }
}
