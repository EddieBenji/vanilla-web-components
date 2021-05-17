class CustomForm extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
        <style>
            form {
                border: 1px solid black;
            }
        </style>
        <form>
            <input type="email"
                   id="inputEmail4"
                   name="inputEmail4"
                   placeholder="Email"/>
            
            <input type="password"
                   id="inputPassword4"
                   name="inputPassword4"
                   placeholder="Password"/>
            
            <button type="button"
                    id="submitBtn">Submit!</button>
        </form>
        `;
    }

    connectedCallback() {
        const submitBtn = this.shadowRoot.querySelector('#submitBtn');
        submitBtn.addEventListener('click', () => {

            const saveFormEvent = new CustomEvent('saveForm', {
                bubbles: true,
                cancelable: false,
                detail: {
                    data: {
                        email: this.shadowRoot.querySelector('#inputEmail4').value,
                        password: this.shadowRoot.querySelector('#inputPassword4').value
                    }
                }
            });
            this.dispatchEvent(saveFormEvent);
        });
    }
}

// Define the new element
customElements.define('custom-form', CustomForm);