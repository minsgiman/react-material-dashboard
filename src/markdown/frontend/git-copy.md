# Git repository 복사하기 (history 까지 통째로)

Create a bare mirrored clone of the repository.

        git clone --mirror https://github.com/exampleuser/repository-to-mirror.git
<br>

Set the push location to your mirror.

        cd repository-to-mirror.git
        
        git remote set-url --push origin https://github.com/exampleuser/mirrored
<br>

As with a bare clone, a mirrored clone includes all remote branches and tags,<br>
but all local references will be overwritten each time you fetch,<br> 
so it will always be the same as the original repository.<br>
To update your mirror, push.

        git push --mirror
<br>

***

### 참조
* Duplicating a repository<br>
<https://help.github.com/en/github/creating-cloning-and-archiving-repositories/duplicating-a-repository/>