export function setInputAttribute() {
    let contactsWrapper = document.querySelectorAll(`.contacts__wrapper`);
    let contactsInputs = document.querySelectorAll(`.contacts__input`);
    let select = document.querySelectorAll(`.contacts__select`);
    for (let i = 0; i < contactsWrapper.length; i++) {
        if (select[i].options[select[i].selectedIndex].value === `Телефон`) {
            contactsInputs[i].setAttribute(`type`, `tel`);
            contactsInputs[i].setAttribute(`data-type`, `tel`);
            // contactsInputs[i].setAttribute('pattern', '[0-9]{10}')
        } else if (select[i].options[select[i].selectedIndex].value === `Email`) {
            contactsInputs[i].setAttribute(`type`, `email`);
            contactsInputs[i].setAttribute(`name`, `email`);
            contactsInputs[i].setAttribute(`data-type`, `email`);
        } else {
            contactsInputs[i].setAttribute(`type`, `text`);
            contactsInputs[i].setAttribute(`data-type`, `text`);
        }
    }
}