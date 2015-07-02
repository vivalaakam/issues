var AppDispatcher = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/constants').ActionTypes;
var ApiUtils = require('../utils/apiutils');

module.exports = {
    loadIssues: function(owner, repo , page) {
        ApiUtils.loadIssues(owner, repo , page).then(function(response) {
            AppDispatcher.dispatch({
                type: ActionTypes.LOAD_ISSUES,
                data: response.issues,
                pages : response.pages
            });
        }, function() {
            AppDispatcher.dispatch({
                type: ActionTypes.ERROR,
            });
        });
    }
};
