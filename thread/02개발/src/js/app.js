import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('https://nmaqrwjjobssxuukhuqo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tYXFyd2pqb2Jzc3h1dWtodXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3MDg3NjcsImV4cCI6MjA2MzI4NDc2N30.ZRWQJm1-kse_CzEYlSq0QaeYyRRyNaWnezm0SjD2QAA');

const fetchUser = async (id, pw) => {
    try {
        let query = supabase.from("users").select()
        if (id) query = query.eq("user_id", id);
        if (id && pw) query = query.eq("user_id", id).eq("user_pw", pw);

        const { data } = await query;
        return data;
    }
    catch (err) {
        console.log(err);
    }
}

let userInfo;

const loadUser = async (id, pw) => {
    userInfo = await fetchUser(id, pw);
    if (userInfo.length == 0) {
        alert("로그인실패");
    } else {
        console.log(userInfo)
        localStorage.setItem("username", userInfo[0]["user_name"]);
        window.location.hash = "#/"
        checkRoutes();
        userInfo = null;
    }
}

const DBIDCheck = async (id) => {
    userInfo = await fetchUser(id);
    if (userInfo.length == 0) {
        alert('아이디 사용 가능');
        return false;
    } else {
        alert('아이디 사용 불가능');
        return true;
    }
}
///////////////////////////////////////////////////////////////////////

