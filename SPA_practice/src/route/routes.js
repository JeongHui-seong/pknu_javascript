import Home from "../pages/Home.js";
import Page1 from "../pages/Page1.js";
import Page2 from "../pages/Page2.js";

const page1 = new Page1()

export default [
    {fragment: "#/", component: Home},
    {fragment: "#/page1", component: page1.page1},
    {fragment: "#/page2", component: Page2}
]