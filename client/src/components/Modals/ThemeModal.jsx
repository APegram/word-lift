import React, { Component } from 'react';
import { Container, Row } from '../../CPManager'
import Themes from './Themes'
import './Modal.css'


export default class ThemeModal extends Component {


    onClick = () => {
        console.log(this.props.theme, 'has been clicked')
        this.props.onClick(this.props.theme)
    }

    render() {
        return (
            <Container fluid>
                <Row className={`${this.props.showModal ? 'show-modal' : ''} modal`}>
                    {this.props.themes.map(theme => (
                        <Themes theme={theme} onClick={this.onClick}/>
                        ))}
                </Row>
                <Row>
                    <p onClick={this.props.goBack}>Go Back</p>
                </Row>
                        </Container>
        )
    }
}