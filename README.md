<div align=center>
<img alt="logo" src="https://github.com/Dozzykim/GoodZ/blob/main/img/logo-s.png">
</div>

# 👟한정판 중고거래 플랫폼 GOODZ - SpringBoot-React RESTful API
> 개발기간: 2024.05.16 ~ 2024.06.16

<br>

## 프로젝트 소개
- GOODZ는 유저들이 한정판 중고상품을 사고 팔고, 최신트렌드와 일상을 공유할 수 있는 플랫폼으로, <br>
  동일한 플랫폼인 크림을 벤치마킹하여 개발하였습니다.
- 자정을 기준으로, 일정 기준에 따라 인기도를 측정하여 상품의 가격이 변동됩니다.
- 유저는 마음에 드는 상품을 관심 저장하여 마이페이지에 저장할 수 있습니다.
- 전체 스타일 조회를 통해 다른 유저들의 게시글을 구경할 수 있습니다.
- 다양한 유저들을 팔로우하며, 마음에 드는 게시글에 좋아요/관심을 누르거나 댓글을 작성할 수 있습니다.

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
- 프레임워크: SpringBoot, Spring Securtiy, Spring Batch, 
- 라이브러리: Lombok, Thymeleaf, MyBatis, Bootstrap, Chart.js, Oauth2, Spring DevTools
- 데이터베이스: MySQL
- 협업툴: Github, Trello, Notion

<br>

## 2. 핵심기능
- 사용자 소셜로그인
- 상품 매입/판매
- 토스페이먼츠 결제모듈 API
- 가격변동 시스템
- SNS 커뮤니티

<br>

## 3. 프로젝트 구조
<div align="center">
  <img src="https://github.com/Dozzykim/GoodZ/blob/7e0a6600fbaecab84ab1ff9bd17ebecf24146e5d/img/project-structure-user.JPG" alt="프로젝트구조-사용자" width="550">
  <img src="https://github.com/Dozzykim/GoodZ/blob/7e0a6600fbaecab84ab1ff9bd17ebecf24146e5d/img/project-structure-admin.JPG" alt="프로젝트구조-관리자" width="550">
</div>

<br>

## 4. 담당 기능
### 👩‍💻 김도희
- **UI**
  - 페이지 : 유저 프로필, 게시글 작성, 게시글 수정, 게시글 상세
- **기능**
  - 게시글(/w 상품태그) CRUD, 댓글 등록/삭제, 게시글/상품 관심 저장, 게시글 좋아요, 유저 간 팔로우 기능, 유저 정보 수정처리

<br>

## 5. 페이지 기능 미리보기

### 전체 게시글
- 유저들이 게시한 모든 게시글이 조회됩니다.
- 비로그인 상태로도 조회 가능합니다.
<img src="https://github.com/Dozzykim/GoodZ/blob/3b837b4670db883639029f54312e2080f3cfef86/img/allPosts.gif" alt="전체게시글" width="700">
<br><br>


### 유저 프로필
- 유저의 프로필 화면에서는 해당 프로필계정의 팔로워/팔로잉 정보, 게시한 글들을 확인할 수 있습니다.
- 게시글 클릭 시, 각 게시글의 상세페이지로 이동합니다.
  - **본인** 프로필인 경우
    - 프로필 관리 버튼 : ⭕활성화
    - 우측 버튼: 게시글 등록 버튼 활성화 
  - **타인** 프로필인 경우
    - 프로필 관리 버튼: ❌비활성화
    - 우측 버튼: 팔로우 버튼

<img src="https://github.com/Dozzykim/GoodZ/blob/fbb809a14c58df99b4ae2f23080289d743100d68/img/profile.gif" alt="프로필" width="700">
<br><br>

### 팔로우 & 좋아요 기능
- 팔로우 기능 : 프로필 계정의 팔로워/팔로잉 정보를 모달창으로 확인할 수 있습니다.
- 조회하는 유저의 좋아요/관심에 따라 버튼이 세팅됩니다. (fill 속성 - 'none' / 'solid')
- 조회하는 유저의 팔로잉 정보에 따라 프로필 계정의 팔로워/팔로잉 목록 내의 계정 팔로우 버튼이 세팅됩니다.
- 각 버튼 클릭 시, 비동기 방식을 사용하여 on&off 정보가 DB에 저장됩니다.
<img src="https://github.com/Dozzykim/GoodZ/blob/3b837b4670db883639029f54312e2080f3cfef86/img/follow.gif" alt="팔로우기능" width="700">
<img src="https://github.com/Dozzykim/GoodZ/blob/878b394cbba235aa8faf7c73d110387544087b19/img/like%26wish.gif" alt="좋아요/관심기능" width="550">
<br><br>

### 게시글 상세 및 댓글
- 상단의 수정/삭제 버튼은 본인의 게시글인 경우에만 활성화되며, 타인의 게시글인 경우 팔로우 버튼이 활성화됩니다.
- 작성자와 관심/좋아요/댓글 버튼, 게시글에 종속된 상품태그를 확인할 수 있습니다.
- 관심/좋아요 버튼은 조회하는 유저를 기준으로 버튼의 활성화가 세팅됩니다.
- 댓글은 등록/수정 가능하며, 본인의 댓글만 삭제 가능합니다.
<img src="https://github.com/Dozzykim/GoodZ/blob/d1d8781b35f577fa115633412208c276d1575811/img/comment.gif" alt="게시글상세" width="700">
<br><br>

### 게시글 작성(/w 상품태그)
- 게시글은 필수로 이미지, 게시글 내용이 입력되어야하며, 선택사항으로 상품태그를 추가할 수 있습니다.
- 상품 검색는 3글자 이상 입력해야하며, 브랜드 혹은 상품명에 키워드가 포함된 상품들이 검색결과로 조회됩니다.
- 클릭 시 상품태그 박스에 추가가 되며, 상품태그 박스에 추가된 상품을 클릭 시 제거할 수 있습니다.
- 게시글 수정과정도 이와 같습니다.
<img src="https://github.com/Dozzykim/GoodZ/blob/d1d8781b35f577fa115633412208c276d1575811/img/insertPost.gif" alt="게시글작성" width="700">
<br><br>

### 게시글 삭제
- 게시글 삭제 버튼 클릭 시, confirm을 통해 재확인 요청을 진행합니다.
- 게시글 삭제 시, 게시글 이미지, 내용, 상품태그 뿐만 아니라 종속된 댓글까지 함께 삭제됩니다.
<img src="https://github.com/Dozzykim/GoodZ/blob/d67cdc76282b8853abc802dda04f66db90235c4b/img/deletePost.gif" alt="게시글삭제" width="700">
<br><br>


