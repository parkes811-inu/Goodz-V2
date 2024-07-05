### 굿즈 프로젝트 필요한 라이브러리 

## 필수 라이브러리 설치
npm install react-router-dom
npm install axios
npm install js-cookie@^3.0.5

## sweetalert2
npm install sweetalert2
npm install sweetalert2-react-content

## 기본 방식의  bootstrap
npm install bootstrap

## 날짜 포맷
npm install date-fns
사용방법: 임포트 후 자바코드처럼 new Date()로 객체 생성 후 format(생성한객체, '원하는 날짜 포맷') 입력하면 됨.
예시:
```
import { format } from 'date-fns';

const MyComponent = () => {
  const now = new Date();
  return <div>{format(now, 'yyyy-MM-dd HH:mm:ss')}</div>;
}

```



# ####################### 쓸지 말지 모르겠웡 #######################
# 라이브러리 설치
## 리액트 컴포넌트 기반의 bootstrap
npm install react-bootstrap


# props 타입을 검사하는 데 사용되는 라이브러리
npm install prop-types
