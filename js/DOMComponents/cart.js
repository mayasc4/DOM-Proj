/**
 * Created by mayasc on 7/2/15.
 */

/* Cart */

var Cart = (function () {
    var productsInCart = {};
    var totalCost = 0;

    function createCartFragment () {
        var cartContent = document.createDocumentFragment();

        for (var productId in productsInCart) {
            var newItem = DOMUtils.createNewElement('div','row');
            var product = Products.getProductById(productId);

            newItem.appendChild(DOMUtils.createNewElement('div', 'cell', product.id, {name: 'id'}));
            newItem.appendChild(DOMUtils.createNewElement('div', 'cell', product.name, {name: 'name'}));
            newItem.appendChild(DOMUtils.createNewElement('div', 'cell', product.price, {name: 'price'}));
            newItem.appendChild(DOMUtils.createNewElement('div', 'cell', productsInCart[productId], {name: 'quantity'}));

            var removeDiv = DOMUtils.createNewElement('div', 'cell clickable', 'Remove', {'id': product.id});
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

    function createCouponElement() {
        var couponDiv = DOMUtils.createNewElement('div','row', 'Enter Coupon Code: ');

        var inputField = DOMUtils.createNewElement('input', '', '', {type: 'text'});
        couponDiv.appendChild(inputField);

        var buttonElement = DOMUtils.createNewElement('button', '', 'Get Discount');
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
            PubSub.publish('increaseProductQuantity', productId);
            Products.increaseProductQuantity(productId);
        },

        drawCart: function (couponCode) {
            // Remove old
            DOMUtils.removeMatchingChildren('.table.cart', 'div.total');
            DOMUtils.removeMatchingChildren('.table.cart', 'div.row');
            DOMUtils.removeMatchingChildren('.table.cart', 'div.error');

            // Create new
            var cartContent = createCartFragment();

            // Add Calculation to Cart
            cartContent.appendChild(DOMUtils.createNewElement('div','total','Total:' + calculateTotalCost(couponCode) + '$'));

            // Add Coupons Option to Cart
            cartContent.appendChild(createCouponElement());

            // Add to cart table
            var cart = document.querySelector('.table.cart');
            cart.appendChild(cartContent);
        }

    }

}());
