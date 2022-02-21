import React from 'react';
import './Sentence.css';
import Classification from './Classification.js';

class Sentence extends React.Component {

    constructor(props) {
        super(props);
        
        if (typeof this.props.data !== 'undefined') {
          this.state ={
            sentence : this.props.data.Sentence,
            kat : this.props.data.Classifications, 
            result : <Classification></Classification>
          }
        }
        else{
          this.state ={
            sentence : "",
            kat : {}, 
            result : <Classification></Classification>
          }
        }

        
      }

    render() {
      let table = []
      for (let res in Object.keys(this.state.kat))
      {
        table.push(<th><Classification data = {this.state.kat[Object.keys(this.state.kat)[res]]}></Classification></th>)
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