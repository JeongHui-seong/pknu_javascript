export default class List {
    constructor(target) {
        this.target = target;
        this.setup();
        this.render(target);
    }

    template() {
        const { items } = this.state;
        return `
        <h1>List 페이지</h1>
        <ul>
            ${items.map((item, key) => `<li>${item}<button data-index = "${key}" class = "btn_delete">삭제</button></li>`).join('')}
        </ul>
        <input type="text" class="input_app">
        <button class="btn_append">추가</button>
                `;
    }
    setEvent() {
        const $btnAppend = document.querySelector(".btn_append");
        $btnAppend.addEventListener("click", () => {
            const { items } = this.state;
            const $inputApp = document.querySelector(".input_app").value;
            this.setState({ items: [...items, $inputApp] });
        });

        // 이벤트 버블링을 이용하면 성능개선에 도움이 된다고 해서 변경함
        document.querySelector("ul").addEventListener("click", (e) => {
            if(e.target.classList.contains("btn_delete")){
                const index = e.target.dataset.index;
                const items = [...this.state.items];
                items.splice(index, 1);
                this.setState({ items })
            }
        })
        // const $btnDelete = document.querySelectorAll(".btn_delete");
        // $btnDelete.forEach(btndelete => {
        //     btndelete.addEventListener("click", () => {
        //         const items = [...this.state.items];
        //         items.splice(btndelete.dataset.index, 1);
        //         this.setState({ items })
        //     });
        // });
    }
    setup() {
        this.state = { items: ["item1"] };
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render(this.target);
    }

    render(target) {
        target.innerHTML = this.template();
        this.setEvent();
    }
}