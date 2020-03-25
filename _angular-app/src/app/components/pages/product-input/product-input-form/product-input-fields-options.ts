import { FieldsOptions } from "src/app/common/fields-options";

const fieldsOptions: FieldsOptions = {
    amount: {
        id: 'amount',
        label: 'Quantidade',
        validationMessage: {
            min: 1
        }
    },
    product_id: {
        id: 'product_id',
        label: 'Produto'
    }
};

export default fieldsOptions;