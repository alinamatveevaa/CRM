export function checkContactsLength() {
    let contactsList = document.querySelectorAll(`.contacts__wrapper`);
    if (contactsList.length > 8) {
        document.querySelectorAll(`.add-contact-btn`).forEach(el => {
            el.classList.add(`display-none`);
        })
    } else {
        document.querySelectorAll(`.add-contact-btn`).forEach(el => {
            el.classList.remove(`display-none`);
        })
    }
}