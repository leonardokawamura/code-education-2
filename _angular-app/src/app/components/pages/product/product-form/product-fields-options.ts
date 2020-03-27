import { FieldsOptions } from "src/app/common/fields-options";

const fieldsOptions: FieldsOptions = {
    name: {
        id: 'name',
        label: 'Nome',
        validationMessage: {
            maxlength: 255
        }
    },
    description: {
        id: 'description',
        label: 'Descrição'
    },
    price: {
        id: 'price',
        label: 'Preço',
        validationMessage: {
            maxlength: 13
        }
    },
    active: {
        id: 'active',
        label: 'Ativo'
    }
};

export default fieldsOptions;