# 개발 완료
`1. 사용자단`
- `1.` 목록(계층형-답변형) (계속 updagrade 예정)
- `2.` 글 상세 보기
- `3.` 조회 수 증가 (글 상세페이지에서 새로고침을 해도 증가되지 않고 오로지 글 목록에서 클릭했을때만 증가함)
- `4.` 게시판 글 수정
- `5.` 게시판 답변 기능
- `6.` 회원가입(아이디 중복 체크 - 예정)
- `7.` 로그인, 로그아웃
- `8.` 게시판 Pagenation
- `9.1.` 에디터 추가(ckeditor5) - CDN
- `9.2.` 에디터 이미지 업로드


`2. 관리자단`


## 개발 진행 & 개발 예정
`1. 사용자 기능`
- 회원가입(아이디 중복 체크)
- 정보수정

- 게시판 검색
- 게시판 글쓰기 (첨부파일) - multer
- 게시판 삭제(상세페이지, 목록) - 첨부파일이 있으면 같이 삭제 처리
- 첨부파일 다운로드
- comment 기능 (참고: https://binaryjourney.tistory.com/22)
- 아이디 찾기 / 비번 초기화
- 게시글에 좋아요 (카운트)
- 게시판 히스토리(CRUD...)
- 출석(캘린더)
- 포인트 기능(로그인 출첵 포인트, 캘린더 출첵 포인트)
- 포인트 사용 기능(실제로 사용한다는 가정하에 진행 (시용포인트 입력방식))
- 일정관리

`2. 관리자 기능`
- 로그인(관리자)
- 로그인 정보수정
- 회원 관리(CRUD)
- 게시판 관리(CRUD, 답변, 좋아요)
- 포인트 관리(포인트 가감)
- 메일발송

`3. 공통 기능`
- 공통단 만들기
- Tansaction 처리
- Calendar




# 진행 상황
`1 개발 완료`
`1.` 

`2 개발 예정`
`1.` 회원가입
`2.` 로그인
`3.` 게시판
`3-1.` 게시판 글 목록
`3-2.` 게시판 글 읽기
`3-2.` 게시판 글 수정
`3-3.` 게시판 글 쓰기(계층형)
`3-4.` 게시판 첨부파일 등록, 삭제
`3-5.` 게시판 좋아요, 조아요 취소
`3-5.` 게시판 댓글 목록
`3-6.` 게시판 댓글 쓰기
`3-7.` 게시판 댓글 삭제
`3-8.` 게시판 히스토리(CRUD...)



`3` 관리자 기능

`4` 공통 기능

## react-express, nodejs, ejs
1. npx create-react-app react-site-ejs
2. npm install ejs express dotenv axios body-parser mysql --save
3. npm install --save-dev nodemon
4. npm install --save react-router-dom
5. npm install --save bcrypt				//비밀번호 암호화
6. npm install --save express-session		//세션
7. npm install --save express-fileupload 	//첨부파일 (https://www.youtube.com/watch?v=hyJiNTFtQic)
8. npm install --save fs mime iconv-lite	//파일 다운로드 관련 3총사
9. npm install --save connect-flash
10. npm install --save uuid		//파일 업로드 유니크
10. npm install --save path




5. npm install pagination-react-js			//pagination - 사용 안함 - uninstall





6. npm install concurrently --save
7. 

### 참고 동영상
https://www.youtube.com/watch?v=2jwnbZKc66E&list=PLSK4WsJ8JS4cQ-niGNum4bkK_THHOizTs&index=1
(우리밋 1~44)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**
