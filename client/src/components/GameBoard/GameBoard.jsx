import React, { Component } from "react";
import { Container, Row, Col } from "../../CPManager";
import "./GameBoard.css";
import WordSpace from "./WordSpace";
import LetterTile from "../LetterTiles/Card";

export default class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.wordGen = this.wordGen.bind(this);
  }
  state = {
    word: '',
    theme: 'default',
    alphabet: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "p",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ],
    isFlipped: false,
  };

  handleClick = event => {
    event.preventDefault();
    console.log('test')
    this.setState({ isFlipped: true });
  }

  wordGen = word => {
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
    console.log("Guess: ", this.state.word)
  }

  render() {
    const { alphabet, isFlipped, word } = this.state;

    return (
      <Container fluid className="game-board">
        <Row>
          <Col size="sm-3" className="blue">
            <Row className="theme-animation">Theme Animation</Row>
            <Row className="theme-image">Theme Image</Row>
          </Col>
          <Col size="sm-9" className="alpha-town">
            <Row className="word-space">
              <Col size="sm-12" className="red">
                <WordSpace wordGen={this.wordGen} word="Darkness" />
              </Col>
            </Row>
            <Row>
              <Col size="sm-12" className="orange">
                {alphabet.map(letter => (
                  <LetterTile onClick={this.handleClick} isFlipped={isFlipped} custom={{letter: letter, word: word}}>{letter}</LetterTile>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
