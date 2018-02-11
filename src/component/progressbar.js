import React, { Component } from 'react';
const ProgressBar = require('progressbar.js');

class CircleProgressBar extends Component {
    componentDidMount() {
        var circle = new ProgressBar.Circle(this.refs.progress, {
            strokeWidth: 2,
            trailWidth: 1,
            easing: 'easeInOut',
            svgStyle: {
                display: 'block',
                width: '12%'
            }
        });
        circle.animate(1.0);
    }

    render() {
        return (
            <div ref="progress" className="row vh-75 justify-content-center align-items-center"/>
        );
    }
}

export default CircleProgressBar;