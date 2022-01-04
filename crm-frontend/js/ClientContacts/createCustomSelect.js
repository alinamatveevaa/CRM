import { setInputAttribute } from "./setInputAttribute.js";

export function createCustomSelect() {
    let selectAll = document.querySelectorAll(`select`);
    selectAll.forEach(select => {
        const choices = new Choices(select, {
            searchEnabled: false,
            shouldSort: false,
            itemSelectText: ``
        })
        select.addEventListener(`change`, (event) => {
            setInputAttribute();
        });
    })
    
}