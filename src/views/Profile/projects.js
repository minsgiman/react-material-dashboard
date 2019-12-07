export default [
  {
    title : 'TOAST CAM UIkit 구현  (2018-09-01 ~ 2019-06-01)',
    description : '여러개의 TOAST CAM Web frontend 프로젝트에서 사용하는 공통된 UI Component를 추출하고 구현하였다.</br>' +
      '디자인 단계에서부터 프로젝트별로 제각각이던 UI Component를 일관되게 다시 정리하고, 구현한 UIkit을 npm package로 제공하였다.',
    skill : 'Vue, Typescript, Less, Storybook, Webpack'
  },
  {
    title : 'Localization System(번역 시스템) 구축 (2018-08-03 ~ 2019-02-10)',
    description: '개발 프로세스 개선을 위해, 번역시스템을 구축하였다.</br>' +
      '구축한 효과로 App 개발 시 사용하는 Localization 파일 수정이 자동화 되었고 (App빌드시 번역어 List Get API제공),</br>' +
      '플랫폼별(Web, IOS, AOS)로 맞지 않았던 번역어 관리가 가능해졌다.',
    skill : 'React, Webpack, NodeJS, NoSQL Couchbase DB'
  },
  {
    title : 'DID(Digital Information Display) Web application 구현 (2018-01-03 ~ 2018-10-01)',
    description : '셋탑박스에서 Display해줄 콘텐츠 변경여부를 서버로부터 주기적으로 체크하고,</br>' +
      '콘텐츠를 다운로드 받아서 반복적으로 Display 해주는 셋탑박스 Main Web Application개발을 진행하였다.',
    skill : 'Vue, Typescript, Less, Webpack, Karma, Jasmine'
  },
  {
    title : '개인 홈페이지 구현 (2017-02-03 ~ Current)',
    description : '이력 및 기술문서를 정리할 목적으로 홈페이지를 구축하였다.',
    skill : 'React, Sass, Jest, Enzyme, Firebase'
  },
  {
    title : 'webRTC 영상 스트리밍 및 Voice Chat 구현 (2017-10-02 ~ 2018-02-30)',
    description : 'WebRTC 기술을 사용하여, IP카메라와 Web Application간의 Voice Chat을 지원하고, IP카메라의 영상을 Web Application에서 스트리밍할 수 있도록 구현하였다.</br>' +
      'Web Front 및 Signaling 서버 구현, TURN/STUN 서버구축 모두 직접 진행하였다.',
    skill : 'Web Frontend : WebRTC Peer API, AngularJS, gulp</br>' +
      'Signaling Server : NodeJS, Redis, ZooKeeper</br>' +
      'TURN/STUN Server : coTurn, NodeJS, ZooKeeper'
  },
  {
    title : 'TOAST CAM IOT 매장관리 Web Application 구현 및 유지보수 (2017-05-01 ~ 2019-03-08)',
    description : 'IOT 컨트롤러 역할을 하는 IP카메라를 통하여, 매장내에 설치된 각종 센서들의 제어기능을 제공하며,</br>' +
      '센서 이벤트를 그래프로 보여주고, 이벤트가 발생한 시점의 영상 또한 확인할 수 있는 Web Application을 개발하였다.',
    skill : 'AngularJS, Gulp, D3, webRTC'
  },
  {
    title : 'NodeJS 컨트롤서버 구현 및 유지보수 (2017-09-10 ~ 2018-12-01)',
    description : 'IP카메라와 Socket연결을 맺어서, 카메라를 제어하는 프로토콜을 전송하거나, Kafka로 카메라의 상태를 업데이트하는 서버를 설계 및 구현하였다.</br>' +
      '물리적인 서버 3대의 Cluster로 구축하였고, L4를 통하여 로드밸런싱 하였다.',
    skill : 'NodeJS(ioredis, rdkafka, request, express, zookeeper-client Library 등 사용), Typescript, CentOS'
  },
  {
    title : 'Broadband-router 설정 web application 개발  (2016-06-20 ~ 2016-10-20)',
    description : 'Broadband-router 설정 기능을 제공하는 web appliocation을 개발하였다.</br>' +
      ' MVW framework을 사용하지 않고, 처음부터 전체 Single Page Application framework을 직접 설계하고 구현하였다.',
    skill : 'Gulp, Jquery, RequireJS'
  },
  {
    title : 'Jasmine & Karma를 이용한 셋탑박스 테스트 코드 개발 (2015.12.01 - 2016.04.12)',
    description : 'OP에게 OIPF API 사용가이드를 제공하고, 셋탑박스 M/W동작 검증을 목적으로 Karma & Jasmine을 이용한 셋탑박스 테스트 코드를 개발 하였다.',
    skill : 'Jasmine, Karma'
  },
  {
    title : '셋탑박스 Native Application 개발 (2015.02.01 - 2015.7.20)',
    description : '기존 셋탑박스 Web Application UI 의 높은 HW사양 및 성능 문제를 해결하기 위한 C언어 Native Application을 개발하였다.</br>' +
      'Linux GUI library DirectFB를 통해 UI Drawing 및 Key 이벤트를 구현하였다.',
    skill : 'C, DirectFB'
  },
  {
    title : '셋탑박스 Web Application 코드 개선을 위한 RequireJS, TypeScript, LESS 적용 (2013.05.01 - 2013.09.01)',
    description : '기존 Web Application Base 코드에서 가지고 있었던 Maintenance, New requirement에 대응하기 힘든 구조적 문제를 개선하기 위하여 RequireJS, TypeScript, LESS를 적용하였다.',
    skill : 'RequireJS, TypeScript, LESS'
  },
  {
    title : 'Retail 셋탑박스 Main Web Application 개발  (2012.05.01 - 2013.05.13)',
    description : 'Opera Browser(Opera Device SDK 에서 지원)위에서 동작하는 셋탑박스 Main Web Application 개발을 진행 하였다.</br>' +
      '셋탑박스를 Web UI로 제어하기 위해서 OIPF (Open IPTV Forum) API Spec을 사용하였다.',
    skill : 'Javascript, HTML, CSS, JQuery'
  }
];