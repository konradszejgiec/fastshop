/**
 * Staraj się pisać krótkie funkcje, które robią konceptualnie jedną rzecz.
 * 
 * Ta "jedna rzecz" jest trudna w zdefiniowaniu, np. funkcja renderCart w klasie UI, chociaż ma wiele kroków, ale jako całość
 * robi właśnie jedną rzecz - wyświetla koszyk.
 * 
 * Wcześniej w klasie UI była funkcja getHTMLElement, która robiła "wszystko" ;-)
 * 1. Przypinała event handlery do zdarzeń, 
 * 2. dodawała HTML po jakimś elemencie,
 * 3. i tak robiła get ;-)
 *  
 * Taka "boska metoda", jest później trudna w ogarnięciu przez kogoś kto czyta kod, tym bardziej, że jej nazwa 
 * sugerowała, że tylko coś pobiera ;-)
 * 
 * Staraj się nazywać metody, tak by ich nazwa w miarę jasno wyjasniała co robi. Dodatkowo są pewne konwencje:
 * getCośtam - raczej tylko zwraca, nic "bokiem" nie ustawia
 * setCośtam - raczej nic nie zwraca, tylko coś ustawia
 * 
 * -- 
 * Staraj się pisać też funkcje reużywalne, tj. takie, których można użyć w wielu kontekstach i budować z nich funcje coraz bardziej złożone.
 * getElementBy(elementSelector) jest przykładem super prostej i równocześniej bardzo reużywalnej funkcji.
 * 
 * Z niej budujemy trochę bardziej złożne (getElementValue, setElementValue itd.), a z nich jeszcze bardziej: np. displayEditedItemContent w klasie UI
 * 
 */
// ----
function getElementBy(elementSelector) {
    return document.querySelector(elementSelector);
}

function getElementValue(elementSelector) {
    return getElementBy(elementSelector).value;
}

function setElementValue(elementSelector, value) {
    getElementBy(elementSelector).value = value;
}

function insertElementAfter(existingElementSelector, newElementHtml) {
    getElementBy(existingElementSelector).insertAdjacentHTML("beforeend", newElementHtml);
}

function bindClickActionTo(elementSelector, action) {
    getElementBy(elementSelector).addEventListener('click', action);
}

function setElementText(elementSelector, newText) {
    getElementBy(elementSelector).innerText = newText;
}

function clearElementValue(elementSelector) {
    getElementBy(elementSelector).value = '';
}

function clearElementHTML(elementSelector) {
    getElementBy(elementSelector).innerText = '';
}

function insertElementAfter(existingElementSelector, newElementHtml) {
    getElementBy(existingElementSelector).insertAdjacentHTML("beforeend", newElementHtml);
}

function removeElementById(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.outerHTML = '';
    }
}

function getItemNameFromClick(event) {
    return event.target.parentElement.parentElement.id;
}

function getCartItemHTML(cartItem) {
    return `<li class="collection-item" id="${cartItem.name}">
                <strong>Item: </strong>${cartItem.name} || <strong>Quantity: </strong>${cartItem.quantity} || <strong>Price: </strong>${cartItem.price} $
                <a href="#" class="secondary-content">
                  <i id="item-${cartItem.name}" class="fa fa-pencil edit"></i>
                </a>
            </li>`;
}

function getUpdateButtonHTML() {
    return getButtonHTML('Update', 'update-btn', 'update-btn', 'orange');
}

function getDeleteButtonHTML() {
    return getButtonHTML('Delete', 'delete-btn', 'delete-btn', 'red');
}

function getButtonHTML(label, buttonId, buttonClass, colour) {
    return `<button id="${buttonId}" class="${buttonClass} btn ${colour}">
              <i class="fa fa-pencil-square-o"></i> ${label} Item
            </button>`;
}