

const dataFields = [
  /*
  {
    'name': field name as it will be rendered
    'type': input type (text, date...)
    'maxSize': maximum amount of characters
    'validChars': characters that can be typed
    'validValue': expression that must be matched to submit the form
  },
  */
  {
    'name': 'Nome:',
    'type': 'text',
  },
  {
    'name': 'Email:',
    'type': 'email',
    'validValue': /.+@.+\../
  },
  {
    'name': 'Data de nascimento:',
    'type': 'date',
  },
  {
    'name': 'CPF:',
    'type': 'text',
    'maxSize': '11',
    'validChars': /[0-9]/,
    'validValue': /[0-9]{11}/
  },
  {
    'name': 'Telefone:',
    'type': 'text',
    'maxSize': '11',
    'validChars': /[0-9]/,
    'validValue': /[0-9]{8,}/
  },
];

// When the user submits the form, check if the fields are valid
function validateForm() {
  var invalidFields = [];
  var values = [];

  document.querySelectorAll('.form__field input').forEach((field, index) => {
    field.classList.remove('valid');
    field.classList.remove('invalid');
    var name = field.previousElementSibling.textContent.trim();
    if (name[name.length - 1] === ':') name = name.slice(0, -1);
    values.push({});
    values[index][name] = field.value;

    if (
      (values[index][name].trim() === '')
      || ((dataFields[index].validValue)
        && (!values[index][name].match(dataFields[index].validValue)))
    ) {
      invalidFields.push(field);
    }

    else field.classList.add('valid');
  });

  // One or more fields are invalid
  if (invalidFields.length) {
    invalidFields.forEach((field) => {
      field.classList.add('invalid');
    })
    return false;
  }

  // All fields are valid, get the input data.
  else {
    var form = document.querySelector('.option__form-box');

    form.classList.add('form--success');

    setTimeout(() => {
      form.classList.add('success-fade');
      setTimeout(() => {
        form.classList.remove('form--success');
        form.classList.remove('success-fade');
      }, 400);
    }, 1200);
    
    var data = {};
    Object.assign(data, ...values);
    return data;
  }

}

// When the user types in a character, check if it's valid
function validateField(ev, fieldProps) {
  var field = ev.target;
  var content = field.value;

  if (fieldProps.validChars && content.length > 0) {
    if (!content[content.length - 1].match(fieldProps.validChars)) {
      field.value = content.slice(0, -1);
      return;
    }
  }

  if (
    (fieldProps.maxSize && content.length > fieldProps.maxSize)
  ) {
    field.value = content.slice(0, -1);
  }
}

export { dataFields, validateField, validateForm };