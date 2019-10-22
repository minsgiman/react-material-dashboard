# Jasmine & Karma

.

# Jasmine

***

### Jasmine은 자바스크립트를 위한 BDD(Behavior Driven Development) 프레임웍이다.
### 아래 코드는 Jasmine으로 작성한 테스트 스크립트이다.

        describe("software update check", function () {
           var isGetEvent = false;
           beforeEach(function(done) {
               startDetectWithType(1)
               .then(function() {
                   isGetEvent = true;
                   done();
               }, function() {
                   isGetEvent = false;
                   done();
               });
           }, 10 * 1000);
           
           it("check get software update event", function () {
             expect(isGetEvent).toBeTruthy();
           });
        });
                 
        function startDetectWithType(otaSpec) {
           var deferred = $.Deferred(), timeoutHandle;
           var eventType;
           
           swupdate.onUpdateEvent = function (SwUpdateEventInfo) {
                eventType = SwUpdateEventInfo.getInfo("event");
                if (eventType === EEventDetectSuccess) {
                   isFoundSW = true;
                   clearTimeout(timeoutHandle);
                   deferred.resolve();
                } else if (eventType === EEventDetectFail) {
                   isFoundSW = false;
                   clearTimeout(timeoutHandle);
                   deferred.resolve();
                }
           };
           
           swupdate.startDetectWithType(otaSpec);
           
           timeoutHandle = setTimeout(function() {
             deferred.reject();
             console.log("Timeout ... ");
           }, 10 * 1000);
           
           return deferred;
        }

### 1. Suite 

 - describe('software update check in ..')를 Suite이라고 부른다. 일반적으로 이것은 애플리케이션의 컴포넌트 혹은 클래스이거나 단순히 여러가지 함수가 될 수 있다.

### 2. Spec
 
 - Suite안에서(기술적으로는 클로저의 내부) it()함수를 가지고 있는데 이것을 Spec이라고 부른다. 이것은 프로그램의 일부가 무엇을 해야하는지를 말해주는 자바스크립트 함수다. 

 - Spec의 제목인 "check get software update event"도 코드가 아닌 그냥 영어이고 Suite안에는 많은 수의 Spec을 가질 수 있다.

### 3. Matcher
 
 - 위 예제의 expect(isGetEvent).toBeTruthy()에서 isGetEvent 변수가 true인지를 테스트하는데 이 부분을 Matcher라고 부른다.
  
 - 자스민에는 내장된 많은 수의 Matcher가 있고 필요하다면 자신만의 Matcher를 만들 수 있다.

 - 자스민에는 많은 내장 매처들이 있다. toBeNull()은 변수가 null이기를 기대하고 toBeTruthy()는 어떤 값이 true이기를 기대한다. toEqual()은 동등성을 확인하고, toBe()는 정확히 같은 객체인지를 확인한다.

### 4. before & after
 
 - 모든 스펙이 실행되기 이전에 변수를 설정하거나 함수를 정의하는 등 어떤 동작이 필요하다면 beforeEach()안에 이러한 코드를 둬서 모든 스펙 이전에 실행되게 할 수 있다. 모든 스펙이후에 무언가 실행되기를 원한다면 afterEach()안에 코드를 작성하면 된다.

### 5. 비동기 처리
 
 - 비동기 처리는 위의 예제와 같이 deferred와 done을 사용하였다.
 
 - Jasmine에서는 Suite, Spec, beforeEach등에서 done 함수를 제공한다. done을 호출하면 해당 scope를 마치고 넘어갈 수 있다.
 
 - 위의 예제에서는 deferred로 처리한 비동기 작업을 마치면 done을 호출하여 beforeEach를 마치고 it으로 넘어가고 있다. 

.

# Karma

***

### Karma는 자바스크립트 테스트 러너다. 

 - Karma는 유닛테스트용 프레임워크가 아니라 작성한 테스트를 실행해 주는 역할을 한다. 

 - 그래서 Karma를 사용하더라도 테스트 자체는 기존에 익숙한 QUnit, Mocha, Jasmine을 그대로 사용할 수 있고 테스트 실행만 karma를 이용해서 하게 된다.

 - 어떤 테스트 프레임워크를 사용할지는 아래 예제의 frameworks: ["jasmine"] 에서 설정할 수 있다.

 - Karma는 내장된 서버를 가지고 있어, Karma 서버를 실행하고, 원하는 browser로 연결하여 test를 수행하게 된다. 

 - 어떤 browser를 사용할지는 아래 예제의 browsers: ["Browser"] 에서 설정할 수 있다.

### Karma 환경 설정

        /*global module */
        module.exports = function(config) {
            "use strict";
            var data;
            try {
                data = require("../../.individual.json");
            } catch (e) {
                data = {"nfs":'./build'};
            }
            config.set({
                basePath: '../..',
                frameworks: ['jasmine'],
                files: [
                    './node_modules/underscore/underscore.js',
                    './node_modules/jquery/dist/jquery.js',
                    './tests/www/spec/*.spec.js',
                    './tests/www/spec/*.html'
                ],
                preprocessors: {},
                plugins: [
                    require('karma-jasmine'),
                    require('../../lib/Browser'),
                    require('karma-jenkins-reporter'),
                    require('karma-junit-reporter'),
                    require('karma-htmlfile-reporter')
                ],
                reporters: ['progress'],
                junitReporter:{
        			outputDir: './',
                    outputFile: 'test_result.xml'
                },
                htmlReporter:{
                    outputFile: 'test_result.html'
                },
                port: 9876,
                colors: true,
                logLevel: config.LOG_INFO,
                autoWatch: false,
                browsers: ['Browser'],
                customLaunchers: {
                    Browser: {
                        base: 'BrowserBase',
                        root: "../..",
                        data : data
                    }
                },
                proxies: {
                    '/spec/': '/base/tests/www/spec/'
                },
                captureTimeout: 600000,
                browserNoActivityTimeout: 600000,
                singleRun: true
            });
        };