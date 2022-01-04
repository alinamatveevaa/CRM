export function focusInput(elem, elem2) {
    elem.addEventListener(`focus`, () => {
        if (elem.classList.contains(`error`)) {
            elem.classList.remove(`error`);
            elem2.classList.remove(`error`);
        }
    })
}