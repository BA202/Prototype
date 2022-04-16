import React from 'react';
import './TextBox.css';
import SingleSentence from './SingleSentence.js';
import backendApi from './backendApi';

class TextBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPageNumber: 1,
      totalPageNumbers: 0,
      currentViewData : [],
      requestData : {
        "Date": ["2012-04-20T00:00:0Z", "2023-04-23T23:59:0Z"],
        "Category": ["Location", "Room", "Food", "Staff", "ReasonForStay", "GeneralUtility", "HotelOrganisation"],
        "Score": ["Positive", "Negative", "Neutral"],
        "ContentType": ["Review"],
        "Language": ["English", "German"],
        "Source": ["Online"],
        "Hotel": ["Arosa"]
      }
    }

    this.PageTextBoxDidChange = this.PageTextBoxDidChange.bind(this);
    this.PageBtnDecreasePressed = this.PageBtnDecreasePressed.bind(this);
    this.PageBtnIncreasePressed = this.PageBtnIncreasePressed.bind(this);
  }

  render() {
    let sentenceView = []
    for(let i in this.state.currentViewData)
    {
      sentenceView.push(<SingleSentence data={this.state.currentViewData[i]}></SingleSentence>)
    }
    return (
      <div className="TextBox">
        <div className='TextBox_SingleSentencesView'>
          {sentenceView}
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
      this.getCurrentViewData(newNumber);
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
      this.getCurrentViewData(newNumber);
    }
  }

  PageBtnDecreasePressed(e) {
    let newNumber = this.state.currentPageNumber - 1;
    if (newNumber > 0 && newNumber <= this.state.totalPageNumbers) {
      this.setState({
        currentPageNumber: newNumber
      });
      this.getCurrentViewData(newNumber);
    }

  }

  async getCurrentViewData(number)
  {
    console.log(this.state.requestData);
    let data = this.state.requestData;
    data["PageNumber"] = number;
    let res = await backendApi.getTextViewData(data);
    this.setState({currentViewData:res.Data});
  }

  newData(e) 
  {
      this.setState({totalPageNumbers: 1 + Math.floor(e.NumberOfSentences/7)});
      this.getCurrentViewData(this.state.currentPageNumber);
  }

  newRequestData(e)
  {
    this.setState({requestData:e});
  }
}

export default TextBox;