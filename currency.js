const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertedAmount = document.getElementById("converted-amount");
const swapBtn = document.getElementById("swap");

const apiUrl = "https://api.exchangerate-api.com/v4/latest/USD";

// // Populate dropdowns
async function populateCurrencies(){
    const response = await fetch(apiUrl);
    const data = await response.json();
    const currencies = Object.keys(data.rates);

    currencies.forEach(currency => {
        const option1 = new Option(currency, currency);
        const option2 = new Option(currency, currency);
        fromCurrency.add(option1);
        toCurrency.add(option2);
    });

    fromCurrency.value = "USD";
    toCurrency.value = "INR";
    convert();
}

//convert function

async function convert() {
    const base = fromCurrency.value;
    const target = toCurrency.value;
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
    const data = await response.json();
    const rate = data.rates[target];
    const result = (amount.value * rate);
    convertedAmount.value = result;   
}

//swap
//swapButton.addEventListener("click",)

// // convert on input
amount.addEventListener("input", convert);
fromCurrency.addEventListener("change", convert);
toCurrency.addEventListener("change", convert);

populateCurrencies();



//action on button and swap