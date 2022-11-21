# POCAZ : 아이돌 포토카드 거래 플랫폼
> IDOL PHOTO CARD A to Z.

## 프로젝트 소개
> 1. 기획 의도
#### 국내 외 아이돌 굿즈 시장이 8000억 규모 이상으로 확대되고 있는 거 알고 계신가요? 🤔 <br/><br/> 특히, 아이돌 굿즈의 '주식 시장' 이라고 불리우는 아이돌 포토카드 리셀 거래에 관심이 높아지고 있습니다. <br/><br/> 아이돌 포토카드는 [희소성 / 가격변동 / 수집욕구] 3가지 특성을 가지고 있습니다. <br/><br/> 이전과 달라진 아이돌 팬 문화와 아이돌 포토카드의 특성은 아이돌 포토카드 수집을 하나의 문화로 만들어가고 있지요. <br/><br/> 아이돌 포토카드 리셀 거래는 현재 트위터, 번개장터, 당근마켓 등에서 거래가 활발히 이루어지고 있는 추세입니다. <br/><br/> 하지만 아이돌 포토카드 리셀 거래에 전문화 되지 않는 장터들에서 거래하는 사용자의 불편함을 확인하였고, 아이돌 포토카드를 전문적으로 다루는 서비스의 필요성을 느꼈습니다. <br/><br/> 포카즈에서는 [장터, 채팅, 커뮤니티] 를 기반으로 한 자유로운 아이돌 포토카드 거래 공간을 제공함으로써 사용자에게 아이돌 포토카드에 대한 특별한 경험을 제공하고자 합니다.<br/><br/> 이제, 아이돌 포토카드 거래는 포카즈와 함께 해 주세요. 🤟🏻 <br/><br/>

> 2. 주요 기능

| 기능명 | 설명 |
| --- | --- |
| 홈 | 1. 메인 배너 (Swiper Slide) <br/> 2. 최근 게시물의 실시간 업데이트 (React Query) |
| 마이페이지 | 1. 소셜 로그인 : 구글, 트위터, 애플 (passport.js) <br/> 2. 로그인 유저 정보, 작성글 보기 |
| 장터 | 1. 검색 기능 그룹별 카테고리 <br/> 2. 판매 중인 포토카드 리스트 (React Query) <br/> 3. 포토카드 판매글 작성 (CRUD) <br/> 4. 포토카드 유효성 검증 (DB에 등록된 아티스트 포토카드와 비교 ) |
| 채팅 | 1. 장터에 올라온 판매글과 1:1 매칭 기능 (Socket.io) <br/> 2. 매칭된 대화방이 있을 시, 기존방과 연결 <br/> 3. 기존에 매칭된 대화방이 없을 시, 새로운 채팅방 개설 |
| 커뮤니티 | 1. 자유 / 자랑 카테고리 분류 <br/> 2. 인기글, 최신글 정렬 (인기는 좋아요 순으로, 최신은 날짜순) <br/> 3. 게시판 CRUD, 댓글, 대댓글, 좋아요 |

