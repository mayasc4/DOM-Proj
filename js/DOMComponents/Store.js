/**
 * Created by mayasc on 7/14/15.
 */
'use strict';

// dependencies - pubsub, products, domutils

App.Store = (function (App) {

    (function addSortEventListener() {
        var sort_arrows = document.querySelectorAll('.table .heading .sort');
        for (var i = 0; i < sort_arrows.length; i++) {
            sort_arrows[i].addEventListener('click', function () {
                App.PubSub.publish('sortEvent', this.getAttribute('name'));
            }.bind(sort_arrows[i]));
        }
    }());

    function addProductRows(productsToDraw) {
        var productsTable = document.querySelector('.table.products');
        var container = document.createElement('div');

        //TODO unite these for loops:
        // create all elements with template
        productsToDraw.forEach(function (pId) {
            var product = App.Products.getProductById(pId);
            container.innerHTML += JST.product(product);
        });

        // Add event listener for addItem event and add products to DOM
        var allRows = container.querySelectorAll('.row');
        _.forEach(allRows, function(row, index) {
            var addElement = row.querySelector('[name=add]');
            var product = App.Products.getProductById(productsToDraw[index]);

            if (product.quantity > 0) {
                addElement.addEventListener('click', function () {
                    App.PubSub.publish('addItem', this.id);
                }.bind(product));
            }

            productsTable.appendChild(row);
        });
    }

    return {
        drawProductsTable: function () {
            // Delete Current Table
            App.DOMUtils.removeChildren('.table.products', '.row');

            // Create New Table
            var start_index = App.PAGE_NUMBER * App.NUM_ITEMS_PER_PAGE;
            var end_index = ((App.PAGE_NUMBER + 1) * App.NUM_ITEMS_PER_PAGE);
            var productsToDraw = App.Products.getProductsOrder().slice(start_index, end_index);

            addProductRows(productsToDraw);

        }
    };
}(App));