/**
 * Created by mayasc on 6/30/15.
 */
'use strict';

//dependencies - none

define([], function() {
//App.PubSub = (function () {
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
            eventBus[eType][eventBus.counter] = cb;
            return eventBus.counter++;
        },

        publish: function (eType, data) {
            _.forEach(_.keys(eventBus[eType]), function(id){
                eventBus[eType][id](data);
            });
        },

        unsubscribe: function (eType, id) {
            _.forEach(_.keys(eventBus[eType]), function(id_num) {
                if (id_num === id) {
                    delete eventBus[eType][id];
                }
            });
        },

        getEvents: function(){
            return eventBus;
        }
    };
//}());

});