# Gulp를 통한 model명 별로 빌드하기

***

### 사용 Package

 - 명령어의 parameter를 처리하기 위해 yargs 사용 
 - requireJS로 정의한 모듈을 optimize하기 위한 requirejs 사용
 - Task를 동기적으로 이어서 실행시키기 위한 run-sequence 사용
 - 파일 삭제를 위한 del 사용

        var gulp = require('gulp');
        var argv = require('yargs').argv;
        var rjs = require('requirejs');
        var del = require('del');
        var runSequence = require('run-sequence');
            
.

### model명 별로 빌드 및 requireJS optimize

 - model에 따라 index.html 과 config.json이 따로 존재한다.
 - rjs.optimize 를 사용하여 코드압축 (baseUrl은 대상 소스 or directory이고, dir은 결과물이 생성되는 위치이다.) 
 - model명 parameter를 전달 받아, 해당 model의 소스를 복사하고, 나머지 model은 삭제한다.

        gulp.task('releaseCopy', function() {
            gulp.src('./scan_ap_result.html')
                .pipe(gulp.dest(targetDir));
            if (argv.model) {
                gulp.src('./' + targetDir + '/model/' + argv.model + '/' + 'index.html')
                    .pipe(gulp.dest(targetDir));
        
                gulp.src('./' + targetDir + '/model/' + argv.model + '/' + 'config.json')
                    .pipe(gulp.dest(targetDir));
            }
        });
        
        gulp.task('releaseClean', function() {
            return del([
                targetDir + '/*/build.txt',
                targetDir + '/model/*',
                '!' + targetDir + '/model/' + argv.model
            ], {force:true});
        });
        
        gulp.task('buildRel', function() {
            rjs.optimize({
                baseUrl : 'js',
                dir : targetDir + '/js/',
            }, function() {
                rjs.optimize({
                    baseUrl : 'css',
                    dir : targetDir + '/css/',
                }, function() {
                    rjs.optimize({
                        baseUrl : 'fonts',
                        dir : targetDir + '/fonts/',
                    }, function() {
                        rjs.optimize({
                            baseUrl : 'img',
                            dir : targetDir + '/img/',
                        }, function() {
                            rjs.optimize({
                                baseUrl : 'model',
                                dir : targetDir + '/model/',
                            }, function() {
                                runSequence('releaseCopy', 'releaseClean');
                            });
                        });
                    });
                });
            });
        });
