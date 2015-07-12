/**
 * Created by mayasc on 7/6/15.
 */


function addSortEvent() {
    var sort_arrows = document.querySelectorAll('.table .heading .sort');
    for (var i=0 ; i < sort_arrows.length ; i++) {
        sort_arrows[i].addEventListener('click', function () { PubSub.publish('sortEvent', this.getAttribute('name')) }.bind(sort_arrows[i]) );
    }
}

