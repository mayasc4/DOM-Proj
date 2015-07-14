/**
 * Created by mayasc on 6/29/15.
 */

/* MAIN */

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
