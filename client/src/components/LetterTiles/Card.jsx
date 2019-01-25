import React, { Component } from "react";
import CardFront from "./CardFront";
import CardBack from "./CardBack";
import CardContent from './CardContent'

export default class LetterTile extends Component {
 


  render() {
    const frontORback = this.props.isFlipped ? "flipped" : "";

    return (
      
      <CardContent className={`${frontORback} letter-holder`} custom={this.props.custom}>
          <CardFront onClick={this.props.handleClick}>
            <img className="alpha-image" src="https://via.placeholder.com/60x60" alt="some"/>
          </CardFront>
          <CardBack>
              
          </CardBack>
      </CardContent>
    );
  }
}

