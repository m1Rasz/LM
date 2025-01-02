// Funkcja, która sprawdza, czy oferta ju¿ znajduje siê w koszyku
function isOfferInCart(offerId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.some(item => item.id === offerId);
}

// Funkcja, która dodaje ofertê do koszyka
function addToCart(offer) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Sprawdzenie, czy oferta ju¿ jest w koszyku
    if (isOfferInCart(offer.id)) {
        alert('Ta oferta jest ju¿ w koszyku!');
        return;
    }

    // Dodajemy now¹ ofertê do koszyka
    const cartItem = {
        id: offer.id,
        szczegoly: offer.szczegoly[0],
        cena: offer.cena,
        shoppyProductCode: offer.shoppyProductCode || null
    };

    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`Dodano do koszyka: ${cartItem.szczegoly}`);
}

// Funkcja, która obs³uguje klikniêcie przycisku "Dodaj do koszyka"
function setupAddToCartButton() {
    const addToCartButton = document.querySelector('.cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            const params = new URLSearchParams(window.location.search);
            const offerId = params.get('id');
            if (!offerId) {
                alert('Brak ID oferty w adresie URL!');
                return;
            }

            console.log(`ID oferty: ${offerId}`);

            fetch('strony.json')
                .then(response => response.json())
                .then(offers => {
                    const offer = offers.find(o => o.id == offerId);
                    if (!offer) {
                        alert('Nie znaleziono oferty o podanym ID!');
                        return;
                    }

                    addToCart(offer); // Dodajemy ofertê do koszyka
                })
                .catch(error => {
                    console.error('B³¹d:', error);
                    alert('Wyst¹pi³ problem podczas dodawania do koszyka.');
                });
        });
    } else {
        console.warn('Przycisk "Dodaj do koszyka" nie znaleziony.');
    }
}

// Funkcja inicjuj¹ca ca³y skrypt
function initCart() {
    setupAddToCartButton();
}

document.addEventListener('DOMContentLoaded', initCart);