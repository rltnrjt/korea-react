## 1. 게시판 api 연동
- Board 컴포넌트에서 서버 api 연동하기 
## api 경로 
- api 도메인 : https://sell-books.shop
- base uri :  /api/v1/boards
## 2. 게시판 기능 설명 
1. 게시글 목록 (페이지가 존재 )
2. 게시글 등록 (모달 창 존재)
3. 게시글 상세보기 (페이지 새로 생성)
4. 게시글 수정 (상세보기에서 처리)
5. 게시글 삭제 (상세보기 또는 리스트 체크박스로 처리)

## 3. API 연동
 
### 3.1 게시글 목록 가져오기 
- endpoint : /api/v1/boards
- method : get
- parameter 
    - page : 이동할 페이지 번호
    - size : 한페이지에 보여줄 목록 개수 (default > 10 개)
- data 양식
```
{  
  "code": 200,
  "data": [
    {
      "boardId": 21,
      "title": "운영자에게 문의하는 방법",
      "writer": "관리자",
      "readCount": 95,
      "createAt": "2026-05-20T14:20:00"
    },
  ],
  "page": 0,
  "size": 10,
  "totalElements": 0,
  "totalPages": 0,
  "first": true,
  "last": true
}
```
- 제목을 클릭하면 게시글 상세 페이지로 이동

### 3.2 게시글 상세 페이지 
- endpoint : /api/v1/boards/{boardId}
- method : get
- data 양식
```
{  
  "code": 200,
  "data": 
    {
      "boardId": 21,
      "title": "운영자에게 문의하는 방법",
      "contents" : "내용",
      "writer": "관리자",
      "readCount": 95,
      "createAt": "2026-05-20T14:20:00"
    }
}
```
- 페이지는 BoardDetail.jsx 컴포넌트 생성
- 디자인은 간단하게 작성해줘 
    - 제목, 글쓴이, 조회 수, 글내용 이 표시
    - 수정(녹색계열), 삭제(붉은색 계열), 목록(회색계열) 버튼 표시
    - 수정버튼 누르면 수정 이벤트발생
    - 목록버튼 누르면 게시글 리스트 화면으로 이동

#### 3.2.1 게시글 수정
- 수정버튼을 누르면 진행
- 비 로그인 시에는 보이지 않는다

- endpoint : /api/v1/boards/{boardId}
- method : patch
- 서버 전송 Data 양식
```
{  
  "code": 200,
  "data": 
    {
      "title": "운영자에게 문의하는 방법",
      "contents" : "내용"
    }
}
```
- 결과 data 양식
{
    "code": 200,
    "message" : "수정되었습니다"
}

### 3.2.2 게시글 삭제
- 수정버튼을 누르면 진행
- 비 로그인 시에는 보이지 않는다

- endpoint : /api/v1/boards
- method : delete
- parameter : boardids=10 
{
    "code": 200,
    "message" : "삭제되었습니다"

}

### 게시글 등록하기
- 글쓰기 버튼을 누르면 진행
- 비 로그인 시에는 보이지 않는다

- endpoint : /api/v1/boards/{boardId}
- method : post
- 서버 전송 Data 양식
```
{  
  "code": 200,
  "data": 
    {
      "title": "운영자에게 문의하는 방법",
      "contents" : "내용"
    }
}
```
- 결과 data 양식
{
    "code" : 200,
    "message" : "수정되었습니다"
}
### 3.4. 게시글 목록 화면에서 삭제
- 수정버튼을 누르면 진행
- 비 로그인 시에는 보이지 않는다
- 체크박스를 선택 후 삭제 버튼을 누르면 진행
- 체크박스를 선택하지 않고 삭제버튼을 누르면 삭제할 게시글을 선택하십시오. 출력
- 삭제를 진행하기 전에  "선택된 게시글들을 정말 삭제하시겠습니까? " 팝업 후 OK 누르면 삭제 진행

- endpoint : /api/v1/boards
- method : DELETE
- parameter : boardIds=10,11,12
- 결과 data 양식
{
    "code": 200,
    "message" : "삭제되었습니다."
}
