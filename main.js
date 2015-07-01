/**
 * Created by mayasc on 6/29/15.
 */


/* Globals */

var numItemsPerPage = 5;
var pageNumber = 0;
var numberOfItems = ITEMS.length;


/* Functions */

/* Line Numbers */

function handleLineChange(selectElement) {
    console.log(selectElement.getAttribute('trid'));

    var table_body = document.getElementsByTagName('tbody');
    var tr_to_move = document.getElementById(selectElement.getAttribute('trid'));
    tr_to_move.remove();
    var move_before_tr = document.querySelector('tbody > tr:nth-child(' + selectElement.value +')');

    if (selectElement.value === table_body.length) {
        table_body.appendChild(tr_to_move);
    } else {
        table_body[0].insertBefore(tr_to_move, move_before_tr);
    }
}


function getNumbersSelector(N, trId) {
    var td_selector = document.createElement('select');
    td_selector.setAttribute('onChange','handleLineChange(this)');
    td_selector.setAttribute('trId', trId.toString());
    var select_option = document.createElement('option');
    td_selector.setAttribute('selected','-');
    select_option.textContent = '-';
    td_selector.appendChild(select_option);


    for(var i = 1 ; i <= N ; i++) {
        var select_option = document.createElement('option');
        select_option.setAttribute('value', i.toString())
        select_option.textContent = i.toString();
        td_selector.appendChild(select_option);
    }
    return td_selector;
}

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

    for (var index = pageNumber*numItemsPerPage ; index < (pageNumber+1)*numItemsPerPage ; index++) {
        if (index >= numberOfItems) {
            table_body.appendChild(fragment);
            break;
        }
        var item = items[index];

        var tr = document.createElement('tr');
        tr.setAttribute('id', index.toString());

        var td_select = getNumbersSelector(numItemsPerPage, index);
        tr.appendChild(td_select);

        tr.appendChild(createTd(item.id, 'id'));
        tr.appendChild(createTd(item.name, 'name'));
        tr.appendChild(createTd(item.price, 'price'));

        var td_add = document.createElement('td');
        td_add.appendChild(createDivAdd('add'));
        //td_add.appendChild(createDivAdd('remove'));
        tr.appendChild(td_add);

        fragment.appendChild(tr);

        if (index === ((pageNumber+1)*numItemsPerPage-1)) {
            table_body.appendChild(fragment);
        }
    }
}


function removeTable() {
    var table_body = document.querySelector('tbody');
    table_body.innerHTML = ''
}


/* Page Change */

function handlePageChangeEvent(pn) {
    var ce = new CustomEvent('pageChange',{'detail': pn});
    document.dispatchEvent(ce);
}


function handlePageChange(event) {
    pageNumber = event.detail - 1;
    removeTable();
    createTable(ITEMS);
}

function handleNumItemsPerPageChangeEvent() {
    var ce = new CustomEvent('numItemsPerPageChange');
    document.dispatchEvent(ce);
}

function handleNumItemsChange () {
    var newNumItems = document.getElementById('num-pages');
    console.log(newNumItems.value);

    numItemsPerPage = parseInt(newNumItems.value);
    pageNumber = 0;
    removeTable();
    createTable(ITEMS);
    removePageButtons();
    drawNumbers();
}

function drawNumbers() {
    var pages_div = document.querySelector('.pages');

    var pageIndex = 1;
    for (var i = 1 ; i < numberOfItems ; i = i+numItemsPerPage) {
        var new_div = document.createElement('div');
        new_div.setAttribute('class','page-number number clickable');
        new_div.setAttribute('onClick','handlePageChangeEvent('+pageIndex+')');
        new_div.textContent = pageIndex.toString();
        pages_div.appendChild(new_div);
        pageIndex++;
    }
}

function drawPageButtons() {

    var button = document.getElementsByTagName('button');
    button[0].setAttribute('onClick','handleNumItemsPerPageChangeEvent()');

    drawNumbers();
}

function removePageButtons() {
    var pages_div = document.querySelector('.pages');
    var divs_to_remove = document.querySelectorAll('.number');
    //console.log(pages_div);
    //console.log(divs_to_remove);
    for (var i = 0 ; i < divs_to_remove.length ; i++) {
        //console.log(i);
        pages_div.removeChild(divs_to_remove[i]);
    }
}

/* Cart */
function addItemEvent(e) {
    e = e || window.event;
    var item = e.target;
    item = item.parentElement.parentElement;
    publish('addItem', item);
}

function createDiv(classText, text) {
    var item_div = document.createElement('div');
    item_div.setAttribute('class',classText);
    item_div.textContent = text;
    return item_div;
}

function addItemToCart(item) {
    var cart = document.querySelector('.cart-container');

    var new_div = createDiv("","");

    var inline_div = createDiv('cart item id', item.querySelector('td[name="id"]').textContent);
    new_div.appendChild(inline_div);

    var inline_div = createDiv('cart item name', item.querySelector('td[name="name"]').textContent);
    new_div.appendChild(inline_div);

    inline_div = createDiv('cart item price', item.querySelector('td[name="price"]').textContent);
    new_div.appendChild(inline_div);

    inline_div = createDiv('cart item remove', 'Remove');
    inline_div.setAttribute('onClick','removeItemEvent()');
    new_div.appendChild(inline_div);

    cart.appendChild(new_div);
}

function removeItemEvent(e) {
    e = e || window.event;
    var item = e.target;
    item = item.parentElement;
    publish('removeItem', item);
}

function removeItemFromCart(item_to_remove) {
    var cart = document.querySelector('.cart-container');
    cart.removeChild(item_to_remove);
}

/* MAIN */

document.addEventListener('pageChange',handlePageChange);
document.addEventListener('numItemsPerPageChange',handleNumItemsChange);

subscribe('addItem',addItemToCart);
subscribe('removeItem',removeItemFromCart);

drawPageButtons();
createTable(ITEMS);