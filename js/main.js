/**
 * Created by mayasc on 6/29/15.
 */


/* table creation */



/* MAIN */

PubSub.subscribe('addItem',Cart.addProductToCart);
PubSub.subscribe('addItem',Cart.drawCart);
PubSub.subscribe('removeItem',Cart.removeProductFromCart);
PubSub.subscribe('removeItem',Cart.drawCart);
PubSub.subscribe('sortEvent',Products.sortProductsByProperty);
PubSub.subscribe('sortEvent',Products.drawProductsTable);
PubSub.subscribe('pageChange', pageNumbers.handlePageChange);
PubSub.subscribe('numItemsPerPageChange', pageNumbers.handleNumItemsChange);


Products.drawProductsTable();
addSortEvent();
