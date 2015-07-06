/**
 * Created by mayasc on 7/2/15.
 */


/* Page Change */

function drawNumbers() {
    // Remove Old Numbers
    removeSpecificElements('.pages','ul');

    var new_list = createNewElement('ul');

    var pageIndex = 1;
    for (var i = 1 ; i < NUMBER_OF_ITEMS ; i = i+NUM_ITEMS_PER_PAGE) {

        var new_page_num = createNewElement('li','page-number clickable', pageIndex, {'page-number': pageIndex});
        new_page_num.addEventListener('click', function() { publish('pageChange', this) }.bind(pageIndex) );
        new_list.appendChild(new_page_num);

        pageIndex++;
    }

    var pages_div = document.querySelector('.pages');
    pages_div.appendChild(new_list);
}


function handlePageChange(page_index) {
    PAGE_NUMBER = page_index-1;
    removeSpecificElements('.table.items','.row');
    createTable();
}


function handleNumItemsChange () {
    var newNumItems = document.getElementById('num-pages');

    NUM_ITEMS_PER_PAGE = parseInt(newNumItems.value);
    PAGE_NUMBER = 0;

    removeTable();
    createTable();
    drawNumbers();
}



function addButtonEvent() {
    // Add event to catch when pressing the button
    var button = document.getElementsByTagName('button');
    button[0].addEventListener('click',function() { publish('numItemsPerPageChange')});
}

