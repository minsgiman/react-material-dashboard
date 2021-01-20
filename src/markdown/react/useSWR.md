# useSWR 사용

## SWR이란?

SWR은 stale-while-revalidate의 약자이다.


> SWR first returns the data from cache (stale), then sends the fetch request (revalidate), and finally comes with the up-to-date data again.

위의 설명을 보면, 처음에 cache로 부터 받아온 데이터를 먼저 리턴해주고 그 다음에 fetch를 하여 마지막으로 업데이트 된 데이터를 다시 리턴해주는 역할을 한다.

<br>

## useSWR 사용

[useSWR](https://swr.vercel.app/)은 [Vercel](https://vercel.com/)에 의해 만들어진 React Hook 라이브러리이다.<br>
useSWR을 사용하지 않고, redux와 같은 store에서 fetch 해온 data를 cache 하고 관리해도 된다. (지금까지 그렇게 해왔다.)<br>
하지만 app이 커질수록 store가 점점 더 복잡해지고 관리하기 어려운 문제에 직면한다.<br>
useSWR은 내부적으로 cache와 revalidate를 관리해주기 때문에 개발자가 일일히 처리해야 하는 많은 부분들을 자동화 해준다.<br>
<br>

### API option
```js
const { data, error, isValidating, mutate } = useSWR(key, fetcher, options)
```
* key: request의 unique key string ('/api/user')
* fetcher: Promise를 리턴하는 fetch function. [(details)](https://swr.vercel.app/docs/data-fetching)
* options: SWR hook의 options [(details)](https://swr.vercel.app/docs/options)
* data: fetcher에 의해 로드된 response data (undefined면 load 되기 전이다.)
* error: fetcher에 의해 throw 된 error (undefined면 error가 발생하지 않았다.)
* isValidating: request 또는 revalidation 이 loading 중인지 나타낸다.
* mutate(data?, shouldRevalidate?): mutate를 통해 cache된 데이터를 변경할 수 있다. shouldRevalidate가 true면 cache를 변경한 직후에 fetch를 다시 해온다.
<br><br>

### 중복 request 제거와 cache 관리

useSWR hook은 cache 데이터를 전역으로 공유한다. (동일한 request key에 대해서)<br> 

아래 예제에서 Avatar 컴포넌트를 5개 만들고, 각 <Avatar> 컴포넌트는 내부에 useSWR hook을 사용하고 있다.<br>
5개 모두 동일한 useSWR key를 사용하고 거의 동시에 렌더링되기 때문에 network request는 1번만 호출된다. (cache를 모두 공유하고 있다.)<br>
SWR 내부적으로 중복 request를 제거하기 때문에 아래 예제의 useUser와 같은 data hooks를 성능 이슈에 대한 걱정없이 어디에서든 재사용 할 수 있다.

```js
function useUser () {
  return useSWR('/api/user', fetcher)
}
function Avatar () {
  const { data, error } = useUser()
  if (error) return <Error />
  if (!data) return <Spinner />
  return <img src={data.avatar_url} />
}
function App () {
  return <>
    <Avatar />
    <Avatar />
    <Avatar />
    <Avatar />
    <Avatar />
  </>
}
```
<br>

### Revalidate 자동화

useSWR hook은 data revalidate를 필요한 시점에 수행하도록 설정할 수 있다.<br>
필요할 때 마다 매번 fetch를 다시 호출해주어야 하는 작업이 자동화된다.<br>
option 설정에 따라 브라우저 탭을 포커스 할때 또는 주기적으로 revalidate를 수행하도록 할 수 있다.<br><br>

1초마다 revalidate 한다.
```js
const { data } = useSWR('/api/v1/users', fetch, { 
  // 1초마다 갱신한다.
  refreshInterval: 1000
});
  
return ( ... )
```
<br>

새로 fetch를 하지 않고, 기존에 cache 해놓은 data만 사용한다고 하면 다음과 같이 설정하면 된다.
```js
const { data } = useSWR("/todo.json", {
  revalidateOnMount: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false
});

if (!data) return <div>No Cached Data..</div>;

return (
    <div>
      {data.todos.map((todo) => {
        return <div key={todo.id}>{todo.title}</div>;
      })}
    </div>
);
```
<br>

### 로컬 cache 변경

useSWR hook에서 제공하는 mutate를 사용하여 cache를 변경할 수 있다.<br>
다음 예제와 같이 user 정보를 업데이트 하는 것이 성공하였다면, 로컬에서 user 데이터가 어떻게 갱신되었는지 알고 있기 때문에<br> 
user를 다시 fetch 하는 것이 아니라, mutate 함수를 사용해서 로컬 cache만 업데이트 할 수 있다.

```js
import useSWR from 'swr'

function UserInfo(){
  const {data, error, mutate} = useSWR('/api/user', url => {
    return fetch(url).then(res => res.json())
  })
  
  const handleChange = async (user) => {
    await updateUser(user)
    mutate(user, false)
  }  

  return <div>~생략~</div>
}
```
<br>

## 그 밖에...

* useSWR은 기본적으로 컴포넌트 mount시에 fetch를 수행하도록 설정되어 있기 때문에, useEffect 안에서 사용하지 않는다.

* typescript를 포함한 swr 예제 : https://github.com/zeit/swr/tree/master/examples





