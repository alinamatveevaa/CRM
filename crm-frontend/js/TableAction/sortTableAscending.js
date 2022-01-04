import { loadClients } from "../API/loadClients.js";
import { createTableRow } from "./createTableRow.js";

export async function sortTableAscending(data) {
    let dataClients = await loadClients();

    let sortArr = [];

    for (let i = 0; i < dataClients.length; i++) {
        sortArr.push({
            id: dataClients[i].id,
            name: dataClients[i].name,
            surname: dataClients[i].surname,
            lastName: dataClients[i].lastName,
            updatedAt: dataClients[i].updatedAt,
            createdAt: dataClients[i].createdAt,
            contacts: dataClients[i].contacts
        });
    }

    if (data === `fullName`) {
        sortArr.sort((a,b) => {
            let first = (a.surname + a.name + a.lastName).toLowerCase();
            let second = (b.surname + b.name + b.middleName).toLowerCase();
            return first > second ? 1 : first < second ? -1 : 0;
        });
    } else if (data === `id`) {
        sortArr.sort((a,b) => {
            a = a.id;
            b = b.id;
            return a - b;   
        })
    } else if (data === `created`) {
        sortArr.sort((a,b) => {
            a = (new Date(a.createdAt)).getTime();
            b = (new Date(b.createdAt)).getTime();
            return b - a;                
        })
    } else if (data === `changed`) {
        sortArr.sort((a,b) => {
            a = (new Date(a.updatedAt)).getTime();
            b = (new Date(b.updatedAt)).getTime();
            return b - a;                
        })
    }


    createTableRow(sortArr);
}