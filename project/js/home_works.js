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


document.addEventListener('DOMContentLoaded', function () {

    const parentBlock = document.querySelector('.parent_block')
    const childBlock = document.querySelector('.child_block')

    let currentPosition = 0

    function moveRight() {
        if (currentPosition < parentBlock.offsetWidth - childBlock.offsetWidth) {
            currentPosition += 5; 
                
            childBlock.style.left = `${currentPosition}px`
            setTimeout(moveRight, 16)
        }
    }
    moveRight();
});