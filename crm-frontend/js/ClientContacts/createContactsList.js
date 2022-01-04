export function createContactsList(argument) {
    let optionsArr = [];
    let select = document.createElement(`select`);
    select.classList.add(`contacts__select`);
    select.setAttribute(`name`, `select`);

    for (let i = 0; i < 5; ++i) {
        let option = document.createElement(`option`);
        option.classList.add(`contacts__option`);
        optionsArr.push(option);
        select.append(option);
    }

    optionsArr[0].value = optionsArr[0].textContent = `Телефон`;
    optionsArr[1].value = optionsArr[1].textContent = `Email`;
    optionsArr[2].value = optionsArr[2].textContent = `Facebook`;
    optionsArr[3].value = optionsArr[3].textContent = `VK`;
    optionsArr[4].value = optionsArr[4].textContent = `Другое`;

    let inputOfSelect = document.createElement(`input`);
    inputOfSelect.classList.add(`contacts__input`, `input`);
    inputOfSelect.setAttribute(`data-validate`, `contact`);
    inputOfSelect.type = `text`;
    inputOfSelect.placeholder = `Введите данные контакта`;

    let inputLabel = document.createElement(`div`);
    inputLabel.classList.add(`contacts__label`, `label-for-input`);
    inputLabel.textContent = `Введите значение`;

    let selectInputBlock = document.createElement(`div`);
    selectInputBlock.classList.add(`contacts__wrapper`);
    selectInputBlock.append(select);
    selectInputBlock.append(inputOfSelect);
    selectInputBlock.append(inputLabel);

    let deleteContactBtn = document.createElement(`button`);
    deleteContactBtn.classList.add(`contacts__delete-btn`);
    deleteContactBtn.setAttribute(`data-target`, `delete`);

    let deleteContactBtnTooltip = document.createElement(`div`);
    deleteContactBtnTooltip.classList.add(`contacts__delete-btn_tooltip`);
    deleteContactBtnTooltip.textContent = `Удалить контакт`;
    deleteContactBtn.append(deleteContactBtnTooltip);
    selectInputBlock.append(deleteContactBtn);    

    let contactsDiv = argument;//обертка для одного контакта клиента

    contactsDiv.prepend(selectInputBlock);

    return select;
}