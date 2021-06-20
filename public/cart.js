/**
 * Jedną z ważnych rzeczy w budowaniu kodu obiektowego, jest zadbanie o to, zeby kazda klasa miała jeden rodzaj odpowiedzialnosci:
 * 
 * W przypadku koszyka możesz myśleć o tym w ten sposób:
 * 1. ze ma on jakąś swoją strukturę i operacje, które mozna na nim wykonac (pierwszka klasa - ShoppingCart)
 * 2. znajdują się w nim przedmioty, które też mają swoje właściwości (druka klasa CartItem)
 * 3. jest też widok / UI - klasa, która wyświetla dane z dwóch powyższych.
 * 
 * Dobrą intuicją było oddzielenie klasy CartItem! :-)
 */
class ShoppingCart {

    /**
     * Zamiast listy, zdecydowanie bardziej wygodną strukturą danych do przechowywania danych o przedmiotach w koszyku jest "mapa".
     * Mapa, to taka struktura, która przechowuje pary: klucz -> wartość, np. imię -> Tomek. Z założenia, w mapie jednemu kluczowi zawsze
     * odpowiada jedna wartość.
     * 
     * W JSie obiekty są po protu takimi mapami, gdzie kluczem - zamiast wyliczanego "id", może być po prostu nazwa przedmiotu :-)
     * Nasze towary w koszyku możemy zatem przechowywać w obiekcie. Na początku, gdy koszyk jest pusty,
     * zaczynamy od pustego obiektu {}. Dodajemy jeden przedmiot, np. { name: Pomidor, price: 1, quantity: 1 }, to nasza mapa wygląda tak:
     * 
     * cartItems = {
     *   Pomidor: { name: Pomidor, price: 1, quantity: 1 }
     * }
     * 
     * 
     * @param {} items 
     */
    constructor(items = {}) {
        this.cartItems = items;
    }

    static from(cartItems) {
        return new ShoppingCart(cartItems);
    }

    /**
     * Dodawanie jest proste, sprawdzamy, czy w mapie istnieje już wartość dla klucza (name) i jeśli tak, zwiększamy ilość.
     * Jeśli nie, dodajemy nowy wpis do mapy.
     *    
     */
    addItem(name, quantity, price) {
        const item = new CartItem(name, quantity, price);
        this.updateCart((updatedItems) => {
            if (this.cartContains(updatedItems, item)) {
                updatedItems[item.name].quantity += +item.quantity;
                updatedItems[item.name].price = item.price;
            } else {
                updatedItems[item.name] = item;
            }
        })
    }

    /**
     * Aktualizacja polega na usunięciu "starej" wersji z mapy (operator delete) i wstawieniu nowej pod nowym kluczem, 
     * jeśli nazwa się zmieniła.
     */
    updateItem(currentName, newName, newQuantity, newPrice) {
        const updatedItem = new CartItem(newName, newQuantity, newPrice);
        this.updateCart((updatedItems) => {
            delete updatedItems[currentName];
            updatedItems[newName] = updatedItem;
        });
    }

    getItemBy(name) {
        return this.cartItems[name];
    }

    /**
     * Usunięcie to po prostu wywalenie klucza operatorem delete.
     */
    deleteItemBy(name) {
        this.updateCart((updatedItems) => {
            delete updatedItems[name];
        });
    }

    clear() {
        this.cartItems = {};
    }

    cartContains(currentItems, item) {
        return !!currentItems[item.name];
    }

    /**
     * To funkcja pomocnicza - tworzy kopię przedmiotów w koszyku,
     * następnie wywołuje na kopii funkcję update, która coś w kopii zmienia.
     * Po modyfikacji, kopia staję się aktualną wersją.
     * 
     * Tworzenie kopi w trakcie modyfikacji (copy-on-write), jest jedną z technik zapewniania
     * spójności danych i dobrych praktyk, które warto od początku poznawać ;-)
     */
    updateCart(update) {
        let updatedItems = Object.assign({}, this.cartItems);
        update(updatedItems);
        this.cartItems = updatedItems;
    }

    /**
     * Liczymy całkowitą wartość koszyka. Pomyśl, co dało oddzielenie tej logiki od widoku (UI)?
     * Można ją np., niezależnie od tego, jak całkowita wartość koszyka jest prezentowana, modyfikować.
     * 
     * Można jej też użyć w innym kontekście niż prezentowanie użytkownikowi - np. nasza aplikacja miałaby moduł księgowy, który potrzebowałby
     * całkowitej wartości koszyka do jakichś rozliczeń, albo statystyk. Gdy logika wyliczania total jest splątana z logiką jego wyświetlania jest to kłopotliwe,
     * gdy jest oddzielona, moduł księgowy wystarczy, że ma referencję na nasz obiekt i wywoła tę metodę, nie musi się martwić o HTML albo PUG ;-)
     * 
     */
    calculateTotal() {
        return this.items()
            .map(item => +item.price * +item.quantity)
            .reduce((total, itemPrice) => total + itemPrice, 0);
    }

    /**
     * Ponieważ do wyświetlenia potrzebujemy listy, zwracamy tutaj wszystkie wartości z naszej mapy, ignorując wszystkie klucze.
     * 
     * To jest bardzo ważna cecha i właściwość programowania obiektowego. Z punktu widzenia UI i użytkownika koszyk to lista.
     * Ale nam, programistom, na liście niewygodnie się operuje w kontekcie dodawania, aktualizacji i usuwania z koszyka.
     * Mapa jest znacznie bardziej wygodna. Dlatego klasa ShoppingCart chowa (enkapsuluje) implementację koszyka: my wygodnie operujemy
     * na mapie, a UI przedmioty w koszuky dalej widzi jako listę. Na tym polega dobry design kodu - pokazujesz tylko to, co konieczne,
     * chowając szczegóły ;-)
     */
    items() {
        return Object.values(this.cartItems);
    }
}

/**
 * Zrezygnowałem z pola id - użycie name jako klucza sporo rzeczy uprościło ;-)
 */
class CartItem {

    constructor(name, quantity, price) {
        this.name = name;
        this.quantity = +quantity;
        this.price = +price;
    }

}
