export default class Counter {
    constructor(target) {
        this.target = target;
        this.setup();
        this.render(target);
    }

    setup() {
        this.state = { count: 0 };
    }
    plus(prev) {
        this.setState({ count: prev + 1 });
    }
    minus(prev) {
        this.setState({ count: prev - 1 });
    }
    setEvent() {
        const $btnPlus = document.querySelector(".btn_plus");
        const $btnMinus = document.querySelector(".btn_minus");
        $btnPlus.addEventListener("click", () => {
            const prev = this.state.count;
            this.plus(prev)
        });
        $btnMinus.addEventListener("click", () => {
            const prev = this.state.count;
            this.minus(prev)
        });
    }
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render(this.target);
    }
    template() {
        const { count } = this.state;
        return `
                <h1>Counter 페이지</h1>
                <p class="count1">${count}</p>
                <button class="btn_plus">+</button>
                <button class="btn_minus">-</button>
                `
    }
    render(target) {
        target.innerHTML = this.template();
        this.setEvent();
    }
}