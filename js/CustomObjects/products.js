/**
 * Created by mayasc on 7/7/15.
 */

/* Products */

var Products = (function () {

    var allProducts = {};
    var productsOrder = [];

    var Product = function (objectItem) {
        this.id = objectItem.id;
        this.name = objectItem.name;
        this.price = objectItem.price;
        this.intPrice = parseInt(objectItem.price.replace('$', '').replace(',', ''));
        this.description = objectItem.description;
        this.image = objectItem.image;
        this.quantity = objectItem.quantity;
        this.onSale = false;
        this.priceAfterSale = 0;
    };



    return {
        addProduct: function (objectItem) {
            allProducts[objectItem.id] = new Product(objectItem);
        },

        getAllProducts: function () {
            return allProducts;
        },

        getProductById: function (productId) {
            return allProducts[productId];
        },

        setProductOnSale: function (productId, setAs, precentSale) {
            allProducts[productId].onSale = setAs;
            if (setAs) {
                allProducts[productId].priceAfterSale = (1-precentSale)*allProducts[productId].intPrice;
            }
        },

        reduceProductQuantity: function (productId) {
            allProducts[productId].quantity = allProducts[productId].quantity - 1;
        },

        increaseProductQuantity: function (productId) {
            allProducts[productId].quantity++;
        },

        isProductInStock: function (productId) {
            return allProducts[productId].quantity !== 0;
        },

        initiateProductsOrder: function() {
            productsOrder = Object.keys(Products.getAllProducts());
        },

        getProductsOrder: function () {
            return productsOrder;
        },

        sortProductsByProperty: function (field) {
            productsOrder.sort(function (a, b) {
                // TODO Make this more efficient
                var productA = Products.getProductById(a);
                var productB = Products.getProductById(b);
                return productA[field] > productB[field] ? 1 : -1;
            });
            PubSub.publish('drawStore');
        }
    }
}());

