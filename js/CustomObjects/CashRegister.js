/**
 * Created by mayasc on 7/15/15.
 */
'use strict';

// dependency - Products, Coupons, PubSub

define(['./Products', './Coupons', '../Utils/pubsub'], function (Products, Coupons, pubsub) {
    var productsInCart = {};
    var totalCost = 0;
    var allCoupons = {};

    // Coupons
    var generatedCode = 0;
    var Coupon = function () {
        this.code = generatedCode++;
    };

    var DiscountCoupon = function (discountValue) {
        Coupon.call(this);
        this.discountValue = discountValue;
    };
    DiscountCoupon.prototype = Object.create(Coupon.prototype);
    DiscountCoupon.prototype.constructor = DiscountCoupon;


    var FreeCoupon = function () {
        Coupon.call(this);
    };
    FreeCoupon.prototype = Object.create(Coupon.prototype);
    FreeCoupon.prototype.constructor = FreeCoupon;

    function validateCoupon (code) {
        if (allCoupons[code]) {
            return true;
        }
    }

    // Cash Register
    function calculateTotalCost(couponCode) {
        // TODO make this more pretty

        var productElements = _.filter(Products.getAllProducts(), function (product) {
            return _.includes(Object.keys(productsInCart), product.id.toString());
        });


        totalCost = _.reduce(productElements, function (acc, curr) {
            //var price = curr.onSale ? curr.priceAfterSale : curr.intPrice;
            var price = curr.priceAfterSale;
            return acc + ( price * productsInCart[curr.id]);
        }, 0);

        var maxCost = _.max(_.pluck(productElements, 'priceAfterSale'));

        if (couponCode) {
            var coupon = allCoupons[couponCode];
            if (coupon instanceof FreeCoupon) {
                totalCost = totalCost - maxCost;
            } else {
                totalCost = totalCost * (1 - coupon.discountValue);
            }
        }
        return totalCost;
    }

    return {
        FreeCoupon: FreeCoupon,

        DiscountCoupon: DiscountCoupon,

        getAllCoupons: function () {
            return allCoupons;
        },

        addCoupon: function (ConstructorType, discountValue) {
            var newCoupon = new ConstructorType(discountValue);
            allCoupons[newCoupon.code] = newCoupon;
            return newCoupon.code;
        },

        getCouponByCode: function (code) {
            return allCoupons[code];
        },

        useCoupon: function (code) {
            if (validateCoupon(code)) {
                calculateTotalCost(code);
                pubsub.publish('drawCart');
            } else {
                pubsub.publish('invalidCouponEvent');
            }
        },

        getProductsInCart: function () {
            return productsInCart;
        },

        addProductToCart: function (productId) {
            if (productId in productsInCart) {
                productsInCart[productId] += 1;
            } else {
                productsInCart[productId] = 1;
            }
            Products.reduceProductQuantity(productId);
            calculateTotalCost();
            pubsub.publish('drawStore');
            pubsub.publish('drawCart');
        },

        removeProductFromCart: function (productId) {
            productsInCart[productId] -= 1;
            if (productsInCart[productId] === 0) {
                delete productsInCart[productId];
            }
            pubsub.publish('increaseProductQuantity', productId);
            Products.increaseProductQuantity(productId);
            calculateTotalCost();
            pubsub.publish('drawStore');
            pubsub.publish('drawCart');
        },

        getTotalCost: function () {
            return totalCost;
        }
    };
});

