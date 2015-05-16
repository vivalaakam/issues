define (require, exports, module) ->
  Backbone = require 'backbone'
  templates = require 'templates'
  model = require 'models/issue'
  class Issue extends Backbone.View
    data:{}
    initialize: (opts)->
      @data = opts extends @data
      @model = new model(@data);
      @model.on 'sync' , @render , @
      @model.fetch()
    render: ->
      @$el.html templates["templates/issue"] @model.toJSON()
      @
