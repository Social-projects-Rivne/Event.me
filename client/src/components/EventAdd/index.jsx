import moment from 'moment';
import React, { Component } from 'react';
import { Input } from 'react-materialize';
import { request, momentUTCToLocal } from '../../utils';


class EventAdd extends Component {
  componentDidMount () {
    document.getElementsByTagName('nav')[0].style.zIndex = 999;
    document.getElementsByTagName('nav')[0].style.position = 'absolute';
    document.getElementById('vs-container').style.paddingTop = '64px';

    let script = document.createElement("script");
    script.src = "sliding-triple-view/js/modernizr.custom.js";
    document.body.appendChild(script);

    let script0 = document.createElement("script");
    script0.src = "sliding-triple-view/js/classie.js";
    document.body.appendChild(script0);

    let script1 = document.createElement("script");
    script1.src = "sliding-triple-view/js/hammer.min.js";
    document.body.appendChild(script1);

    let script2 = document.createElement("script");
    script2.src = "sliding-triple-view/js/main.js";
    document.body.appendChild(script2);
}

componentWillUnmount() {
  document.getElementsByTagName('nav')[0].style.zIndex = 1;
  document.getElementsByTagName('nav')[0].style.position = 'static';
}

  render() {
    return (
      <React.Fragment>
        <link rel="stylesheet" type="text/css" href="sliding-triple-view/css/normalize.css" />
        <link rel="stylesheet" type="text/css" href="sliding-triple-view/css/demo.css" />
        <link rel="stylesheet" type="text/css" href="sliding-triple-view/css/component.css" />
        <script src="sliding-triple-view/js/modernizr.custom.js"></script>
        <div id="vs-container" className="vs-container">
          <div className="codrops-top clearfix"></div>
          <header className="vs-header">
            <ul className="vs-nav">
              <li><a href="#section-1">Write your title</a></li>
              <li><a href="#section-2">Write your description</a></li>
              <li><a href="#section-3">Chose coordinates</a></li>
              <li><a href="#section-4">Chose start&end datetime</a></li>
              <li><a href="#section-5">Chose category</a></li>
              <li><a href="#section-6">Also you can add tags</a></li>
            </ul>
          </header>
          <div className="vs-wrapper">
            <section id="section-1">
              <div className="vs-content">
                <h2>Write your title</h2>
                <div className="col">
                <Input />
                </div>
              </div>
            </section>
            <section id="section-2">
              <div className="vs-content">
                <h2>Stretch hopped up on goofballs</h2>
                <div className="col"></div>
              </div>
            </section>
            <section id="section-3">
              <div className="vs-content">
                <h2>Inspect anything brought into the house drapes inspect anything brought into the house yet stand in front of the computer screen</h2>
                <div className="col"></div>
              </div>
            </section>
            <section id="section-4">
              <div className="vs-content">
                <h2>Attack feet hide when guests come</h2>
                <div className="col"></div>
              </div>
            </section>
            <section id="section-5">
              <div className="vs-content">
                <h2>Find something else more interesting inspect anything brought</h2>
                <div className="col"></div>
              </div>
            </section>
            <section id="section-6">
              <div className="vs-content">
                <h2>Find something else more interesting inspect anything brought</h2>
                <div className="col"></div>
              </div>
            </section>
          </div>
        </div>
        <script src="sliding-triple-view/js/classie.js"></script>
        <script src="sliding-triple-view/js/hammer.min.js"></script>
        <script src="sliding-triple-view/js/main.js"></script>
      </React.Fragment>
    )
  }
}

export default EventAdd;
