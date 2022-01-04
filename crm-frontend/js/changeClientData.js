import { getClients } from './API/getClients.js';
import { checkContactsLength } from './ClientContacts/checkContactsLength.js';
import { createContactsList } from './ClientContacts/createContactsList.js';
import { createCustomSelect } from './ClientContacts/createCustomSelect.js';
import { setInputAttribute } from './ClientContacts/setInputAttribute.js';
import { deleteFromContactList } from './ClientContacts/deleteFromContactList.js';

const changeClientModal = document.querySelector(`.change-client-modal`);

export async function changeClientData(columns) {
    let getClientsById = await getClients(columns[0].textContent);

    let clientID = document.querySelector(`.client-id__number`);
    clientID.textContent = `${columns[0].textContent}`;

    let surnameInput = changeClientModal.querySelector(`input[name="surname"]`);
    surnameInput.value = getClientsById.surname;

    let nameInput = changeClientModal.querySelector(`input[name="name"]`);
    nameInput.value = getClientsById.name;

    let lastNameInput = changeClientModal.querySelector(`input[name="lastName"]`);
    lastNameInput.value = getClientsById.lastName;
    changeClientModal.classList.add(`display-block`);

    let contactsWrapper = changeClientModal.querySelectorAll(`.contacts__wrapper`);
    if (contactsWrapper.length > 0) {
        Array.from(contactsWrapper).slice(0).forEach(el => {
            console.log(el)
            el.remove();
        })
    }
    
    if (getClientsById.contacts.length > 0) {
                            
        for (let i = 0; i < getClientsById.contacts.length; i++) {
            checkContactsLength();
            let contactsList = createContactsList(document.querySelector(`.change-client__contacts`));
            contactsList.options[contactsList.selectedIndex].removeAttribute(`selected`);

            for (let j = 0; j < contactsList.options.length; j++) {
                if (contactsList.options[j].value === getClientsById.contacts[i].type) {
                    contactsList.options[j].setAttribute(`selected`, `selected`);    
                }
            }                        
        }

        let contactsInputs = changeClientModal.querySelectorAll(`.contacts__input`);
        let contactsSelects = changeClientModal.querySelectorAll(`.contacts__select`);

        for (let i = 0; i < contactsSelects.length; i++) {
            for (let j = 0; j < getClientsById.contacts.length; j++) {
                if (contactsSelects[i].options[contactsSelects[i].selectedIndex].value == getClientsById.contacts[j].type) {
                    contactsInputs[i].value = getClientsById.contacts[j].value;
                }
            }
        }

        createCustomSelect();
        setInputAttribute();
        deleteFromContactList();
    }
}