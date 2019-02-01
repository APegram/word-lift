import React, { Component } from "react";
import { Container, Row, Col } from "../../CPManager";
import "./GameBoard.css";
import "./Theme.css";
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
    theme: "doctor who",
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
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ],
    reset: false,
    wordBank: [],
    letterHolder: "letter-holder",
    showPicture: false,
    image: "",
    wordNumber: 0
  };

  handleClick = letter => {
    this.setState({ letterClicked: letter });
    this.checkGuess(letter);
  };

  checkGuess = letter => {
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
      this.setState({
        wordNumber: (this.state.wordNumber + 1)
      })
      setTimeout(this.showPicture, 1000);
    }
  };

  changeTheme = theme => {
    switch (this.state.theme) {
      case "harry-potter":
        this.setState({
          theme: "doctor who"
        });
        break;
      default:
        this.setState({
          theme: "harry potter"
        });
        break;
    }
  };

  nextRound = () => {
    // this.changeTheme();
    this.wordGen(this.state.wordBank);
    this.setState({
      reset: false
    });
  };

  showPicture = () => {
    this.setState({
      letterHolder: "show-picture",
      showPicture: true
    });
    setTimeout(this.reset, 3000);
  };

  reset = () => {
    this.setState({
      reset: true,
      letterHolder: "letter-holder",
      showPicture: false
    });
    this.nextRound();
  };

  shuffle = () => {
    let wordBank;
    switch (this.state.theme) {
      case "doctor-who":
          wordBank = require("../../wordData").doctorWho
        break;
      case "harry-potter":
          wordBank = require("../../wordData").harryPotter
        break;
      default:
          wordBank = require("../../wordData").doctorWho
        break;
    }
    var wordCount = wordBank.length;
    var wordSelected;
    var temp;
    
    while (wordCount > 0) {
      wordSelected = Math.floor(Math.random() * wordCount);
      wordCount--;
      temp = wordBank[wordCount];
      wordBank[wordCount] = wordBank[wordSelected];
      wordBank[wordSelected] = temp;
    }
    this.setState({
      wordBank: wordBank
    });
  };

  wordGen = words => {
    let word = words[this.state.wordNumber].toUpperCase()
    const wordGen = /^[/a-z0-9]*$/i;
    const blank = "-";
    let newWord = "";
    for (let letter of word) {
      newWord += letter.replace(wordGen, blank);
    }
    newWord = newWord.split("");
    this.setState({
      word: word,
      image: word.toLowerCase().replace(" ", "-"),
      wordHolder: newWord
    });
  };

  componentDidMount = () => {
    this.shuffle()
    setTimeout(this.nextRound, 10)
  };

  render() {
    const { alphabet, isFlipped, word, wordHolder, theme, reset } = this.state;
    let topic = theme.toUpperCase().split('')
    console.log(topic)

    return (
      <Container fluid className="game-board">
        <Row>
          <Col size="sm-3" className="blue theme-animation">
            {topic.map(letter => (
              <p className={`${theme.replace(' ', '_')} title`}>{letter}</p>
            ))}
          </Col>
          <Col size="sm-9" className="alpha-town">
            <Row className="word-space">
              <Col size="sm-12" className="red">
                <WordSpace
                  theme={theme.replace(' ', '_')}
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
                    image={this.state.image}
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
