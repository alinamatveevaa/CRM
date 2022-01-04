export function deleteFromContactList() {
    let contactsWrapper = document.querySelectorAll(`.contacts__wrapper`);
    contactsWrapper.forEach(div => {
        div.addEventListener(`click`, e => {
            if ((e.target.tagName != `BUTTON`) & (e.target.dataset.target !== `delete`)) return;
            let btnDiv = e.target;

            let btnDivContainer = btnDiv.parentElement;
            btnDivContainer.remove();
            checkContactsLength();
        })
    })
}