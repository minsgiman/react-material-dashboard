# express에서 mongoose 사용하기 

[mongoose](https://mongoosejs.com/)는 MongoDB ODM(Object Document Mapping)중 하나로써,<br>
MongoDB Document를 자바스크립트 Object에 매칭시켜주는 역할을 한다.<br>
또한 express와 함께 사용하여 MVC Concept 구현을 용이하게 해준다.<br>
mongoose의 사용방법과 장점에 대하여 알아본다.

<br>

## 설치 및 MongoDB 연결

<설치>
```text
npm install mongoose
```

<MongoDB 연결>
```js
const mongoose = require('mongoose');

mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error: ' + err);
});
mongoose.connection.on('connected', () => {
    console.log('Mongoose connection open');
});
mongoose.connect('mongodb://127.0.0.1:5050/node_rest_api', {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false
});
mongoose.Promise = global.Promise;
```
<br>

## mongoose API와 장점

#### 1. 스키마(schema) 사용
mongoose의 Schema는 MongoDB에 저장되는 document의 Data 구조를 JSON 형태로 정의한 것으로 RDBMS의 테이블 정의와 유사한 개념이다.<br>
MongoDB는 Schema-less하다. 이는 RDMS처럼 고정 Schema가 존재하지 않는다는 뜻으로 같은 Collection 내에 있더라도 document level의 다른 Schema를 가질 수 있다는 의미이다.<br>
이는 자유도가 높아서 유연한 사용이 가능하다는 장점이 있지만 명시적인 구조가 없기 때문에 어떤 필드가 어떤 데이터 타입인지 알기 어려운 단점이 있다.<br> 
이러한 문제를 보완하기 위해서 mongoose는 Schema를 사용한다.<br>
이를 통해 **Model의 Validation 검사 및 명시적인 Type정의**를 구현할 수 있다. 

```js
/* api/models/project.js */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name:    String,
  binary:  Buffer,
  living:  Boolean,
  updated: { type: Date, default: Date.now },
  age:     { type: Number, min: 18, max: 65 },
  mixed:   Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  decimal: Schema.Types.Decimal128,
  array: [],
  ofString: [String],
  ofNumber: [Number],
  ofDates: [Date],
  ofBuffer: [Buffer],
  ofBoolean: [Boolean],
  ofMixed: [Schema.Types.Mixed],
  ofObjectId: [Schema.Types.ObjectId],
  ofArrays: [[]],
  ofArrayOfNumbers: [[Number]],
  nested: {
    stuff: { type: String, lowercase: true, trim: true }
  },
  map: Map,
  mapOfString: {
    type: Map,
    of: String
  }
});

module.exports = mongoose.model('Project', projectSchema);
```
<br>

#### 2. Promise(async,await)와 콜백을 자유자재로 사용가능

mongoose API 결과를 Promise로 처리할수 있고, 콜백으로도 처리할 수 있다.<br>
Promise로 처리하는 경우, API return 값이 Promise인지 Query인지 확인하여 처리한다.<br>

[mongoose Model.create()](https://mongoosejs.com/docs/api.html#model_Model.create)는 Promise를 리턴한다.
```js
try {
    await translateModel.create({
        uid: req.body.name,
        languages: req.body.languages,
        baseLang: constants.BASE_LANGUAGE,
        updateDate: 0
    });
    return res.send({code: 'ok'});
} catch (err) {
    return next(err);
}
```
<br>

[mongoose Queries](https://mongoosejs.com/docs/queries.html) API들은 Query를 리턴한다.<br> 
exec()을 붙여서 Query를 Promise로 바꿔준다.
```js
try {
  const regPattern = `^${project.uuid}(.)+`;  
  const regEx = new RegExp(regPattern);
  const curTranslates = await translateModel.find({ uid: regEx }).exec();
  return res.send({code: 'ok', data: curTranslates});
} catch (err) {
  return next(err);
}
```
<br>

#### 3. 쿼리 빌더 지원
mongoose에서 지원하는 쿼리 빌더를 통해 쉽게 쿼리를 만들 수 있다.

```js
// With a JSON doc
Person.
  find({
    occupation: /host/,
    'name.last': 'Ghost',
    age: { $gt: 17, $lt: 66 },
    likes: { $in: ['vaporizing', 'talking'] }
  }).
  limit(10).
  sort({ occupation: -1 }).
  select({ name: 1, occupation: 1 }).
  exec(callback);

// Using query builder
Person.
  find({ occupation: /host/ }).
  where('name.last').equals('Ghost').
  where('age').gt(17).lt(66).
  where('likes').in(['vaporizing', 'talking']).
  limit(10).
  sort('-occupation').
  select('name occupation').
  exec(callback);
```
 