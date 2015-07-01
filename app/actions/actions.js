var AppDispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var ApiUtils = require('../utils/apiutils');

module.exports = {
    loadIssues: function(owner, repo) {
        ApiUtils.loadIssues(owner, repo).then(function(response) {
            AppDispatcher.dispatch({
                type: ActionTypes.LOAD_ISSUES,
                data: response
            });
        }, function() {
            AppDispatcher.dispatch({
                type: ActionTypes.ERROR,
            });
        });
    }
};
