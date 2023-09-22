// Pega o ID Canvas no HTML
let canvas = document.getElementById("canvas");
// Pegamos o contexto do desenho, esse é o método que retorna o tipo da animação, usar o parâmetro "2d" significa que o objeto que será renderizado
let contexto = canvas.getContext("2d");
// Variável que vai identificar se estamos desenhando
let desenhando = false;
let corLinha = "black"; // Cor da linha padrão
// desenharCirculo(contexto, 100, 100, 50, "blue");

let espessuraLinha = 1;
let formaSelecionada = "circulo"; // Forma padrão

const formaSelect = document.getElementById("forma");

formaSelect.addEventListener("change", function() {
    formaSelecionada = formaSelect.value;
});

canvas.addEventListener("mousedown", function (event) {
    // Vamos usar o método addEventListener para ouvir nosso mouse, ele irá identificar quando clicarmos
    desenhando = true;
    // O desenho se torna verdade
    contexto.beginPath();
    // A variável contexto recebe o método beginPath(), esse método significa que um novo caminho será criado.
    contexto.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    // Nessa função, vamos dizer como o contexto irá funcionar, o clientX vai fornecer coordenadas horizontais, enquanto o canvas.offsetLeft vai retornar a medida em pixel, a mesma coisa acontece com o y de forma vertical.
    contexto.strokeStyle = corLinha;
});

canvas.addEventListener("mousemove", function (event) {
    // Função que identifica quando movemos o mouse
    if (desenhando) {
        // Esse if vai identificar se estamos clicando enquanto movemos o mouse
        contexto.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        // O lineTo vai juntar as coordenadas e identificar a linha que estamos traçando enquanto clicamos e movemos o mouse
        contexto.stroke(); 
        //ele traça a linha
    }
});
canvas.addEventListener("mouseup", function(event){
    // ESSA FUNÇÃO IDENTIFICA QUANDO NÃO ESTAMOS MAIS CLICANDO NO MOUSE
    desenhando = false;
})

canvas.addEventListener("mouseup", function (event){
    //essa função identifica quando não estamos mais clicando no mouse
    desenhando = false;
})

//pegamos o input da paleta de cor do HTML
let corInput = document.getElementById("cor");

// Define a cor inicial do contexto de desenho
contexto.strokeStyle = corInput.value;

// adiciona um ouvinte de evento para o evento de alteração de cor
corInput.addEventListener("change", function() {
    // atualiza a cor do contexto de desenho quando o usuário escolhe uma nova cor
    contexto.strokeStyle = corInput.value;
});

//pincel HTML
let espessuraInput = document.getElementById("espessura");

// Define a espessura inicial do pincel
contexto.lineWidth = espessuraInput.value;

// Adiciona um ouvinte de evento para o evento de alteração de espessura
espessuraInput.addEventListener("input", function() {
    // Atualiza a espessura do pincel quando o usuário ajusta a barra deslizante
    contexto.lineWidth = espessuraInput.value;
});
canvas.addEventListener("click", function(event) {
    const x = event.clientX - canvas.getBoundingClientRect().left;
    const y = event.clientY - canvas.getBoundingClientRect().top;
    const raio = 130; // Raio do círculo (ajustar conforme necessário)
    const cor = corInput.value;
    const espessura = espessuraInput.value;

    if (formaSelecionada === "circulo") {
        desenharCirculo(contexto, x, y, raio, cor, espessura);
    }
});

function desenharCirculo(contexto, x, y, raio, cor, espessura) {
    contexto.beginPath();
    contexto.arc(x, y, raio, 0, 2 * Math.PI);
    contexto.strokeStyle = cor;
    contexto.lineWidth = espessura;
    contexto.stroke();
}

// Função para preencher uma área com a cor escolhida
// function preencherArea(x, y, cor) {
//     contexto.fillStyle = cor;
//     contexto.fillRect(0, 0, canvas.width, canvas.height); // Preenche toda a área do canvas
// }
// Evento para atualizar a cor selecionada pelo usuário
// corInput.addEventListener("change", function() {
//     corLinha = corInput.value; // Atualiza a cor da linha
// });

// Botão para preencher a área com a cor selecionada
// let preencherButton = document.getElementById("preencherButton");
// preencherButton.
// preencherButton
// addEventListener("click", function() {
//     preencherArea(0, 0, corLinha); // Preenche a área com a cor da linha
// });
function preencherArea(x, y, largura, altura, cor) {
    contexto.fillStyle = cor;
    contexto.fillRect(x, y, largura, altura);
}
// Evento para preencher a área do desenho com a cor selecionada
let preencherDesenhoButton = document.getElementById("preencherDesenhoButton");
preencherDesenhoButton.addEventListener("click", function() {
    // Supondo que o desenho seja um círculo, ajuste as coordenadas e o tamanho conforme necessário
    const x = event.clientX - canvas.getBoundingClientRect().left - raio;
    const y = event.clientY - canvas.getBoundingClientRect().top - raio;
    const raio = 130; // Raio do círculo (ajustar conforme necessário)
    const cor = corInput.value; // Cor de preenchimento do desenho

    // Chame a função para preencher a área do desenho
    preencherArea(x, y, raio * 2, raio * 2, cor);
});