import { FieldsOptions } from "src/app/common/fields-options";

const fieldsOptions: FieldsOptions = {
    total: {
        id: 'total',
        label: 'Total de convites',
        validationMessage: {
            min: 1
        }
    },
    expires_at: {
        id: 'expires_at',
        label: 'Data de expiração',
        validationMessage: {
            
        }
    }
};

export default fieldsOptions;