import React from 'react';

// Header with logo
import Header from './header';

// 'Loading' box
import LoadingBox from './loadingBox';

// Platform navigation bar
import NavBar from './navBar';

// Platform options section
import PlatformOptions from './platformOptions';

// Form shown when selecting an option
import OptionForm from './optionForm';

// Footer
import Footer from './footer';

const platformURL = 'http://private-59658d-celulardireto2017.apiary-mock.com/plataformas';
const optionsURL = 'http://private-59658d-celulardireto2017.apiary-mock.com/planos/';

class Main extends React.Component {
  state = {
    platformsReady: false,
    platforms: null,
    currentPlatform: null,
    currentOption: null,
  }

  allOptions = new Map();
  doneOptions = [];

  // Fetch data for the platforms: called when the app first renders.
  getPlatforms() {
    window.fetch(platformURL, { method: 'GET' })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.setState({
          platformsReady: true
        });
        // 300ms for the 'loading' screen to fade out
        setTimeout(() => {
          this.setState({
            platforms: data.plataformas
          });
        }, 300);

        this.getOptions(data.plataformas);
      });
  }

  // Fetch the options for each platform: called after fetching the platforms
  getOptions(platforms) {
    platforms.forEach((platform) => {
      window.fetch(optionsURL + platform.sku, { method: 'GET' })
        .then((response) => {
          return response.json()
        })
        // Bind each platform to its options by its SKU
        .then((data) => {
          this.allOptions.set(
            platform.sku,
            data.planos
          );
        });
    });
  }

  componentDidMount() {
    this.getPlatforms();
  }

  // When a platform is selected, render its options.
  renderPlatformOptions = (platform) => {
    this.setState({
      currentPlatform: platform
    });
  }

  // When an option is selected, render its form.
  renderOptionForm = (option, success = false) => {
    // When a form is validated, update the option's button.
    if (success) {
      this.doneOptions.push(this.state.currentOption);
    }

    this.setState({
      currentOption: option
    });
  }

  // Main app structure
  render() {
    // Display a 'loading' page while the platforms are being loaded
    if (!this.state.platforms) {
      return (
        <div className='app'>
          <Header />
          <LoadingBox ready={this.state.platformsReady} />
          <Footer />
        </div>
      )
    }

    // Display the full page after the platforms have been loaded
    else {
      return (
        <div className='app'>
          <Header />

          {/* NavBar: rendered from the platforms fetched */}
          <NavBar
            platforms={this.state.platforms}
            platformClicked={this.renderPlatformOptions}
          />

          {/* PlatformOptions: rendered when a platform is selected in NavBar */}
          <PlatformOptions
            options={this.allOptions}
            platform={this.state.currentPlatform}
            optionClicked={this.renderOptionForm}
            doneOptions={this.doneOptions}
          />

          {/* PlatformOptions: rendered when an option is selected in PlatformOptions */}
          <OptionForm
            option={this.state.currentOption}
            platform={this.state.currentPlatform}
            formClosed={this.renderOptionForm}
          />

          <Footer />
        </div >
      );
    }
  }
}

export default Main;