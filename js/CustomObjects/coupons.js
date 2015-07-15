/**
 * Created by mayasc on 7/8/15.
 */

/* Coupons */

var Coupons = (function () {

    var allCoupons = {};

    var generatedCode = 0;
    var Coupon = function () {
        this.code = generatedCode++;
    };

    var DiscountCoupon = function (discountValue) {
        Coupon.call(this);
        this.discountValue = discountValue;
        //this.type = 'discount';
    };
    DiscountCoupon.prototype = Object.create(Coupon.prototype);
    DiscountCoupon.prototype.constructor = DiscountCoupon;


    var FreeCoupon = function () {
        Coupon.call(this);
        //this.type = 'free';
    };
    FreeCoupon.prototype = Object.create(Coupon.prototype);
    FreeCoupon.prototype.constructor = FreeCoupon;

    return {
        FreeCoupon: FreeCoupon,

        DiscountCoupon: DiscountCoupon,

        getAllCoupons: function () {
            return allCoupons;
        },

        addCoupon: function (cType, discountValue) {
            var newCoupon = new cType(discountValue);
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

        useCoupon: function(code) {
            if (Coupons.validateCoupon(code)) {
                CashRegister.addCouponToCart(code);
                PubSub.publish('drawCart');
            } else {
                PubSub.publish('invalidCouponEvent');
            }
        },

        handleInvalidCoupon: function() {
            DOMUtils.removeChildren('.table.cart', 'div.error');
            var cart = document.querySelector('.table.cart');
            cart.appendChild(DOMUtils.createNewElement('div','error','Invalid Coupon'));
        },

        calcCouponDiscount: function (couponCode, totalCost, maxCost) {
            var coupon = Coupons.getCouponByCode(couponCode);
            if (coupon instanceof FreeCoupon) {
                return totalCost - maxCost;
            } else {
                return totalCost * (1 - coupon.discountValue);
            }
        }
    }
}());
