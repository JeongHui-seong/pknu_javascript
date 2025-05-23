export default class Home {
    constructor(target) {
        this.target = target;
        this.render(target);
    }
    template() {
        return `<p>홈</p>`
    }
    render(target) {
        target.innerHTML = this.template();
    }
}