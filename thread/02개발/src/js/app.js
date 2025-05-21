import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('https://nmaqrwjjobssxuukhuqo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tYXFyd2pqb2Jzc3h1dWtodXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3MDg3NjcsImV4cCI6MjA2MzI4NDc2N30.ZRWQJm1-kse_CzEYlSq0QaeYyRRyNaWnezm0SjD2QAA');

const fetchUser = async(id,pw) => {
    try{
        const {data} = await supabase.from("users").select().eq("user_id",id).eq("user_pw",pw);
        return data;
    }
    catch( err ){
        console.log(err);
    }}

let userInfo;

const loadUser = async(id,pw) => {
    userInfo = await fetchUser(id,pw);
    if (userInfo.length == 0) {
        alert("로그인실패");
    } else {
        localStorage.setItem("username",userInfo[0]["user_name"]);
    }
}
///////////////////////////////////////////////////////////////////////

const $app = document.getElementById("app");
const template = `
<header id="header">
    <nav id="nav">
        <ul>
            <li><a href="#/">로고</a></li>
            <li><a href="#/"><img src="./src/img/svg/homeicon.svg" alt="homeicon">홈</a></li>
            <li><a href="#/search"><img src="./src/img/svg/searchicon.svg" alt="searchicon">검색</a></li>
            <li><a href="#/notice"><img src="./src/img/svg/hearticon.svg" alt="hearticon">알림</a></li>
            <li><a href="#/post"><img src="./src/img/svg/plusicon.svg" alt="plusicon">글쓰기</a></li>
        </ul>
    </nav>
    <ul class = "user_log">
        <li><a href="#/" class = "go_mypage">${localStorage.getItem("username")}</a></li>
        <li><a href="#/login" class = "logout">로그아웃</a></li>
        <li><a href="#/login" class = "go_login">로그인</a></li>
    </ul>
</header>
<main id="main"></main>
<footer id = "footer">

</footer>
`
$app.innerHTML = template;

const $main = document.getElementById("main");

const home = () => {
    $main.innerHTML = '<p>홈</p>'
}

const search = () => {
    $main.innerHTML = '검색'
}

const notice = () => {
    $main.innerHTML = '알림'
}

const post = () => {
    $main.innerHTML = '글쓰기'
}

const signup = () => {
    $main.innerHTML = '회원가입'
}

const login = () => {
    $main.innerHTML = `
            <div class="container">
                <h3 class = "title">로그인</h3>
                <div class = "id_container">
                    <label for="id">아이디</label>
                    <input type="text" id="id">
                </div>
                <div class = "pw_container">
                    <label for="password">비밀번호</label>
                    <input type="password" id="password">
                </div>
                <button id="btn_login">로그인하기</button>
                <div class="wrap">
                    <a href="#/" class = "link_findpw">비밀번호 찾기</a>
                    <a href="#/signup" class = "link_signup">회원가입</a>
                </div>
        </div>`

    const loadLoginCSS = () => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "./src/css/login.css";
        document.head.appendChild(link);
    }

    loadLoginCSS();

    const $inpID = document.getElementById("id");
    const $inpPW = document.getElementById("password");
    const $btnLogin = document.getElementById("btn_login");

    const checkLabel = (element) => {
    if (element.value.trim() !== "") {
        element.closest("div").querySelector("label").classList.add("value_fill");
    } else {
        element.closest("div").querySelector("label").classList.remove("value_fill");
    }
};

    const checkLoginBtn = () => {
        if ($inpID.value.trim() !== "" && $inpPW.value.trim() !== "") {
            $btnLogin.classList.add("active");
        } else {
            $btnLogin.classList.remove("active");
        }
    }

    $inpID.addEventListener("input",() => checkLabel($inpID));
    $inpPW.addEventListener("input",() => checkLabel($inpPW));
    $inpID.addEventListener("input", checkLoginBtn);
    $inpPW.addEventListener("input", checkLoginBtn);

    $btnLogin.addEventListener("click",()=>{
        loadUser($inpID.value,$inpPW.value);
    });
}

//////////////////ROUTER/////////////////////////
if (!window.location.hash) {
    window.location.hash = "#/"
}

const routes = [
    { fragment: "#/", component: home },
    { fragment: "#/search", component: search },
    { fragment: "#/notice", component: notice },
    { fragment: "#/post", component: post },
    { fragment: "#/login", component: login },
    { fragment: "#/signup", component: signup }
]

const checkRoutes = () => {
    const found = routes.find(route => route.fragment == window.location.hash);
    if (!localStorage.getItem("username")) {
        window.location.hash = "#/login"
    }
    found.component();
}

window.addEventListener("hashchange", checkRoutes);
checkRoutes();
