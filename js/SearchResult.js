class SearchResult {
    constructor(parent) {
        this.parent = parent;
        this.button;
        this.company;
    }


    buildResultsList = (searchValue, company) => {
        let li = document.createElement("li");
        li.classList.add("list-group-item", "pl-0", "pr-0");
        this.parent.appendChild(li);

        const span = document.createElement("span");
        const image = document.createElement("img");
        image.classList.add("stock-image");
        image.src = company.profile.image;
        span.appendChild(image);
        li.appendChild(span);

        let a = document.createElement("a");
        a.setAttribute("href", `./company.html?symbol=${company.symbol}`);
        li.appendChild(a);

        const compName = document.createElement("span");
        compName.classList.add("margin");

        compName.innerHTML = this.highlightSearch(searchValue, company.profile.companyName);
        a.appendChild(compName);

        const symbol = document.createElement("span");
        symbol.classList.add("margin");
        symbol.innerHTML = "(" + this.highlightSearch(searchValue, company.symbol) + ")";
        a.appendChild(symbol);

        const changesPercentage = document.createElement("span");
        const number = company.profile.changesPercentage.slice(1, -1);
        changesPercentage.textContent = "(" + number + ")";
        if (number[0] === "+") {
            changesPercentage.classList.add("green");
        } else if (number[0] === "-") {
            changesPercentage.classList.add("red");
        } else {
            changesPercentage.classList.add("black");
        }
        a.appendChild(changesPercentage);

        let compareButton = document.createElement("button");
        compareButton.classList.add("btn", "btn-primary",
            "float-right");
        compareButton.innerText = "Compare";
        this.button = compareButton;
        li.appendChild(compareButton);

        this.button.addEventListener('click', () => {
            console.log("Compare button");
            this.addElement(company);
        });
    };

    addElement = (company) => {
        console.log(company);
    };

    highlightSearch(searchValue, string) {
        const regex = new RegExp(searchValue, "gi");
        return string.replace(regex, (match) => `<mark>${match}</mark>`);
    }

}