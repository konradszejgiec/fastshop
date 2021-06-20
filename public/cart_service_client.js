function sendCartItems(cartItems) {
    return fetch(`/shoppingcart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems),
    });
}

/**
 * Ponieważ ta funkcja zwraca Promise - czyli "obietnicę, że coś się _kiedyś_ wykona, ale nie wiadomo kiedy"
 * musimy przekazać tutaj callback - tj. funkcję, która zostanie uruchomiona, gdy dane z serwera wrócą.
 * 
 * Jak spojrzysz na użycie tej funkcji w klasie UI, to zobaczysz, że callback to tak naprawdę funckja ustawiająca 
 * aktualną zawartość koszyka zwróconą na podstawie danych serwera:
 * 
 * items => {
 *    this.shoppingCart = ShoppingCart.from(items);
 *    this.renderCart();
 * }
 * 
 * To trochę 'mind-blowing' - ponieważ rzeczy nie dzieją się w kodzie "po kolei" - trzeba się do tego przyzwyczaić w JSie.
 * 
 * @param {} callback 
 */
function fetchShoppingCart(callback) {
    fetch("/items.json", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(items => callback(items));
}