## 배포 사이트
[POCAZ.](https://slowtest.ml/)

[<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FwE3lC%2FbtrRpDSVRYY%2FRpwnF1jnYPOh43UR0oUYJK%2Fimg.png" alt="포카즈 메인" />](https://slowtest.ml/)

## 프로젝트 팀원

|김만중(BE)|김별이(FE)|문승현(BE)|배성재(BE)|🧸이호준(FE)|
|---|---|---|---|---|
|<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FzXk5q%2FbtrRnK0c4Ym%2FxEH0nCvaowTrRVbFe0rKsK%2Fimg.png" width="100"/>|<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FcqKf8T%2FbtrRn7Hv87l%2FwRCtkOKTUHhzR6OKYIYfz1%2Fimg.png" width="100"/>|<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FMgI3i%2FbtrRnKsqdTl%2FB6y0EdA3MFISYKSYrmW6R0%2Fimg.png" width="100"/>|<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FCmbsN%2FbtrRrn3xow1%2FjtL0Wl2SRkjkFRViyneFU0%2Fimg.png" width="100"/>|<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbLE0dF%2FbtrRnjIMtCL%2F5c0RgaEKfsiZnlnO7N3wK0%2Fimg.png" width="100"/>|
|[<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white&color=blue"/>](https://github.com/Ring-wdr)|[<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white&color=blue"/>](https://github.com/ByeoliKim)|[<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white&color=blue"/>](https://github.com/romingoon)|[<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white&color=blue"/>](https://github.com/sungjaebae)|[<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white&color=blue"/>](https://github.com/hozunlee)|



# 기술 스택

## 공통
| Socket.io | REST API |
| :---: | :---: |
|<img src="https://raw.githubusercontent.com/bestofjs/bestofjs-webui/dd29d40f829c2cea9cbd7ffac13a3add888e2199/public/logos/socketio.svg" alt="socket.io-icon" width="65" height="65" />|<img src="https://miro.medium.com/max/1400/1*-dbPsi8Mdqj5Y0454eGvPQ.png" alt="restapi-icon" width="65" height="65" />|
## Front-end
| JavaScript | React | React<br>Query | Zustand | Tailwind<br/>CSS | esLint | Prettier |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| <img src="https://media.tenor.com/TReUojNlZ6wAAAAi/js-javascript.gif" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/react-icon.svg" alt="icon" width="65" height="65" /> | <img alt="react-query icon" src="https://raw.githubusercontent.com/TanStack/query/9511933f258b9f87f000938d1583e2b301e3d912/media/emblem-light.svg" width="65" height="65" /> | <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FztCpz%2FbtrRmTpHPx7%2F7JVKeDV3vQSN5nfk2LvDU0%2Fimg.png" alt="icon" width="80" height="65" /> | <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1200px-Tailwind_CSS_Logo.svg.png?20211001194333" alt="tailwind icon" width="60" height="60" /> | <img src="https://techstack-generator.vercel.app/eslint-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/prettier-icon.svg" alt="icon" width="65" height="65" /> |


## Back-end
| TypeScript | Node<br/>JS | Express | MySQL | AWS | SWAGGER | Passport<br/>JS | NGiNX | PM2 |
| :---: | :---: | :---: | :---: | :---: |:---: |:---: |:---: |:---: | 
| <img src="https://techstack-generator.vercel.app/ts-icon.svg" alt="typescript icon" width="65" height="65" /> | <img alt="spring-boot logo" src="https://t1.daumcdn.net/cfile/tistory/27034D4F58E660F616" width="65" height="65" >| <img alt="security logo" src="https://www.nextontop.com/assets/img/services/web/expressjs.svg" height="65" width="65" > | <img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="icon" width="65" height="65" /> |<img src="https://techstack-generator.vercel.app/aws-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://cdn.discordapp.com/attachments/1005416392096497664/1042431974440194109/unknown.png" alt="swagger logo" width="65" height="65" /> | <img src="https://raw.githubusercontent.com/detain/svg-logos/aecbca0b533703a389211cddb0ca159a5d50553e/svg/passport.svg" alt="passport icon" width="65" height="65" /> | <img src="https://cdn.worldvectorlogo.com/logos/nginx-1.svg"  alt="nginx icon" width="65" height="65" /> | <img src="https://raw.githubusercontent.com/gilbarbara/logos/9c6e5e9ef3c297da414a4809ae9f0f56a6384e91/logos/pm2-icon.svg"  alt="nginx icon" width="65" height="65" /> 


### Communication
| Git | Github | Discord | Trello |
| :---: | :---: | :---: | :---: |
| <img alt="git logo" src="https://git-scm.com/images/logos/logomark-orange@2x.png" width="65" height="65" > | <img alt="github logo" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="65" height="65"> | <img alt="Discord logo" src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/62595384e89d1d54d704ece7_3437c10597c1526c3dbd98c737c2bcae.svg" height="65" width="65"> | <img src="https://www.vectorlogo.zone/logos/trello/trello-icon.svg"  height="65" width="65"> |

## ErDiagram

<img alt="erd" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FXfR6U%2FbtrRpqsYFBI%2FxSCwe04ZqCtSMt5O5qyEU1%2Fimg.png">

## WireFrame
[포카즈 와이어 프레임](https://byeolikim.github.io/pocaz-frame/)
