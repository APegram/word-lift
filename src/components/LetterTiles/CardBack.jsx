import React, { Component } from "react";

class CardBack extends Component {
    render(){
        return (
            <div className={`back ${this.props.letter}`} style={ { backgroundImage: `url(/images/${this.props.theme}/${this.props.image}.jpg)` } }>{this.props.children}</div>
        )
    }
}

export default CardBack

//try doing images and a letter div, overlapping via position absolute in one div?