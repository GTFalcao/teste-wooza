
import React from 'react';

class loadingBox extends React.Component {
  render() {
    return (
      <div
        className={'loading-box'
          + (this.props.ready
            ? ' loading--done'
            : '')}>
        <h1>
          Aguarde, estamos carregando as plataformas
        </h1>
        <div className='loading-box__dots'>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </div>
    );
  }
}

export default loadingBox;