
import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { OptionArrows, resetArrows } from './optionArrows';
import OptionButton from './optionButton';

class PlatformOptions extends React.Component {

  // Internal option items that are not rendered
  hiddenItems = [
    'sku',
    'ativo'
  ];

  // Items that are not simple strings are evaluated here
  evalOptionItem(item) {
    if (typeof item == 'object') {
      var subItems = [];

      Object.getOwnPropertyNames(item).forEach((prop) => {
        if ((prop === 'valorParcela') && (item[prop] === false)) return;
        subItems.push(
          <li key={prop}>
            <span className="subitem__name">
              {prop}:
            </span>
            <span className="subitem__value">
              {' ' + item[prop].toString()}
            </span>
          </li>
        );
      });

      return (
        <ul>
          {subItems}
        </ul>
      );
    }

    console.log('ERROR: evaluated unknown item ', item);

    return 'UNKNOWN ITEM';
  }

  // When an option is selected, tell Main to render it
  transferOptionSignal = (option) => {
    this.props.optionClicked(option);
  }

  render() {
    var platform = this.props.platform;

    if (!platform) return null;

    // Get the options for the current platform
    var options = this.props.options.get(platform.sku);

    // Bind each option to its items by its SKU
    var optionItems = new Map();

    // Create the elements for each option
    var optionElements = [];

    // Bind each option to its items by its SKU
    options.forEach((option) => {

      if (option.ativo === false) return;

      var itemArray = [];

      // Add each item present in the option
      Object.getOwnPropertyNames(option).forEach((prop) => {
        if (this.hiddenItems.includes(prop)) return;
        itemArray.push(
          <div className='option__item' key={prop}>
            <span className="item__name">
              {prop}:
            </span>
            {/* Strings are added in, objects are evaluated */}
            <span className="item__value">
              {(typeof option[prop] == 'string' ?
                ' ' + option[prop].toString() :
                this.evalOptionItem(option[prop])
              )}
            </span>
          </div>
        );
      });

      optionItems.set(
        option.sku,
        itemArray
      );

      optionElements.push(
        <div className='option' key={option.sku}>
          <h2>
            {option.sku.split('_')[0]}
          </h2>
          {optionItems.get(option.sku)}
          <OptionButton
            option={option}
            optionClicked={this.transferOptionSignal}
            doneOptions={this.props.doneOptions}
          />
        </div>
      );
    });

    // Break down the platform description if it has more than one line
    var platformDescription = platform.descricao.split('|').map((line, index) => {
      return (
        <div key={index}>
          {line}
        </div>
      );
    });

    // Reset the left/right swipe arrows before rendering
    resetArrows();

    // Render the current platform's options
    return (
      <CSSTransition in={true} appear={true} timeout={100} classNames='platform-options-transition'>
        <section className='platform-options'>
          <h1>
            {platformDescription}
          </h1>
          <div className='platform-options__container'>
            {optionElements}
          </div>
          <OptionArrows optionAmount={optionElements.length} />
        </section>
      </CSSTransition >
    );
  }
}

export default PlatformOptions;