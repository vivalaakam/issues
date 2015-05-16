require.config {
  paths :
    templates: '../../../templates'
}


define (require, exports, module) ->
  app = require 'app'
  Router = require 'router'
  app.router = new Router() ;
  Backbone.history.start() ;
