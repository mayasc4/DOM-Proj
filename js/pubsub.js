/**
 * Created by mayasc on 6/30/15.
 */

/**
 *
 */

var PubSub = (function () {
    var eventBus = {

        // internal counter for id
        counter: 0

        /*e1: { id: callback,
         id: callback
         }
         */
    };

    return {
        subscribe: function (eType, cb) {
            eventBus[eType] = eventBus[eType] || {};
            eventBus[eType][eventBus['counter']] = cb;
            return eventBus['counter']++;
        },

        publish: function (eType, data) {
            for (var id in eventBus[eType]) {
                if (eventBus[eType].hasOwnProperty(id)) {
                    eventBus[eType][id](data);
                }
            }
        },

        unsubscribe: function (eType, id) {
            for (var id_num in eventBus[eType]) {
                if (eventBus[eType.hasOwnProperty(id)]) {
                    if (id_num === id) {
                        delete eventBus[eType][id];
                    }
                }
            }
        }
    }
}());