import React from 'react';
import './SingleSentence.css';
import LevenshteinDistance from './LevenshteinDistance.js';
import { Collapse } from 'react-collapse';


class SingleSentence extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    }
    this.expandTextPressed = this.expandTextPressed.bind(this);
  }

  render() {

    let splitIndex = LevenshteinDistance.findInString(this.props.data.ParrentReview,this.props.data.Sentence);
    console.log(splitIndex);
    let startPart = this.props.data.ParrentReview.slice(0,splitIndex);
    let sentenceOriginal = this.props.data.ParrentReview.slice(splitIndex,splitIndex+this.props.data.Sentence.length);
    let end = this.props.data.ParrentReview.slice(splitIndex+this.props.data.Sentence.length);
    return (
      <div className="SingleSentence_MainView">
        <div className="SingleSentence">
          <div className='SingleSentence_Sentence SingleSentence_Center'>
            <button className='SingleSentence_Lbl_Sentence' onClick={this.expandTextPressed}>{this.props.data.Sentence}</button>
          </div>
          <div className='SingleSentence_Score SingleSentence_Center'>
            <label className={"SingleSentence_Lbl_Res " + this.props.data.Score}>{this.props.data.Score}</label>
          </div>
          <div className='SingleSentence_Classification SingleSentence_Center'>
            <label className={"SingleSentence_Lbl_Res " + this.props.data.Classification}>{this.props.data.Classification}</label>
          </div>
          <div className='SingleSentence_Platform SingleSentence_Center'>
            <label className={"SingleSentence_Lbl_Res " + this.props.data.Platform}>{this.props.data.Platform}</label>
          </div>
          <div className='SingleSentence_Language SingleSentence_Center'>
            <label className={"SingleSentence_Lbl_Res " + this.props.data.Language}>{this.props.data.Language}</label>
          </div>
        </div>
        <Collapse isOpened={this.state.isExpanded}>
          <div className='SingleSentence_ParentReview_Box'>
            <label className="SingleSentence_ParentReview">{startPart}</label>
            <label className="SingleSentence_ParentReview SingleSentence_Red">{sentenceOriginal}</label>
            <label className="SingleSentence_ParentReview">{end}</label>
          </div>
        </Collapse>
      </div>

    );


  }

  expandTextPressed(e) {
    let newState = !this.state.isExpanded;
    this.setState({
      isExpanded: newState
    });
  }
}

export default SingleSentence;