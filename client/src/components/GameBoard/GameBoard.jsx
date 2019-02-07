import React, { Component } from "react";
import { Container, Row, Col, ThemeModal } from "../../CPManager";
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
    this.changeTheme = this.changeTheme.bind(this);
  }
  state = {
    word: "",
    wordHolder: "",
    theme: "doctor who",
    themes: ['doctor who', 'pokemon', 'harry potter'],
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
    wordNumber: 0,
    round: 1,
    guessesLeft: 6,
    showModal: false
  };

  handleClick = letter => {
    this.setState({ letterClicked: letter });
    this.checkGuess(letter);
  };

  checkGuess = letter => {
    let guessesLeft = this.state.guessesLeft
    let word = this.state.word;
    let currentWord = this.state.wordHolder;
    if (word.includes(letter)) {
      for (let char in word) {
        if (word[char] === letter) {
          currentWord[char] = letter;
        }
      }
    } else {
      guessesLeft--
      this.setState({
        guessesLeft: guessesLeft
      })
    }

    this.setState({
      wordHolder: currentWord
    });
    if (guessesLeft === 0) {
      this.setState({
        round: 1
      })
      this.shuffle()
      this.showPicture()
    }
    if (word === currentWord.join("")) {
      this.setState({
        round: this.state.round + 1,
        wordNumber: (this.state.wordNumber + 1)
      })
      setTimeout(this.showPicture, 1000);
    }
  };

  changeTheme = theme => {
    console.log(theme)
    switch (theme) {
      case "harry potter":
        console.log('changing theme to harry potter')
        theme = 'harry potter'
        break;
      case "pokemon":
        console.log('changing theme to pokemon')
        theme = 'pokemon'
        break;
      case 'doctor who':
        console.log('defaulting theme')
        theme = 'doctor who'
        break;
    }
    this.setState({
      showModal: false,
      theme: theme
    })
    this.shuffle(theme)
  };

  nextRound = () => {
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
      showPicture: false,
      guessesLeft: 6
    });
    this.nextRound();
  };

  shuffle = (theme) => {
    console.log(theme)
    if (!theme){
      theme = 'doctor who'
    }
    let wordBank;
    switch (theme) {
      case "doctor who":
        wordBank = require("../../wordData").doctorWho
        break;
      case "harry potter":
        wordBank = require("../../wordData").harryPotter
        break;
      case "pokemon":
        wordBank = require("../../wordData").pokemon
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
    console.log(this.state.wordBank)
    setTimeout(this.reset, 10)
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

  showModal = () => {
    this.setState({
      showModal: true
    })
  }

  componentDidMount = () => {
    this.shuffle()
  };

  render() {
    const { alphabet, isFlipped, word, wordHolder, theme, reset, round, guessesLeft } = this.state;
    let topic = theme.toUpperCase().split('')

    return (
      <Container fluid className="game-board">
        <Row className='game-board-bg'>
          <Col size="sm-3" className={`${theme.replace(' ', '_')} side-board`}>
            <Row className='theme-animation'>
              <Col size='sm-12'>
                <p className={`title`}>{topic}</p>
              </Col>
            </Row>
            <Row className='score-board'>
              <Col size='sm-12' className='score-board-text'>
                <p>Round: {round}</p>
                <p>Guesses Left: {guessesLeft}</p>
              </Col>
            </Row>
            <Row className='change-theme'>
              <Col size='sm-12' className='theme-select'>
                <p onClick={this.showModal} className={theme.replace(' ', '-')}>Change Themes</p>
              </Col>
            </Row>
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
        <ThemeModal showModal={this.state.showModal} theme={this.state.theme} themes={this.state.themes} onClick={this.changeTheme} />
      </Container>
    );
  }
}
