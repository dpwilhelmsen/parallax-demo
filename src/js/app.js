import React, {Component} from 'react';
import {render} from 'react-dom';
import FixedSection from './FixedSection';

import '../css/style.css';

export default class Hello extends Component {
  render() {
    return (
      <div>
        <article className="full-bleed-hero bkg-red">1</article>
        <article className="full-bleed-hero bkg-green">2</article>
        <figure className="quote quote--fixed">
        <FixedSection className="quote__constraint" top={0.5} parallax={50}>
          <blockquote className="quote__block">
            <picture className="picture quote__logo picture--no-background">
              <img
                srcSet="http://uploads.ff0000.com/ff0000/public/ffcom/assets/5c572c02-c54b-11e6-988e-b99849ec91ac.png?v=2"/>
            </picture>
            <p>"RED focuses on creating great customer experiences. This is where we choose to dedicate our attention,
              our energy and our passion."</p>
            <footer className="quote__footer"><cite className="quote__signature"><em className="quote__author">Brian
              Lovell</em><span className="quote__author-title">Chairman + Founder</span></cite></footer>
          </blockquote>
        </FixedSection>
        </figure>
        <article className="full-bleed-hero bkg-blue">3</article>
        <article className="full-bleed-hero bkg-red">3</article>
        <article className="full-bleed-hero bkg-green">3</article>
      </div>
    );
  }
}

render(<Hello/>, document.getElementById('app'));
