import React from 'react';
import './ClassifiedReview.css';
import Sentence from './Sentence.js';

class ClassifiedReview extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
          review : this.props.data[0],
          sentence : this.props.data[1], 
          result : <Sentence></Sentence>
        }
      }

    render() {
      let table = []
      for (let res in this.state.sentence)
      {
        table.push(<tr><Sentence res = {this.state.sentence[res]}></Sentence></tr>)
      }
      let sentenceView = <table>{table}</table>

      return (
        <div className = "ClassifiedReview">
          <div className="ClassifiedReview_SingleReview_Container">
            <label className="ClassifiedReview_SingleReview">{this.state.review}</label>
          </div>
         
          <div className="ClassifiedReview_Classifications">
          {sentenceView}
          </div>
          <hr></hr>
        </div>
      );
    }
  }
  
  export default ClassifiedReview;