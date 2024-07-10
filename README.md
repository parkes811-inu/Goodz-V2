<div align=center>
<img alt="logo" src="https://github.com/Dozzykim/GoodZ/blob/main/img/logo-s.png">
</div>

# 👟GOODZ - React REST API
> 개발기간: 2024.06.26 ~ 2024.07.05

<br>

## 프로젝트 소개
- GOODZ는 유저들이 한정판 중고상품을 사고 팔고, 최신트렌드와 일상을 공유할 수 있는 플랫폼으로, <br>
  동일한 플랫폼인 크림을 벤치마킹하여 개발하였습니다.
- 자정을 기준으로, 일정 기준에 따라 인기도를 측정하여 상품의 가격이 변동됩니다.
- 유저는 마음에 드는 상품을 관심 저장하여 마이페이지에 저장할 수 있습니다.
- 전체 스타일 조회를 통해 다른 유저들의 게시글을 구경할 수 있습니다.
- 다양한 유저들을 팔로우하며, 마음에 드는 게시글에 좋아요/관심을 누르거나 댓글을 작성할 수 있습니다.
<br>

## 이전 프로젝트와의 차이점
- 기존 MVC 패턴에서 **클라이언트-서버 아키텍처로 전환**하였습니다. 이 과정에서 프론트엔드는 **React를 도입**하여 구현하였습니다.
    - 서버 측 - SpringBoot 사용
        - 컨트롤러의 요청경로를 RESTful API 방식으로 재구성하였습니다.
        - 응답 형식을 HTML 뷰에서 JSON 데이터로 변경하여 클라이언트와 서버 간 데이터 교환이 가능하도록 하였습니다.
    - 클라이언트 측 - React
        - 데이터를 상태로 관리하고, useState, useEffec를 활용해 fetch 및 업데이트합니다.

<br>

## 팀원 구성
<div align="center">

