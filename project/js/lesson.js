const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneSpan = document.querySelector('#phone_result')

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click', () => {
    if (regExp.test(phoneInput.value)) {
        phoneSpan.innerHTML = 'ok';
        phoneSpan.style.color = 'green'; 
    } else {
        phoneSpan.innerHTML = 'not ok';
        phoneSpan.style.color = 'red';
    }
});



const slides = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsPares = document.querySelector('.tab_content_items');
let index = 0;
let intervalId; 

const hideTabContent = () => {
    slides.forEach((content) => {
        content.style.display = 'none';
    });
    tabs.forEach((tab) => {
        tab.classList.remove('tab_content_item_active');
    });
};

const showTabContent = (index = 0) => {
    slides[index].style.display = 'block';
    tabs[index].classList.add('tab_content_item_active');
};

hideTabContent();
showTabContent(index);

const autoSlider = () => {
    intervalId = setInterval(() => { 
        index++;
        if (index >= slides.length) {
            index = 0;
        }
        hideTabContent();
        showTabContent(index);
    }, 3000); 
};

autoSlider();

tabsPares.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, tabIndex) => {
            if (event.target === tab) {
                hideTabContent();
                showTabContent(tabIndex);
                index = tabIndex; 
                clearInterval(intervalId); 
                autoSlider(); 
            }
        });
    }
};





const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

const convertAndDisplay = (input, currency) => {
    const request = new XMLHttpRequest();
    request.open('GET', '../data/conventor.json');
    request.setRequestHeader('Content-type', 'application/json');
    request.send();

    request.onload = () => {
        const data = JSON.parse(request.response);
        switch (currency) {
            case 'som':
                usdInput.value = (input.value / data.usd).toFixed(2);
                eurInput.value = (input.value / data.eur).toFixed(2);
                break;
            case 'usd':
                somInput.value = (input.value * data.usd).toFixed(2);
                eurInput.value = (somInput.value / data.eur).toFixed(2);
                break;
            case 'eur':
                somInput.value = (input.value * data.eur).toFixed(2);
                usdInput.value = (somInput.value * data.usd).toFixed(2);
                break;
            default:
                break;
        }
    };
};

somInput.addEventListener('input', () => {
    convertAndDisplay(somInput, 'som');
});

usdInput.addEventListener('input', () => {
    convertAndDisplay(usdInput, 'usd');
});

eurInput.addEventListener('input', () => {
    convertAndDisplay(eurInput, 'eur');
});








