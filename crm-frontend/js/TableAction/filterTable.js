import { loadClients } from "../API/loadClients.js";
import { removeRows } from "./removeRows.js";
import { createTableRow } from "./createTableRow.js";

export async function filterTable(value) {
    let searchInput = document.querySelector(`.header__input`);
    value = searchInput.value;

    let dataClients = await loadClients();

    let clientsArr = [];

    for (let i = 0; i < dataClients.length; i++) {
        clientsArr.push({
            id: dataClients[i].id,
            name: dataClients[i].name,
            surname: dataClients[i].surname,
            lastName: dataClients[i].lastName,
            updatedAt: dataClients[i].updatedAt,
            createdAt: dataClients[i].createdAt,
            contacts: dataClients[i].contacts
        });
    }

    let filteredArr;

    if (typeof(value) === `string`) {
        filteredArr = clientsArr.filter(el => {
            return ((el.surname + ` ` + el.name + ` ` +  el.lastName).toLowerCase().indexOf(value.toLowerCase()) > -1) ||
                    ((el.id.indexOf(value)) > -1);
        })
    } 

    if (filteredArr.length > 0) {
        removeRows();
        createTableRow(filteredArr);
    } else if (filteredArr.length === 0) {
        removeRows();

        let tr = document.createElement(`tr`);
        tr.classList.add(`table__row`);
        let td = document.createElement(`td`);
        td.classList.add(`table__cell`)
        td.setAttribute(`colspan`, `6`);
        td.textContent = `По данному запросу нет результатов`

        tr.append(td);
        document.querySelector(`.table__body`).append(tr);
    }

}