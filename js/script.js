//Calculadora de padaria

//Armazenar um valor, colocar operação, armazenar novo valor e calcular
/*
Toda vez que o botão do numero for clicado quer que a tela seja concatenada com o valor com o numero clicado
Toda vez que o botão de algum operador for clicado quer que guarde o valor que esta na tela na memoria,
limpe a tela e armazene o operador mas se houver valor armazenado em memoria quer que execute a operação
Toda vez que o botão de igualdade for clicado quer que se tiver valor em memoria e um operador definido e tiver valor na tela quer que faça a operação
Operadores +,-,/(divisão por zero),*
*/
const visor = document.getElementById('result');
const memoria = document.getElementById('visorMemoria');
const memoriaOperador = document.getElementById('visorOperador');
const todosOsBotoes = function () {
    const vetor = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (let index = 0; index < vetor.length; index++) {
        const id = vetor[index];
        const botao = document.getElementById(id);
        const valorBotao = botao.value;
        botao.onclick = function () {
            visor.innerHTML += valorBotao;
        }
    }
}
const menuBotao = document.getElementById("menu");
menuBotao.onclick = function menu() { 
    const navMenu = document.getElementById('navMenu');
    if (navMenu.classList.contains('menu_close')) {
        navMenu.classList.remove('menu_close');
    } else {
        navMenu.classList.add('menu_close');
    }
}
const todosOsBotoesObjeto = function () {
    const objeto = {
        "0": numero,
        "1": numero,
        "2": numero,
        "3": numero,
        "4": numero,
        "5": numero,
        "6": numero,
        "7": numero,
        "8": numero,
        "9": numero,
        "/": operador,
        "X": operador,
        "-": operador,
        "+": operador,
        "raizquadrada": radiciacao,
        "potencia": potencia,
        "dividirUm": dividirUm,
        "porcentagem": porcentagem,
        "del": deleta,
        "delvisor": deletaVisor,
        "igual": igualdade,
        "backspace": backSpace,
        "maismenos": maisMenos,
        "ponto": ponto
    }
    for (const key in objeto) {
        const botao = document.getElementById(key);
        botao.onclick = function () {
            objeto[key](botao.id)
        }
    }
}
const numero = function (valorBotao) {
    if (visor.innerHTML == "0") {
        visor.innerHTML = valorBotao;
    }
    else {
        visor.innerHTML += valorBotao;
    }
}
const deleta = function (valorBotao) {
    deletaVisor();
    memoria.innerHTML = "";
    memoriaOperador.innerHTML = "";
}
const deletaVisor = function (valorBotao) {
    visor.innerHTML = "0";
}
const ponto = function () {
    if (verificaPonto(visor.innerHTML)) {
        return;
    } else {
        visor.innerHTML += ".";
    }
}
const verificaPonto = function (valorVisor) {
    for (let i = 0; i < valorVisor.length; i++) {
        if (valorVisor[i] == ".") {
            return true;
        }
    }
    return false;
}
const porcentagem = function() {
    if (memoria.innerHTML != "" && visor.innerHTML != "0") {
        visor.innerHTML = memoria.innerHTML / 100 * visor.innerHTML;
    }
}
const maisMenos = function (valorBotao) {
    if (visor.innerHTML != "0") {
        if (visor.innerHTML.substring(0, 1) == "-") {
            visor.innerHTML = visor.innerHTML.substring(1);
        }
        else {
            visor.innerHTML = "-" + visor.innerHTML;
        }
    }
}
const backSpace = function (valorBotao) {
    if (visor.innerHTML != "0") {
        const telaMenosUm = visor.innerHTML.substring(0, visor.innerHTML.length - 1);
        if (telaMenosUm == "" || telaMenosUm == "-") {
            visor.innerHTML = "0";
        }
        else {
            visor.innerHTML = telaMenosUm;
        }
    }
}
const igualdade = function (valorBotao) {
    if (visor.innerHTML != "" && memoria.innerHTML != "" && memoriaOperador.innerHTML != "") {
        calcular(memoriaOperador.innerHTML);
    }
}
const radiciacao = function (valorBotao) {
    if (memoria.innerHTML == "" && memoriaOperador.innerHTML == "" && visor.innerHTML != "0" && visor.innerHTML > 0) {
        visor.innerHTML = Math.sqrt(visor.innerHTML);
    } else if (memoria.innerHTML != "0" && memoriaOperador.innerHTML != "" && visor.innerHTML != "0" && visor.innerHTML > 0) {
        visor.innerHTML = Math.sqrt(visor.innerHTML);
        igualdade();
    }
}
const dividirUm = function () {
    if (visor.innerHTML != "0") {
        visor.innerHTML = 1 / visor.innerHTML;
        if (memoria.innerHTML != "0" && memoriaOperador.innerHTML != "0") {
            calcular(memoriaOperador.innerHTML);
        }
    }
}
const potencia = function () {
    const visorNumero = parseFloat(visor.innerHTML);
    if (visor.innerHTML != "0") {
        visor.innerHTML = Math.pow(visorNumero, 2);
        if (memoria.innerHTML != "0" && memoriaOperador.innerHTML != "0") {
            calcular(memoriaOperador.innerHTML);
        }
    }
}
const operador = function (valorBotao) {
    if (visor.innerHTML != "0") {
        if (memoriaOperador.innerHTML != "" && memoria.innerHTML != "") {
            calcular(memoriaOperador.innerHTML);
        }
        memoria.innerHTML = visor.innerHTML;
        deletaVisor();
        memoriaOperador.innerHTML = valorBotao;
    } else if (memoria.innerHTML != ""){
        memoriaOperador.innerHTML = valorBotao;
    }
}
const calcular = function (valorBotao) {
    const memoriaNumero = parseFloat(memoria.innerHTML);
    const visorNumero = parseFloat(visor.innerHTML);
    switch (valorBotao) {
        case "+":
            visor.innerHTML = memoriaNumero + visorNumero;
            break;
        case "-":
            visor.innerHTML = memoriaNumero - visorNumero;
            break;
        case "X":
            visor.innerHTML = memoriaNumero * visorNumero;
            break;
        case "/":
            if (visorNumero === 0) {
                window.alert("Não é possivel calcular");
            }
            else {
                visor.innerHTML = memoriaNumero / visorNumero;
            }
            break;
        default:
            break;
    }
    const historico = document.getElementById('historico');
    historico.innerHTML += `<tr> <td> ${memoriaNumero} ${valorBotao} ${visorNumero} = ${visor.innerHTML} </td></tr>` ;
    memoria.innerHTML = "";
    memoriaOperador.innerHTML = "";
}
todosOsBotoesObjeto();