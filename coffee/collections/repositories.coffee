define (require, exports, module) ->
  Backbone = require 'backbone'
  Repository = require 'models/repository'
  class Repositories extends Backbone.Collection
    model: Repository
    url: ->
      "/repositories/#{ @owner }"
    fetchData: (owner) ->
      @owner = owner
      @fetch()
    parse: (response) ->
      response.values
    search: (search) ->
      reg = new RegExp search , 'gi'
      repo = @filter (repo) ->
        reg.test repo.get 'name'
      console.log repo
      repo
