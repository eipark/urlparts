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

  renderGithubRibbon() {
    // https://github.com/tholman/github-corners
    return (
      <a target="_blank" href="https://github.com/eipark/urlparts" className="github-corner" aria-label="View source on Github"><svg width="80" height="80" viewBox="0 0 250 250" style={{fill:"#151513", color:"#fff", position: "absolute", top: 0, border: 0, right: 0}} aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{"transform-origin": "130px 106px"}} className="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a>
    );
  }

  render() {
    const {analyzedUrl, textInputUrl} = this.state;

    return (
      <div className="App">
        {this.renderGithubRibbon()}
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
