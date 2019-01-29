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
    word: 'jerry',
    wordHolder: '',
    theme: 'doctor',
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
    reset: false,
    wordBank: []
  };

  handleClick = (letter) => {
    this.setState({ letterClicked: letter });
    this.checkGuess(letter)
  }

  checkGuess = (letter) => {
    letter = letter.toLowerCase();
    let word = this.state.word
    let currentWord = this.state.wordHolder
    for (let char in word){
      if (word[char] === letter){
        currentWord[char] = letter
      }
    }
    this.setState({
      wordHolder: currentWord
    })
    if (word === currentWord.join('')){
      setTimeout(this.nextRound, 1000)
    }
  }

  nextRound = () => {
    switch (this.state.theme) {
      case 'doctor':
        

    }

    this.wordGen('new world')
    this.setState({
      reset: true
    })

  }

  wordGen = word => {
    const wordGen = /^[/a-z0-9]*$/i
    const blank = '-'
    let newWord = ''
    for (let letter of word){
        newWord += (letter.replace(wordGen, blank))
      }
    newWord = newWord.split('')
    this.setState({
      wordHolder: newWord
    })
    console.log("Guess: ", this.state.word)
    console.log(newWord)
  }

  render() {
    const { alphabet, isFlipped, word, wordHolder, theme, reset } = this.state;

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
                <WordSpace theme={theme} wordGen={this.wordGen} word={word} wordHolder={wordHolder}/>
              </Col>
            </Row>
            <Row>
              <Col size="sm-12" className="orange">
                {alphabet.map(letter => (
                  <LetterTile onClick={this.handleClick} isFlipped={isFlipped} reset={reset} word={word} letter={letter} wordGen={this.wordGen}>{letter}</LetterTile>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
