define (require, exports, module) ->
  Backbone = require 'backbone'
  class Issue extends Backbone.Model
    data: {}
    url : ->
      "/issue/#{ @data.owner }/#{ @data.repo }/#{@data.issue}"
    initialize: (opts) ->
      @data = opts extends @data
      @on 'change:created_at', @prettyCreated , @
      @prettyCreated()
    prettyCreated:->
      @set 'date_pretty' , @pretty @get 'created_at'
    pretty: (date) ->
      d = new Date date
      M = d.getMonth() + 1
      M = "0#{ M }" if M < 10
      D = d.getDate()
      D = "0#{ D }" if D < 10
      h = d.getHours()
      h = "0#{ h }" if h < 10
      m = d.getMinutes()
      m = "0#{ m }" if m < 10
      "#{ d.getFullYear() }-#{ M }-#{D} #{h}:#{m}"
    parse : (response) ->
     if response.values then response.values else response
