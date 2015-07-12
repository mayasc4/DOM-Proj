/**
 * Created by mayasc on 7/2/15.
 */

/* Cart */

var Cart = (function () {
    var productsInCart = {};
    var totalCost = 0;

    function getCartDOM () {
        var cartContent = document.createDocumentFragment();

        for (var productId in productsInCart) {
            var new_item = Utilities.createNewElement('div','row');
            var product = Products.getProductById(productId);

            new_item.appendChild(Utilities.createNewElement('div', 'cell', product.id, {name: 'id'}));
            new_item.appendChild(Utilities.createNewElement('div', 'cell', product.name, {name: 'name'}));
            new_item.appendChild(Utilities.createNewElement('div', 'cell', product.price, {name: 'price'}));
            new_item.appendChild(Utilities.createNewElement('div', 'cell', productsInCart[productId], {name: 'quantity'}));

            var remove_div = Utilities.createNewElement('div', 'cell clickable', 'Remove', {'id': product.id});
            remove_div.addEventListener('click',function(){ PubSub.publish('removeItem',product.id)}.bind(product));

            new_item.appendChild(remove_div);

            cartContent.appendChild(new_item);
        }
        return cartContent;
    }

    function calculateTotalCost() {
        var tempTotal = 0;
        for (var productId in productsInCart) {

            var product = Products.getProductById(productId);

            tempTotal += product.intPrice * productsInCart[productId];
        }
        totalCost = tempTotal;
        //TODO - insert coupon calc
        return totalCost;
    }


    return {
        addProductToCart: function (productId) {
            if (productId in productsInCart) {
                productsInCart[productId] += 1;
            } else {
                productsInCart[productId] = 1;
            }
            Products.reduceProductQuantity(productId);
        },

        removeProductFromCart: function (productId) {
            productsInCart[productId] -= 1;
            if (productsInCart[productId] === 0) {
                   delete productsInCart[productId];
            }
            Products.increaseProductQuantity(productId);
        },

        drawCart: function () {
            // Remove old
            Utilities.removeSpecificElements('.table.cart', 'div.total');
            Utilities.removeSpecificElements('.table.cart', 'div.row');

            // Create new
            var cartContent = getCartDOM();

            // Add Calculation to Cart
            cartContent.appendChild(Utilities.createNewElement('div','total','Total:' + calculateTotalCost() + '$'));

            // Add to cart table
            var cart = document.querySelector('.table.cart');
            cart.appendChild(cartContent);
        }

    }

}());
