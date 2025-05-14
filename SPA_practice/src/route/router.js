import Page1 from "../pages/Page1.js";

export default {
    init(routes) {
        const main = document.getElementById("main");

        const render = () => {
            const current = window.location.hash;
            const found = routes.find(route => route.fragment == current);
            if (found) {
                found.component(main);
            } else {
                main.innerHTML = "<h1>페이지 없음</h1>"
            }
        };

        window.addEventListener("hashchange", render);
        render();
    }
}