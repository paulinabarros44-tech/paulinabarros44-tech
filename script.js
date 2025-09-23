document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-idade');
    const resultadoDiv = document.getElementById('resultado');
    const idadeCalculadaSpan = document.getElementById('idade-calculada');
    const mensagemP = document.getElementById('mensagem-personalizada');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede que a página recarregue

        const idade = parseInt(document.getElementById('idade').value);
        const carreira = document.getElementById('carreira').value;

        // Lógica de pontuação simples
        let pontuacao = idade;
        if (carreira === 'sim') {
            pontuacao += 5; 
        } else {
            pontuacao -= 3;
        }

        // Exibe o resultado e a mensagem
        idadeCalculadaSpan.textContent = `Idade ideal: ${pontuacao} anos.`;
        if (pontuacao < 25) {
            mensagemP.textContent = "Você ainda é jovem, aproveite o momento!";
        } else if (pontuacao >= 25 && pontuacao <= 35) {
            mensagemP.textContent = "Este pode ser um bom momento para considerar o casamento.";
        } else {
            mensagemP.textContent = "A idade é apenas um número, o mais importante é a maturidade.";
        }

        resultadoDiv.style.display = 'block'; // Mostra a seção de resultado
    });
});