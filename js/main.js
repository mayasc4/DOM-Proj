/**
 * Created by mayasc on 6/29/15.
 */

/* MAIN */

(function initiateCoupons() {
    Coupons.addCoupon(Coupons.FreeCoupon);
    Coupons.addCoupon(Coupons.FreeCoupon);
    Coupons.addCoupon(Coupons.DiscountCoupon, 0.05);
    Coupons.addCoupon(Coupons.FreeCoupon);
    Coupons.addCoupon(Coupons.DiscountCoupon, 0.1);
}());

PubSub.subscribe('drawCart',Cart.drawCart);

PubSub.subscribe('addItem',Cart.addProductToCart);
PubSub.subscribe('addItem',Store.drawProductsTable);

PubSub.subscribe('removeItem',Cart.removeProductFromCart);
PubSub.subscribe('removeItem',Store.drawProductsTable);

PubSub.subscribe('sortEvent',Store.sortProductsByProperty);
PubSub.subscribe('sortEvent',Store.drawProductsTable);

PubSub.subscribe('pageChange', pageNumbers.handlePageChange);

PubSub.subscribe('numItemsPerPageChange', pageNumbers.handleNumItemsChange);

PubSub.subscribe('useCoupon', Coupons.useCoupon);

PubSub.subscribe('invalidCouponEvent', Coupons.handleInvalidCoupon);


Store.drawProductsTable();
