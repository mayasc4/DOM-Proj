/**
 * Created by mayasc on 7/5/15.
 */

function createNewElement(element_type, class_text, content, moreAttr) {
    var new_div = document.createElement(element_type);
    new_div.setAttribute('class', class_text);
    new_div.textContent = content || "";
    for (var attr in moreAttr) {
        if (moreAttr.hasOwnProperty(attr)) {
            new_div.setAttribute(attr, moreAttr[attr]);
        }
    }
    return new_div;
}

function removeElementByQuery(query) {
    var element = document.querySelector(query);
    element.innerHTML = '';
}

function removeSpecificElements(query, specificElements) {
    var element = document.querySelector(query);
    var elementsToRemove = element.querySelectorAll(specificElements);
    for (var i = 0 ; i < elementsToRemove.length ; i++) {
        element.removeChild(elementsToRemove[i]);
    }
}