class Marquee {
    constructor(id, parent, NumberOfElements) {
        this.id = id;
        this.parent = parent;
        this.NumberOfElements = NumberOfElements;
        this.url = `https://financialmodelingprep.com/api/v3/stock/real-time-price`;
    }

    async fetchData() {
        let response = await fetch(`${this.url}`);
        let data = await response.json();
        return data.stockList.slice(0, this.NumberOfElements);
    }

    createsElement(company) {
        const marqueeContainer = document.createElement("div");
        marqueeContainer.classList.add("marquee-div");

        const divSymbol = document.createElement("div");
        divSymbol.classList.add("marquee-div");
        divSymbol.textContent = company.symbol + ":";

        const divPrice = document.createElement("div");
        divPrice.classList.add("marquee-div");
        divPrice.classList.add("yellow");
        divPrice.textContent = company.price + "$";

        marqueeContainer.append(divSymbol, divPrice);
        this.parent.appendChild(marqueeContainer);
    }

    async loadMarquee() {
        const createMarquee = await this.fetchData();
        await createMarquee.map(company => {
            this.createsElement(company);
        })
    }
}