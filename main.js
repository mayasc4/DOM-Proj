/**
 * Created by mayasc on 6/29/15.
 */


/* table creation */

function createTd(text, name) {
    var new_td = document.createElement('td');
    new_td.setAttribute('name',name);
    new_td.textContent = text;
    return new_td;
}

function createDivAdd (classText) {
    var div = document.createElement('div');
    div.setAttribute('class',classText);
    div.setAttribute('onClick','addItemEvent()');
    div.textContent = classText;
    return div;
}

function createTable (items) {
    var table_body = document.querySelector('tbody');
    var fragment = document.createDocumentFragment();

    for (var index = PAGE_NUMBER*NUM_ITEMS_PER_PAGE ; index < (PAGE_NUMBER+1)*NUM_ITEMS_PER_PAGE ; index++) {
        if (index >= NUMBER_OF_ITEMS) {
            table_body.appendChild(fragment);
            break;
        }
        var item = items[index];

        var tr = document.createElement('tr');
        tr.setAttribute('id', index.toString());

        var td_select = getNumbersSelector(NUM_ITEMS_PER_PAGE, index);
        tr.appendChild(td_select);

        tr.appendChild(createTd(item.id, 'id'));
        tr.appendChild(createTd(item.name, 'name'));
        tr.appendChild(createTd(item.price, 'price'));

        var td_add = document.createElement('td');
        td_add.appendChild(createDivAdd('add'));
        //td_add.appendChild(createDivAdd('remove'));
        tr.appendChild(td_add);

        fragment.appendChild(tr);

        if (index === ((PAGE_NUMBER+1)*NUM_ITEMS_PER_PAGE-1)) {
            table_body.appendChild(fragment);
        }
    }
}


function removeTable() {
    var table_body = document.querySelector('tbody');
    table_body.innerHTML = ''
}


function sortEvent(e) {
    e = e || window.event;
    var item = e.target;
    var field = item.parentElement.getAttribute('data-fields');
    publish('sortEvent',field);
}

function sortItemsAndReRender(field) {
    removeTable();
    var sortedItems = ITEMS.sort(function(a, b) {
        return a[field] > b[field] ? 1 : -1 ;
    });
    createTable(sortedItems);
}

/* MAIN */

document.addEventListener('pageChange',handlePageChange);
document.addEventListener('numItemsPerPageChange',handleNumItemsChange);

subscribe('addItem',addItemToCart);
subscribe('addItem',calculateTotalCart);
subscribe('removeItem',removeItemFromCart);
subscribe('removeItem',calculateTotalCart);
subscribe('sortEvent',sortItemsAndReRender);

drawPageButtons();
createTable(ITEMS);