let spinner = document.querySelector('#spinner');

function getCompProfile() {
    spinner.classList.remove('d-none');
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let compSymbol = urlParams.get('symbol')

    fetch(`https://financialmodelingprep.com/api/v3/company/profile/${compSymbol}`)
        .then(response => response.json())
        .then(function (data) {
            //destructuring
            let {companyName, sector, price, description, image, changesPercentage, website} = data.profile;
            document.getElementById("logo").src = image;
            document.getElementById("name").textContent = companyName;
            document.getElementById("name").setAttribute("href", `${website}`);
            document.getElementById("sector").textContent = sector;
            document.getElementById("price").textContent = price;
            document.getElementById("changes").textContent = changesPercentage;
            if (changesPercentage[1] === "+") {
                document.getElementById("changes").classList.add("text-success");
            }
            if (changesPercentage[1] === "-") {
                document.getElementById("changes").classList.add("text-danger");
            };
            document.getElementById("description").textContent = description;
            spinner.classList.add('d-none');

        });

    fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${compSymbol}?timeseries=20`)
        .then(response => response.json())
        .then(function (data) {
            let priceHistory = data;
            let years = [];
            let close = [];
            for (let i = 0; i < priceHistory.historical.length; i++) {
                years.unshift(priceHistory.historical[i].date);
                close.unshift(priceHistory.historical[i].close);
            }
            let ctx = document.getElementById('myChart').getContext('2d');
            ctx.canvas.width = 800;
            ctx.canvas.height = 400;
            let chart = new Chart(ctx, {

                type: 'line',

                data: {
                    labels: years,
                    datasets: [{
                        label: 'Stock Price History',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: close
                    }]
                },
                options: {
                    responsive: false
                }
            });
        });
}

getCompProfile();