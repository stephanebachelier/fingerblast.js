/*global require, module  */
module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * Original work from phantom limb by Brian Cartensen\n' +
      ' * Adapted by @fat and @XhmikosR for github.com/twbs/ratchet\n' +
      ' * Licensed <%= pkg.license %>\n*/\n',
    // Task configuration.
    clean: {
      src: 'dist',
      demos: 'demos/js'
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.js'
      },
      umd: {
        src: 'dist/<%= pkg.name %>.umd.js',
        dest: 'dist/<%= pkg.name %>.umd.js'
      }
    },
    copy: {
      demo: {
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['*.js'],
          dest: 'demos/js/'
        }]
      }
    },
    uglify: {
      options: {
        compress: true,
        preserveComments: 'some'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
      umd: {
        src: '<%= concat.umd.dest %>',
        dest: 'dist/<%= pkg.name %>.umd.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/*.js']
      }
    },
    jscs: {
      options: {
        config: '.jscsrc'
      },
      lib: {
        src: ['lib/*.js']
      }
    },
    umd: {
      lib: {
        src: 'lib/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.umd.js',
        amdModuleId: '<%= pkg.name %>',
        objectToExport: 'FingerBlast',
        indent: '    '
      }
    },
    wrap: {
      dist: {
        src: 'lib/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.js',
        options: {
          seperator: '\n',
          indent: '  ',
          wrapper: [
            '(function () {',
            '  window.FingerBlast = FingerBlast;\n})();'] // IIFE
        }
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib']
      }
    },
    'gh-pages': {
      options: {
        base: 'demos',
        message: 'docs(demos): update demos'
      },
      src: [
        '*.html',
        'img/*',
        'js/*',
        'bower_components/ratchet/dist/{css,fonts}/*',
        'bower_components/ratchet/js/sliders.js',
        'bower_components/requirejs/require.js'
      ]
    }
  });

  // Default task.
  grunt.registerTask('default', ['build']);

  grunt.registerTask('build', ['clean:src', 'jshint', 'jscs', 'wrap:dist', 'concat:dist', 'umd', 'concat:umd', 'uglify']);

  grunt.registerTask('demos', ['build', 'clean:demos', 'copy:demo']);
};
