import React from 'react';
import './ClassifiedReview.css';
import Sentence from './Sentence.js';

class ClassifiedReview extends React.Component {

    constructor(props) {
        super(props);
        if (typeof this.props.data !== 'undefined') {
          //console.log(this.props.data);
          this.state ={
            review : this.props.data.RawReview,
            sentence : this.props.data.Sentences, 
            result : <Sentence></Sentence>
          }
        }
        else
        {

          this.state ={
            review : "",
            sentence : {}, 
            result : <Sentence></Sentence>
          }
        }

        
      }

    render() {
      let table = []
      for (let res in Object.keys(this.state.sentence))
      {
        table.push(<tr><Sentence data = {this.state.sentence[Object.keys(this.state.sentence)[res]]}></Sentence></tr>)
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