const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");

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
