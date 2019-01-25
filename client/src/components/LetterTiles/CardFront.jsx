import React, { Component } from "react";




class CardFront extends Component {
    render() {
        return (
            <div className="front" onClick={this.props.onClick}>{this.props.children}</div>
        )
    }
}

export default CardFront