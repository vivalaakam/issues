var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = require('../constants/constants').ActionTypes;
var AppDispatcher = require('../dispatcher/dispatcher');
var CHANGE_EVENT = 'change';
var issues = [],
    last_page = 0;

function _loadIssues(data) {
    issues = data;
}

function _lastPage(page) {
    last_page = page;
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
    getLastPage: function() {
        return last_page;
    }
});

ErrorStore.dispatchToken = AppDispatcher.register(function(action) {

    switch (action.type) {
        case ActionTypes.LOAD_ISSUES:
            _loadIssues(action.data);
            _lastPage(action.pages);
            ErrorStore.emitChange();
            break;
        default:
            // do nothing
    }

});

module.exports = ErrorStore;
