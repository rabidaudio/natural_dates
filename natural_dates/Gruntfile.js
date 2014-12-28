module.exports = function(grunt) {

  //load tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mocha-test');

  //configure tasks
  grunt.initConfig({
    jshint: {
      options: {
        browser: true,
      },
      main: {
        src: ['src/**/*.js']
      }
    },
    copy: {
      main: {
        src: ['src/natural_dates.js'],
        dest: 'natural_dates.js'
      }
    },
    uglify: {
      main: {
        files: {
          'natural_dates.min.js': 'natural_dates.js'
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    }
  });

  grunt.registerTask('build', ['jshint', 'copy', 'uglify']);
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('default', ['test', 'build']);
};