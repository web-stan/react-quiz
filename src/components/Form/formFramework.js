export function createControls(config, validation) {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: true,
        value: ''
    }
}

// label: "Вариант 1"
// errorMessage: "Значение не может быть пустым"
// validation: {required: true}
// valid: !validation, false
// touched: true
// value: ""

export function validate(value, validation = null) {
    if(!validation) {
        return true
    }

    let isValid = true

    if(validation.required) {
        isValid = value.trim() !== '' && isValid
    }

    return isValid
}

export function validateForm(formControls) {
    let isValidForm = true

    for (let control in formControls) {
        if(formControls.hasOwnProperty(control)) {
            isValidForm = formControls[control].valid && isValidForm
        }
    }

    return isValidForm
}