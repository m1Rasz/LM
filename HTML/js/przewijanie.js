let currentPage = 1;
const offersPerPage = 8;
let allOffers = []; // Przechowuje wszystkie oferty po za�adowaniu
const maxPages = 5; // Maksymalna liczba stron, kt�re maj� by� widoczne

function displayOffers(page) {
    const start = (page - 1) * offersPerPage;
    const end = start + offersPerPage;
    const offersToShow = allOffers.slice(start, end);

    const ofertyContainer = document.getElementById('oferty-container');
    ofertyContainer.innerHTML = ''; // Czy�ci poprzednie oferty

    offersToShow.forEach(oferta => {
        const ofertaDiv = document.createElement('div');
        ofertaDiv.classList.add('box_main');
        ofertaDiv.innerHTML = `
            <a href="${oferta.link}">
                <h4 class="name_text">${oferta.nazwa}</h4>
                <p class="price_text">${oferta.cena}</p>
            </a>
        `;
        ofertyContainer.appendChild(ofertaDiv);
    });


    document.getElementById('page-number').style.display = 'none'; // Ukrywa numer strony, je�li nie chcesz go wy�wietla�
    document.getElementById('prev-btn').disabled = page === 1;
    document.getElementById('next-btn').disabled = end >= allOffers.length;
    generatePageNumbers(page);
}

function generatePageNumbers(currentPage) {
    const totalPages = Math.ceil(allOffers.length / offersPerPage);
    const paginationContainer = document.getElementById('page-numbers');
    paginationContainer.innerHTML = ''; // Czy�ci poprzedni� numeracj�

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

// Pobiera oferty i uruchamia paginacj�
fetch('oferty.json')
    .then(response => response.json())
    .then(data => {
        allOffers = data; // Zapisz wszystkie oferty do zmiennej
        displayOffers(currentPage); // Wy�wietl pierwsz� stron� ofert

        // Obs�uga przycisk�w do zmiany stron
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
    .catch(error => console.error('B��d przy wczytywaniu ofert:', error));