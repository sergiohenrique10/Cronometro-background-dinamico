document.addEventListener("DOMContentLoaded", function () {
    // Elementos do cronômetro
    const timerDisplay = document.getElementById("timer"); // Elemento que exibe o tempo
    const startStopButton = document.getElementById("power"); // Botão de iniciar/pausar
    const resetButton = document.getElementById("reset"); // Botão de resetar
    const markButton = document.getElementById("mark"); // Botão de marcar tempo
    const marksList = document.getElementById("marks-list"); // Lista de marcações de tempo

    let timerInterval; // Variável para armazenar o intervalo de tempo do cronômetro
    let startTime; // Variável para armazenar o tempo inicial do cronômetro
    let elapsedTime = 0; // Variável para armazenar o tempo decorrido do cronômetro
    let running = false; // Variável para controlar se o cronômetro está em execução ou não

    // Função para formatar o tempo em horas, minutos, segundos e milissegundos
    function formatTime(milliseconds) {
        // Calcula as horas, minutos, segundos e milissegundos a partir do tempo total em milissegundos
        let hours = Math.floor(milliseconds / 3600000);
        milliseconds %= 3600000;
        let minutes = Math.floor(milliseconds / 60000);
        milliseconds %= 60000;
        let seconds = Math.floor(milliseconds / 1000);
        milliseconds %= 1000;

        // Formata os milissegundos para exibir apenas dois dígitos decimais
        let formattedMilliseconds = milliseconds.toString().padStart(3, "0");
        formattedMilliseconds = formattedMilliseconds.substring(0, 2);

        // Retorna o tempo formatado como uma string
        return (
            String(hours).padStart(2, "0") +
            ":" +
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0") +
            ":" +
            formattedMilliseconds // Milissegundos com apenas dois dígitos decimais
        );
    }

    // Função para iniciar ou pausar o cronômetro
    function startStopTimer() {
        if (running) {
            clearInterval(timerInterval);
            startStopButton.innerHTML = '<i class="fa-solid fa-play"></i>';
            running = false;
        } else {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(updateTimer, 10);
            startStopButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
            running = true;
        }
    }

    // Função para resetar o cronômetro
    function resetTimer() {
        clearInterval(timerInterval);
        timerDisplay.textContent = "00:00:00:00"; // Zera os milissegundos
        elapsedTime = 0;
        running = false;
        startStopButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        marksList.innerHTML = "";
    }

    // Função para marcar o tempo atual do cronômetro
    function markTime() {
        if (running) {
            const markTime = elapsedTime;
            const markTimeFormatted = formatTime(markTime);
            const markItem = document.createElement("p");
            markItem.textContent = "Marcar " + (marksList.childElementCount + 1) + ": " + markTimeFormatted;
            marksList.appendChild(markItem);
        }
    }

    // Função para atualizar a exibição do cronômetro
    function updateTimer() {
        elapsedTime = Date.now() - startTime;
        timerDisplay.textContent = formatTime(elapsedTime);
    }

    // Adiciona event listeners aos botões
    startStopButton.addEventListener("click", startStopTimer);
    resetButton.addEventListener("click", resetTimer);
    markButton.addEventListener("click", markTime);
});