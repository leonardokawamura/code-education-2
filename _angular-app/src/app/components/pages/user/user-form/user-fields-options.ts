import { FieldsOptions } from "src/app/common/fields-options";

const fieldsOptions: FieldsOptions = {
    name: {
        id: 'name',
        label: 'Nome',
        validationMessage: {
            maxlength: 255
        }
    },
    email: {
        id: 'email',
        label: 'E-mail',
        validationMessage: {
            maxlength: 255
        }
    },
    password: {
        id: 'password',
        label: 'Password',
        validationMessage: {
            maxlength: 20,
            minlength: 6
        }
    }
};

export default fieldsOptions;