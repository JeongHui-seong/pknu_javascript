import DB from "./supabase.js";

export default class Login {
    constructor(target) {
        this.target = target;
        this.render(target);

        this.db = new DB();
        this.userInfo;
    }

    template() {
        return `
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
    }

    async loadUser(id, pw) {
        try{
            this.userInfo = await this.db.fetchUser(id, pw);
            // console.log(this.userInfo);
            if (this.userInfo.length == 0) {
                alert("해당하는 아이디가 없습니다.");
            } else {
                localStorage.setItem("username", this.userInfo[0]["user_name"]);
                window.location.hash = "#/"
                this.userInfo = null;
            }
        }
        catch(error){
            console.log(error)
        }
    }

    loginCheckLabel(element) {
        if (element.value.trim() !== "") {
            element.closest("div").querySelector("label").classList.add("value_fill");
        } else {
            element.closest("div").querySelector("label").classList.remove("value_fill");
        }
    };

    checkLoginBtn() {
        const $loginInpID = document.getElementById("id");
        const $loginInpPW = document.getElementById("password");
        const $btnLogin = document.getElementById("btn_login");

        if ($loginInpID.value.trim() !== "" && $loginInpPW.value.trim() !== "") {
            $btnLogin.classList.add("active");
            $btnLogin.disabled = false;
        } else {
            $btnLogin.classList.remove("active");
            $btnLogin.disabled = true;
        }
    };

    setEventListener() {
        const $loginInpID = document.getElementById("id");
        const $loginInpPW = document.getElementById("password");
        const $btnLogin = document.getElementById("btn_login");

        $loginInpID.addEventListener("input", () => this.loginCheckLabel($loginInpID));
        $loginInpPW.addEventListener("input", () => this.loginCheckLabel($loginInpPW));
        $loginInpID.addEventListener("input", this.checkLoginBtn);
        $loginInpPW.addEventListener("input", this.checkLoginBtn);

        $btnLogin.addEventListener("click", () => {
            if ($loginInpID.value.trim() !== "" && $loginInpPW.value.trim() !== "") {
                this.loadUser($loginInpID.value, $loginInpPW.value);
            }
        });
    }

    render(target) {
        target.innerHTML = this.template();
        this.setEventListener();
    }
}