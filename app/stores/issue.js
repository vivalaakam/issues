var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = require('../constants/constants').ActionTypes;
var AppDispatcher = require('../dispatcher/dispatcher');
var CHANGE_EVENT = 'change';
var issues = [];

function _loadIssues(data) {
    issues = data;
}

var ErrorStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    getIssues: function() {
        return issues;
    },
});

ErrorStore.dispatchToken = AppDispatcher.register(function(action) {

    switch (action.type) {
        case ActionTypes.LOAD_ISSUES:
            _loadIssues(action.data);
            ErrorStore.emitChange();
            break;
        default:
            // do nothing
    }

});

module.exports = ErrorStore;
