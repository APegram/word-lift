import React, { Component } from 'react';
import { Row } from '../../CPManager'

export default class WordSpace extends Component {

    render(){
        return (
            <Row className={this.props.theme ? this.props.theme : 'default'}>
                <p className='current-word'>{this.props.wordHolder}</p>
            </Row>
        )
    }
}