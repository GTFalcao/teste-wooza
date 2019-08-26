
import React from 'react';

class OptionButton extends React.Component {
  // Signal the platform options that one was chosen
  signalOption() {
    this.props.optionClicked(this.props.option);
  }

  render() {
    if (this.props.doneOptions.includes(this.props.option)) {
      return (
        <button className='option__button option--done'>
          <div>Plano contratado com sucesso!</div>
        </button>
      );
    }
    else return (
      <button className='option__button' onClick={() => {
        this.signalOption();
      }}>
        <div>Quero esse plano!</div>
      </button>
    );
  }
}

export default OptionButton;