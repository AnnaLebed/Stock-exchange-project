class CompareBox {
    constructor(parent) {
        console.log("compare box");
        const button = document.createElement("button");
        button.classList.add("btn", "btn-primary");
        button.innerText = "Compare companies";
        parent.appendChild(button);
    }


}