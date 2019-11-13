class RegisterService {
    constructor() {
        this.createFormUrl = 'https://docs.google.com/forms/u/2/d/e/1FAIpQLSdomaWleaMXfp4BnRWZVOFSwr1wjdi6QxvnuL7Ttw9XJfpoEg/formResponse';
    }

    postCreate(form) {
        return fetch(this.createFormUrl, {method: 'POST', body: form})
            .then(response => response.json())
            .then(response => {
                return response;
            }).catch(err => {
                return err;
            });
    }
}

