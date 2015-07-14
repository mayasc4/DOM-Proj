/**
 * Created by mayasc on 6/29/15.
 */


/* table creation */



/* MAIN */

PubSub.subscribe('addItem',Cart.addProductToCart);
PubSub.subscribe('drawCart',Cart.drawCart);
PubSub.subscribe('addItem',Products.drawProductsTable);
PubSub.subscribe('removeItem',Cart.removeProductFromCart);
PubSub.subscribe('removeItem',Products.drawProductsTable);

PubSub.subscribe('sortEvent',Products.sortProductsByProperty);
PubSub.subscribe('sortEvent',Products.drawProductsTable);
PubSub.subscribe('pageChange', pageNumbers.handlePageChange);
PubSub.subscribe('numItemsPerPageChange', pageNumbers.handleNumItemsChange);
PubSub.subscribe('useCoupon', Coupons.useCoupon);
PubSub.subscribe('invalidCouponEvent', Coupons.handleInvalidCoupon);


Products.drawProductsTable();
addSortEvent();
