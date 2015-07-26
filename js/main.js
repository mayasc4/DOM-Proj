/**
 * Created by mayasc on 6/29/15.
 */
'use strict';

/* MAIN */

requirejs(['./globals', 'CustomObjects/CashRegister', 'CustomObjects/Coupons', 'CustomObjects/Products', 'DOMComponents/cart', 'DOMComponents/paging',
        'DOMComponents/store', 'Utils/pubsub'],
    function (globals, CashRegister, CashRegisterCoupons, Products, cart, paging, store, pubsub) {

        function initiateProducts() {
            _.forEach(globals.ITEMS, function (item) {
                Products.addProduct(item);
                if ((item.id - 1) % 4 === 0) {
                    Products.setProductOnSale(item.id, true, 0.1);
                }
            });
            Products.initiateProductsOrder();
        }

        function initiateCoupons() {
            CashRegister.addCoupon(CashRegister.FreeCoupon);
            CashRegister.addCoupon(CashRegister.FreeCoupon);
            CashRegister.addCoupon(CashRegister.DiscountCoupon, 0.05);
            CashRegister.addCoupon(CashRegister.FreeCoupon);
            CashRegister.addCoupon(CashRegister.DiscountCoupon, 0.1);
        }


        function initEvents() {
            pubsub.subscribe('drawCart', cart.drawCart);
            pubsub.subscribe('drawStore', store.drawProductsTable);

            pubsub.subscribe('addItem', CashRegister.addProductToCart);
            pubsub.subscribe('removeItem', CashRegister.removeProductFromCart);
            pubsub.subscribe('sortEvent', Products.sortProductsByProperty);
            pubsub.subscribe('pageChange', paging.handlePageChange);
            pubsub.subscribe('numItemsPerPageChange', paging.handleNumItemsChange);
            pubsub.subscribe('useCoupon', CashRegister.useCoupon);
            pubsub.subscribe('invalidCouponEvent', cart.handleInvalidCoupon);
        }

        function initApp() {
            initiateProducts();
            initiateCoupons();
            initEvents();
            store.drawProductsTable();
        }

        initApp();
    });
