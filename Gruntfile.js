module.exports = function(grunt) {
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
                    base: './public'
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
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-webfont');
    grunt.loadNpmTasks('grunt-jest');


    grunt.registerTask('default', ['browserify', 'less:development', 'connect', 'watch']);

};
