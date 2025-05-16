export default class Home {
    constructor(target) {
        this.render(target);
    }

    template() {
        return `
                <h1>Home 페이지</h1>
                `
    }
    render(target) {
        target.innerHTML = this.template();
    }
}