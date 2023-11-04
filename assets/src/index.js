const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const inversor = document.querySelector(".exchangeConfig i");

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

inversor.addEventListener("click", () => {
    [fromCur.value, toCur.value] = [toCur.value, fromCur.value];
    [fromCur, toCur].forEach( select => {
        const imgElement = select.parentElement.querySelector("img");
        imgElement.src = `https://flagcdn.com/48x36/${Country_List[select.value].toLowerCase()}.png`; 
    });
});