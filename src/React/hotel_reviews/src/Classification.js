import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Classification.css';


class Classification extends React.Component {

    constructor(props) {
        super(props);
        if (typeof this.props.data !== 'undefined') {
          this.state ={
            score : this.props.data.Score,
            scoreConfidence : this.props.data.ScoreConfidence,
            classification : this.props.data.Classification,
            classificationConfidence : this.props.data.ClassificationConfidence,
            contentType : this.props.data.ContentType,
            contentTypeConfidence : this.props.data.ContentTypeConfidence
        }
        }
        else{
          this.state ={
            score : 0,
            scoreConfidence : 0,
            classification : "",
            classificationConfidence : 0,
            contentType : "",
            contentTypeConfidence : 0
        }
        }
        
      }

    render() {
      return (
        <div className = "Classification">
            <div className="Classification_Score">
              <label className="Classification_Description">Score:</label>
              <label className="Result">{this.state.score}</label>
            </div>

            <div className="Classification_ScoreConfidence">
              <CircularProgressbar value={this.state.scoreConfidence*100} text={`${this.state.scoreConfidence*100}%`} />
            </div>

            <div className="Classification_Classification">
              <label className="Classification_Description">Classification:</label>
              <label className="Result">{this.state.classification}</label>
            </div>

            <div className="Classification_ClassificationConfidence">
              <CircularProgressbar value={this.state.classificationConfidence*100} text={`${this.state.classificationConfidence*100}%`} />
            </div>

            <div className="Classification_ContentType">
              <label className="Classification_Description">Content type:</label>
              <label className="Result">{this.state.contentType}</label>
            </div>

            <div className="Classification_ContentTypeConfidence">
              <CircularProgressbar value={this.state.contentTypeConfidence*100} text={`${this.state.contentTypeConfidence*100}%`} />
            </div>
        </div>
      );
    }
  }
  
  export default Classification;