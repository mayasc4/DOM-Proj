/**
 * Created by mayasc on 7/2/15.
 */


/* Page Change */

function handlePageChangeEvent(pn) {
    var ce = new CustomEvent('pageChange',{'detail': pn});
    document.dispatchEvent(ce);
}


function handlePageChange(event) {
    PAGE_NUMBER = event.detail - 1;
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

    NUM_ITEMS_PER_PAGE = parseInt(newNumItems.value);
    PAGE_NUMBER = 0;
    removeTable();
    createTable(ITEMS);
    removePageButtons();
    drawNumbers();
}

function drawNumbers() {
    var pages_div = document.querySelector('.pages');

    var pageIndex = 1;
    for (var i = 1 ; i < NUMBER_OF_ITEMS ; i = i+NUM_ITEMS_PER_PAGE) {
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
    for (var i = 0; i < divs_to_remove.length; i++) {
        pages_div.removeChild(divs_to_remove[i]);
    }
}