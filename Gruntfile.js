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
        banner: '<%= banner %>'
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['*.js'],
          dest: 'dist/',
          ext: '.min.js',
          extDot: 'last'   // need to support minification of .umd.js file
        }]
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
            '  window.FingerBlast = FingerBlast;\n});'] // IIFE
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
    }
  });

  // Default task.
  grunt.registerTask('default', ['build']);

  grunt.registerTask('build', ['clean', 'jshint', 'wrap:dist', 'concat:dist', 'umd', 'concat:umd', 'uglify']);

  grunt.registerTask('demos', ['build', 'clean:demos', 'copy:demo']);
};
