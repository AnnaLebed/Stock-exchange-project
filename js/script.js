const strMarquee = document.getElementById("string-marquee");
const currentPriceMarquee = new Marquee("strmarquee", strMarquee, 100);
currentPriceMarquee.loadMarquee();

const searchButton = document.getElementById("button");
const searchValue = document.getElementById("inputField").value;


function loaderOn() {
    document.getElementById("loadRing").classList.add("visibility-vis");
}

function loaderOff() {
    document.getElementById("loadRing").classList.add("visibility-hid");
}

function clearResult() {
    document.getElementById("resultsList").innerHTML = " ";
}


function getResults() {
    clearResult();
    loaderOn();
    fetch(`https://financialmodelingprep.com/api/v3/search?query=${searchValue}&limit=10&exchange=NASDAQ`)
        .then(response => response.json())        
        .then(function (companyObjects) {
            console.log(companyObjects);
            companyObjects.map(item => {
                fetch(`https://financialmodelingprep.com/api/v3/company/profile/${item.symbol}`)
                    .then(response => response.json()
                        .then(function (data) {
                            let a = document.createElement("a");
                            document.getElementById("resultsList").appendChild(a);
                            a.classList.add("list-group-item");
                            a.setAttribute("href", `./company.html?symbol=${data.symbol}`);

                            const image = document.createElement("img");
                            image.classList.add("stock-image");
                            companyImage = data.profile.image;
                            image.src = companyImage;
                            a.appendChild(image);

                            const compName = document.createElement("span");
                            compName.classList.add("margin");
                            compName.textContent = data.profile.companyName;
                            a.appendChild(compName);

                            const symbol = document.createElement("span");
                            symbol.classList.add("margin");
                            symbol.textContent = "(" + data.symbol + ")";
                            a.appendChild(symbol);

                            const changesPercentage = document.createElement("span");
                            const number = data.profile.changesPercentage.slice(1, -1);
                            changesPercentage.textContent = "(" + number + ")";
                            if (number[0] === "+") {
                                changesPercentage.classList.add("green");
                            } else if (number[0] === "-") {
                                changesPercentage.classList.add("red");
                            } else {
                                changesPercentage.classList.add("black");
                            }
                            a.appendChild(changesPercentage);                           
                        }))
                loaderOff();
            });
        });
};





searchButton.addEventListener("click", getResults);


