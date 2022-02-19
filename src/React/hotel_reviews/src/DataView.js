import React from 'react';
import './DataView.css';
import ClassifiedReview from './ClassifiedReview.js';
import backendApi from './backendApi';


class DataView extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
          review : [],
          result : <ClassifiedReview></ClassifiedReview>
        }
        this.submitPressed = this.submitPressed.bind(this);

        this.submitPressed();
      }

     

    render() {
      let table = []
      for (let res in this.state.review)
      {
        table.push(<tr><ClassifiedReview data = {this.state.review[res]}></ClassifiedReview></tr>)
        table.push(<tr><div className="HorizontalSeparator_Invisible"></div></tr>)
      }
      let sentenceView = <table>{table}</table>

      return (
        <div className = "ClassifiedReview">
          <div>
          <label className="Lbl_Refresh">Data refresh</label>
          <input className ="Btn_Refresh" type ="Button" value ="Refresh" onClick={this.submitPressed} readOnly></input>
          </div>
          {sentenceView}
        </div>
      );
    }


    async submitPressed(e)
    {
        let data = await backendApi.getReviews();
        this.setState({
          review : data
        });
        
    }
  }
  
  export default DataView;