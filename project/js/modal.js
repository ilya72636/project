const modal = document.querySelector('.modal');
const modalTrigger = document.querySelector('#btn-get');
const modalButton = document.querySelector('.modal_close');

let modalShown = false; 

const openModal = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
};

const scrollHandler = () => {
    if (!modalShown && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        openModal();
        modalShown = true; 
        window.removeEventListener('scroll', scrollHandler);
    }
};

modalTrigger.onclick = () => {
    openModal();
};

modalButton.onclick = (event) => {
    closeModal();
};

modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal();
    }
};

window.addEventListener('scroll', scrollHandler);



setTimeout(openModal, 10000);