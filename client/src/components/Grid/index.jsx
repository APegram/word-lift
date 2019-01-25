import React, { Component } from "react";

export class Container extends Component {
  render() {
    return (
      <div
        className={`container${this.props.fluid ? "-fluid" : ""} ${
          this.props.className ? this.props.className : ''
        }`}
      >
        {this.props.children}
      </div>
    );
  }
}

export class Row extends Component {
  render() {
    return (
      <div
        className={`row${this.props.fluid ? "-fluid" : ""} ${
          this.props.className ? this.props.className : ''
        }`}
      >
        {this.props.children}
      </div>
    );
  }
}

export class Col extends Component {
  render() {
    return (
      <div
        className={`${this.props.className} ${this.props.size
          .split(" ")
          .map(size => "col-" + size)
          .join(" ")}`}
      >
        {this.props.children}
      </div>
    );
  }
}
