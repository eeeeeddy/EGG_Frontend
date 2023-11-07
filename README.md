# EGG : 논문 시각화 검색 서비스

### 1. Stack

<div align=center>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<br> 
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
<img src="https://img.shields.io/badge/D3.js-F9A03C?style=for-the-badge&logo=D3.js&logoColor=white">
<img src="https://img.shields.io/badge/Kibana-005571?style=for-the-badge&logo=Kibana&logoColor=white">
<br>
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">
<img src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=Ubuntu&logoColor=white">  
</div>


### 2. WireFrame

  | Main 페이지 | Search 페이지 | Deatil 페이지 |
  |-|-|-|
  | <img src="https://github.com/eeeeeddy/Final_Frontend/assets/71869717/573d3c0c-08a4-40d8-8b64-fcf00b8e1cb1" width="200" height="100"/> |  <img src="https://github.com/eeeeeddy/Final_Frontend/assets/71869717/c83e4c93-ce24-4001-85e8-d8ccf9e2f952" width="200" height="100"> | <img src="https://github.com/eeeeeddy/Final_Frontend/assets/71869717/c83e4c93-ce24-4001-85e8-d8ccf9e2f952" width="200" height="100"> |

### 3. Project Architecture

```
├── README.md
├── .github/workflows
│    ├── deploy.yml
│    └── npm-publish.yml
├── .vscode
├── .env
├── .gitignore
├── Server.js
├── appspec.yml
├── deploy.sh
├── package-lock.json
├── package.json
│
├── public
│    ├── index.html
│    ├── EGG_logo.ico
│    └── Main.png
│
└── src
     ├── css
     │     ├── App.css
     │     ├── Author.css
     │     ├── Dashboard.css
     │     ├── Detail.css
     │     ├── History.css
     │     ├── index.css
     │     ├── Main.css
     │     ├── SavePaper.css
     │     └── Search.css
     ├── data
     │     ├── data.json 
     │     └── Institution.json
     ├── umm
     │     ├── logo.sgv
     │     ├── reportWebVitals.js
     │     └── setUpTests.js
     ├── About.js
     ├── App.js
     ├── Author.js
     ├── AxiosConfig.js
     ├── Dashboard.js
     ├── Detail_FilterTest.js
     ├── Detail.js
     ├── History.js
     ├── index.js
     ├── Login.js
     ├── Main.js
     ├── MainNavbar.js
     ├── Pricing.js
     ├── SavePaper.js
     ├── Search.js
     ├── SignUp.js
     └── UserContext.js
```

### 4. Role

- **UI/UX**
    - 공동 작업 (이승윤, 장수현)
- **이승윤**
    - **기능**
        - 논문, 저자 연관 관계 시각화
            - 네트워크 그래프 생성
            - 그래프 필터링 기능
            - 사용자 상호작용 기능 (zoom, drag 등)
        - Kibana 대시보드 구성 및 연동
            - Article 대시보드
            - Author 대시보드
            - Institution 대시보드
                - 기관별 필터링 기능
        - CI/CD 구성
            - AWS EC2 배포
- **장수현**
    - **기능**
        - 회원 기능
            - 회원 가입 유효성 및 중복성 검사
            - 로그인 유효성 및 중복성 검사
            - History 페이지
            - Save 페이지
        - 검색 결과 PDF Export 기능

### 5. Detail

페이지 별 사진 및 상세 사진 추가 예정