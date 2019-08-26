// For the swiping, vanilla JS+CSS is faster, easier to write and easier to read.
// Re-rendering the options would be worse for performance and readability

function swipeOption(direction) {
  // Works together with the media queries for small devices
  const swipeAmount =
    'translateX(calc((100% + '
    + (window.innerWidth <= 320
      ? '20px'
      : '40px')
    + ') * ';
    
  const selectClass = 'option-selected';

  var leftButton = document.querySelector('.platform-options__swipe-left');
  var rightButton = document.querySelector('.platform-options__swipe-right');

  // Get the current options. Check which is selected (if none, defaults to 0 - first option)
  var options = Array.from(document.querySelectorAll('.platform-options .option'));
  var selectedIndex = 0;

  var selectedOption = document.querySelector('.platform-options .option.' + selectClass);

  if (selectedOption) {
    selectedIndex = options.indexOf(selectedOption);
    selectedOption.classList.remove(selectClass);
  }

  // Update the index
  selectedIndex += (direction === 'right' ? 1 : -1);

  // Update the swipe buttons
  [
    [rightButton, options.length - 1],
    [leftButton, 0]
  ].forEach(([edge, num]) => {
    if (selectedIndex === num)
      edge.classList.add('swipe--hidden');
    else
      edge.classList.remove('swipe--hidden');
  });

  // Update the style for each option
  options.forEach((option, index) => {
    if (index === selectedIndex) {
      option.classList.add(selectClass);
    }

    option.style.transform =
      swipeAmount
      + (selectedIndex * -1).toString()
      + '))';
  })
}

export default swipeOption;