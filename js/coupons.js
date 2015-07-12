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
        this.type = 'discount';
    };
    DiscountCoupon.prototype = Coupon;
    DiscountCoupon.prototype.constructor = DiscountCoupon;


    var FreeCoupon = function () {
        Coupon.call(this);
        this.type = 'free';
    };
    FreeCoupon.prototype = Coupon;
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

        removeCoupon: function (code) {
            delete allCoupons[code];
        },

        getCouponByCode: function () {
            return allCoupons[code];
        },

        validateCoupon: function (code) {
            if (allCoupons[code]) {
                return true;
            }
        }
    }
}());