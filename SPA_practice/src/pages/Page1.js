export default class Page1 {
    state = {items : ["item1"]}

    page1(container){
        const { items } = this.state;

        container.innerHTML = 
        `
        <h1>페이지1</h1>
        <ul>
            ${items.map(item => `<li>${item}</li><button class = "btn_delete">삭제</button>`).join('')}
        </ul>
        <input type="text">
        <button class = "btn_append">추가</button>
        `
    }

    setEvent(){
        const btnAppend = document.querySelector("btn_append");
        btnAppend.addEventListener("click", () => {
            console.log("ok");
        });
    }
}
