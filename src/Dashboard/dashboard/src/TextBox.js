import React from 'react';
import './TextBox.css';
import SingleSentence from './SingleSentence.js';

class TextBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPageNumber: 1,
      totalPageNumbers: 100,
    }

    this.PageTextBoxDidChange = this.PageTextBoxDidChange.bind(this);
    this.PageBtnDecreasePressed = this.PageBtnDecreasePressed.bind(this);
    this.PageBtnIncreasePressed = this.PageBtnIncreasePressed.bind(this);
  }

  render() {
    return (
      <div className="TextBox">
        <div className='TextBox_SingleSentencesView'>
          <SingleSentence data={{
            "Sentence": "This a sentence.",
            "ParrentReview": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "Score": "Positive",
            "Classification": "Location",
            "Platform": "Trivago",
            "Language": "English"
          }}></SingleSentence>

          <SingleSentence data={{
            "Sentence": "This a sentence.",
            "ParrentReview": "I am the original review",
            "Score": "Negative",
            "Classification": "Room",
            "Platform": "Booking",
            "Language": "German"
          }}></SingleSentence>


          <SingleSentence data={{
            "Sentence": "This a sentence.",
            "ParrentReview": "I am the original review",
            "Score": "Neutral",
            "Classification": "Food",
            "Platform": "Google",
            "Language": "English"
          }}></SingleSentence>

          <SingleSentence data={{
            "Sentence": "This a sentence.",
            "ParrentReview": "I am the original review",
            "Score": "Positive",
            "Classification": "Staff",
            "Platform": "Google",
            "Language": "English"
          }}></SingleSentence>

          <SingleSentence data={{
            "Sentence": "This a sentence.",
            "ParrentReview": "I am the original review",
            "Score": "Positive",
            "Classification": "ReasonForStay",
            "Platform": "Google",
            "Language": "English"
          }}></SingleSentence>

          <SingleSentence data={{
            "Sentence": "This a sentence.",
            "ParrentReview": "I am the original review",
            "Score": "Positive",
            "Classification": "GeneralUtility",
            "Platform": "Google",
            "Language": "English"
          }}></SingleSentence>

          <SingleSentence data={{
            "Sentence": "This a sentence.",
            "ParrentReview": "I am the original review",
            "Score": "Positive",
            "Classification": "GeneralUtility",
            "Platform": "Google",
            "Language": "English"
          }}></SingleSentence>

        </div>
        <div className='TextBox_Controls'>
          <button className='TextBox_Btn_Controls' onClick={this.PageBtnDecreasePressed}>
            <img src="./ArrowLeft.svg" className="TextBox_Btn_Img" alt="Left"></img>
          </button>
          <label className='TextBox_Btn_Lbl'>Page:</label>
          <input className='TextBox_Btn_Lbl' type="text" value={this.state.currentPageNumber} onChange={this.PageTextBoxDidChange}></input>
          <label className='TextBox_Btn_Lbl'>/{this.state.totalPageNumbers}</label>
          <button className='TextBox_Btn_Controls' onClick={this.PageBtnIncreasePressed}>
            <img src="./ArrowRight.svg" className="TextBox_Btn_Img" alt="Left"></img>
          </button>
        </div>
      </div>
    );
  }

  PageTextBoxDidChange(e) {
    let newNumber = parseInt(e.target.value);
    if (!isNaN(newNumber) && newNumber > 0 && newNumber <= this.state.totalPageNumbers) {
      this.setState({
        currentPageNumber: newNumber
      });
    }
    if (e.target.value.length === 0) {
      this.setState({
        currentPageNumber: ""
      });
    }
  }

  PageBtnIncreasePressed(e) {
    let newNumber = this.state.currentPageNumber + 1;
    if (newNumber > 0 && newNumber <= this.state.totalPageNumbers) {
      this.setState({
        currentPageNumber: newNumber
      });
    }
  }

  PageBtnDecreasePressed(e) {
    let newNumber = this.state.currentPageNumber - 1;
    if (newNumber > 0 && newNumber <= this.state.totalPageNumbers) {
      this.setState({
        currentPageNumber: newNumber
      });
    }

  }
}

export default TextBox;