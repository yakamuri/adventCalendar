module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	
	cmq: {
		options: {
		  log: false
		},
		your_target: {
		  files: {
			'cmq': ['css/style.raw.css']
		  }
		}
	},
	
	cssmin: {
		build: {
		  src: 'cmq/style.raw.css',
		  dest: 'css/style.css'
		}
	},
	
	uglify: {
		my_target: {
			files: {
			'js/app.min.js': [
				'js/toMinify/vendor/imagesloaded.pkgd.min.js',

				'js/toMinify/_main.js'
				]
			}
		}
	},
	
	watch: {
		all: {
			files: ['css/style.raw.css','js/toMinify/*.js','js/toMinify/vendor/*.js'],
			tasks: ['cmq', 'cssmin','uglify'],
		},
	}
  });

  // Load the plugins
  //watcher
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  //css
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-combine-media-queries');
  
  //js
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['cmq','cssmin','uglify']);

};