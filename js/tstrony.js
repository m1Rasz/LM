function renderOffer(oferta) {
    const detailsContainer = document.querySelector('.product-info');


    detailsContainer.innerHTML += `<h2>Required information</h2>`;
    oferta.szczegoly.forEach(szczegol => {
        detailsContainer.innerHTML += `<p>${szczegol}</p>`;
    });

    document.querySelector('.total-amount strong').innerText = oferta.cena;
    document.querySelector('.buy-now').setAttribute('data-shoppy-product', oferta.shoppyProductCode);

    const paymentContainer = document.querySelector('.purchase-container .payment');
    paymentContainer.innerHTML = `<strong>Payment methods</strong>`;
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
        .catch(error => console.error('Error when loading an offer:', error));
}

document.addEventListener('DOMContentLoaded', loadOfferDetails);