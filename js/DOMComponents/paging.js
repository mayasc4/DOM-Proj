/**
 * Created by mayasc on 7/2/15.
 */
'use strict';

// dependencies - domutils, pubsub, store

/* Page Change */

define (['../globals', '../DOMComponents/store', '../Utils/pubsub', '../Utils/DOMUtils'], function(globals, store, pubsub, DOMUtils) {

    function drawNumbers() {
        // Remove Old Numbers
        DOMUtils.removeChildren('.pages', 'ul');

        var new_list = DOMUtils.createNewElement('ul');

        var pageIndex = 1;
        for (var i = 1; i <= globals.NUMBER_OF_ITEMS; i = i + globals.NUM_ITEMS_PER_PAGE) {

            var new_page_num = DOMUtils.createNewElement('li', 'page-number clickable', pageIndex, {'page-number': pageIndex});
            new_page_num.addEventListener('click', function () {
                pubsub.publish('pageChange', this);
            }.bind(pageIndex));

            if (pageIndex - 1 === globals.PAGE_NUMBER) {
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
            pubsub.publish('numItemsPerPageChange');
        });
    }());

    return {
        handlePageChange: function (pageIndex) {
            globals.PAGE_NUMBER = pageIndex - 1;
            store.drawProductsTable();
            drawNumbers();
        },


        handleNumItemsChange: function () {
            var newNumItems = document.getElementById('num-pages');

            globals.NUM_ITEMS_PER_PAGE = parseInt(newNumItems.value, 10);
            globals.PAGE_NUMBER = 0;

            store.drawProductsTable();
            drawNumbers();
        }
    };
});
