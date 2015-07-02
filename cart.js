/**
 * Created by mayasc on 7/2/15.
 */

/* Cart */
function addItemEvent(e) {
    e = e || window.event;
    var item = e.target;
    item = item.parentElement.parentElement;
    publish('addItem', item);
}

function createDiv(classText, text) {
    var item_div = document.createElement('div');
    item_div.setAttribute('class',classText);
    item_div.textContent = text;
    return item_div;
}

function addDivToCart(div_to_add) {
    var cart = document.querySelector('.cart-container');
    cart.appendChild(div_to_add);
}

function addItemToCart(item) {
    var new_div = createDiv("item-in-cart-container","");

    var inline_div = createDiv('cart item id', item.querySelector('td[name="id"]').textContent);
    new_div.appendChild(inline_div);

    var inline_div = createDiv('cart item name', item.querySelector('td[name="name"]').textContent);
    new_div.appendChild(inline_div);

    inline_div = createDiv('cart item price', item.querySelector('td[name="price"]').textContent);
    new_div.appendChild(inline_div);

    inline_div = createDiv('cart item remove', 'Remove');
    inline_div.setAttribute('onClick','removeItemEvent()');
    new_div.appendChild(inline_div);

    addDivToCart(new_div);

}

function removeItemEvent(e) {
    e = e || window.event;
    var item = e.target;
    item = item.parentElement;
    publish('removeItem', item);
}

function removeItemFromCart(item_to_remove) {
    var cart = document.querySelector('.cart-container');
    cart.removeChild(item_to_remove);
}


function calculateTotalCart() {
    // Remove old calculation
    var cart = document.querySelector('.cart-container');
    var old_total =  document.querySelector('.cart-total-price');
    if (old_total) {
        cart.removeChild(old_total);
    }

    var items_in_cart = document.querySelectorAll('.item-in-cart-container');

    // transform it to array of items:
    var itemsArray = [];
    for (var i = 0; i < items_in_cart.length; ++i) {
        itemsArray[i] = items_in_cart[i];
    }

    var prices = [];
    if (items_in_cart.length > 0) {
        prices = itemsArray.map(function(item) {
            console.log(item);
            var item_price = item.querySelector('.price');
            console.log(item_price);
            item_price = parseInt(item_price.textContent);
            return item_price;
        });
    }
    var totalAmount = prices.reduce(function(a, b) { return a + b; });

    addDivToCart(createDiv('cart-total-price','Total:' + totalAmount + '$'));
}

