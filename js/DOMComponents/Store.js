/**
 * Created by mayasc on 7/14/15.
 */

var Store = (function () {

    (function addSortEventListener () {
        var sort_arrows = document.querySelectorAll('.table .heading .sort');
        for (var i = 0; i < sort_arrows.length; i++) {
            sort_arrows[i].addEventListener('click', function () {
                PubSub.publish('sortEvent', this.getAttribute('name'))
            }.bind(sort_arrows[i]));
        }
    }());

    function createProductElement(product) {
        var newRow;
        // TODO change this uglyness
        // TODO add to onSale - price before sale
        if ((product.onSale) && (!Products.isProductInStock(product.id))) {
            newRow = DOMUtils.createNewElement('div', 'row onsale out-of-stock');
        } else if (!Products.isProductInStock(product.id)) {
            newRow = DOMUtils.createNewElement('div', 'row out-of-stock');
        } else if (product.onSale) {
            newRow = DOMUtils.createNewElement('div', 'row onsale');
        } else {
            newRow = DOMUtils.createNewElement('div', 'row');
        }

        for (var prop in product) {
            if (prop === 'quantity' || prop === 'intPrice' || prop === 'onSale' || prop === 'priceAfterSale') {
                continue;
            }
            if (prop === 'image') {
                var newCell = DOMUtils.createNewElement('div', 'cell');
                newCell.innerHTML = '<img src="' + product[prop] + '" />';
                newRow.appendChild(newCell);
                continue;
            }
            if (prop === 'price' && product.onSale === true) {
                var newCell = DOMUtils.createNewElement('div', 'cell');
                newCell.appendChild(DOMUtils.createNewElement('span','red crossedoff',product[prop]));
                newCell.appendChild(DOMUtils.createNewElement('span','green', '   ' + product['priceAfterSale'].toFixed(2)));
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
            newAdd.addEventListener('click', function () {
                PubSub.publish('addItem', this.id)
            }.bind(product));
            newAdd.addEventListener('click', function () {
                PubSub.publish('drawCart')
            });
        }

        newRow.appendChild(newAdd);

        return newRow;
    }


    function createProductsFragment(productsToDraw) {
        var newFragment = document.createDocumentFragment();

        for (var index = 0; index < productsToDraw.length; index++) {
            var product = Products.getProductById(productsToDraw[index]);
            newFragment.appendChild(createProductElement(product));
        }

        return newFragment;

        //var newFragment = document.createDocumentFragment();
        //
        //$.get('templates/product.tmpl.html', function(data) {
        //    // Build the Handlebars template
        //    var template = Handlebars.compile(data);
        //
        //    productsToDraw.forEach(function(pId) {
        //        var product = Products.getProductById(productsToDraw[pId]);
        //        newFragment.innerHTML += template(product);
        //    });
        //
        //}, 'html');
        //
        //return newFragment;

    }

    return {
        drawProductsTable: function () {
            // Delete Current Table
            DOMUtils.removeChildren('.table.products', '.row');

            // Create New Table
            var start_index = PAGE_NUMBER * NUM_ITEMS_PER_PAGE;
            var end_index = ((PAGE_NUMBER + 1) * NUM_ITEMS_PER_PAGE);
            var productsToDraw = Products.getProductsOrder().slice(start_index, end_index);

            var table = document.querySelector('.table');

            table.appendChild(createProductsFragment(productsToDraw));
        }
    }
}());