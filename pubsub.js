/**
 * Created by mayasc on 6/30/15.
 */

/**
 *
 */
var eventBus =  {

    // internal counter for id
    counter: 0

    /*e1: { id: callback,
            id: callback
            }
    */
};


/**
 *
 * @param eType
 * @param cb
 */
function subscribe(eType, cb) {
    eventBus[eType] = eventBus[eType] || {};
    eventBus[eType][eventBus['counter']] =  cb;
    return eventBus['counter']++;
}

function publish(eType, data) {
    for (var id in eventBus[eType]) {
        if (eventBus[eType].hasOwnProperty(id)) {
            eventBus[eType][id](data);
        }
    }
}

function unsubscribe(eType, id) {
    for (var id_num in eventBus[eType]) {
        if (eventBus[eType.hasOwnProperty(id)]){
            if (id_num === id) {
                delete eventBus[eType][id];
            }
        }
    }
}