/**
 * Created by mayasc on 7/7/15.
 */

/* Products */

var Products = (function () {

    var allProducts = {};

    var Product = function (objectItem) {
        this.id = objectItem.id;
        this.name = objectItem.name;
        this.price = objectItem.price;
        this.intPrice = parseInt(objectItem.price.replace('$', '').replace(',', ''));
        this.description = objectItem.description;
        this.image = objectItem.image;
        this.quantity = objectItem.quantity;
        this.onSale = false;
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

        setProductOnSale: function (productId, setAs) {
            allProducts[productId].onSale = setAs;
        },

        reduceProductQuantity: function (productId) {
            allProducts[productId].quantity = allProducts[productId].quantity - 1;
        },

        increaseProductQuantity: function (productId) {
            allProducts[productId].quantity++;
        },

        isProductInStock: function (productId) {
            return allProducts[productId].quantity !== 0;
        }
    }
}());

