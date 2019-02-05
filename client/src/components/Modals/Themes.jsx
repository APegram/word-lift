import React, { Component } from 'react';
import { Col } from '../../CPManager'

export default class Themes extends Component {
    

    render(){
        const theme = this.props.theme.replace(' ', '-')
        return (
            <Col size='sm-4' onClick={this.props.onClick} className={`${theme} themes`}/>
        )
    }
}