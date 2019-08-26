
import React from 'react';

class NavBar extends React.Component {
  state = {
    currentPlatform: null
  }

  transitioning = false;

  // Tell Main that a platform was clicked,
  // so that the PlatformOptions are updated
  signalPlatform(platform) {
    if ((this.state.currentPlatform !== platform) && (!this.transitioning)) {
      this.startTransition();
      this.setState({
        currentPlatform: platform
      });
      this.props.platformClicked(platform);
    }
  }

  // Trigger transition between platforms
  startTransition() {
    // (not when one is selected for the first time)
    if (document.querySelector('.platform-options')) {
      document.querySelector('.platform-navbar').classList.add('platform--active');
      this.transitioning = true;

      setTimeout(() => {
        document.querySelector('.platform-navbar').classList.remove('platform--active');
        this.transitioning = false;
      }, 500);
    }
  }

  render() {
    // For each platform fetched, render
    // a button with the platform's name.
    var buttons = [];
    this.props.platforms.forEach((platform) => {
      buttons.push(
        <div
          className={'platform-navbar__button'
            + (platform === this.state.currentPlatform
              ? ' platform--active'
              : '')}
          key={platform.sku}
          onClick={() => {
            this.signalPlatform(platform);
          }}>
          {platform.nome}
        </div>
      );
    });

    return (
      <nav className='platform-navbar'>
        {buttons}
      </nav>
    );
  }
}

export default NavBar;