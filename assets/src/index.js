const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const inversor = document.querySelector(".exchangeConfig i");
const amountInput = document.querySelector(".exchangeValue input");
const response = document.querySelector(".response p");
const button = document.querySelector(".convertButton");

const KEY = " ";

[fromCur, toCur].forEach((select, i) => {
    for(let curCode in Country_List) {
        let selected = (i === 0 && curCode === "BRL") || (i === 1 && curCode === "USD") ? "selected" : "";
        select.insertAdjacentHTML("beforeend", `<option value="${curCode}" ${selected}>${curCode}</option>`);
    }
    select.addEventListener("change", () => {
        const imgElement = select.parentElement.querySelector("img");
        imgElement.src = `https://flagcdn.com/48x36/${Country_List[select.value].toLowerCase()}.png`;
    });
});

const conversor = async () => {
    amountInput.value = amountInput.value || 1;
    response.innerText = "Processing your value...";

    try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${KEY}/latest/${fromCur.value}`);
        const result = await res.json();

        const currencyRate = result.conversion_rates[toCur.value];
        const convertedValue = amountInput.value * currencyRate;

        response.innerText = `${amountInput.value} ${fromCur.value} = ${convertedValue.toFixed(2)} ${toCur.value}`;
    } catch (error) {
        response.innerText = "Sorry, We're not able to make this conversion!";
    }
}

inversor.addEventListener("click", () => {
    [fromCur.value, toCur.value] = [toCur.value, fromCur.value];
    [fromCur, toCur].forEach( select => {
        const imgElement = select.parentElement.querySelector("img");
        imgElement.src = `https://flagcdn.com/48x36/${Country_List[select.value].toLowerCase()}.png`; 
    });
    conversor();
});

button.addEventListener("click", () => {
    conversor();
});

amountInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter") conversor();
});

conversor();
