import { removeRows } from "./removeRows.js";
import { sortTableAscending } from "./sortTableAscending.js";
import { sortTableDescending } from "./sortTableDescending.js";


export function sortTable(event) {
    if (event.target.tagName != `TH`) return;
    let th = event.target;

    removeRows();

    if (th.dataset.order === `even`) {
        th.setAttribute(`data-order`, `odd`);
        th.classList.remove(`even`);
        th.classList.add(`odd`);
        sortTableAscending(th.dataset.type);
    } else  if (th.dataset.order === `odd`) {
        th.setAttribute(`data-order`, `even`);
        th.classList.remove(`odd`);
        th.classList.add(`even`);
        sortTableDescending(th.dataset.type);
    }
}