| **박은서** | **김도희** | **전나연** | **이정용** |
| :------: |  :------: | :------: | :------: |
| [<img src="https://avatars.githubusercontent.com/u/75926505?v=4" height=150 width=150> <br/> @parkes811-inu](https://github.com/parkes811-inu) | [<img src="https://avatars.githubusercontent.com/u/106290302?v=4" height=150 width=150> <br/> @Dozzykim](https://github.com/Dozzykim) | [<img src="https://avatars.githubusercontent.com/u/107173330?v=4" height=150 width=150> <br/> @Nayeoonn](https://github.com/Nayeoonn) | [<img src="https://avatars.githubusercontent.com/u/160222470?v=4" height=150 width=150> <br/> @somsomso](https://github.com/somsomso) |

</div>

<br>

## 1. 개발환경
- 사용언어: Java, HTML/CSS, JavaScript
- 프레임워크: SpringBoot, Spring Securtiy, Spring Batch
- 라이브러리: Lombok, MyBatis, Bootstrap, Chart.js, Oauth2, Spring DevTools, React
- 데이터베이스: MySQL
- 협업툴: Github, Trello, Notion

<br>

## 2. 프로젝트 구조
<div align="center">
  <img src="https://github.com/Dozzykim/GoodZ/blob/7e0a6600fbaecab84ab1ff9bd17ebecf24146e5d/img/project-structure-user.JPG" alt="프로젝트구조-사용자" width="550">
  <img src="https://github.com/Dozzykim/GoodZ/blob/7e0a6600fbaecab84ab1ff9bd17ebecf24146e5d/img/project-structure-admin.JPG" alt="프로젝트구조-관리자" width="550">
</div>

<br>

## 3. 담당 기능 - SNS 커뮤니티
- 👥팔로우 기능
- ❤️📌좋아요 & 관심 저장 기능
- 🔎실시간 검색 기능
- 📄게시글 CRUD
- 🗨️댓글 조회/등록/삭제

<br>

## 4. 기능 자세히 보기
### 👥팔로우 기능

- 유저 간의 교류를 증진시키기 위해 비동기 요청을 활용하여 팔로우 기능을 구현했습니다.
1. **프로필화면 팔로워/팔로잉 정보 표시**
    - **상태관리** : useState를 사용하여 팔로워/팔로잉 목록을 상태로 관리합니다. useEffec를 활용해 컴포넌트 마운트 시 서버로부터 팔로워/팔로잉 목록을 비동기로 각각 요청합니다.
    - **응답 처리**:  받아온 데이터로 상태를 업데이트하여 팔로워/팔로잉 수와 목록을 동적으로 표시합니다.
    
2. **팔로우 버튼 동적 처리**
    - **로그인 상태에 따른 버튼 표시 로직**
        - 로그인 유저인 경우 팔로잉 여부에 따라 ‘팔로우’/’팔로잉’ 텍스트 및 스타일을 달리 표시합니다.
        - 비로그인 유저인 경우, 항상 ‘팔로우’ 버튼을 표시합니다.
    - **구현 방법**: 서버에서 프로필 유저의 팔로워/팔로잉 목록 조회 후 로그인 유저의 팔로잉 계정과 비교하여 Users DTO에 팔로우 여부를 boolean 타입의 멤버변수에 저장하여 반환합니다.
    해당 변수를 체크하여 팔로우 버튼을 동적으로 표시합니다.
    
3. **팔로우/언팔로우 동작**
    - **요청 구분**: 버튼 클릭 시 호출되는 handleFollow 함수에 아이디와  팔로우 여부가 담긴 boolean 타입의 멤버변수를 인자로 전달합니다. 해당 인자의 값에 따라 follow 모듈을 사용하여 서버에 axios 비동기 요청으로 팔로우/언팔로우 요청을 보냅니다.
    - **응답 처리**: 서버로부터 처리성공 여부 응답에 따라 프로필 정보와 팔로우 상태를 재 요청하여 실시간으로 업데이트 합니다.
<img src="https://github.com/Dozzykim/GoodZ/blob/3b837b4670db883639029f54312e2080f3cfef86/img/follow.gif" alt="팔로우기능" width="700">
<br><br>

### ❤️📌좋아요 &관심 기능
- 커뮤니티를 활성화시키고 마음에 드는 게시글/상품을 저장하여 따로 조회할 수 있는 편리함을 제공하기 위해 비동기 요청을 활용하여 좋아요 및 관심 기능을 구현했습니다.
  
1. **좋아요/관심 버튼 동적 처리**:
    - **상태관리**:
        - React의 useState와 useContext를 활용하여 좋아요/관심 상태를 관리합니다.
        - 각 게시물/상품의 좋아요/관심 상태를 개별적으로 추적합니다.
    - **조건부 렌더링**:
        - 로그인 상태에 따라 버튼의 기능과 표시를 다르게 처리합니다.
        - svg 아이콘의 fill 속성을 동적으로 변경하여 좋아요/관심 상태를 시각적으로 표현합니다.

2. **비동기 상태 업데이트**
    - **이벤트 핸들링**:
        - handleLike와 handleWish 함수를 구현하여 버튼 클릭 이벤트를 처리합니다.
        - 사용자ID, 게시물/상품 번호, 현재 상태를 매개변수로 받아 처리합니다.
    - **API 통신 모듈:**
        - like와 wish 모듈을 사용하여 서버에 좋아요/관심 상태 변경 요청을 보냅니다.
        - 비로그인 사용자의 경우, 로그인 페이지로의 리다이렉트 로직을 구현했습니다.
    - **상태 업데이트** :
        - 서버 응답에 따라 클라이언트의 상태를 즉시 업데이트하여 UI에 반영합니다.
        
2. **재사용 가능한 컴포넌트**
    - BtnLike와 BtnWish 컴포넌트를 별도로 구현하여 코드의 재사용성과 유지보수성을 높였습니다.
    - 각 컴포넌트는 필요한 props를 받아 독립적으로 동작하며, 상위 컴포넌트의 상태 관리 로직과 연동됩니다.
<img src="https://github.com/Dozzykim/GoodZ/blob/878b394cbba235aa8faf7c73d110387544087b19/img/like%26wish.gif" alt="좋아요/관심기능" width="700">
<br><br>

### 🔎실시간 검색 기능(게시글 작성 - 상품태그)

- 게시글에 상품을 태그함으로써 유저 간 정보교류를 활발히 만들며, 자연스럽게 상품 홍보 및 구매로 이어지도록 했습니다. ajax 비동기 요청을 활용하여 실시간 검색기능을 개발했습니다.
1. **키워드 검색**
    - **키워드 입력**: 사용자가 입력한 키워드가 3글자 이상인 경우, 입력이 감지될 때마다 비동기 요청을 통해 서버에 요청을 보냅니다.
    - **응답 처리**: 서버 사이드 렌더링된 searchedItem.html을 응답받아 검색 모달에 목록을 표시합니다.
<br><br>

  ### 📄 게시글 CRUD
<details>
<summary>1. 게시글 작성 </summary>
  
- **이미지 첨부**
  - 이미지를 첨부하면 하단에 첨부한 이미지가 미리보기로 보여집니다.
  - 대표 이미지 선택 기능이 있어 게시글 노출 시 보여질 이미지를 선택하도록 구현하였습니다.

- **상품태그**
  - **검색**:  브랜드/상품명 검색 (비동기 요청. 응답으로 받아온 검색 상품목록을 상태로 관리)
  - **추가**: 이벤트 핸들러를 통해 클릭을 감지하여 함수에 상품정보가 인자로 넘어와 기존의 상품목록에 추가 후 상태를 업데이트 합니다.
  - **제거**: 이벤트 핸들러를 통해 클릭을 감지하여 함수에 상품정보가 인자로 넘어와 상품 목록에서 해당 상품 제거 후 상태를 업데이트 합니다.
    
- 비동기 요청을 통해 게시글 작성 처리를 하였습니다.
  <br><br>
</details>

<details>
<summary>2. 게시글 수정</summary>
  
  - 기존 내용 및 상품태그 정보 비동이 요청으로 조회 후 세팅하였습니다.
    
  - 작성 과정과 동일하나 이미지는 수정이 불가합니다.
    
  - 비동기 요청을 통해 게시글을 수정 처리하였습니다.
 <br><br>
</details>

<details>
<summary>3. 게시글 조회</summary>
  
  - **요청** :게시글 번호 파라미터로 게시글과 종속된 댓글 목록을 비동기로 요청합니다.
    
  - **로그인 상태에 따른 기능 제어**
    - **본인 게시글**
        - 우측 버튼: 수정/삭제 버튼 활성화
    - **타인 게시글 또는 비로그인**
        - 우측 버튼: 팔로우 버튼 활성화
<br><br>
</details>

<details>
<summary>3. 게시글 삭제</summary>
  
  - **요청** : 삭제 버튼 클릭 시  게시글 번호가 인자로 넘어가, 서버에 비동기로 게시글 삭제를 요청합니다. 
    
  - **응답 처리**: 처리 성공 시, 프로필로 리다이렉트합니다.
<br><br>
</details>



### 🗨️댓글 조회/등록/삭제
- 게시글 상세 페이지에서 댓글 기능을 사용 가능합니다.
  
<details>
<summary>1. 댓글 조회</summary>
  
  - **요청**: 게시글 번호 파라미터로 종속된 댓글을 비동기로 요청합니다.
    
  - **응답 처리**: 응답받은 댓글 목록을 상태로 관리합니다.
<br><br>
</details>

<details>
<summary>2. 댓글 작성</summary>
  
  1. **비로그인 유저 이용 제한**
      - 댓글 작성 버튼 클릭 시 연결된 메서드에서 useContext로 전역에서 참조할 수 있는 로그인된 유저의 정보를 먼저 체크합니다.
      - 비로그인 시 로그인 페이지 이동 옵션 제공 → 확인 시, 로그인페이지로 리다이렉트하였습니다.
    
  2. **댓글 작성처리**
      - **요청**: 게시글 번호, 작성자 Id, 댓글 내용을 담은 데이터를 서버에 비동기 방식으로 요청하였습니다.
      - **응답 처리**: 처리 성공 시, 댓글 목록과 갯수를 갱신하며 입력창을 비워둡니다.
<br><br>
</details>

<details>
<summary>3. 댓글 삭제</summary>
  
  - 작성자만 삭제가 가능하며, 아이디 일치 여부에 따라 버튼을 활성화하였습니다.
    
  - **요청**: 삭제 버튼 클릭 시 연결된 함수에 댓글번호가 인자로 전달되어 비동기로 삭제를 요청합니다.
    
  - **응답 처리**: 처리 성공 시, 댓글목록을 재 요청하여 실시간으로 내용을 업데이트하여 보여줍니다.
<br><br>
</details>

<br><br>
### 전체 게시글
<img src="https://github.com/Dozzykim/GoodZ/blob/3b837b4670db883639029f54312e2080f3cfef86/img/allPosts.gif" alt="전체게시글" width="700">
<br><br>

### 유저 프로필
<img src="https://github.com/Dozzykim/GoodZ/blob/fbb809a14c58df99b4ae2f23080289d743100d68/img/profile.gif" alt="프로필" width="700">
<br><br>

### 게시글 상세 및 댓글
<img src="https://github.com/Dozzykim/GoodZ/blob/d1d8781b35f577fa115633412208c276d1575811/img/comment.gif" alt="게시글상세" width="700">
<br><br>

### 게시글 작성(/w 상품태그)
<img src="https://github.com/Dozzykim/GoodZ/blob/d1d8781b35f577fa115633412208c276d1575811/img/insertPost.gif" alt="게시글작성" width="700">
<br><br>

### 게시글 삭제
<img src="https://github.com/Dozzykim/GoodZ/blob/d67cdc76282b8853abc802dda04f66db90235c4b/img/deletePost.gif" alt="게시글삭제" width="700">
<br><br>

