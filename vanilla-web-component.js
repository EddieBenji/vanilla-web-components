class CustomForm extends HTMLElement {
    URL_APIS = {
        FORWARDERS: 'http://localhost:5500/api/forwarders',
        TEST_CONNECTION: 'http://localhost:5500/api/test/mock-server'
    };
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
                   id="email"
                   name="email"
                   placeholder="Email"/>
            
            <input type="password"
                   id="password"
                   name="password"
                   placeholder="Password"/>
                   
           <label for="forwarders">Forwarders: </label>
                   
           <select id="forwarders"
                   name="forwarders"
                   class="form-control">
               <option selected>Choose...</option>
            </select>
            <br>
            <input type="text"
                   id="serverIp"
                   name="serverIp"
                   placeholder="Server IP"/>
                   
           <button type="button"
                   id="testConnectionBtn">Test connection</button>
            <br>
            <button type="button"
                    id="submitBtn">Submit!</button>
        </form>
        `;
    }

    connectedCallback() {

        // Fire the GET(s).
        const doGetReq = new CustomEvent('doGetRequest', {
            composed: true,
            detail: {
                url: this.URL_APIS.FORWARDERS
            }
        });
        this.dispatchEvent(doGetReq);

        // Prepare the submit button to fire the 'saveForm' trigger.
        const submitBtn = this.shadowRoot.querySelector('#submitBtn');
        submitBtn.addEventListener('click', () => {
            const formData = new FormData(this.shadowRoot.querySelector('form'));
            const formAsJson = Object.fromEntries(formData.entries());

            const saveFormEvent = new CustomEvent('saveForm', {
                composed: true,
                bubbles: true,
                cancelable: false,
                detail: {
                    data: formAsJson
                }
            });
            this.dispatchEvent(saveFormEvent);
        });

        const testConnectionBtn = this.shadowRoot.querySelector('#testConnectionBtn');
        testConnectionBtn.addEventListener('click', () => {
            const serverIp = this.shadowRoot.querySelector('#serverIp').value;

            const testConnectionEvent = new CustomEvent('doPostRequest', {
                composed: true,
                bubbles: true,
                cancelable: false,
                detail: {
                    url: this.URL_APIS.TEST_CONNECTION,
                    body: {
                        serverIp
                    }
                }
            });
            this.dispatchEvent(testConnectionEvent);
        });
    }

    set UIElements(info) {
        console.log('on the web component it self: ->', info);
        if (info.url === this.URL_APIS.FORWARDERS) {
            const asStringArray = info.params.map(({ name }) => name);
            const select = this.shadowRoot.querySelector('#forwarders');
            for (const forwarder of asStringArray) {
                const cOption = document.createElement('option');
                cOption.value = forwarder;
                cOption.textContent = forwarder;
                select.appendChild(cOption);
            }
        }
    }
}

// Define the new element
customElements.define('custom-form', CustomForm);