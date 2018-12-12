import React from "react";

import PT from "prop-types";
import makeClassName from "common/makeClassName";

export default class Slider extends React.Component {
    static propTypes = {
        done: PT.bool.isRequired,
        doneText: PT.string.isRequired,
        slideText: PT.string.isRequired,
        onActivate: PT.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            position: 0,
            touch: false,
            finished: false,
        };
        this.pin = null;
    }

    UNSAFE_componentWillUpdate(nextProps) {
        if (!this.props.done && nextProps.done) {
            this.setState({
                finished: false,
            });
        }
    }

    isFree() {
        return !this.state.touch && !this.props.done && !this.state.finished;
    }

    getOuterTextOpacity() {
        if (this.state.finished) {
            return 0;
        }
        let value = Math.min(Math.max(100 - this.state.position, 0), 100);
        return (value / 100).toFixed(3);
    }
    getElementOffset(element) {
        let res = 0;
        while (element) {
            res += element.offsetLeft || 0;
            element = element.parentNode;
        }
        return res;
    }
    getTouch(event) {
        let touch = event.touches[0];
        let parent = event.target.parentNode;
        return touch.pageX - this.getElementOffset(parent);
    }
    getRelativeTouch(event) {
        let touch = event.touches[0];
        let parent = event.target;
        return touch.pageX - this.getElementOffset(parent);
    }
    getSliderPos(event) {
        let pos = this.getTouch(event) - this.pin;
        return Math.min(Math.max(pos, 0), 200);
    }

    handleClick = () => {
        if (this.state.finished || this.props.done) {
            return;
        }
        this.setState({
            posision: 200,
            touch: false,
            finished: true,
        });
        this.props.onActivate();
    };
    handleTouchStart = event => {
        event.preventDefault();
        if (this.state.finished || this.props.done) {
            return;
        }
        this.pin = this.getRelativeTouch(event);
        this.setState({
            position: this.getSliderPos(event),
            touch: true,
        });
    };
    handleTouchMove = event => {
        event.preventDefault();
        if (this.state.finished || this.props.done) {
            return;
        }
        this.setState({
            position: this.getSliderPos(event),
        });
    };
    handleTouchEnd = event => {
        event.preventDefault();
        if (this.state.finished || this.props.done) {
            return;
        }
        if (this.state.position === 200) {
            this.setState({
                position: 0,
                finished: true,
                touch: false,
            });
            this.props.onActivate();
        } else {
            this.setState({
                position: 0,
                touch: false,
            });
        }
    };

    renderText() {
        if (this.props.done) {
            return (
                <span className={"done-text"} style={{ color: "rgb(100,100,100)" }}>
                    {this.props.doneText}
                </span>
            );
        } else {
            return (
                <span
                    className={makeClassName({
                        "slide-text": true,
                        free: this.isFree(),
                    })}
                    style={{ color: `rgba(100,100,100,${this.getOuterTextOpacity()})` }}
                >
                    {this.props.slideText}
                </span>
            );
        }
    }
    render() {
        return (
            <div className="Slider">
                <div
                    className={makeClassName({ inner: true, free: this.isFree() })}
                    style={{
                        left:
                            this.props.done || this.state.finished
                                ? "200px"
                                : `${this.state.position}px`,
                    }}
                    onClick={this.handleClick}
                    onTouchEnd={this.handleTouchEnd}
                    onTouchMove={this.handleTouchMove}
                    onTouchStart={this.handleTouchStart}
                >
                    →
                </div>
                {this.renderText()}
            </div>
        );
    }
}
