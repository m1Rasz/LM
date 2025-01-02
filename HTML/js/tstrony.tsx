function renderOffer(oferta) {
    const detailsContainer = document.querySelector('.product-info');
    detailsContainer.innerHTML = `<h2>${oferta.nazwa}</h2><p><strong>Prime Status:</strong> ${oferta.primeStatus}</p>`;

    detailsContainer.innerHTML += `<h3>Szczegó³y konta</h3>`;
    oferta.szczegoly.forEach(szczegol => {
        detailsContainer.innerHTML += `<p>${szczegol}</p>`;
    });

    document.querySelector('.total-amount strong').innerText = oferta.cena;
    document.querySelector('.buy-now').setAttribute('data-shoppy-product', oferta.shoppyProductCode);

    const paymentContainer = document.querySelector('.purchase-container .payment');
    paymentContainer.innerHTML = `<strong>Metody p³atnoœci</strong>`;
    oferta.metodyPlatnosci.forEach(metoda => {
        paymentContainer.innerHTML += `<p class="${metoda.nazwa.toLowerCase()}"><img src="${metoda.ikona}" alt="${metoda.nazwa}"></p>`;
    });
}

function getOfferId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function loadOfferDetails() {
    const offerId = getOfferId();

    fetch('strony.json')
        .then(response => response.json())
        .then(oferty => {
            const oferta = oferty.find(o => o.id == offerId);
            if (oferta) {
                renderOffer(oferta);
            } else {
                alert('Oferta nie znaleziona');
            }
        })
        .catch(error => console.error('B³¹d przy wczytywaniu oferty:', error));
}

document.addEventListener('DOMContentLoaded', loadOfferDetails);