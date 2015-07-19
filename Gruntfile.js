/**
 * Created by mayasc on 7/19/15.
 */

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        handlebars: {
            compile: {
                options: {
                    namespace: 'JST',
                    processName: function(filePath) {
                        return filePath.replace(/templates\//, '').replace(/\.tmpl\.html/, '');
                    }
                },
                files: {
                    'templates/compiledTemplates.js': ['templates/*.tmpl.html']
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'js/**/*.js',
                dest: 'build.js'
            }
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-handlebars');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'handlebars']);

};