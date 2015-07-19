/**
 * Created by mayasc on 7/2/15.
 */

/* Cart */

var Cart = (function () {

    function createCartFragment () {
        var cartContent = document.createDocumentFragment();

        for (var productId in CashRegister.getProductsInCart()) {
            var newItem = DOMUtils.createNewElement('div','row');
            var product = Products.getProductById(productId);

            newItem.appendChild(DOMUtils.createNewElement('div', 'cell', product.id, {name: 'id'}));
            newItem.appendChild(DOMUtils.createNewElement('div', 'cell', product.name, {name: 'name'}));
            if (product.onSale) {
                newItem.appendChild(DOMUtils.createNewElement('div', 'cell green', product.priceAfterSale, {name: 'price'}));
            } else {
                newItem.appendChild(DOMUtils.createNewElement('div', 'cell', product.price, {name: 'price'}));
            }
            newItem.appendChild(DOMUtils.createNewElement('div', 'cell', CashRegister.getProductsInCart()[productId], {name: 'quantity'}));

            var removeDiv = DOMUtils.createNewElement('div', 'cell clickable', 'Remove', {'id': product.id});
            removeDiv.addEventListener('click',function(){ PubSub.publish('removeItem',this.id)}.bind(product) );
            removeDiv.addEventListener('click',function(){ PubSub.publish('drawCart') });

            newItem.appendChild(removeDiv);

            cartContent.appendChild(newItem);
        }
        return cartContent;
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

        drawCart: function () {
            // Remove old
            DOMUtils.removeChildren('.table.cart', 'div.total');
            DOMUtils.removeChildren('.table.cart', 'div.row');
            DOMUtils.removeChildren('.table.cart', 'div.error');

            // Create new
            var cartContent = createCartFragment();

            // Add Calculation to Cart
            cartContent.appendChild(DOMUtils.createNewElement('div','total','Total:' + CashRegister.getTotalCost() + '$'));

            // Add Coupons Option to Cart
            cartContent.appendChild(createCouponElement());

            // Add to cart table
            var cart = document.querySelector('.table.cart');
            cart.appendChild(cartContent);
        }

    }

}());
