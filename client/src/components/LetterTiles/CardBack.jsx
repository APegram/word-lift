import React, { Component } from "react";

class CardBack extends Component {
    render(){
        return (
            <div className="back">{this.props.children}</div>
        )
    }
}

export default CardBack