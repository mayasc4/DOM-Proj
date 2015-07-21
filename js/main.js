/**
 * Created by mayasc on 6/29/15.
 */
'use strict';

/* MAIN */

(function (App) {

    function initiateProducts() {
        _.forEach(App.ITEMS, function(item){
            App.Products.addProduct(item);
            if ((item.id - 1) % 4 === 0) {
                App.Products.setProductOnSale(item.id, true, 0.1);
            }
        });
        App.Products.initiateProductsOrder();
    }

    function initiateCoupons() {
        App.Coupons.addCoupon(App.Coupons.FreeCoupon);
        App.Coupons.addCoupon(App.Coupons.FreeCoupon);
        App.Coupons.addCoupon(App.Coupons.DiscountCoupon, 0.05);
        App.Coupons.addCoupon(App.Coupons.FreeCoupon);
        App.Coupons.addCoupon(App.Coupons.DiscountCoupon, 0.1);
    }


    function initEvents() {
        App.PubSub.subscribe('drawCart', App.Cart.drawCart);
        App.PubSub.subscribe('drawStore', App.Store.drawProductsTable);

        App.PubSub.subscribe('addItem', App.CashRegister.addProductToCart);
        App.PubSub.subscribe('removeItem', App.CashRegister.removeProductFromCart);
        App.PubSub.subscribe('sortEvent', App.Products.sortProductsByProperty);
        App.PubSub.subscribe('pageChange', App.pageNumbers.handlePageChange);
        App.PubSub.subscribe('numItemsPerPageChange', App.pageNumbers.handleNumItemsChange);
        App.PubSub.subscribe('useCoupon', App.Coupons.useCoupon);
        App.PubSub.subscribe('invalidCouponEvent', App.Coupons.handleInvalidCoupon);
    }

    function initApp() {
        initiateProducts();
        initiateCoupons();
        initEvents();
        App.Store.drawProductsTable();
    }

    initApp();

}(App));