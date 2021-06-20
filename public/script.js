"use strict";

/**
 * Hej! Myślę, że rozwijasz się w bardzo dobrym kierunku i będzie z Ciebie dobry koder! Ogarniasz, a warsztat przyjdzie z czasem :-)
 * Nie przejmują się ilością komentarzy - starałem się opisać, co i dlaczego zmieniam. Nie przejmuj się, jeżeli czegoś nie kapujesz:
 * eksperymentuj, zmieniaj i patrz co się dzieje. Zrozumienie przyjdzei z czasem.
 * 
 * Kolejność przeglądania zmodyfikowanych plików:
 * 1. ten :-)
 * 2. cart.js
 * 3. ui_utils.js
 * 4. cart_service_client.js
 * 5. backendowy shoppingcart.js
 * 
 * ------
 * PS W 'normalnym' kodzie w firmie, raczej tyle komentarzy nie znajdziesz ;-)
 * ------
 * 
 * Część funkcjonalności wydzieliłem do trzech:
 * 
 * 1. cart.js - obsługuje całą logikę koszyka niezależną od UI (widoku)
 * 2. ui_utils.js - reużywalne funkcje pomocnicze, np. ustaw tekst, usuń element, przypnij eventHandler
 * 3. cart_service_client.js - funkcje obsługujące komunikację z serwerem
 * 
 * Pomyśl, jak można jeszcze podzielić widok, na mniejsze logiczne kawałki?
 * Pro tips: 
 *  - Może warto dopisać klasę obsługującą tylko górną belkę?
 *  - Może warto dopisać klasę obsługującą tylko przyciski edycji? I tak dalej ;-)
 */
class UI {

  /**
   * Cały stan (tj. aktualne dane) koszyka przechowuje obiekt klasy ShoppingCart
   * Klasa UI zajmuje się tylko wyświetlaniem danych i obsługą zdarzeń interfejsu.
   */
  constructor() {
    this.shoppingCart = new ShoppingCart();
    this.bindActionButtons();
  }

 /**
   * Przypinamy akcje do przycisków wyrenderowanych w HTMLu
   */
  bindActionButtons() {
    bindClickActionTo(".add-btn", this.addToCart.bind(this));
    bindClickActionTo(".clear-btn", this.clearShoppingList.bind(this));
    bindClickActionTo(".back-btn", this.resetItemForm.bind(this));
    bindClickActionTo(".shoppingcart-show-btn", this.showShoppingCart.bind(this));
  }

  /**
   * Tutaj przeróbka polegała na tym, że renderowanie koszyka zawsze 
   * czyści wszystkie elementy, a później ponownie wyświetla tylko te wymagane.
   * 
   * W ten sposób nie trzeba sprawdzać stanu (isShowedShoppingCart, isEdit) i przestawiać wartości tych flag 
   * w wielu miejscach w kodzie.
   * 
   * Po prostu zawsze najpierw wszystko resetujemy, a później wyświetlamy od nowa tylko to, co trzeba.
   * 
   * Krok po kroku:
   * 1. zresteuj wszystko
   * 2. wyświetl wszystkie przedmioty po kolei
   * 3. wyświetl sumę
   */
   renderCart() {
    this.resetCartView();
    this.shoppingCart.items().forEach(item => {
      this.renderCartItem(item);
    });
    this.renderCartTotal();
  }

  /**
   * Wyświetla pojedyńczy przedmiot:
   * 
   * 1. pobiera templatkę html dla przedmiotu
   * 2. wkłada go do UL
   * 3. przypina metodę displayEditPanel do przycisku edycjij
   * @param {*} cartItem 
   */
  renderCartItem(cartItem) {
    const html = getCartItemHTML(cartItem);
    insertElementAfter("#item-list", html);
    bindClickActionTo(`#item-${cartItem.name}`, this.dislayEditPanel.bind(this));
  }

  /**
   * Czyścimy formularz dodawania przedmiotu
   * Ukrywamy przyciski edycji (jeśli są pokazane)
   * Czyścimy widok listy przedmiotów (bo nie samą listę!)
   */
  resetCartView() {
    this.resetItemForm();
    this.hideEditButtons();
    clearElementHTML('#item-list');
  }

