# Git Flow 브랜치

## master와 develop 브랜치 (주요 브랜치)

* 먼저 배포했거나 곧 배포할(production-ready) 코드는 origin/master에 두고 관리한다.
 
* 다음에 배포할 것을 개발하는 코드는 origin/develop에 두고 관리한다.
  
* develop branch의 코드가 안정되고 배포할 준비가 되면 곧 master로 merge하고 배포 버전으로 태그를 단다.
<br><br>
 
## feature 브랜치 (보조 브랜치)

* 다음, 아니면 다다음, 어쨌든 조만간에 배포할 기능을 개발하는 브랜치
 
* feature 브랜치는 그 기능을 다 완성할 때까지 유지하고 다 완성되면 develop 브랜치로 merge한다.
 
* feature 브랜치는 보통 개발자 저장소에만 있는 브랜치고 origin에는 push하지 않는다.
<br><br>
 
## release 브랜치 (보조 브랜치) 

* 제품 배포를 준비하는 브랜치로써, 배포하는 데 필요한 버전 넘버, 빌드 일정 등의 메타데이터를 준비하고 사소한 버그도 잡는다. 이와 같은 일을 release 브랜치에서 함으로써 develop 브랜치는 다음에 배포할 때 추가할 기능에 집중할 수 있다. 

* develop 브랜치가 배포할 수 있는 상태에 다다랐을 때 release 브랜치를 만드는 것이 중요하다. 이때, 배포해야 하는 기능이 모두 develop 브랜치에 merge돼 있어야 하고 이번에 배포하지 않을 기능은 release 브랜치를 만들 때까지 기다려야 한다.
 
* 새로 만든 release 브랜치는 잘 말아서 진짜로 배포할 때까지 유지한다. 그동안 발견한 버그는 develop 브랜치가 아니라 이 브랜치에서 해결하고 새 기능은 이 브랜치에 추가하지 않는다.
 
* 배포할때가 되면 master 브랜치에 있는 것을 배포하는 것으로 정의했으므로 먼저 release 브랜치를 master로 merge한다. 그리고 나중에 이 버전을 찾기 쉽도록 태그를 만들어 지금 master가 가리키는 커밋을 가리키게 한다. 그리고 release 브랜치를 develop 브랜치에 merge하고 다음에 배포할 때 release 브랜치에서 해결한 버그가 적용되도록 한다.

<br>

***

### 참조
* A successful Git branching model<br>
<http://nvie.com/posts/a-successful-git-branching-model/>

* A successful Git branching model(한글번역)<br>
<http://dogfeet.github.io/articles/2011/a-successful-git-branching-model.html>

