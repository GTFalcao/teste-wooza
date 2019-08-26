
import React from 'react';

import swipeOption from './swipeOption.js';

function resetArrows() {
  var rightArrow = document.querySelector('.platform-options__swipe-right');
  if (rightArrow) rightArrow.classList.remove('swipe--hidden');
  var leftArrow = document.querySelector('.platform-options__swipe-left');
  if (leftArrow) leftArrow.classList.add('swipe--hidden');
}

class OptionArrows extends React.Component {

  render() {
    return (
      <div className='platform-options__swipe-buttons'>
        {/* Swipe left - always starts hidden, since the first option is selected */}
        <div
          className='platform-options__swipe-left swipe--hidden'
          onClick={() => { swipeOption('left') }}>
          &lsaquo;
        </div>
        {/* Swipe right - also starts hidden if there is only one option */}
        <div
          className={'platform-options__swipe-right'
            + (this.props.optionAmount <= 1
              ? ' swipe--hidden'
              : '')}
          onClick={() => { swipeOption('right') }}>
          &rsaquo;
        </div>
      </div>
    );
  }
}

export { OptionArrows, resetArrows };