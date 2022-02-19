import React from 'react';
import './Sentence.css';
import Classification from './Classification.js';

class Sentence extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
          sentence : this.props.res[0],
          kat : this.props.res[1], 
          result : <Classification></Classification>
        }
      }

    render() {
      let table = []
      for (let res in this.state.kat)
      {
        table.push(<th><Classification classificationData = {this.state.kat[res]}></Classification></th>)
      }
      let showUsers = <table>{table}</table>

      return (
        <div className = "Sentence">
          <div className="Sentence_SingleSentence_Container">
            <label className="Sentence_SingleSentence">{this.state.sentence}</label>
          </div>
         
          <div className="Sentence_Classifications">
          {showUsers}
          </div>
        </div>
      );
    }
  }
  
  export default Sentence;