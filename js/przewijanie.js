let currentPage = 1;
const offersPerPage = 8;
let allOffers = []; // Przechowuje wszystkie oferty po za³adowaniu
const maxPages = 5; // Maksymalna liczba stron, które maj¹ byæ widoczne

function displayOffers(page) {
    const start = (page - 1) * offersPerPage;
    const end = start + offersPerPage;
    const offersToShow = allOffers.slice(start, end);

    const ofertyContainer = document.getElementById('oferty-container');
    ofertyContainer.innerHTML = ''; // Czyœci poprzednie oferty

    offersToShow.forEach(oferta => {
    const ofertaDiv = document.createElement('div');
    ofertaDiv.classList.add('box_main');
    ofertaDiv.innerHTML = `
        <h4 class="name_text">${oferta.nazwa}</h4>
        <p class="price_text">${oferta.cena}</p>
    `;
    ofertaDiv.addEventListener('click', () => {
        window.location.href = oferta.link;
    });
    ofertaDiv.style.cursor = 'pointer'; // Dodaje "łapkę" przy najechaniu
    ofertyContainer.appendChild(ofertaDiv);
});


    document.getElementById('page-number').style.display = 'none'; // Ukrywa numer strony, jeœli nie chcesz go wyœwietlaæ
    document.getElementById('prev-btn').disabled = page === 1;
    document.getElementById('next-btn').disabled = end >= allOffers.length;
    generatePageNumbers(page);
}

function generatePageNumbers(currentPage) {
    const totalPages = Math.ceil(allOffers.length / offersPerPage);
    const paginationContainer = document.getElementById('page-numbers');
    paginationContainer.innerHTML = ''; // Czyœci poprzedni¹ numeracjê

    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);

    for (let page = startPage; page <= endPage; page++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = page;
        pageButton.classList.add('page-btn');
        if (page === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            currentPage = page;
            displayOffers(currentPage);
        });
        paginationContainer.appendChild(pageButton);
    }
}

// Pobiera oferty i uruchamia paginacjê
fetch('oferty.json')
    .then(response => response.json())
    .then(data => {
        allOffers = data; // Zapisz wszystkie oferty do zmiennej
        displayOffers(currentPage); // Wyœwietl pierwsz¹ stronê ofert

        // Obs³uga przycisków do zmiany stron
        document.getElementById('prev-btn').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayOffers(currentPage);
            }
        });

        document.getElementById('next-btn').addEventListener('click', () => {
            const totalPages = Math.ceil(allOffers.length / offersPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                displayOffers(currentPage);
            }
        });
    })
    .catch(error => console.error('B³¹d przy wczytywaniu ofert:', error));
