/**
 * Created by mayasc on 7/2/15.
 */

'use strict';

// dependencies - domutils, cashregister, products, pubsub

/* Cart */

App.Cart = (function (App) {

    function createCartFragment() {
        var cartContent = document.createDocumentFragment();
        var productsInCart = App.CashRegister.getProductsInCart();

        for (var productId in productsInCart) {
            if (productsInCart.hasOwnProperty(productId)) {
                var newItem = App.DOMUtils.createNewElement('div', 'row');
                var product = App.Products.getProductById(productId);

                newItem.appendChild(App.DOMUtils.createNewElement('div', 'cell', product.id, {name: 'id'}));
                newItem.appendChild(App.DOMUtils.createNewElement('div', 'cell', product.name, {name: 'name'}));
                if (product.onSale) {
                    newItem.appendChild(App.DOMUtils.createNewElement('div', 'cell green', product.priceAfterSale, {name: 'price'}));
                } else {
                    newItem.appendChild(App.DOMUtils.createNewElement('div', 'cell', product.price, {name: 'price'}));
                }
                newItem.appendChild(App.DOMUtils.createNewElement('div', 'cell', App.CashRegister.getProductsInCart()[productId], {name: 'quantity'}));

                var removeDiv = App.DOMUtils.createNewElement('div', 'cell clickable', 'Remove', {'id': product.id});
                removeDiv.addEventListener('click', function () {
                    App.PubSub.publish('removeItem', this.id);
                }.bind(product));

                newItem.appendChild(removeDiv);

                cartContent.appendChild(newItem);
            }
        }
        return cartContent;
    }

    function createCouponElement() {
        var couponDiv = App.DOMUtils.createNewElement('div', 'row', 'Enter Coupon Code: ');

        var inputField = App.DOMUtils.createNewElement('input', '', '', {type: 'text'});
        couponDiv.appendChild(inputField);

        var buttonElement = App.DOMUtils.createNewElement('button', '', 'Get Discount');
        buttonElement.addEventListener('click', function () {
            App.PubSub.publish('useCoupon', inputField.value);
        });
        couponDiv.appendChild(buttonElement);

        return couponDiv;
    }


    return {
        drawCart: function () {
            // Remove old
            App.DOMUtils.removeChildren('.table.cart', 'div.total');
            App.DOMUtils.removeChildren('.table.cart', 'div.row');
            App.DOMUtils.removeChildren('.table.cart', 'div.error');

            // Create new
            var cartContent = createCartFragment();

            // Add Calculation to Cart
            cartContent.appendChild(App.DOMUtils.createNewElement('div', 'total', 'Total:' + App.CashRegister.getTotalCost() + '$'));

            // Add Coupons Option to Cart
            cartContent.appendChild(createCouponElement());

            // Add to cart table
            var cart = document.querySelector('.table.cart');
            cart.appendChild(cartContent);
        }
    };

}(App));
