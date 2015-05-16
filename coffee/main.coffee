require.config {
  paths :
    templates: '../../../templates'
}
require ['app', 'router'], (app, Router) ->
   app.router = new Router();
   Backbone.history.start();
