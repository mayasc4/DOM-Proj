/**
 * Created by mayasc on 7/15/15.
 */

var CashRegister = (function () {

    var productsInCart = {};
    var totalCost = 0;

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

    return {
        getProductsInCart: function () {
            return productsInCart;
        },

        addCouponToCart: function (couponCode) {
            calculateTotalCost(couponCode);
        },

        addProductToCart: function (productId) {
            if (productId in productsInCart) {
                productsInCart[productId] += 1;
            } else {
                productsInCart[productId] = 1;
            }
            Products.reduceProductQuantity(productId);
            calculateTotalCost();
        },

        removeProductFromCart: function (productId) {
            productsInCart[productId] -= 1;
            if (productsInCart[productId] === 0) {
                delete productsInCart[productId];
            }
            PubSub.publish('increaseProductQuantity', productId);
            Products.increaseProductQuantity(productId);
            calculateTotalCost();
        },

        getTotalCost: function () {
            return totalCost;
        }
    }
}());