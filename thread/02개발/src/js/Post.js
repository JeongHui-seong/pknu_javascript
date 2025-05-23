export default class Post {
    constructor(target) {
        this.target = target;
        this.render(target);
    }
    template() {
        return `글쓰기`
    }
    render(target) {
        target.innerHTML = this.template();
    }
}