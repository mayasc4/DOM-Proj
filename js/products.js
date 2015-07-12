/**
 * Created by mayasc on 7/7/15.
 */

/* Products */

var Products = (function () {
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

    var allProducts = {};

    function addProduct(objectItem) {
        allProducts[objectItem.id] = new Product(objectItem);
    }

    (function insertITEMS() {
        for (var item in ITEMS) {
            addProduct(ITEMS[item]);
        }
    }());

    var productsOrder = Object.keys(allProducts);


    function getProductRow(product) {
        var newRow = Utilities.createNewElement('div', 'row');

        for (var prop in product) {
            if (prop === 'quantity' || prop === 'intPrice' || prop === 'onSale') { //TODO make this pretty
                continue;
            }
            if (prop === 'image') {
                var newCell = Utilities.createNewElement('div', 'cell');
                newCell.innerHTML = '<img src="' + product[prop] + '" />';
                newRow.appendChild(newCell);
                continue;
            }
            var content = product[prop];
            if (prop === 'description') {
                content = content.substring(0, 40) + "...";
            }
            newRow.appendChild(Utilities.createNewElement('div', 'cell', content, {name: prop}));
        }

        var newAdd = Utilities.createNewElement('div', 'cell add-item clickable', 'Add');
        newAdd.addEventListener('click', function () {
            PubSub.publish('addItem', this.id)
        }.bind(product));

        newRow.appendChild(newAdd);

        return newRow;
    }


    function getProductsDOM(productsToDraw) {
        var newFragment = document.createDocumentFragment();

        for (var index = 0 ; index < productsToDraw.length ; index++ ) {
            var product = allProducts[productsToDraw[index]];
            newFragment.appendChild(getProductRow(product));
        }

        return newFragment;
    }

    return {
        getProductsOrder: function () {
            return productsOrder;
        },

        sortProductsByProperty: function (field) {
            productsOrder.sort(function (a, b) {
                return allProducts[a][field] > allProducts[b][field] ? 1 : -1;
            });
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
        },

        drawProductsTable: function () {
            // Delete Current Table
            Utilities.removeSpecificElements('.table.products','.row');

            // Create New Table
            var start_index = PAGE_NUMBER*NUM_ITEMS_PER_PAGE;
            var end_index = ((PAGE_NUMBER+1)*NUM_ITEMS_PER_PAGE);
            var productsToDraw = productsOrder.slice(start_index,end_index);

            var table = document.querySelector('.table');

            table.appendChild( getProductsDOM(productsToDraw));
        }
    }
}());

