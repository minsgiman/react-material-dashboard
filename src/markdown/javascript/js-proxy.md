# Javascript Proxy

***

## Proxy Design Pattern

 - 프록시는 내부적으로 실제의 객체에 접근할 때 호출되는 래퍼(wrapper) 혹은 대리 객체이다.
 - 프록시는 코드를 간결하게 만들고, 명확하게 하지만 잘못 사용하면 성능문제를 초래할 수 있다.
 - ES6에서 지원해주는 Proxy를 통해서 구현 가능하다.
 - 아래는 Proxy객체를 통한 로그 캐시 구현 내용이다.
 
. 
 
##### 실제 객체 코드

    function GeoCoder() {
     
        this.getLatLng = function(address) {
            
            if (address === "Amsterdam") {
                return "52.3700° N, 4.8900° E";
            } else if (address === "London") {
                return "51.5171° N, 0.1062° W";
            } else if (address === "Paris") {
                return "48.8742° N, 2.3470° E";
            } else if (address === "Berlin") {
                return "52.5233° N, 13.4127° E";
            } else {
                return "";
            }
        };
    }
    
    
##### Proxy 객체의 구현

    function GeoProxy() {
        var geocoder = new GeoCoder();
        var geocache = {};
     
        return {
            getLatLng: function(address) {
                if (!geocache[address]) {
                    geocache[address] = geocoder.getLatLng(address);
                }
                log.add(address + ": " + geocache[address]);
                return geocache[address];
            },
            getCount: function() {
                var count = 0;
                for (var code in geocache) { count++; }
                return count;
            }
        };
    };
    
    // log helper
    var log = (function() {
        var log = "";
     
        return {
            add: function(msg) { log += msg + "\n"; },
            show: function() { alert(log); log = ""; }
        }
    })();

 
##### Proxy 객체 사용

    function run() {
        var geo = new GeoProxy();
     
        // geolocation requests
     
        geo.getLatLng("Paris");
        geo.getLatLng("London");
        geo.getLatLng("London");
        geo.getLatLng("London");
        geo.getLatLng("London");
        geo.getLatLng("Amsterdam");
        geo.getLatLng("Amsterdam");
        geo.getLatLng("Amsterdam");
        geo.getLatLng("Amsterdam");
        geo.getLatLng("London");
        geo.getLatLng("London");
     
        log.add("\nCache size: " + geo.getCount());
        log.show();
    }
 
  - 결과는 아래와 같다.
  
          Paris: 48.8742° N, 2.3470° E
          London: 51.5171° N, 0.1062° W
          London: 51.5171° N, 0.1062° W
          London: 51.5171° N, 0.1062° W
          London: 51.5171° N, 0.1062° W
          Amsterdam: 52.3700° N, 4.8900° E
          Amsterdam: 52.3700° N, 4.8900° E
          Amsterdam: 52.3700° N, 4.8900° E
          Amsterdam: 52.3700° N, 4.8900° E
          London: 51.5171° N, 0.1062° W
          London: 51.5171° N, 0.1062° W
          
          Cache size: 3

.

***
 
### 참조
 
  - proxy design pattern
  
  <http://www.dofactory.com/javascript/proxy-design-pattern>

  - ES6 기능 - 프락시 사용 사례 10가지
  
  <https://github.com/nhnent/fe.javascript/wiki/March-6---March-10,-2017>