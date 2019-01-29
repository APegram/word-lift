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
    this.nextRound = this.nextRound.bind(this);
  }
  state = {
    word: "jerry",
    wordHolder: "",
    theme: "doctor",
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
    ]
  };

  handleClick = letter => {
    this.setState({ letterClicked: letter });
    this.checkGuess(letter);
    console.log(letter, this.state.reset)
  };

  checkGuess = letter => {
    letter = letter.toLowerCase();
    let word = this.state.word;
    let currentWord = this.state.wordHolder;
    for (let char in word) {
      if (word[char] === letter) {
        currentWord[char] = letter;
      }
    }
    this.setState({
      wordHolder: currentWord
    });
    if (word === currentWord.join("")) {
      this.nextRound();
    }
  };

  // changeTheme = (theme) => {
  //     this.setState({
  //       theme: 'harry-potter'
  //     })
  // }

  nextRound = () => {
    // this.changeTheme()
    switch (this.state.theme) {
      case "doctor":
        this.setState({
          wordBank: require("../../wordData").doctorWho
        });
        break;
      case "harry-potter":
        this.setState({
          wordBank: require("../../wordData").harryPotter
        });
        break;
    }
    this.wordGen(this.state.wordBank);
    console.log(this.state)
  };

  wordGen = words => {
    console.log(words)
    // let word = words[Math.floor(Math.random()*words.length)]
    const wordGen = /^[/a-z0-9]*$/i;
    const blank = "-";
    let newWord = "";
    for (let letter of 'piece') {
      newWord += letter.replace(wordGen, blank);
    }
    newWord = newWord.split("");
    this.setState({
      wordHolder: newWord,
      reset: false
    });
    console.log("Guess: ", this.state.word);
    console.log(newWord);
    console.log(this.state.reset)
  };

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
                <WordSpace
                  theme={theme}
                  wordGen={this.wordGen}
                  nextRound={this.nextRound}
                  word={word}
                  wordHolder={wordHolder}
                />
              </Col>
            </Row>
            <Row>
              <Col size="sm-12" className="orange">
                {alphabet.map(letter => (
                  <LetterTile
                    key={letter}
                    onClick={this.handleClick}
                    isFlipped={isFlipped}
                    reset={reset}
                    word={word}
                    letter={letter}
                    wordGen={this.wordGen}
                  >
                    {letter}
                  </LetterTile>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
