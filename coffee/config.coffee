 require.config {
    paths:
        jquery: '../../bower_components/jquery/dist/jquery'
        underscore: '../../bower_components/underscore/underscore'
        backbone: '../../bower_components/backbone/backbone',
        jade : '../../node_modules/jade/jade'
    shim:
        backbone:
            deps: ['jquery','underscore'],
            exports: 'Backbone'
        underscore :
            exports: '_'
    }
