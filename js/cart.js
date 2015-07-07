/**
 * Created by mayasc on 7/2/15.
 */

/* Cart */

function drawCart() {
    var cart_content = document.createDocumentFragment();

    for (var item in CART) {
        var new_item = createNewElement('div','row');

        new_item.appendChild(createNewElement('div', 'cell', CART[item].id, {name: 'id'}));
        new_item.appendChild(createNewElement('div', 'cell', CART[item].name, {name: 'name'}));
        new_item.appendChild(createNewElement('div', 'cell', CART[item].price, {name: 'price'}));
        new_item.appendChild(createNewElement('div', 'cell', CART[item].quantity, {name: 'quantity'}));

        var remove_div = createNewElement('div', 'cell clickable', 'Remove', {'id': CART[item].id});
        remove_div.addEventListener('click',function(){ publish('removeItem',CART[this].id)}.bind(item));

        new_item.appendChild(remove_div);

        cart_content.appendChild(new_item);
    }

    var cart = document.querySelector('.table.cart');
    cart.appendChild(cart_content);
}


/* Add To Cart */

function addItemToCart(item_id) {
    var item_by_id = ITEMS.filter(function(curr) {
        return  (item_id === curr.id);
    });
    item_by_id = item_by_id.pop();

    var is_in_cart = false;
    for (var i = 0 ; i < CART.length ; i++) {
        if (CART[i].id == item_id) {
            CART[i].quantity++;
            is_in_cart = true;
        }
    }
    if (is_in_cart === false) {
        CART.push({'id': item_by_id.id,
            'name': item_by_id.name,
            'price': item_by_id.price,
            'quantity': 1});
    }

    removeSpecificElements('.table.cart', 'div.row');
    drawCart();
}


/* Remove From Cart */

function removeItemFromCart(item_id) {
    console.log(item_id);
    for (var i = 0 ; i < CART.length ; i++) {

        if (CART[i].id == item_id) {
            CART[i].quantity = CART[i].quantity - 1;

            if (CART[i].quantity === 0) {
                CART = CART.filter(function(curr) {
                    return  (item_id !== curr.id);
                });
            }
        }
    }

    removeSpecificElements('.table.cart', 'div.row');
    drawCart();
}



/* Calculate Total Amount Of Money */

function calculateTotalCart() {

    // Remove old calculation
    removeSpecificElements('.cart','div.total');

    // Calculate
    var totalAmount = 0;
    for (var i = 0 ; i < CART.length ; i++) {
        totalAmount += parseInt(CART[i].price.replace('$','').replace(',','')) * CART[i].quantity;
    }

    // Add Calculation to Cart
    var cart = document.querySelector('.table.cart');
    cart.appendChild(createNewElement('div','total','Total:' + totalAmount + '$'));
}

