import router from "./route/router.js"
import routes from "./route/routes.js"

const $app = document.getElementById("app");

$app.innerHTML =
`
    <header id = "header">
        <a href="#/">Home</a>
        <a href="#/page1">page1</a>
        <a href="#/page2">page2</a>
    </header>
    <main id = "main"></main>
`
router.init(routes)