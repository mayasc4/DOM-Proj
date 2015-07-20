/**
 * Created by mayasc on 7/2/15.
 */
'use strict';

// dependencies - domutils, pubsub, store

/* Page Change */

App.pageNumbers = (function (App) {
    function drawNumbers() {
        // Remove Old Numbers
        App.DOMUtils.removeChildren('.pages', 'ul');

        var new_list = App.DOMUtils.createNewElement('ul');

        var pageIndex = 1;
        for (var i = 1; i <= App.NUMBER_OF_ITEMS; i = i + App.NUM_ITEMS_PER_PAGE) {

            var new_page_num = App.DOMUtils.createNewElement('li', 'page-number clickable', pageIndex, {'page-number': pageIndex});
            new_page_num.addEventListener('click', function () {
                App.PubSub.publish('pageChange', this);
            }.bind(pageIndex));

            if (pageIndex - 1 === App.PAGE_NUMBER) {
                new_page_num.setAttribute('class', 'page-number selected');
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
            App.PubSub.publish('numItemsPerPageChange');
        });
    }());

    return {
        handlePageChange: function (pageIndex) {
            App.PAGE_NUMBER = pageIndex - 1;
            App.Store.drawProductsTable();
            drawNumbers();
        },


        handleNumItemsChange: function () {
            var newNumItems = document.getElementById('num-pages');

            App.NUM_ITEMS_PER_PAGE = parseInt(newNumItems.value, 10);
            App.PAGE_NUMBER = 0;

            App.Store.drawProductsTable();
            drawNumbers();
        }
    };

}(App));