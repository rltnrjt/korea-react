

# 1. 로그인 처리
- 로그인 상태관리는 zustand 사용
- 새로고침 유지를 위해서 persist 사용
- 문법 간소화를 윈해서 immer 사용


# 2. 로그인 api 연동
- 로그인은 JWT 연동 처리 
- end-point : /api/v1/login
- method : POST
- content-type : application/x-www-form-urlencoded
- param
    - userId
    - passwd

- response data
```
 {
    "tokenType": "Bearer",
    "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJib29rcy1iYWNrZW5kLWFwaSIsInN1YiI6InVzZXIwMSIsImlhdCI6MTc3NzM3NzcxOCwiZXhwIjoxNzc3Mzc5NTE4fQ.tiy0BQctczFOcinNTaTnlzCvFCgRCou6M-DqaAZI5BU",
    "expiresIn": 1800,
    "userId": "user01",
    "name": "사용자1"
 }
 ```

 # 3. 로그인 프로세스
 - 아이디, 패스워드 입력 후 로그인 시도
 - 실패 시 alert 창 출력
 - 성공 시 main 페이지 호출
 - 로그인 성공 시  헤더에 로그인 버튼을 숨기고,  
   로그인 한사람 이름을 표시하고 드랍다운을 위치하여
   회원정보, 로그아웃 메뉴 표시 