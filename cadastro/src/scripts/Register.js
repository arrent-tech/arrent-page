class Register {
    set setButtonSubmit(val) {
        if (val) {
            this.submitButton.innerText = 'Enviando...';
        } else {
            this.submitButton.innerText = 'Erro!';
        }
    }

    set setFormDisplay(val) {
        if (val) {
            this.registerForm.classList.remove('d-flex');
            this.registerForm.classList.add('d-none');
        } else {
            this.registerForm.classList.add('d-flex');
            this.registerForm.classList.remove('d-none');
        }
    }

    set setTextAfterRegister (val) {
        if(val) {
            this.informationAfterRegister.classList.add('d-flex');
            this.informationAfterRegister.classList.remove('d-none');
            this.registerDescription.classList.add('d-none');
        }
    }



    constructor() {
        this.registerService = new RegisterService();

        this.registerForm = document.getElementById('registerForm');
        this.submitButton = document.getElementById('submitButton');
        this.informationAfterRegister = document.getElementById('informationAfterRegister');
        this.registerDescription = document.getElementById('registerDescription');

        this.init();
    }

    init() {

        this.submitButton.addEventListener('click', () => this.handleSubmitForm());
    }

    handleSubmitForm() {
        this.setButtonSubmit = true;
        this.registerService.postCreate(new FormData(this.registerForm))
            .then(() => {
                this.setFormDisplay = true;
                this.setTextAfterRegister = true;
            })
            .catch(() => {
                this.setFormDisplay = false;
                this.setButtonSubmit = false;
            });
    }
}
