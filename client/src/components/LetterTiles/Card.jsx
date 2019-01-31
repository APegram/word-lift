import React, { Component } from "react";
import CardFront from "./CardFront";
import CardBack from "./CardBack";
import CardContent from './CardContent'

export default class LetterTile extends Component {

  state = {
    isFlipped: false,
  }

  onClick = () => {
    this.setState({
      isFlipped: true
    })
    this.props.onClick(this.props.letter)
  }

  // reset = () => {
  //   this.setState({ isFlipped: false})
  // }

  componentDidUpdate(prevProps) {
  if (this.props.reset !== prevProps.reset) {
    if (this.props.reset && this.state.isFlipped) {
      this.setState({ isFlipped: false });
    } 
  } else if (this.props.showPicture !== prevProps.showPicture){
    this.setState({ isFlipped: true })
  }
}

  render() {
    
    let frontORback =  this.state.isFlipped ? "flipped" : "";
    let letterHolder = this.props.letterHolder

    return (      
      <CardContent className={`${frontORback} ${letterHolder}`} letter={this.props.letter}>
          <CardFront onClick={this.onClick}>
            {/* <img className="alpha-image" src="https://via.placeholder.com/60x60" alt="some"/> */}
            <p className='letters'>{this.props.letter}</p>
          </CardFront>
          <CardBack letter={this.props.letter}>
              
          </CardBack>
      </CardContent>
    );
  }
}

