/**
 * Created by mayasc on 6/29/15.
 */

/* MAIN */

(function initiateProducts() {
    for (var item in ITEMS) {
        if (item % 4 === 0) {
            Products.addProduct(ITEMS[item]);
            Products.setProductOnSale(ITEMS[item].id, true);
        } else {
            Products.addProduct(ITEMS[item]);
        }
    }
}());

Products.initiateProductsOrder();

(function initiateCoupons() {
    Coupons.addCoupon(Coupons.FreeCoupon);
    Coupons.addCoupon(Coupons.FreeCoupon);
    Coupons.addCoupon(Coupons.DiscountCoupon, 0.05);
    Coupons.addCoupon(Coupons.FreeCoupon);
    Coupons.addCoupon(Coupons.DiscountCoupon, 0.1);
}());

PubSub.subscribe('drawCart',Cart.drawCart);

PubSub.subscribe('addItem',CashRegister.addProductToCart);
PubSub.subscribe('addItem',Store.drawProductsTable);

PubSub.subscribe('removeItem',CashRegister.removeProductFromCart);
PubSub.subscribe('removeItem',Store.drawProductsTable);

PubSub.subscribe('sortEvent',Products.sortProductsByProperty);
PubSub.subscribe('sortEvent',Store.drawProductsTable);

PubSub.subscribe('pageChange', pageNumbers.handlePageChange);

PubSub.subscribe('numItemsPerPageChange', pageNumbers.handleNumItemsChange);

PubSub.subscribe('useCoupon', Coupons.useCoupon);

PubSub.subscribe('invalidCouponEvent', Coupons.handleInvalidCoupon);


Store.drawProductsTable();
