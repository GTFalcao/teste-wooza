
import React from 'react';

import { dataFields, validateForm, validateField } from './dataFields';

class OptionForm extends React.Component {

  closeForm(data = false) {
    // 'Close form' button
    if (!data) {
      document.querySelector('.option__form').classList.add('fade-out');
      setTimeout(() => {
        this.props.formClosed(null);
      }, 350);
    }

    // Form was submitted and validated
    else {
      setTimeout(() => {
        document.querySelector('.option__form').classList.add('fade-out');
        setTimeout(() => {
          this.props.formClosed(null, 'success');
        }, 350);
      }, 1600);

      console.log(
        '--------',
        '\n\n',
        'Plano contratado!',
        '\n\n',
        'Dados da plataforma:',
        this.props.platform,
        '\n\n',
        'Dados do plano:',
        this.props.option,
        '\n\n',
        'Dados do usuário:',
        data,
        '\n\n',
        '--------',
      );
    }

  }

  render() {
    var option = this.props.option;
    if (!option) return null;

    var dataElements = [];

    dataFields.forEach((field, index) => {
      dataElements.push(
        <div className="form__field" key={index}>
          <div>
            {field.name}
          </div>
          <input type={field.type} onInput={(ev) => { validateField(ev, field); }} />
        </div>
      );
    });

    return (
      <div className="option__form">
        <div className="option__form-box">
          <h2>
            Assinar o plano {option.sku.split('_')[0]}
          </h2>
          <h3>
            Preencha os dados abaixo para prosseguir:
        </h3>
          {dataElements}
          <div className="form__buttons">
            <div className="form__button-close" onClick={() => { this.closeForm(); }}>
              Retornar
          </div>
            <div className="form__button-submit" onClick={() => {
              var valid = validateForm();
              if (valid) this.closeForm(valid);
            }}>
              Enviar dados
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OptionForm;