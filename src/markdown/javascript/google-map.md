# 구글맵 API 사용하기

***

### 1. 구글맵 API 키 만들기

 - 구글맵 API를 사용하기 위해서는 API키가 필요하다.
 - 나는 Google Maps Geocoding API, Google Maps JavaScript API, Google Places API Web Service 가 필요하므로 이에 해당하는 API키를 만든다.
 
 - 1) Google API Console에서 프로젝트를 생성
 - 2) Google Maps API 로 가서 원하는 API를 선택하고 해당 API의 키 가져오기를 누른후에, 앞에서 생성한 프로젝트를 선택하면 API키가 만들어진다. 

.

### 2. Google Maps Javascript API

 - 지도를 생성하고(new google.maps.Map), 마커를 표시하고(new google.maps.Marker), 인포박스(new google.maps.InfoWindow) 를 표시하며 다양한 옵션들을 제공한다.
 - 생성한 키를 사용하여 아래 가이드를 참고하여 사용한다.
 - <https://developers.google.com/maps/documentation/javascript/tutorial?hl=ko>
 
.

### 3. Google Places API Web Service

 - 주소검색 및 주소자동완성 기능을 제공한다. (new google.maps.places.SearchBox)
 - 생성한 키를 사용하여 아래 가이드를 참고하여 사용한다.
 - <https://developers.google.com/maps/documentation/javascript/places-autocomplete?hl=ko>
 - <https://developers.google.com/maps/documentation/javascript/examples/places-searchbox>

.

### 4. Google Maps Geocoding API

 - 지오코딩은 주소(예: "1600 xxxxx Mountain View")를 지리 좌표(예: 위도 37.21 및 경도 -122.39)로 변환하는 프로세스다.
 - 역지오코딩은 지리 좌표를 사람이 읽을 수 있는 주소로 변환하는 프로세스다.
 - 생성한 키를 사용하여 아래 가이드를 참고하여 사용한다.
 - <https://developers.google.com/maps/documentation/geocoding/intro?hl=ko>
 
.

### 5. GPS 기능 (geolocation)

 - window.navigator.geolocation.getCurrentPosition 을 통해 현재 위치를 확인 할 수 있다. 아래 가이드를 참고한다.
 - <https://developers.google.com/maps/documentation/javascript/geolocation?hl=ko>
 - Chrome 50부터 Geolocation API는 보안 컨텍스트(HTTPS)에서만 작동한다.

.

### 6. API 키 제한하기

 - 구글맵 웹 API는 하루 사용량이 제한되어 있고, 이를 넘어가면 결제를 해야 사용할 수 있다.
 - Client단에 API키가 있는 경우 외부로 노출될 수 있기 때문에 특정 도메인 등에서만 사용할 수 있도록 제한을 걸어두어야 한다.
 - Google API Console - API관리자 - 사용자 인증정보 - 키 제한사항에서 설정한다. (사용량은 대시보드에서 확인)
 - Google Maps JavaScript API는 HTTP 리퍼러(웹사이트) 제한을 건다. 
 - Geocoding API는 서버 IP 주소 제한을 걸어주어야 한다.
   
.

### 7. 구글맵 API 가격정책

 - 아래 링크에서 확인한다.
 - <https://developers.google.com/maps/pricing-and-plans/?hl=ko#sup_1>