module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks 
    
    var src_list = [
        'src/banner.js',  
        'src/moenotification.js',
        'src/intro.js',
        'src/i18n.js',
        'src/util.js',
        'src/wikipage.js',
        'src/wikiplus.js',
        'src/outro.js'
    ];
    
    grunt.initConfig({
        concat: {
            options:{
                separator: '\n',
            },
            dist: {
                src: src_list,
                dest: './Main.new.js'
            }
        },
        babel: {
            options: {
                sourceMap: false
            },
            dist: {
                files: {
                    './Main.js': './Main.new.js'
                }
            }
        },
        uglify: {
            options: {
            },
            app_task: {
                files: {
                    './Main.min.js': './Main.js'
                }
            }
        },
        watch: {
            another: {
                files: ['./src/*.js'],
                tasks: ['concat', 'babel', 'uglify'],
                options: {
                    // Start another live reload server on port 1337
                    livereload: 1337
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['concat', 'babel','uglify']);
}