# NodeJS 파일 읽기 및 쓰기에 필요한 모든 내용
 
***

#### 1. file system 모듈

 - fs 모듈을 통해 파일 읽기, 쓰기 등 여러가지 파일제어 기능들을 사용할 수 있다.
 - NodeJS에서 기본적인 파일 읽기, 쓰기 코드를 확인해본다.
 
    
        var fs = require('fs');
        
        //동기적 방식 파일 읽기
        try {
            var data = fs.readFileSync('./credential.txt', 'utf8');
            console.log(data);
        } 
        catch (err) {
            console.log(err);
        }
        
        //동기적 방식 파일 쓰기
        try {
            fs.writeFileSync('./credential.txt', 'Hello world', 'utf8');
            console.log('success');
        }
        catch (err) {
            console.log(err);
        }
        
        //비동기적 방식 파일 읽기
        fs.readFile('./credentail.txt', 'utf8', function(err, data) {
            if (err) {
                //파일 읽기 실패
                console.log(err);
            } else {
                //파일 읽기 성공
                console.log(data);
            }
        });
        
        //비동기적 방식 파일 쓰기
        fs.writeFile('./credential.txt', 'Hello world', 'utf8', function(err, data) {
            if (err) {
                //파일 쓰기 실패
                console.log(err);
            } else {
                //파일 쓰기 성공
                console.log('success');   
            }
        });

.        
        
#### 2. file read & write stream

 - nodejs의 stream을 통해서 파일의 모든 내용을 메모리에 버퍼로 잡지않고서, client에게 스트리밍 해줄 수 있다.
 - nodejs에는 4가지 기초 스트림 타입이 있다. (Readable, Writable, Duplex, Transform)
 - pipe를 통해서 읽기 가능한 스트림과 쓰기 가능한 스트림을 연결 할 수 있다.
 - 읽기 가능한 스트림에는 data 이벤트, end 이벤트가 존재한다.
 - 쓰기 가능한 스트림에는 drain 이벤트, finish 이벤트가 존재한다.
 
        
        /* Client요청에 Streaming으로 파일 전송하기 */
        app.route('/stringXlsx').get(function (req, res) {
            //전송할 파일명을 string.xlsx로 설정한다.
            res.writeHead(200, {
                "Content-Disposition": "attachment;filename=" + 'string.xlsx'
            });
            // './string.xlsx' 파일을 읽어오는 Readable stream을 res로 연결한다.
            // 서버에서의 response는 쓰기 가능한 스트림이다. 반대로, 클라이언트에서는 읽기 가능한 스트림이 된다.
            var readStream = fs.createReadStream('./string.xlsx');
            readStream.pipe(res);
        });
 
        
        /* Writable Stream에 data 쓰기 */ 
        // 쓰기 스트림을 생성한다. 쓰기 대상 파일명은 './locale-ja.json'
        var writeFile = fs.createWriteStream('./locale-ja.json');
        // JSON을 사람이 읽기 편한 형태로 stringify한다.
        var str = JSON.stringify(strJson, null, 2);
        // 쓰기 스트림에 str을 쓴다.
        writeFile.write(str, function () {
            // Callback for when this chunk of data is flushed 
            console.log('write Finish');
            var readStream = fs.createReadStream('./locale-ja.json');
            readStream.pipe(res);
        });
        
        
        /* 파일을 읽어서 압축후 암호화하여 쓰기 */ 
        fs.createReadStream(file)
            .pipe(zlib.createGzip())
            .pipe(crypto.createCipher('aes192', 'a_secret'))
            .pipe(fs.createWriteStream(file + '.zz'))
            .on('finish', () => console.log('Done'));
            
        /* 위의 파일을 읽어서 복호화하고 압축해제하여 쓰기 */            
        fs.createReadStream(file)
            .pipe(crypto.createDecipher('aes192', 'a_secret'))
            .pipe(zlib.createGunzip())
            .pipe(fs.createWriteStream(file.slice(0, -3))
            .on('finish', () => console.log('Done'));

.

#### 3. form을 통한 파일 업로드 처리

 - formidable 모듈은 client로 부터 전송받는 form data를 파싱하기 위해 사용한다. 특히 file upload 처리에 유용하다.
 - Formidable.IncomingForm : 요청 분석 클래스
 - form.parse(req, function(err, fields, files){}) : 바디 분석
 - fileBegin 이벤트 : upload stream에 new file이 detected되었을 때 호출된다.
 - progress 이벤트 : 전송받는 파일의 각 chunk of data가 파싱되었을때 호출된다.
 - file 이벤트 : file이 전송되었을 때 호출된다.
 - end 이벤트 : 전체 request를 전송받고, 모든 포함된 파일이 disk에 flushing이 완료되었을 때 호출된다. 여기서 response를 보내준다.

 
        var formidable = require('formidable');
        
        app.route('/upload').post(function (req, res) {
            var form = new formidable.IncomingForm();
    
            form.parse(req);
    
            form.on('fileBegin', function (name, file) {
                //여기서 지정한 경로에 파일이 업로드된다.
                file.path = __dirname + '/string.xlsx';
            });
            
            form.on('progress', function (byteRead, byteExpected) {
                console.log(' Reading total ' + byteRead + '/' + byteExpected);
            });
    
            form.on('file', function (name, file) {
                console.log('Uploaded ' +  file.name);
            });
            
            form.on('end', function () {
                res.status(200).send('Upload complete');
            });
        });

. 
 
#### 4. .xlsx 파일 읽기

 - xlsx 모듈을 통해 .xlsx(엑셀) 파일을 읽을 수 있다.
 
 
        var xlsx = require('xlsx');
        
        var excel = xlsx.readFile('string.xlsx');
        var sheet_name_list = excel.SheetNames;
        //array 형태로 data를 반환한다.
        var xlDataArray = xlsx.utils.sheet_to_json(excel.Sheets[sheet_name_list[0]]);
        console.log(xlDataArray);

.

***

### 참조

   - file system 모듈
   
    <https://nodejs.org/api/fs.html>

   - Node.js Streams

    <https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93>

   - formidable npm

    <https://www.npmjs.com/package/formidable>

   - xlsx npm

    <https://www.npmjs.com/package/xlsx>