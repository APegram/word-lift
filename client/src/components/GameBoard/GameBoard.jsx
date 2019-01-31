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
    word: "",
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
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      ""
    ],
    reset: false,
    wordBank: require("../../wordData").doctorWho,
    letterHolder: 'letter-holder',
    showPicture: false
  };

  handleClick = letter => {
    this.setState({ letterClicked: letter });
    this.checkGuess(letter);
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
      setTimeout(this.showPicture, 1000);
    }
  };

  changeTheme = theme => {
    switch (this.state.theme) {
      case "harry-potter":
        this.setState({
          theme: "doctor"
        });
        break;
      default:
        this.setState({
          theme: "harry-potter"
        });
        break;
    }
  };

  nextRound = () => {
    this.changeTheme();
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
      default:
        this.setState({
          wordBank: require("../../wordData").doctorWho
        });
        break;
    }
    this.wordGen(this.state.wordBank);
    this.setState({
      reset: false
    });
  };

  showPicture = () => {
    this.setState({
      letterHolder: 'show-picture',
      showPicture: true
    })
    setTimeout(this.reset, 3000)
  }

  reset = () => {
    this.setState({
      reset: true,
      letterHolder: 'letter-holder',
      showPicture: false
    });
    this.nextRound();
  };

  wordGen = words => {
    let word = words[Math.floor(Math.random() * words.length)].toLowerCase();
    const wordGen = /^[/a-z0-9]*$/i;
    const blank = "-";
    let newWord = "";
    for (let letter of word) {
      newWord += letter.replace(wordGen, blank);
    }
    console.log(newWord)
    newWord = newWord.split("")
    console.log(newWord)
    this.setState({
      word: word,
      wordHolder: newWord
    });
  };

  componentDidMount = () => {
    this.nextRound();
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
                    word={word}
                    letter={letter}
                    wordGen={this.wordGen}
                    reset={reset}
                    letterHolder={this.state.letterHolder}
                    showPicture={this.state.showPicture}
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
