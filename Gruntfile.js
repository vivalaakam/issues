module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    coffee: {
      glob_to_multiple: {
        expand: true,
        flatten: false,
        cwd: 'coffee',
        src: ['**/*.coffee'],
        dest: 'src/app',
        ext: '.js',
        options: {
          bare: true
        },
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "./src/app",
          mainConfigFile: "./src/app/config.js",
          out: "./public/javascripts/main.js",
          name: "./main",
          optimize: "none"
        }
      }
    },
    watch: {
      coffee: {
        files: 'coffee/**/*.coffee',
        tasks: ['coffee', 'requirejs'],
      },
      jade: {
        files: 'templates/**/*.jade',
        tasks: ['jade', 'requirejs']
      },
      stylus: {
        files: 'styl/*.styl',
        tasks: ['stylus']
      }
    },
    express: {
      options: {
        port: 3000,
      },
      dev: {
        options: {
          script: './server/bin/www'
        }
      }
    },
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          },
          client: true,
          amd: true
        },
        files: {
          "src/app/templates.js": ["templates/**/*.jade"]
        }
      }
    },
    stylus: {
      compile: {
        options: {

        },
        files: {
          'public/stylesheets/style.css': ['styl/*.styl']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');

  grunt.registerTask('default', ['coffee', 'jade', 'requirejs', 'stylus', 'express', 'watch']);

};
