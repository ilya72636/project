

// Gmail
const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const gmailSpan = document.querySelector('#gmail_result')

const gmailRegExp =/^[a-zA-Z0-9._%+-]+@gmail\.com$/

gmailButton.addEventListener('click', ()=>{
    if (gmailRegExp.test(gmailInput.value)) {
        gmailSpan.innerHTML='Валидный Gmail адрес'
        gmailSpan.style.color='green'
    }else{
        gmailSpan.innerHTML='Невалидный Gmail адрес'
        gmailSpan.style.color='red'
    }
})




// квадрат
document.addEventListener('DOMContentLoaded', function () {
    const parentBlock = document.querySelector('.parent_block');
    const childBlock1 = document.querySelector('.child_block');
    const childBlock2 = document.querySelector('.child_block2');

    let dx1 = 3;
    let dy1 = 3;
    let dx2 = -3;
    let dy2 = -3;

    function moveBlocks() {
        let rect1 = childBlock1.getBoundingClientRect();
        let rect2 = childBlock2.getBoundingClientRect();

        if (rect1.right >= parentBlock.offsetWidth || rect1.left <= 0) {
            dx1 = -dx1;
        }
        if (rect1.bottom >= parentBlock.offsetHeight || rect1.top <= 0) {
            dy1 = -dy1;
        }
        if (rect2.right >= parentBlock.offsetWidth || rect2.left <= 0) {
            dx2 = -dx2;
        }
        if (rect2.bottom >= parentBlock.offsetHeight || rect2.top <= 0) {
            dy2 = -dy2;
        }

        let distanceX = rect1.left - rect2.left;
        let distanceY = rect1.top - rect2.top;
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < childBlock1.offsetWidth) {
            // Отталкивание
            let temp = dx1;
            dx1 = dx2;
            dx2 = temp;
            temp = dy1;
            dy1 = dy2;
            dy2 = temp;
        }

        childBlock1.style.left = rect1.left + dx1 + 'px';
        childBlock1.style.top = rect1.top + dy1 + 'px';

        childBlock2.style.left = rect2.left + dx2 + 'px';
        childBlock2.style.top = rect2.top + dy2 + 'px';

        requestAnimationFrame(moveBlocks);
    }

    moveBlocks();
});




// сикундамер   DZ_2

// document.addEventListener("DOMContentLoaded", function () {
//     var secondsDisplay = document.getElementById("seconds");
//     var startButton = document.getElementById("start");
//     var stopButton = document.getElementById("stop");
//     var resetButton = document.getElementById("reset");

//     var timerInterval;
//     var counter = 0;

//     startButton.addEventListener("click", function () {
//         startButton.disabled = true;
//         stopButton.disabled = false;
//         resetButton.disabled = false;

//         timerInterval = setInterval(function () {
//             counter++;
//             secondsDisplay.textContent = counter;
//         }, 1000);
//     });

//     stopButton.addEventListener("click", function () {
//         startButton.disabled = false;
//         stopButton.disabled = true;
//         clearInterval(timerInterval);
//     });

//     resetButton.addEventListener("click", function () {
//         counter = 0;
//         secondsDisplay.textContent = counter;
//         startButton.disabled = false;
//         stopButton.disabled = true;
//         resetButton.disabled = true;
//         clearInterval(timerInterval);
//     });
// });










































































document.addEventListener('DOMContentLoaded', function () {
    const parentContainer = document.querySelector('.container');
    const secondsElement = document.getElementById('seconds');
    const timeBlock = document.querySelector('.time_block');
    const resultContainer = document.createElement('div');
    resultContainer.id = 'resultContainer';
    timeBlock.appendChild(resultContainer);

    const resultMessageElement = document.createElement('div');
    resultMessageElement.id = 'resultMessage';
    resultContainer.appendChild(resultMessageElement);

    const успелButton = document.createElement('button');
    успелButton.textContent = 'Успел';
    успелButton.classList.add('btn');
    успелButton.style.display = 'none';

    const неуспелButton = document.createElement('button');
    неуспелButton.textContent = 'Не успел';
    неуспелButton.classList.add('btn');
    неуспелButton.style.display = 'none';

    const resultButtonsContainer = document.createElement('div');
    resultButtonsContainer.id = 'resultButtons';
    resultContainer.appendChild(resultButtonsContainer);

    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('reset');

    let timer;
    let seconds = 0;
    let timeIsUp = false;

    function updateTimer() {
        secondsElement.textContent = seconds;
        seconds++;

        if (seconds > 45) {
            stopTimer();
            showResultButtons();
        }
    }

    function startTimer() {
        if (!timer) {
            timer = setInterval(updateTimer, 1000);
            startButton.disabled = true;
            stopButton.disabled = false;
            resetButton.disabled = false;
        }
    }

    function stopTimer() {
        clearInterval(timer);
        timer = null;
        startButton.disabled = false;
        stopButton.disabled = true;
        resetButton.disabled = false;
    }

    function resetTimer() {
        stopTimer();
        seconds = 0;
        updateTimer();
        startButton.disabled = false;
        resetButton.disabled = true;
        resultContainer.innerHTML = '';
        успелButton.style.display = 'none';
        неуспелButton.style.display = 'none';
        timeIsUp = false;
    }

    function showResultButtons() {
        resultMessageElement.textContent = 'Время вышло! Выберите результат:';
        успелButton.style.display = 'inline-block';
        resultButtonsContainer.appendChild(успелButton);
        неуспелButton.style.display = 'inline-block';
        resultButtonsContainer.appendChild(неуспелButton);
        timeIsUp = true;
    }

    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', resetTimer);

    успелButton.addEventListener('click', function () { showResult('Успел'); });
    неуспелButton.addEventListener('click', function () { showResult('Не успел'); });

    function showResult(result) {
        resultMessageElement.textContent = `Результат: ${result}`;
        secondsElement.style.color = result === 'Успел' ? 'green' : 'red';
        resetButton.disabled = false;
        успелButton.style.display = 'none';
        неуспелButton.style.display = 'none';
        timeIsUp = false;
    }
});