  renderCartTotal() {
    const total = this.shoppingCart.calculateTotal();
    setElementText(".total-price", total);
  }

  /**
   * Tutaj obsługujemy kliknięcie w przycisk dodaj do koszyka
   * 
   * 1. sprawdzamy, czy wszystkie wymagane pola są wypełnione
   * 2. dodajemy przedmiot do koszyka
   * 3. wysyłamy dane do backendu i jeśli są poprawnie zapisane, wyświetlamy koszyk
   * 
   * @param {klinięcie} event 
   * @returns 
   */
  addToCart(event) {
    event.preventDefault();
    if (!this.allInputsFilled()) {
      alert('Please fill all empty fields');
      return;
    };

    this.shoppingCart.addItem(this.getItemName(), this.getItemQuantity(), this.getItemPrice());
    sendCartItems(this.shoppingCart.items())
      .then(() => this.renderCart());
  }

  /**
   * Analogicznie do dodawania:
   * 
   * 1. sprawdzamy czy wszystko uzupełnione
   * 2. modyfikujemy koszyk
   * 3. wysyłamy dane do backendu
   * 4. renderujemy
   * 
   * @param {nazwa aktualizowanego przedmiotu} itemName 
   * @returns 
   */
  updateCartItem(itemName) {
    if (!this.allInputsFilled()) {
      alert('Please fill all empty fields');
      return;
    };

    this.shoppingCart.updateItem(itemName, this.getItemName(), this.getItemQuantity(), this.getItemPrice());
    sendCartItems(this.shoppingCart.items())
      .then(() => this.renderCart());
  }

  deleteCartItem(itemName) {
    this.shoppingCart.deleteItemBy(itemName);
    sendCartItems(this.shoppingCart.items())
      .then(() => this.renderCart());
  }

  allInputsFilled() {
    const nameFilled = this.getItemName() != "";
    const quantityFilled = this.getItemQuantity() != "";
    const priceFilled = this.getItemPrice() != "";
    return nameFilled && quantityFilled && priceFilled;
  }

  displayEditButtons(itemName) {
    this.hideEditButtons();
    this.displayUpdateButton(itemName);
    this.displayDeleteButton(itemName);
  }

  hideEditButtons() {
    removeElementById("delete-btn");
    removeElementById("update-btn");
  }

  displayUpdateButton(itemName) {
    const buttonHtml = getUpdateButtonHTML();
    insertElementAfter(".row", buttonHtml);
    bindClickActionTo('#update-btn', (event) => { 
      event.preventDefault();
       this.updateCartItem(itemName);
    });
  }

  displayDeleteButton(itemName) {
    const buttonHtml = getDeleteButtonHTML();
    insertElementAfter(".row", buttonHtml);
    bindClickActionTo('#delete-btn', () => this.deleteCartItem(itemName));
  }

  dislayEditPanel(e) {
    const itemName = getItemNameFromClick(e);
    this.displayEditedItemContent(itemName);
    this.displayEditButtons(itemName);
  }

  displayEditedItemContent(itemName) {
    const cartItem = this.shoppingCart.getItemBy(itemName);
    setElementValue("#item-name", cartItem.name);
    setElementValue("#item-quantity", cartItem.quantity);
    setElementValue("#item-price", cartItem.price);
  }

  resetItemForm() {
    clearElementValue("#item-name");
    clearElementValue("#item-quantity");
    clearElementValue("#item-price");
  }

  clearShoppingList() {
    this.shoppingCart.clear();
    sendCartItems(this.shoppingCart.items())
      .then(() => this.renderCart());
  }

  getItemName() {
    return getElementValue("#item-name");
  }

  getItemQuantity() {
    return getElementValue("#item-quantity");
  }

  getItemPrice() {
    return getElementValue("#item-price");
  }

  showShoppingCart(e) {
    e.preventDefault();
    fetchShoppingCart(items => {
      this.shoppingCart = ShoppingCart.from(items);
      this.renderCart();
    });
  }
}

const newUI = new UI();
