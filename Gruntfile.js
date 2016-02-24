module.exports = function(grunt) {
    // configure the tasks
    grunt.initConfig({
        watch: {
            scripts: {
                files: ['source/**'],
                tasks: ['build'],
                options: {
                    spawn: false,
                },
            },
        },
        copy: {
            dist: {
                files: [{
                    cwd: 'source',
                    src: ['**/*', '!**/jsx/**'],
                    dest: 'dist',
                    expand: true
                }, {
                    cwd: '.tmp/package/',
                    src: ['node_modules/**'],
                    dest: 'dist',
                    expand: true
                }]
            },
            build: {
                files: [{
                    cwd: 'source',
                    src: ['**/*', '!**/jsx/**'],
                    dest: 'build',
                    expand: true
                }, {
                    cwd: '.tmp/package/',
                    src: ['node_modules/**'],
                    dest: 'build',
                    expand: true
                }]
            }
        },
        clean: {
            dist: {
                src: ['dist']
            },
            build: {
                src: ['build']
            },
            tmp: {
                src: ['build']
            }
        },
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    src: "**/*.css",
                    dest: "dist/css",
                    cwd: 'dist/css',
                }]
            }
        },
        packageModules: {
            dist: {
                src: 'package.json',
                dest: '.tmp/package'
            },
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: '**/*.html',
                    dest: 'dist/'
                }]
            }
        },
        uglify: {
            dist: {
                options: {
                    mangle: false
                },
                files: [{
                    expand: true,
                    src: "**/*.js",
                    dest: "dist/js",
                    cwd: 'dist/js',
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-package-modules');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('build', '', ['clean:build', 'packageModules', 'copy:build']);
    grunt.registerTask('dist', '', ['clean:dist', 'packageModules', 'copy:dist', 'cssmin', 'uglify', 'htmlmin']);
};