module.exports = function(grunt) {

  grunt.initConfig({
    watch: {

      files: ["QUnit/**/*.js", "QUnitTestResult.html"],
      options: {
        livereload: true
      }
    }
  });
 

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['watch']);
 
  
};