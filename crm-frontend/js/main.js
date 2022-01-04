import { loadClients } from "./API/loadClients.js";
import { deleteClients } from "./API/deleteClients.js";
import { createTableRow } from "./TableAction/createTableRow.js";
import { checkContactsLength } from "./ClientContacts/checkContactsLength.js";
import { createContactsList } from "./ClientContacts/createContactsList.js";
import { createCustomSelect } from "./ClientContacts/createCustomSelect.js";
import { setInputAttribute } from "./ClientContacts/setInputAttribute.js";
import { deleteFromContactList } from "./ClientContacts/deleteFromContactList.js";
import { validateFormInputs } from "./Validation/validateFormInputs.js";
import { submitForm } from "./Validation/submitForm.js";
import { removeRows } from "./TableAction/removeRows.js";
import { sortTable } from "./TableAction/sortTable.js";
import { filterTable } from "./TableAction/filterTable.js";
import { changeClientData } from "./changeClientData.js";
import { validateContactsInput } from "./Validation/validateContactsInput.js";

const body = document.querySelector(`.body`);
const changeClientModal = document.querySelector(`.change-client-modal`);
const newClientModal = document.querySelector(`.new-client-modal`);    
const deleteClientModal = document.querySelector(`.delete-client-modal`);
const addClientBtn = document.querySelector(`.add-new-client`);
const addContactBtns = document.querySelectorAll(`.add-contact-btn`);
const forms = document.querySelectorAll(`.form`);
const table = document.querySelector(`.table`);

let modals = document.querySelectorAll(`.modal`);
let formLabels = document.querySelectorAll(`.label-for-input`);
let formInputs = document.querySelectorAll(`.input`);
let addContactButton;

export async function createTableRowByLoadData() {
    let dataClients = await loadClients();
    createTableRow(dataClients);
}

function windowLoad() {
    document.body.classList.add('loaded_hiding');
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
    document.querySelector('.table__empty').classList.add('display-none');
    createTableRowByLoadData();
}

window.addEventListener('load', windowLoad);

function openNewClientModal() {
    newClientModal.classList.add('display-block');
    document.querySelector('.block-background').classList.add('display-block');
    document.querySelector('.container').classList.add('overflow-hidden');
}

//Окно при нажатии "Добавить клиента" (форма добавления клиента)
addClientBtn.addEventListener('click', openNewClientModal);

//Закрытие модального окна
function bodyOnClick(event) {
    if (event.target.dataset.action !== 'remove') return;
    removeBackground();
}

export function removeBackground() {
    modals.forEach( el => {
        el.classList.remove('display-block');
        document.querySelector('.block-background').classList.remove('display-block');
        document.querySelector('.container').classList.remove('overflow-hidden');
    })
}

body.addEventListener('click', bodyOnClick);

//Выпадающий список контактов клиента
addContactBtns.forEach(btn => {
    btn.addEventListener(`click`, (e) => {
        let modalValue;
        if (e.target.dataset.name === `newClient`) {
            modalValue = newClientModal;
            addContactButton = newClientModal.querySelector(`.new-client__contacts`);
        } else if (e.target.dataset.name === `changeClient`) {
            modalValue = changeClientModal;
            addContactButton = changeClientModal.querySelector(`.change-client__contacts`);
        }

        checkContactsLength();
        createContactsList(addContactButton);
        createCustomSelect();
        setInputAttribute();
        let contactInput = document.querySelectorAll(`.contacts__input`);

        let contactLabel = document.querySelectorAll(`.contacts__label`); 
        validateContactsInput(contactInput, contactLabel);
        deleteFromContactList();
    });
})

//form submit
for (let form of forms) {
    form.addEventListener(`submit`, submitForm);
}

validateFormInputs(formInputs, formLabels);

table.addEventListener(`click`, (event) => {
    changeOrDeleteClient(event);
    sortTable(event);
})

function changeOrDeleteClient(event) {
    if (event.target.tagName != `TD`) return;

    if (event.target.dataset.action === `none`) return;
    
    let cell = event.target;

    let row = cell.parentElement;
    let rows = row.parentElement.children;
    let columns = row.children;

    for (let i = 0; i < rows.length; ++i) {
        if (rows[i] === row) {
            break;
        }
    }
    
    for (let j = 0; j < columns.length; ++j) {
        if (columns[j] === cell) {
            break;
        }
    }

    if (event.target.dataset.action === `change`) {
        document.querySelector(`.block-background`).classList.add(`display-block`);
        document.querySelector(`.container`).classList.add(`overflow-hidden`);
        changeClientData(columns);
    } else if (event.target.dataset.action === `delete`) {
        document.querySelector(`.block-background`).classList.add(`display-block`);
        deleteClientModal.classList.add(`display-block`);
        document.querySelector(`.container`).classList.add(`overflow-hidden`);

        let currentClientId = columns[0].textContent;
        console.log(event.target);

        deleteClient(currentClientId);
    }
}

async function deleteClient(id) {
    let deleteClientBtn = document.querySelector(`.remove-client-btn`);
    deleteClientBtn.addEventListener(`click`, async (e) => {
        deleteClientModal.classList.remove(`display-block`);
        removeBackground();
        let deleteStatus = await deleteClients(id);
        if (deleteStatus.ok) {
            removeRows();
            let data = await loadClients();
            createTableRow(data);
        }
    })
}

let cancelBtn = document.querySelectorAll(`.cancel-btn`);
cancelBtn.forEach(btn => {
    btn.addEventListener(`click`, () => {
        modals.forEach( el => {
            el.classList.remove(`display-block`);
            removeBackground();
        })
    })
})

let searchInput = document.querySelector(`.header__input`);
let timeoutId;

function filterTableToTime() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(filterTable, 300);
}

searchInput.addEventListener(`input`, filterTableToTime);