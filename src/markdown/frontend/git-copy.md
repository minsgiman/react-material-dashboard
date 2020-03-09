# Git repository 복사하기 (history 까지 통째로)

1. Open Terminal
<br>

2. Create a bare clone of the repository.

        $ git clone --bare https://github.com/exampleuser/old-repository.git

3. Mirror-push to the new repository.
        
        $ cd old-repository.git
        $ git push --mirror https://github.com/exampleuser/new-repository.git

4. Remove the temporary local repository you created earlier.

        $ cd ..
        $ rm -rf old-repository.git
        
<br>

***

### 참조
* Duplicating a repository<br>
<https://help.github.com/en/github/creating-cloning-and-archiving-repositories/duplicating-a-repository/>