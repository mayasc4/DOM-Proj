/**
 * Created by mayasc on 7/2/15.
 */


/* Page Change */

var pageNumbers = (function () {
    function drawNumbers() {
        // Remove Old Numbers
        DOMUtils.removeMatchingChildren('.pages', 'ul');

        var new_list = DOMUtils.createNewElement('ul');

        var pageIndex = 1;
        for (var i = 1; i <= NUMBER_OF_ITEMS; i = i + NUM_ITEMS_PER_PAGE) {

            var new_page_num = DOMUtils.createNewElement('li', 'page-number clickable', pageIndex, {'page-number': pageIndex});
            new_page_num.addEventListener('click', function () {
                PubSub.publish('pageChange', this)
            }.bind(pageIndex));

            if (pageIndex - 1 === PAGE_NUMBER) {
                new_page_num.setAttribute('class','page-number selected')
            }

            new_list.appendChild(new_page_num);

            pageIndex++;
        }

        var pages_div = document.querySelector('.pages');
        pages_div.appendChild(new_list);
    }

    drawNumbers();

    (function addButtonEvent() {
        var button = document.getElementsByTagName('button');
        button[0].addEventListener('click', function () {
            PubSub.publish('numItemsPerPageChange')
        });
    }());

    return {
        handlePageChange: function (pageIndex) {
            PAGE_NUMBER = pageIndex - 1;
            Store.drawProductsTable();
            drawNumbers();
        },


        handleNumItemsChange: function () {
            var newNumItems = document.getElementById('num-pages');

            NUM_ITEMS_PER_PAGE = parseInt(newNumItems.value);
            PAGE_NUMBER = 0;

            Store.drawProductsTable();
            drawNumbers();
        }

    }

}());