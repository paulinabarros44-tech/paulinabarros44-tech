// Acessa os elementos HTML que vamos manipular
const formConfiguracao = document.getElementById('form-configuracao');
const nivelSelect = document.getElementById('nivel-jogo');
const areaJogo = document.getElementById('area-jogo');
const perguntaH2 = document.getElementById('pergunta');
const botoesOpcao = document.querySelectorAll('.opcao');
const feedbackP = document.getElementById('feedback');
const placarSpan = document.getElementById('pontos');
const recordeSpan = document.getElementById('recorde');
const timerSpan = document.getElementById('timer');

// Variáveis do jogo
let pontos = 0;
let respostaCorreta;
let nivelAtual;
let tempoRestante = 30;
let timerId;

// Tenta carregar o recorde do localStorage ou define como 0
let recorde = localStorage.getItem('recorde') || 0;
recordeSpan.textContent = recorde;

// Adiciona um listener para iniciar o jogo
formConfiguracao.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o recarregamento da página

    nivelAtual = nivelSelect.value;
    
    // Esconde o formulário e mostra a área do jogo
    formConfiguracao.style.display = 'none';
    areaJogo.style.display = 'block';
    
    // Reseta o placar e inicia o jogo
    pontos = 0;
    placarSpan.textContent = pontos;
    
    iniciarTimer();
    gerarPergunta();
});

function iniciarTimer() {
    tempoRestante = 30;
    timerSpan.textContent = tempoRestante;
    
    timerId = setInterval(() => {
        tempoRestante--;
        timerSpan.textContent = tempoRestante;

        if (tempoRestante <= 0) {
            clearInterval(timerId); // Para o timer
            fimDeJogo();
        }
    }, 1000); // 1000ms = 1 segundo
}

function gerarPergunta() {
    let maxNumero;
    // Define o limite dos números com base no nível
    if (nivelAtual === 'iniciante') {
        maxNumero = 10;
    } else if (nivelAtual === 'intermediario') {
        maxNumero = 50;
    } else { // Avançado
        maxNumero = 100;
    }

    const num1 = Math.floor(Math.random() * maxNumero) + 1;
    const num2 = Math.floor(Math.random() * maxNumero) + 1;
    const operacoes = ['+', '-', '*'];
    const operacao = operacoes[Math.floor(Math.random() * operacoes.length)];
    
    // Calcula a resposta correta
    switch(operacao) {
        case '+':
            respostaCorreta = num1 + num2;
            break;
        case '-':
            respostaCorreta = num1 - num2;
            break;
        case '*':
            respostaCorreta = num1 * num2;
            break;
    }

    perguntaH2.textContent = `${num1} ${operacao} ${num2} = ?`;
    gerarOpcoes();
}

function gerarOpcoes() {
    let opcoes = [respostaCorreta];
    
    while (opcoes.length < 3) {
        let opcaoIncorreta = respostaCorreta + Math.floor(Math.random() * 10) - 5;
        if (!opcoes.includes(opcaoIncorreta) && opcaoIncorreta >= 0) {
            opcoes.push(opcaoIncorreta);
        }
    }

    opcoes.sort(() => Math.random() - 0.5);

    botoesOpcao.forEach((botao, index) => {
        botao.textContent = opcoes[index];
    });
}

botoesOpcao.forEach(botao => {
    botao.addEventListener('click', function() {
        const respostaUsuario = parseInt(this.textContent);
        
        if (respostaUsuario === respostaCorreta) {
            pontos++;
            feedbackP.textContent = 'Certo!';
            feedbackP.style.color = 'green';
        } else {
            feedbackP.textContent = 'Errado! Fim de jogo.';
            feedbackP.style.color = 'red';
            clearInterval(timerId); // Para o timer
            fimDeJogo();
            return; // Encerra a função para não gerar nova pergunta
        }
        
        placarSpan.textContent = pontos;
        
        setTimeout(() => {
            feedbackP.textContent = '';
            gerarPergunta();
        }, 1500);
    });
});

function fimDeJogo() {
    feedbackP.textContent = `Fim de jogo! Você fez ${pontos} pontos.`;
    
    if (pontos > recorde) {
        recorde = pontos;
        localStorage.setItem('recorde', recorde);
        recordeSpan.textContent = recorde;
    }
    
    setTimeout(() => {
        areaJogo.style.display = 'none';
        formConfiguracao.style.display = 'block';
    }, 2000);
}