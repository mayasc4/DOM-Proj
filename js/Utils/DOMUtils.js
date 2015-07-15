/**
 * Created by mayasc on 7/5/15.
 */

var DOMUtils = (function () {

    return {
        createNewElement: function (elementType, classText, content, moreAttr) {
            var new_div = document.createElement(elementType);
            new_div.setAttribute('class', classText);
            new_div.textContent = content || "";
            for (var attr in moreAttr) {
                if (moreAttr.hasOwnProperty(attr)) {
                    new_div.setAttribute(attr, moreAttr[attr]);
                }
            }
            return new_div;
        },

        emptyElementByQuery: function (query) {
            var element = document.querySelector(query);
            element.innerHTML = '';
        },

        removeChildren: function (parentQuery, childrenQuery) {
            var element = document.querySelector(parentQuery);
            var elementsToRemove = element.querySelectorAll(childrenQuery);
            for (var i = 0; i < elementsToRemove.length; i++) {
                element.removeChild(elementsToRemove[i]);
            }
        }
    }

}());