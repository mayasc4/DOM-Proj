/**
 * Created by mayasc on 7/2/15.
 */


/* Line Numbers */

//function handleLineChange(selectElement) {
//    console.log(selectElement.getAttribute('trid'));
//
//    var table_body = document.getElementsByTagName('tbody');
//    var tr_to_move = document.getElementById(selectElement.getAttribute('trid'));
//    tr_to_move.remove();
//    var move_before_tr = document.querySelector('tbody > tr:nth-child(' + selectElement.value +')');
//
//    if (selectElement.value === table_body.length) {
//        table_body.appendChild(tr_to_move);
//    } else {
//        table_body[0].insertBefore(tr_to_move, move_before_tr);
//    }
//}
//
//
//function getNumbersSelector(N, trId) {
//    var td_selector = document.createElement('select');
//    td_selector.setAttribute('onChange','handleLineChange(this)');
//    td_selector.setAttribute('trId', trId.toString());
//    var select_option = document.createElement('option');
//    td_selector.setAttribute('selected','-');
//    select_option.textContent = '-';
//    td_selector.appendChild(select_option);
//
//
//    for(var i = 1 ; i <= N ; i++) {
//        var select_option = document.createElement('option');
//        select_option.setAttribute('value', i.toString())
//        select_option.textContent = i.toString();
//        td_selector.appendChild(select_option);
//    }
//    return td_selector;
//}