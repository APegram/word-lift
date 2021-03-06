import React, { Component } from 'react';
import { Container, Row } from '../../CPManager'
import Themes from './Themes'
import './Modal.css'


export default class ThemeModal extends Component {


    render() {
        return (
            <Container fluid>
                <Row className={`${this.props.showModal ? 'show-modal' : ''} modal`}>
                    {this.props.themes.map(theme => (
                        <Themes key={theme} theme={theme} onClick={this.props.onClick}/>
                        ))}
                </Row>
            </Container>
        )
    }
}