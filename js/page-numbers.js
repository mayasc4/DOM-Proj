/**
 * Created by mayasc on 7/2/15.
 */


/* Page Change */

var pageNumbers = (function () {
    function drawNumbers() {
        // Remove Old Numbers
        Utilities.removeSpecificElements('.pages', 'ul');

        var new_list = Utilities.createNewElement('ul');

        var pageIndex = 1;
        for (var i = 1; i <= NUMBER_OF_ITEMS; i = i + NUM_ITEMS_PER_PAGE) {

            var new_page_num = Utilities.createNewElement('li', 'page-number clickable', pageIndex, {'page-number': pageIndex});
            new_page_num.addEventListener('click', function () {
                PubSub.publish('pageChange', this)
            }.bind(pageIndex));
            new_list.appendChild(new_page_num);

            pageIndex++;
        }

        var pages_div = document.querySelector('.pages');
        pages_div.appendChild(new_list);
    }

    drawNumbers();

    (function addButtonEvent() {
        // Add event to catch when pressing the button
        var button = document.getElementsByTagName('button');
        button[0].addEventListener('click', function () {
            PubSub.publish('numItemsPerPageChange')
        });
    }());

    return {
        handlePageChange: function (pageIndex) {
            PAGE_NUMBER = pageIndex - 1;
            Products.drawProductsTable();
        },


        handleNumItemsChange: function () {
            var newNumItems = document.getElementById('num-pages');

            NUM_ITEMS_PER_PAGE = parseInt(newNumItems.value);
            PAGE_NUMBER = 0;

            Products.drawProductsTable();
            drawNumbers();
        }

    }

}());