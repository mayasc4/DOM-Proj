/**
 * Created by mayasc on 7/14/15.
 */

var Store = (function () {

    var productsOrder = [];

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

    productsOrder = Object.keys(Products.getAllProducts());


    function createProductElement(product) {
        var newRow;
        if ((product.onSale) && (product.quantity === 0)) {
            newRow = DOMUtils.createNewElement('div', 'row onsale out-of-stock');
        } else if (product.quantity === 0) {
            newRow = DOMUtils.createNewElement('div', 'row out-of-stock');
        } else if (product.onSale) {
            newRow = DOMUtils.createNewElement('div', 'row onsale');
        } else {
            newRow = DOMUtils.createNewElement('div', 'row');
        }

        for (var prop in product) {
            if (prop === 'quantity' || prop === 'intPrice' || prop === 'onSale') {
                continue;
            }
            if (prop === 'image') {
                var newCell = DOMUtils.createNewElement('div', 'cell');
                newCell.innerHTML = '<img src="' + product[prop] + '" />';
                newRow.appendChild(newCell);
                continue;
            }
            var content = product[prop];
            if (prop === 'description') {
                content = content.substring(0, 40) + "...";
            }
            newRow.appendChild(DOMUtils.createNewElement('div', 'cell', content, {name: prop}));
        }

        var newAdd;
        if (product.quantity === 0) {
            newAdd = DOMUtils.createNewElement('div', 'cell out-of-stock', 'Out Of Stock');
        } else {
            newAdd = DOMUtils.createNewElement('div', 'cell add-item clickable', 'Add');
            newAdd.addEventListener('click', function () { PubSub.publish('addItem', this.id) }.bind(product));
            newAdd.addEventListener('click', function () { PubSub.publish('drawCart') });
        }

        newRow.appendChild(newAdd);

        return newRow;
    }


    function getProductsDOM(productsToDraw) {
        var newFragment = document.createDocumentFragment();

        for (var index = 0 ; index < productsToDraw.length ; index++ ) {
            var product = Products.getProductById(productsToDraw[index]);
            newFragment.appendChild(createProductElement(product));
        }

        return newFragment;

        //
        //Handlebars.registerHelper('ifCond', function(quantity) {
        //    if (quantity === 0) {
        //        return '<div class="cell out-of-stock">Out Of Stock</div>';
        //    }
        //    return '<div class="cell add-item clickable">Add</div>';
        //});
    }

    return {
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
        },

        drawProductsTable: function () {
            // Delete Current Table
            DOMUtils.removeMatchingChildren('.table.products','.row');

            // Create New Table
            var start_index = PAGE_NUMBER*NUM_ITEMS_PER_PAGE;
            var end_index = ((PAGE_NUMBER+1)*NUM_ITEMS_PER_PAGE);
            var productsToDraw = productsOrder.slice(start_index,end_index);

            var table = document.querySelector('.table');

            table.appendChild( getProductsDOM(productsToDraw) );
        },

        addSortEventListener: function () {
        var sort_arrows = document.querySelectorAll('.table .heading .sort');
        for (var i=0 ; i < sort_arrows.length ; i++) {
            sort_arrows[i].addEventListener('click', function () { PubSub.publish('sortEvent', this.getAttribute('name')) }.bind(sort_arrows[i]) );
        }
    }
    }
}());