# express에서 graphql 사용하기

GraphQL은 Server API를 구성하기 위해 Facebook에서 만든 Query Language로,<br> 
정보를 사용하는 측에서 원하는 대로 가져올 수 있고, 보다 편하게 정보를 수정할 수 있도록 하기 위해 만들어졌다.<br>

Facebook에서는 다음과 같은 이유로 GraphQL을 만들었다고 한다.<br>
* RESTful API 로는 다양한 기종에서 필요한 정보들을 일일히 구현하는 것이 힘들었다.
* 예로, iOS 와 Android 에서 필요한 정보들이 조금씩 달랐고, 그 다른 부분마다 API 를 구현하는 것이 힘들었다. 

<br>

## RESTful과 차이점

* GraphQL API 는 주로 하나의 Endpoint 를 사용한다.

* GraphQL API 는 요청할 때 사용한 Query 문에 따라 응답의 구조가 달라진다.

<br>

## GraphQL 장단점

#### 장점

1. HTTP 요청의 횟수를 줄일 수 있다.
    * RESTful 은 각 Resource 종류 별로 요청을 해야하고, 따라서 요청 횟수가 필요한 Resource 의 종류에 비례한다.
    * 반면 GraphQL 은 원하는 정보를 하나의 Query 에 모두 담아 요청하는 것이 가능하다.

2. HTTP 응답의 Size 를 줄일 수 있다.
    * GraphQL 은 필요한 정보만 부분적으로 요청하는 것이 가능하다.

#### 딘점

1. File 전송 등 Text 만으로 하기 힘든 내용들을 처리하기 복잡하다.

2. 고정된 요청과 응답만 필요할 경우에는 Query 로 인해 요청의 크기가 RESTful API 의 경우보다 더 커진다.

3. 브라우저캐시를 사용할 수 없다. graphQL은 모든 요청을 POST로 보내기 때문에 GET요청만 처리하는 브라우저 캐시를 사용할 수 없다. (Apollo client cache 등을 사용해야 한다.)

<br>

## GraphQL or RESTful?

#### GraphQL사용

* 서로 다른 모양의 다양한 요청들에 대해 응답할 수 있어야 할 때
* 대부분의 요청이 CRUD(Create-Read-Update-Delete) 에 해당할 때

#### RESTful사용

* HTTP 와 HTTPs 에 의한 Caching 을 잘 사용하고 싶을 때
* File 전송 등 단순한 Text 로 처리되지 않는 요청들이 있을 때
* 요청의 구조가 정해져 있을 때

<br>

## express에서 GraphQL API 구현

```js
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');
const app = express();

const authors = [
    { id: 1, name: 'Row' },
    { id: 2, name: 'Tolk' },
    { id: 3, name: 'Brent'}
];

const books = [
    { id: 1, name: 'Harry1', authorId: 1 },
    { id: 2, name: 'Harry2', authorId: 1 },
    { id: 3, name: 'Harry3', authorId: 1 },
    { id: 4, name: 'Harry4', authorId: 2 },
    { id: 5, name: 'Harry5', authorId: 2 },
    { id: 6, name: 'Harry6', authorId: 2 },
    { id: 7, name: 'Harry7', authorId: 3 },
    { id: 8, name: 'Harry8', authorId: 3 },
];

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This represents a author of a book',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        books: {
            type: GraphQLList(BookType),
            resolve: (author) => {
                return books.filter(book => book.authorId === author.id)
            }
        }
    })
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This represents a book written by an author',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
        author: {
            type: AuthorType,
            resolve: (book) => {
                return authors.find(author => author.id === book.authorId)
            }
        }
    })
});

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        book: {
            type: BookType,
            description: 'A Single Book',
            args: {
              id: { type: GraphQLInt }
            },
            resolve: (parent, args) => books.find(book => book.id === args.id)
        },
        books: {
            type: new GraphQLList(BookType),
            description: 'List of All Books',
            resolve: () => books
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: 'List of All Authors',
            resolve: () => authors
        },
        author: {
            type: AuthorType,
            description: 'A Single Author',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => authors.find(author => author.id === args.id)
        }
    })
});

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addBook: {
            type: BookType,
            description: 'Add a book',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                const book = { id: books.length + 1, name: args.name, authorId: args.authorId };
                books.push(book);
                return book;
            }
        },
        addAuthor: {
            type: AuthorType,
            description: 'Add an author',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const author = { id: authors.length + 1, name: args.name };
                authors.push(author);
                return author;
            }
        }
    })
});

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(5000, () => console.log('Server Running'));
```

<br>

***

### 참조
* Facebook blog: GraphQL<br>
<https://graphql.org/blog/graphql-a-query-language>

* GraphQL 개념잡기<br>
<https://tech.kakao.com/2019/08/01/graphql-basic>




