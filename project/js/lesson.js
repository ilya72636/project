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





const cardBloz = document.querySelector('.card');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');

let currentCard = 1;

const loadCardData = (cardNumber) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${cardNumber}`)
        .then(response => response.json())
        .then(data => {
            cardBloz.innerHTML = `
                <p>${data.title}</p>
                <p style="color:${data.completed ? 'green' : 'red'}">${data.completed}</p>
                <span>${data.id}</span>
            `;
        })
        .catch(error => {
            console.error('Error fetching card data:', error);
        });
};

const goToCard = (cardNumber) => {
    if (cardNumber === 0) {
        currentCard = 200;
    } else if (cardNumber === 201) {
        currentCard = 1;
    } else {
        currentCard = cardNumber;
    }
    loadCardData(currentCard);
};

loadCardData(currentCard);

btnPrev.addEventListener('click', () => goToCard(currentCard - 1));
btnNext.addEventListener('click', () => goToCard(currentCard + 1));









const serchInpyt = document.querySelector('.cityName');
const citi = document.querySelector('.city');
const temp = document.querySelector('.temp');

const API_KEY='e417df62e04d3b1b111abeab19cea714'
const url='http://api.openweathermap.org/data/2.5/weather'

const citySerch=()=>{
    serchInpyt.oninput=(event)=>{
        fetch(`${url}?q=${event.target.value}&appid=${API_KEY}`)
        .then(response=>response.json())
        .then(data=>{
            citi.innerHTML=data.main?data.name:'Город не наиден...'
            temp.innerHTML=
                data.name?.temp  
                ?Math.round(temp.main?.temp - 237) + '&deg;C'
                :'...'
        })
    }
}
citySerch()

















fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(postsData => {
        console.log("Posts data:", postsData);
    })
    .catch(error => {
        console.error('Error fetching posts data:', error);
    });


