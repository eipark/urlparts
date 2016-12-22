import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';

const URL_VALIDATOR_REGEX = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

const JS_LOCATION_PARTS = [
  'hash', 'host', 'hostname', 'href', 'origin', 'pathname', 'port', 'protocol', 'search'
];


class App extends Component {

  constructor(props) {
    super(props);
    const startUrl = "http://urlparts.com/home/?foo=bar";
    this.state = {
      textInputUrl: startUrl,
      analyzedUrl: startUrl
    };
  }

  updateUrl(e) {
    this.setState({
      textInputUrl: e.target.value
    });
  }

  updateAnalyzedUrl(e) {
    this.setState({
      analyzedUrl: this.state.textInputUrl
    });

    e.preventDefault();
  }

  isValidUrl(url) {
    return URL_VALIDATOR_REGEX.test(url);
  }

  renderJsLocationParts(analyzedUrl) {
    return _.map(JS_LOCATION_PARTS, part => {
      return (
        <li key={part}>
          window.location.{part} = {window.location[part]}
        </li>
      );
    });
  }

  renderAnalysis(analyzedUrl) {
    if (this.isValidUrl(analyzedUrl)) {
      return (
        <div>
          <div className="url-analyzer section">
            <div className='section-inner'>
              <h2>URL Parts</h2>
            </div>
          </div>
          <div className="language-analyzer section">
            <div className='section-inner'>
              <h2>JS window.location Object</h2>
              <ul className="no-bullets js-location-parts code">
                {this.renderJsLocationParts(analyzedUrl)}
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="invalid-url">
          Hm, {analyzedUrl} doesn't look like a valid URL. Try again.
        </div>
      );
    }
  }

  render() {
    const {analyzedUrl, textInputUrl} = this.state;

    return (
      <div className="App">
        <div className="header section">
          <div className='section-inner'>
            <form onSubmit={this.updateAnalyzedUrl.bind(this)}>
              <input
                placeholder="Enter a URL, e.g. http://rangers.nhl.com"
                className="url-input"
                type="text"
                value={textInputUrl}
                onChange={this.updateUrl.bind(this)}
              />
              <button type="submit" className="url-input-submit" onClick={this.updateAnalyzedUrl.bind(this)}>
                Analyze
              </button>
            </form>
          </div>
        </div>
        {this.renderAnalysis(analyzedUrl)}
      </div>
    );
  }

}

export default App;
