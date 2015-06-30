/**
 * Created by mayasc on 6/29/15.
 */


/* Globals */

var numItemsPerPage = 5;
var pageNumber = 1;
var numberOfItems = ITEMS.length;


/* Functions */

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

function createTd(text) {
    var new_td = document.createElement('td');
    new_td.textContent = text;
    return new_td;
}

function createTable (items) {
    var table_body = document.querySelector('tbody');
    var fragment = document.createDocumentFragment();

    items.forEach(function(item, index, array) {

        var tr = document.createElement('tr');
        tr.setAttribute('id', index.toString());

        var td_select = getNumbersSelector(array.length, index);
        tr.appendChild(td_select);

        tr.appendChild(createTd(item.id));
        tr.appendChild(createTd(item.name));
        tr.appendChild(createTd(item.price));

        fragment.appendChild(tr);

        if (index === numItemsPerPage-1) {
            table_body.appendChild(fragment);
        }

    });
}

function drawPageButtons() {
    var pages_div = document.querySelector('.pages');
    for (var i = 1 ; i < numberOfItems ; i = i+numItemsPerPage) {
        var new_div = document.createElement('div');
        new_div.setAttribute('class','page-number');
        new_div.setAttribute('onClick','handlePageChange(this)');
        new_div.textContent = i.toString();
        pages_div.appendChild(new_div);
    }
}

/* MAIN */

drawPageButtons();
//createTable(ITEMS);