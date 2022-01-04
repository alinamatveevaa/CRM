import { focusInput } from "./focusInput.js";

export function validateFormInputs(inputs, labels) { 
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('blur', () => {
            if (inputs[i].value == '') {
                labels[i].classList.add('error');
                inputs[i].classList.add('error');
            } else {
                labels[i].classList.remove('error');
                inputs[i].classList.remove('error');
            }
        })
        focusInput(inputs[i], labels[i]);
    }
}