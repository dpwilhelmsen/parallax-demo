import React, { Component } from 'react';
import { Math as ThreeMath } from 'three';
import { addGlobalEvent, removeGlobalEvent } from './events';

class FixedSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: null,
      left: null,
      width: null,
      height: null,
      offsetLeft: 0,
      offsetTop: 0,
      isVisible: false,
      isDisabled: false,
      lastScrollTop: null
    };
  }
  componentDidMount() {
    var context = this;
    addGlobalEvent(this, window, "onResize", this.updatePosition);
    addGlobalEvent(this, document, "onScroll", this.updateVisibility);
    setTimeout(function() {
      context.updatePosition();
      context.updateVisibility();
    }, 0)
  }
  componentWillUnmount() {
    removeGlobalEvent(this, window, "onResize");
    removeGlobalEvent(this, document, "onScroll");
  }
  setOuterEl(e) {
    this.outerEl = e
  }
  setInnerEl(e) {
    this.innerEl = e
  }
  updatePosition() {
    const outerElement = this.outerEl.getBoundingClientRect();
    const innerElement = this.innerEl.getBoundingClientRect();
    const top = Math.round((window.innerHeight - innerElement.height) * this.props.top);
    const left = outerElement.left;
    const width = outerElement.width;
    const height = innerElement.height;
    this.setState({
      top: top,
      left: left,
      width: width,
      height: height
    })
  }
  updateVisibility() {
    const { top, height } = this.state;
    const { parallax, shouldDisable } = this.props;
    const outerElement = this.outerEl.getBoundingClientRect();
    const calculatedTop = outerElement.top + outerElement.height / 2;
    const calculatedParallax = parallax * ThreeMath.clamp(ThreeMath.mapLinear(calculatedTop, 0, window.innerHeight, -1, 1), -1, 1);
    const calculatedParallaxTop = top + calculatedParallax;
    const calculatedBottom = top + calculatedParallax + height;
    let isDisabled = false;
    let isVisible = outerElement.top < calculatedBottom && outerElement.bottom > calculatedParallaxTop;
    if (shouldDisable) {
      const computedStyle = window.getComputedStyle(this.outerEl)
      const bottomPadding = parseInt(computedStyle.paddingBottom, 10);
      isDisabled = calculatedBottom > outerElement.top + outerElement.height - bottomPadding,
        isVisible = isDisabled || isVisible
    }
    (isVisible || isVisible !== this.state.isVisible) && this.setState({
      offsetTop: calculatedParallax,
      isVisible: isVisible,
      isDisabled: isDisabled
    })
  }
  render() {
    const { isVisible, isDisabled, top, left, width, height, offsetTop, offsetLeft } = this.state;
    const { className, id, children} = this.props;
    const classNames = ["fixed-section", className, !isVisible && "fixed-section--hidden", isDisabled && "fixed-section--disabled"].filter(Boolean);
    const outerStyle = {
      height: height,
    };
    const innerStyle = {
      top: top,
      left: left,
      width: width,
      transform: "translateY(" + offsetTop + "px) translateX(" + offsetLeft + ") translateZ(0)"
    };
    return (
      <div className={classNames.join(" ")} style={outerStyle} id={id} ref={(e) => { this.setOuterEl(e) }}>
        <div className="fixed-section__inner" style={innerStyle} ref={(e) => { this.setInnerEl(e) }} >
          { children }
        </div>
      </div>
    );
  }
}

FixedSection.defaultProps = {
  parallax: 50,
  top: .2
}

export default FixedSection;