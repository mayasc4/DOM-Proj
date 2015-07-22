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

        // TODO make this more pretty

        var productElements = _.filter(App.Products.getAllProducts(), function(product) {
            var retVal = _.includes(Object.keys(productsInCart), product.id.toString());
            return retVal;
        });


        tempTotal = _.reduce(productElements, function(acc, curr) {
            var price = curr.onSale ? curr.priceAfterSale : curr.intPrice;
            return acc + ( price * productsInCart[curr.id]);
        }, 0);

        maxCost = _.max(_.pluck(productElements, 'intPrice'));

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