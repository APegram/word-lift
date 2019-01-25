import React, { Component } from 'react';
import { Container, Row, Col } from '../CPManager'


class Landing extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col className="hot" size='md-2 lg-12'>Hello World</Col>
                </Row>
            </Container>
        )
    }
}

export default Landing