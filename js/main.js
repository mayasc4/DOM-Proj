/**
 * Created by mayasc on 6/29/15.
 */


/* table creation */

function drawTable(items_to_draw) {

    var table = document.querySelector('.table');
    var new_fragment = document.createDocumentFragment();

    for (var index = 0 ; index < items_to_draw.length  ; index++) {
        var item = items_to_draw[index];

        var new_row = createNewElement('div', 'row');

        for (var prop in item) {
            if (item.hasOwnProperty(prop)) {
                if (prop !== 'image') {
                    var content = item[prop];
                    if (prop === 'description') {
                        var content = content.substring(0,40) + "...";
                    }
                    new_row.appendChild(createNewElement('div', 'cell', content, {name: prop}));
                } else {
                    var new_div = createNewElement('div', 'cell');
                    new_div.innerHTML = '<img src="' + item[prop] + '" />';
                    new_row.appendChild(new_div);
                }
            }
        }

        var new_add = createNewElement('div', 'cell add-item clickable', 'Add');
        new_add.addEventListener('click', function () { publish('addItem',this.id)}.bind(item));
        new_row.appendChild(new_add);

        new_fragment.appendChild(new_row);

        if (index === items_to_draw.length - 1){
            table.appendChild(new_fragment);
        }
    }

}

function reCreateTable () {
    removeTable();
    var items = ITEMS;
    var start_index = PAGE_NUMBER*NUM_ITEMS_PER_PAGE;
    var end_index = ((PAGE_NUMBER+1)*NUM_ITEMS_PER_PAGE);

    drawTable(items.slice(start_index,end_index));
}

function removeTable() {
    removeSpecificElements('.table.items','.row');
}

/* MAIN */

subscribe('addItem',addItemToCart);
subscribe('addItem',calculateTotalCart);
subscribe('removeItem',removeItemFromCart);
subscribe('removeItem',calculateTotalCart);
subscribe('sortEvent',sortItemsAndReRender);
subscribe('pageChange', handlePageChange);
subscribe('numItemsPerPageChange', handleNumItemsChange)

drawNumbers();
addButtonEvent();
addSortEvent();
reCreateTable();