import React, { Component } from 'react';
import { Row } from '../../CPManager'

export default class WordSpace extends Component {

    state = {
        word: '',
        theme: 'default'
    }


    wordGen = (word) => {
            console.log("Guess: ", word)
            const wordGen = /^[/a-z0-9]*$/i
            const blank = '_ '
            let newWord = ''
            for (let letter of word){
                newWord += (letter.replace(wordGen, blank))
            }
            console.log(newWord)
            this.setState({
                word: newWord
            })
    }

    componentDidMount = () => {
        this.wordGen(this.props.word)
        this.props.theme ? this.setState({ theme: 'default'}) : this.setState({ theme: this.props.theme })
    }

    render(){
        return (
            <Row className={this.props.theme}>
                <p className='current-word'>{this.state.word}</p>
            </Row>
        )
    }
}