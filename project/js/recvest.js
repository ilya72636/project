async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Ошибка загрузки данных');
    }
    return await response.json();
}

function createCard(title, body) {
    const cardContainer = document.querySelector('.card-container');

    const card = document.createElement('div');
    card.classList.add('card-item');

    const image = document.createElement('img');
    image.src = '../img/geeks.png'; 
    card.appendChild(image);

    const cardTitle = document.createElement('h3');
    cardTitle.textContent = title;
    card.appendChild(cardTitle);

    const cardBody = document.createElement('p');
    cardBody.textContent = body;
    card.appendChild(cardBody);

    cardContainer.appendChild(card);
}

async function displayCards() {
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts');

        data.forEach(post => {
            createCard(post.title, post.body);
        });
    } catch (error) {
        console.error(error.message);
    }
}

displayCards();