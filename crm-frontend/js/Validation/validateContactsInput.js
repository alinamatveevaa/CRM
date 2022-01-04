import { focusInput } from "./focusInput.js";
import { validateFormInputs } from "./validateFormInputs.js";

export function validateContactsInput(inputs, labels) {
    for (let i = 0; i < inputs.length; i++) {
        
        inputs[i].addEventListener('input', replaceLetters);

        function replaceLetters() {
            if (this.type === 'tel') {
                this.value = this.value.replace(/[^\d.]/g, '');
            }
        }

        inputs[i].addEventListener('blur', () => {
            if (inputs[i].type === 'tel') {
                if ((inputs[i].value).length < 10) {
                    inputs[i].classList.add('error');
                    labels[i].classList.add('error');
                } else {
                    inputs[i].classList.remove('error');
                    labels[i].classList.remove('error');
                }
            } else if (inputs[i].type === 'email') {            
                if (!((inputs[i].value.includes('@')) & (inputs[i].value.includes('.')))) {
                    inputs[i].classList.add('error');
                    labels[i].classList.add('error');
                } else {
                    inputs[i].classList.remove('error');
                    labels[i].classList.remove('error');
                }
            } else {
                validateFormInputs(inputs, labels);
            }
        })            
        focusInput(inputs[i], labels[i]);
    }
}