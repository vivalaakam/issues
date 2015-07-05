module.exports = function(grunt) {
    var rewrite = require('connect-modrewrite');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            browserify: {
                files: ['./app/**/*.js', './app/**/*.jsx'],
                tasks: ['browserify'],
            },
            less: {
                files: './less/*.less',
                tasks: ['less:development']
            }
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 3000,
                    base: './public',
                    middleware: function(connect, options) {

                        var middleware = [];

                        // 1. mod-rewrite behavior
                        var rules = [
                            '!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /index.html'
                        ];
                        middleware.push(rewrite(rules));

                        // 2. original middleware behavior
                        var base = options.base;
                        if (!Array.isArray(base)) {
                            base = [base];
                        }
                        base.forEach(function(path) {
                            middleware.push(connect.static(path));
                        });

                        return middleware;

                    }
                }
            }
        },
        less: {
            development: {
                options: {
                    compress: false,
                    yuicompress: false,
                    optimization: 2
                },
                files: {
                    './public/stylesheets/style.css': './less/app.less'
                }
            }
        },
        browserify: {
            options: {
                transform: [require('grunt-react').browserify]
            },
            client: {
                src: ['./app/app.jsx'],
                dest: './public/javascripts/app.js'
            }
        },
        webfont: {
            icons: {
                src: 'icons/*.svg',
                dest: 'public/fonts',
                destCss: 'less',
                options: {
                    hashes: false,
                    syntax: "bootstrap",
                    stylesheet: "less",
                    relativeFontPath: "/fonts",
                    htmlDemo: false,
                    templateOptions: {
                        baseClass: 'icon-'
                    }
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-browserify');


    grunt.registerTask('default', ['browserify', 'less:development', 'connect', 'watch']);

};
