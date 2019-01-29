import React, { Component } from 'react';
import { Row } from '../../CPManager'

export default class WordSpace extends Component {

    state = {
        theme: this.props.theme
    }

    componentDidMount = () => {
        this.props.nextRound()
        console.log('current theme: ' + this.state.theme)
    }

    render(){
        return (
            <Row className={this.props.theme}>
                <p className='current-word'>{this.props.wordHolder}</p>
            </Row>
        )
    }
}