const App = () => {
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
        <li class = "go_mypage logout"><a href="#/">${localStorage.getItem("username")}</a></li>
        <li class = "go_logout logout"><a href="#/login">로그아웃</a></li>
        <li class = "go_login login"><a href="#/login">로그인</a></li>
    </ul>
</header>
<main id="main"></main>
<footer id = "footer">

</footer>
`
    $app.innerHTML = template;
}

App();

const $userName = document.querySelector(".go_mypage a");
const logoutUser = () => {
    localStorage.removeItem("username");
    $userName.textContent = '';
    window.location.hash = "#/login";
    checkRoutes();
}

const $goLogout = document.querySelector(".go_logout");
$goLogout.addEventListener("click", logoutUser);

const updateUserLogUI = () => {
    const $logout = document.querySelectorAll(".logout");
    const $login = document.querySelector(".login");
    if (localStorage.getItem("username")) {
        $logout.forEach((e) => e.classList.add("log_active"));
        $login.classList.remove("log_active");
        $userName.textContent = localStorage.getItem("username");
    } else {
        $logout.forEach((e) => e.classList.remove("log_active"));
        $login.classList.add("log_active");
    }
}

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
    $main.innerHTML = `<div class="container">
    <h3 class="title">회원가입</h3>
    <div class="id_container wrap">
        <label for="id">아이디 (영문, 숫자 포함 6글자 이상)</label>
        <input type="text" id="id">
        <button id="check_id">중복확인</button>
    </div>
    <div class="wrap">
        <label for="password">비밀번호 (영문, 숫자 포함 6글자 이상)</label>
        <input type="password" id="password">
    </div>
        <div class="wrap">
        <label for="check_password">비밀번호 재확인</label>
        <input type="password" id="check_password">
    </div>
    <div class="wrap">
        <label for="name">이름</label>
        <input type="text" id="name">
    </div>
    <div class="wrap">
        <label for="phonenumber">전화번호 (숫자만 입력)</label>
        <input type="text" id="phonenumber">
    </div>
    <button id="btn_signup">회원가입하기</button>
    </div>`

    const $signupInpID = document.getElementById("id");
    const $signupInpPW = document.getElementById("password");
    const $signupBtnCheckID = document.getElementById("check_id");
    const $signupInp = document.querySelectorAll(".wrap input");
    const $signupBtn = document.getElementById("btn_signup");
    const $signupInpCheckPW = document.getElementById("check_password");
    let IDValid = false;
    let PWValid = false;
    let PWCheckValid = false;

    const validateIDPW = (input) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return regex.test(input);
    };

    const updateInputState = (input, isFocus = false) => {
        const isValid = validateIDPW(input.value);
        const label = input.closest("div").querySelector("label");

        if (isFocus && input.value.trim() == '') {
            input.classList.add("inp_wrong");
            label.classList.add("label_wrong");
            return false;
        } else {
            if (input.value.trim() == '') {
                input.classList.remove("inp_correct", "inp_wrong");
                label.classList.remove("label_correct", "label_wrong");
                return false;
            } else if (!isValid) {
                input.classList.add("inp_wrong");
                label.classList.add("label_wrong");
                input.classList.remove("inp_correct");
                label.classList.remove("label_correct");
                return false;
            } else {
                input.classList.add("inp_correct");
                label.classList.add("label_correct");
                input.classList.remove("inp_wrong");
                label.classList.remove("label_wrong");
                return true;
            }
        }
    };

    $signupInpID.addEventListener("focus", (e) => updateInputState(e.target, true));
    $signupInpID.addEventListener("blur", (e) => updateInputState(e.target));
    $signupInpID.addEventListener("input", (e) => updateInputState(e.target, true));
    $signupInpPW.addEventListener("focus", (e) => PWValid = updateInputState(e.target, true));
    $signupInpPW.addEventListener("blur", (e) => PWValid = updateInputState(e.target));
    $signupInpPW.addEventListener("input", (e) => PWValid = updateInputState(e.target, true));
    
    const checkPW = (isFocus = false) => {
        if(isFocus && $signupInpCheckPW.value.trim() == ""){
            $signupInpCheckPW.classList.add("inp_wrong");
            $signupInpCheckPW.closest("div").querySelector("label").classList.add("label_wrong");
            return false;
        } else{
            if($signupInpCheckPW.value.trim() == ""){
                $signupInpCheckPW.classList.remove("inp_correct", "inp_wrong");
                $signupInpCheckPW.closest("div").querySelector("label").classList.remove("label_correct","label_wrong");
                return false;
            } else if ($signupInpPW.value != $signupInpCheckPW.value){
                $signupInpCheckPW.classList.remove("inp_correct");
                $signupInpCheckPW.closest("div").querySelector("label").classList.remove("label_correct");
                $signupInpCheckPW.classList.add("inp_wrong");
                $signupInpCheckPW.closest("div").querySelector("label").classList.add("label_wrong");
                return false;
            } else{
                $signupInpCheckPW.classList.add("inp_correct");
                $signupInpCheckPW.closest("div").querySelector("label").classList.add("label_correct");
                $signupInpCheckPW.classList.remove("inp_wrong");
                $signupInpCheckPW.closest("div").querySelector("label").classList.remove("label_wrong");
                return true;
            }
        }
    }
    
    $signupInpCheckPW.addEventListener("input",() => PWCheckValid = checkPW(true));
    $signupInpCheckPW.addEventListener("focus",() => PWCheckValid = checkPW(true));
    $signupInpCheckPW.addEventListener("blur",() => PWCheckValid = checkPW());

    const signupFillID = () => {
        if (validateIDPW($signupInpID.value)) {
            $signupBtnCheckID.classList.add("fill_id");
            $signupBtnCheckID.disabled = false;
        } else {
            $signupBtnCheckID.classList.remove("fill_id");
            $signupBtnCheckID.disabled = true;
        }
    };

    const signupCheckLabel = (element) => {
        if (element.value.trim() !== "") {
            element.closest("div").querySelector("label").classList.add("value_fill");
        } else {
            element.closest("div").querySelector("label").classList.remove("value_fill");
        }
    };

    const checkSignupBtn = () => {
        $signupInp.forEach(e => {
            if (e.value.trim() !== "") {
                $signupBtn.classList.add("fill_id");
            } else {
                $signupBtn.classList.remove("fill_id");
            }
        }
        )
    };

    const signupCheckID = async () => {
        IDValid = await DBIDCheck($signupInpID.value);
        if (IDValid) {
            $signupInpID.value = '';
            signupFillID();
            signupCheckLabel($signupInpID);
        }
    };

    $signupInp.forEach(e => e.addEventListener("input", () => {
        signupCheckLabel(e);
        checkSignupBtn(e);
    }));
    $signupBtnCheckID.addEventListener("click", signupCheckID);
    $signupInpID.addEventListener("input", signupFillID);
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

    const $loginInpID = document.getElementById("id");
    const $loginInpPW = document.getElementById("password");
    const $btnLogin = document.getElementById("btn_login");

    const loginCheckLabel = (element) => {
        if (element.value.trim() !== "") {
            element.closest("div").querySelector("label").classList.add("value_fill");
        } else {
            element.closest("div").querySelector("label").classList.remove("value_fill");
        }
    };

    const checkLoginBtn = () => {
        if ($loginInpID.value.trim() !== "" && $loginInpPW.value.trim() !== "") {
            $btnLogin.classList.add("active");
            $btnLogin.disabled = false;
        } else {
            $btnLogin.classList.remove("active");
            $btnLogin.disabled = true;
        }
    };

    $loginInpID.addEventListener("input", () => loginCheckLabel($loginInpID));
    $loginInpPW.addEventListener("input", () => loginCheckLabel($loginInpPW));
    $loginInpID.addEventListener("input", checkLoginBtn);
    $loginInpPW.addEventListener("input", checkLoginBtn);

    $btnLogin.addEventListener("click", () => {
        if ($loginInpID.value.trim() !== "" && $loginInpPW.value.trim() !== "") {
            loadUser($loginInpID.value, $loginInpPW.value);
        }
    });
}

//////////////////ROUTER/////////////////////////
if (!window.location.hash) {
    window.location.hash = "#/"
};

const routes = [
    { fragment: "#/", component: home },
    { fragment: "#/search", component: search },
    { fragment: "#/notice", component: notice },
    { fragment: "#/post", component: post },
    { fragment: "#/login", component: login },
    { fragment: "#/signup", component: signup }
];

const loadCSS = (h) => {
    if (!document.querySelector(`link[href="./src/css/reset.css"]`)) {
        const resetCSS = document.createElement("link");
        resetCSS.rel = "stylesheet";
        resetCSS.href = `./src/css/reset.css`;
        document.head.appendChild(resetCSS);
    }
    if (!h) return;
    if (!document.querySelector(`link[href="./src/css/${h}.css"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `./src/css/${h}.css`;
        document.head.appendChild(link);
    }
};

const removeCSS = () => {
    const existingCSS = document.querySelectorAll("link[href^='./src/css/']");
    existingCSS.forEach(css => {
        if (css.href.includes("reset.css")) return;
        css.parentNode.removeChild(css);
    });
};

const checkRoutes = () => {
    const found = routes.find(route => route.fragment == window.location.hash);
    if (!localStorage.getItem("username") && window.location.hash !== "#/signup") {
        window.location.hash = "#/login"
        found.component();
        loadCSS(found.fragment.substring(2));
    }
    if (found) {
        found.component();
        removeCSS();
        loadCSS(found.fragment.substring(2));
    }
    updateUserLogUI();
};

window.addEventListener("hashchange", checkRoutes);
checkRoutes();
