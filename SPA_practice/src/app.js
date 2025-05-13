const $app = document.getElementById("app");
let dictItems = { listItems: ["item1", "item2"] };

const render = () => {
    let template = `
            <ul>
                ${dictItems.listItems.map((item, key) => `<li>${item}<button data-index = ${key} class = "btn_delete_item">삭제</button></li>`).join('')}
                </ul>
                <input class = "ipt_text" type="text">
                <button class = "btn_add_item">추가하기</button>
                `

    $app.innerHTML = template;
    setEvent()
}

const setEvent = () => {
    let items = [...dictItems.listItems];
    const $iptText = document.querySelector(".ipt_text");

    document.querySelector(".btn_add_item").addEventListener("click", () => {
        setItems({ listItems: [...items, $iptText.value] });
        console.log($iptText.value)
    });

    document.querySelectorAll(".btn_delete_item").forEach(deletebtn =>
        deletebtn.addEventListener("click", (e) => {
            items.splice(e.currentTarget.getAttribute("data-index"), 1);
            setItems({ listItems: [...items] });
        })
    );
}

const setItems = (newItem) => {
    dictItems = { ...dictItems, ...newItem }
    console.log(dictItems)
    render()
}

render();