import React, { Component } from "react";
import CardFront from "./CardFront";
import CardBack from "./CardBack";
import CardContent from './CardContent'

export default class LetterTile extends Component {

  state = {
    isFlipped: false
  }

  onClick = () => {
    this.setState({
      isFlipped: true
    })
    this.props.onClick(this.props.letter)
  }

  render() {
    const reset = false;
    
    let frontORback =  this.state.isFlipped ? "flipped" : "";
    if (reset){
      this.setState({
        isFlipped: false
      })
    }

    return (      
      <CardContent className={`${frontORback} letter-holder`} letter={this.props.letter}>
          <CardFront onClick={this.onClick}>
            <img className="alpha-image" src="https://via.placeholder.com/60x60" alt="some"/>
          </CardFront>
          <CardBack>
              
          </CardBack>
      </CardContent>
    );
  }
}

