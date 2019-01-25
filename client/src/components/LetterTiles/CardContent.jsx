import React, { Component } from "react";
import "./Card.css";

class CardContent extends Component {
    render() {
        return(

            <div className={this.props.className} custom-letter={this.props.custom}>
                {this.props.children}
            </div>
        )
    }
}

export default CardContent;