const strMarquee = document.getElementById("string-marquee");
const currentPriceMarquee = new Marquee("strmarquee", strMarquee, 100);
currentPriceMarquee.loadMarquee();

const searchButton = document.getElementById("button");
// const userSearch = document.getElementById("inputField");
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

// function getCompanyProfile(companyDetails){
//     //do stuff here
// }

function getResults() {
    clearResult();
    loaderOn();
    fetch(`https://financialmodelingprep.com/api/v3/search?query=${searchValue}&limit=10&exchange=NASDAQ`)
        .then(response => response.json())
        //returned response.json
        // .then(data => {
        //     getCompanyProfile(data)
        //     createSearchResults(data)

        // })
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
                            // console.log("Fetch");
                        }))
                loaderOff();
            });
        });
};






// function getRealTimePrice() {
//     fetch(`https://financialmodelingprep.com/api/v3/stock/real-time-price`)
//         .then(response => response.json())
//         .then(function (data) {
//             timePrice = data.stockList;
//             slicedTimePrice = timePrice.slice(1, 100);
//             slicedTimePrice.forEach(function (company) {
//                 const stockWrapper = document.createElement("div");
//                 stockWrapper.classList.add("marquee-div");

//                 const divSymbol = document.createElement("div");
//                 divSymbol.classList.add("marquee-div");
//                 divSymbol.textContent = company.symbol + ":";

//                 const divPrice = document.createElement("div");
//                 divPrice.classList.add("marquee-div");
//                 divPrice.classList.add("yellow");
//                 divPrice.textContent = company.price + "$";
//                 stockWrapper.append(divSymbol, divPrice);
//                 const marquee = document.getElementById("string-marquee");
//                 marquee.append(stockWrapper);
//             })
//         })
// }



// getRealTimePrice();
searchButton.addEventListener("click", getResults);


// function addOne(x){
//     return x + 1
// }

// const addOne = (x) => {
//     return x + 1
// }

// const addOne = (x) => x + 1

// const addOne = x => x + 1

// const add = (x, y) => x + y
// const subtract = (x, y) => x - y
// const multiply = (x, y) => x * y
// const divide = (x, y) => x / y

// const math = (x, y, callback) => callback(x, y)

// math(2, 4, add) // add(2, 4)
// math(4, 8, multiply) // multiply(4, 8) // 32

// let myArray = [1, 2, 3]
// //map iterates over every value, and runs a *callback function* on that value, returns a new array

// let newArray = myArray.map(num => addOne(num)) // [2, 3, 4]