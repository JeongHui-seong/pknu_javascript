import List from "./components/List.js"
import Counter from "./components/Counter.js"
import Home from "./components/Home.js"

const $app = document.getElementById("app");
const template = `
        <header id="header">
            <a href="#/">Home</a>
            <a href="#/counter">counter</a>
            <a href="#/list">list</a>
            </header>
            <main id="main"><h1>Home 페이지</h1></main>
            `
$app.innerHTML = template;

class Router {
    // 생성자에서 state()를 호출하면 클래스가 생성될 때 routes 초기화
    // target을 생성자에서 저장하고 클래스의 파라미터로 보내주면 파라미터를 받은 클래스에서 target을 전달하여 유지 가능
    constructor() {
        this.target = document.getElementById("main");

        this.home = new Home(this.target);
        this.counter = new Counter(this.target);
        this.list = new List(this.target);

        this.state();
        this.setState();
    }
    state() {
        // this가 클래스를 넘어오면서 값이 바뀌기 때문에 bind를 해줌
        // 하지만 화살표 함수를 사용하면 자동으로 this가 유지
        this.routes = [
            { fragment: "#/", component: () => this.home.render(this.target) },
            { fragment: "#/counter", component: () => this.counter.render(this.target) },
            { fragment: "#/list", component: () => this.list.render(this.target) }
        ]
    }

    render() {
        const currentHash = window.location.hash || "#/" // 첫 화면에 들어갔을 때 다른 페이지가 뜨는걸 방지하기 위해 해시 값이 없는 경우 자동으로 "#/"을 기본값으로 처리
        const findFragment = this.routes.find(route => route.fragment == currentHash);
        if (findFragment) {
            findFragment.component(); // target을 내부에서 참조하고 있기 때문에 따로 파라미터로 전달할 필요 없음
        }
    }

    setState() {
        this.render();
        window.addEventListener("hashchange", () => this.render());
    }

}

const router = new Router();