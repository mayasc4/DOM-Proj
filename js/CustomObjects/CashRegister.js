/**
 * Created by mayasc on 7/15/15.
 */
'use strict';

// dependency - Products, Coupons, PubSub

App.CashRegister = (function () {

    var productsInCart = {};
    var totalCost = 0;

    function calculateTotalCost(couponCode) {
        var tempTotal = 0;
        var maxCost = 0;
        _.forEach(_.keys(productsInCart), function(productId){
            var product = App.Products.getProductById(productId);
            var price = product.onSale ? product.priceAfterSale : product.intPrice;
            maxCost = maxCost < price ? price : maxCost;
            tempTotal += price * productsInCart[productId];
        });

        totalCost = tempTotal;

        if (couponCode) {
            totalCost = App.Coupons.calcCouponDiscount(couponCode, totalCost, maxCost);
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
            App.Products.reduceProductQuantity(productId);
            calculateTotalCost();
            App.PubSub.publish('drawStore');
            App.PubSub.publish('drawCart');
        },

        removeProductFromCart: function (productId) {
            productsInCart[productId] -= 1;
            if (productsInCart[productId] === 0) {
                delete productsInCart[productId];
            }
            App.PubSub.publish('increaseProductQuantity', productId);
            App.Products.increaseProductQuantity(productId);
            calculateTotalCost();
            App.PubSub.publish('drawStore');
            App.PubSub.publish('drawCart');
        },

        getTotalCost: function () {
            return totalCost;
        }
    };
}(App));