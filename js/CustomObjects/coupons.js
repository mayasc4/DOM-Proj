/**
 * Created by mayasc on 7/8/15.
 */
'use strict';

// dependencies - pubsub, domutils

/* Coupons */

App.Coupons = (function (App) {

    var allCoupons = {};

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

        validateCoupon: function (code) {
            if (allCoupons[code]) {
                return true;
            }
        },

        useCoupon: function (code) {
            if (App.Coupons.validateCoupon(code)) {
                App.CashRegister.addCouponToCart(code);
                App.PubSub.publish('drawCart');
            } else {
                App.PubSub.publish('invalidCouponEvent');
            }
        },

        handleInvalidCoupon: function () {
            App.DOMUtils.removeChildren('.table.cart', 'div.error');
            var cart = document.querySelector('.table.cart');
            cart.appendChild(App.DOMUtils.createNewElement('div', 'error', 'Invalid Coupon'));
        },

        calcCouponDiscount: function (couponCode, totalCost, maxCost) {
            var coupon = App.Coupons.getCouponByCode(couponCode);
            if (coupon instanceof FreeCoupon) {
                return totalCost - maxCost;
            }
            return totalCost * (1 - coupon.discountValue);
        }
    };
}(App));
