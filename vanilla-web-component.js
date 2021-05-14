class CustomForm extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const emailInput = document.createElement('input');
        emailInput.name = 'inputEmail4';
        emailInput.id = 'inputEmail4';
        emailInput.placeholder = 'Email';
        emailInput.type = 'email';

        const passwordInput = document.createElement('input');
        passwordInput.name = 'inputPassword4';
        passwordInput.id = 'inputPassword4';
        passwordInput.placeholder = 'Password';
        passwordInput.type = 'password';

        const submitBtn = document.createElement('button');
        submitBtn.type = 'button';
        // submitBtn.value = 'Submit';
        submitBtn.textContent = 'Submit';

        const form = document.createElement('form');
        shadow.appendChild(form);

        form.appendChild(emailInput);
        form.appendChild(passwordInput);
        form.appendChild(submitBtn);
        submitBtn.addEventListener('click', () => {

            const saveFormEvent = new CustomEvent('saveForm', {
                bubbles: true,
                cancelable: false,
                detail: {
                    data: {
                        email: emailInput.value,
                        password: passwordInput.value
                    }
                }
            });
            // this.emit
            this.dispatchEvent(saveFormEvent);
        });
    }
}

// Define the new element
customElements.define('custom-form', CustomForm);