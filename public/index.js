//dont use twelve data

//let api_url = //go to twelvedata.com, create an api, and copy & paste the api key
/*async function getStocksFromApi(){
    try {
        let response = await fetch(api_url)
            headers: {
                //insert api secret here
            }
        let data = await response.json()
    
        //change shape of response and return data to caller
        return  [data.GME, data.MSFT, data.DIS, data.BTNX]   
    } catch (error) {
        console.error("error getting stocks from api",error)
    }
    
}*/

//helper function used to display chart color
function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

async function main() {
    //getting API from mock data .js file
    const response = await fetch("public/mockData.js")
    const result = await response.json()
    console.log(result)

    //pulling the mock data temporarily from our file
    const { GME, MSFT, DIS, BNTX } = mockData;

    const stocks = [GME, MSFT, DIS, BNTX];
    //when you finish api use this line instead
    //const stocks = await getStocksFromApi()

    //print out the GME stock prices
    console.log(stocks[0].values)

    const timeChartCanvas = document.querySelector('#time-chart');
    //Start coding the first chart here since it references the canvas on line 3   
    //refer to canvas activity: DONT JUST COPY AND PASTE! REFER TO IT ONLY!! IT HELPS TO LEARN!!!
    // the labels is the x axis while the data is the y axis
    stocks.forEach(stock => stock.values.reverse())

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.dateTime),
            datasets: stocks.map(stock => [{
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol)
            }])
        }
    })
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    //build your second chart
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.mata.symbol),
            datasets: [{
                label: 'Highest',
                data: stocks.map(stock => (
                    findHighest(stock.values)
                )),
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),

            }]
        }
    })

    function findHighest(values) {
        let highest = 0;
        values.forEach(value => {
            if (parseFloat(value.high) > highest) {
                highest = value.high
            }
        })
        return highest
    }
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    //this is the bonus you don't have to do it

}

main()