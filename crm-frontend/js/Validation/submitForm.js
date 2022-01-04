import { createClients } from "../API/createClients.js";
import { changeClients } from "../API/changeClients.js";
import { removeRows } from "../TableAction/removeRows.js";
import { createTableRowByLoadData } from "../main.js";
import { removeBackground } from "../main.js";
import { validateContactsInput } from "./validateContactsInput.js";

const changeClientModal = document.querySelector(`.change-client-modal`);
const newClientModal = document.querySelector(`.new-client-modal`);    

export async function submitForm(event) {
    event.preventDefault();

    let formValue;
    if (event.target.dataset.type === `new`) {
        formValue = newClientModal;
    } else if (event.target.dataset.type === `change`) {
        formValue = changeClientModal;
    }

    let contactsArr = [];

    let clientID = document.querySelector('.client-id__number');
    let surnameInput = formValue.querySelector('input[name="surname"]');
    let nameInput = formValue.querySelector('input[name="name"]');
    let lastNameInput = formValue.querySelector('input[name="lastName"]');
    let contactsInputs = formValue.querySelectorAll('.contacts__input');
    let contactsSelect = formValue.querySelectorAll('.contacts__select');

    let nameLabel = formValue.querySelector('.label-for-name');
    let surnameLabel = formValue.querySelector('.label-for-surname');
    let contactsLabel = formValue.querySelectorAll('.contacts__label');

    if (surnameInput.value == '') {
        surnameInput.classList.add('error');
        surnameLabel.classList.add('error');
    }

    if (nameInput.value == '') {
        nameInput.classList.add('error');
        nameLabel.classList.add('error');
    }

    validateContactsInput(contactsInputs, contactsLabel);
    
    for (let i = 0; i < contactsInputs.length; i++) {
        let emailInput, emailLabel;

        if (contactsInputs[i].type === 'email') {
            emailInput = contactsInputs[i];
            emailLabel = contactsLabel[i];
            emailLabel.textContent = 'Введите корректный e-mail';
        }

        if ((contactsInputs[i].value == '')) {
            contactsInputs[i].classList.add('error');
            contactsLabel[i].classList.add('error');
        }
    }

    let errorInput = document.querySelectorAll('.error');

    if (errorInput.length > 0) {
        return;
    } else if (errorInput.length === 0) {
        for (let i = 0; i < contactsInputs.length; i++) {
            let contactInput;
            if (contactsInputs[i].type === `tel`) {
                contactInput = contactsInputs[i].value;
            } else {
                contactInput = (contactsInputs[i].value).split(` `).join(``);
            }
            contactsArr.push({
                type: contactsSelect[i].options[contactsSelect[i].selectedIndex].value,
                value: contactInput
            })
        }
    }       

    let statusCode;

    if (event.target.dataset.type === `change`) {
        statusCode = await changeClients(clientID.textContent, (nameInput.value).split(` `).join(``), (surnameInput.value).split(` `).join(``), (lastNameInput.value).split(` `).join(``), contactsArr);
    } else if (event.target.dataset.type === `new`) {
        statusCode = await createClients((nameInput.value).split(` `).join(``), (surnameInput.value).split(` `).join(``), (lastNameInput.value).split(` `).join(``), contactsArr);
    }

    if ((statusCode === 200) || (statusCode === 201)) { 
        formValue.classList.remove(`display-block`);
        removeBackground();
        removeRows();
        createTableRowByLoadData(); 
    } else {
        const errorHTTP = document.createElement(`p`);
        errorHTTP.classList.add(`HTTP-error`);

        if ((statusCode === 422) || (statusCode === 404) || (toString(statusCode).startsWith(5))) {
            errorHTTP.textContent = `Ошибка HTTP: ${statusCode}`;
        } else {
            errorHTTP.textContent = `Что-то пошло не так..`;
        }
        formValue.querySelector(`.save-btn`).append(errorHTTP);
    }    
}