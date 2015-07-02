var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ActionTypes = require('../constants/constants').ActionTypes;
var AppDispatcher = require('../dispatcher/dispatcher');
var CHANGE_EVENT = 'change';
var errors = [];
var utils = require('../utils/helpers');

function _addError(data) {
    errors.push(data);
}

function _setErrors(data) {
    if (!data) {
        data = [];
    }

    errors = data;
}

function _removeError(row) {
    errors = errors.filter(function(error) {
        return row.name !== error.name;
    });
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
    getErrors: function() {
        return errors;
    },
});

ErrorStore.dispatchToken = AppDispatcher.register(function(action) {

    switch (action.type) {
        case ActionTypes.ADD_ERROR:
        console.log(action);
            _addError(action.error);
            ErrorStore.emitChange();
            break;
        case ActionTypes.SET_ERRORS:
            _setErrors(action.errors);
            ErrorStore.emitChange();
            break;
        case ActionTypes.RESET_ERRORS:
            _setErrors();
            ErrorStore.emitChange();
            break;
        case ActionTypes.REMOVE_ERROR:
            _removeError(action.data);
            ErrorStore.emitChange();
            break;
        default:
            // do nothing
    }

});

module.exports = ErrorStore;
