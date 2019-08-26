import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header className='app-header'>
        <img src={'./logo.png'} className='app-logo' alt='Logotipo' />
      </header>
    );
  }
}

export default Header;