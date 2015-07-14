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
            var newItem = Utilities.createNewElement('div','row');
            var product = Products.getProductById(productId);

            newItem.appendChild(Utilities.createNewElement('div', 'cell', product.id, {name: 'id'}));
            newItem.appendChild(Utilities.createNewElement('div', 'cell', product.name, {name: 'name'}));
            newItem.appendChild(Utilities.createNewElement('div', 'cell', product.price, {name: 'price'}));
            newItem.appendChild(Utilities.createNewElement('div', 'cell', productsInCart[productId], {name: 'quantity'}));

            var removeDiv = Utilities.createNewElement('div', 'cell clickable', 'Remove', {'id': product.id});
            removeDiv.addEventListener('click',function(){ PubSub.publish('removeItem',this.id)}.bind(product) );
            removeDiv.addEventListener('click',function(){ PubSub.publish('drawCart') });

            newItem.appendChild(removeDiv);

            cartContent.appendChild(newItem);
        }
        return cartContent;
    }


    function calculateTotalCost(couponCode) {
        var tempTotal = 0;
        var maxCost = 0;
        for (var productId in productsInCart) {
            var product = Products.getProductById(productId);
            maxCost = maxCost < product.intPrice ? product.intPrice : maxCost;
            tempTotal += product.intPrice * productsInCart[productId];
        }
        totalCost = tempTotal;

        if (couponCode) {
            totalCost = Coupons.calcCouponDiscount(couponCode, totalCost, maxCost);
        }

        return totalCost;
    }

    function getCouponDiv() {
        var couponDiv = Utilities.createNewElement('div','row', 'Enter Coupon Code: ');

        var inputField = Utilities.createNewElement('input', '', '', {type: 'text'});
        couponDiv.appendChild(inputField);

        var buttonElement = Utilities.createNewElement('button', '', 'Get Discount');
        buttonElement.addEventListener('click', function () { PubSub.publish('useCoupon', inputField.value) } );
        couponDiv.appendChild(buttonElement);

        return couponDiv;
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

        drawCart: function (couponCode) {
            // Remove old
            Utilities.removeSpecificElements('.table.cart', 'div.total');
            Utilities.removeSpecificElements('.table.cart', 'div.row');
            Utilities.removeSpecificElements('.table.cart', 'div.error');

            // Create new
            var cartContent = getCartDOM();

            // Add Calculation to Cart
            cartContent.appendChild(Utilities.createNewElement('div','total','Total:' + calculateTotalCost(couponCode) + '$'));

            // Add Coupons Option to Cart
            cartContent.appendChild(getCouponDiv());

            // Add to cart table
            var cart = document.querySelector('.table.cart');
            cart.appendChild(cartContent);
        }

    }

}());
