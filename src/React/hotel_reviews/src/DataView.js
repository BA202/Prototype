import React from 'react';
import './DataView.css';
import ClassifiedReview from './ClassifiedReview.js';
import backendApi from './backendApi';


class DataView extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
          review : {
            "data":{
              "Reviews":{
                  1:{
                      "RawReview": "Ich bin in den Pool gefallen",
                      "CreationTime": "2022-02-20 07:05:13",
                      "SetType": "Training",
                      "Source": "Online",
                      "Language": "Deutsch",
                      "Sentences": {
                          1:{
                              "Sentence": "Ich bin in den Pool gefallen",
                              "ModDate": "2022-02-20 07:05:13",
                              "Classifications" : {
                                  1:{
                                      "Score": 0,
                                      "ScoreConfidence": 1,
                                      "Classification": "Pool",
                                      "ClassificationConfidence": 1,
                                      "ContentType": "Story",
                                      "ContentTypeConfidence":1
                                  }
                              }
        
                          }
                      }
                  }
              }
            },
            "meta":{
        
            }
        },
          result : <ClassifiedReview></ClassifiedReview>
        }
        this.submitPressed = this.submitPressed.bind(this);

        this.submitPressed();
      }

     

    render() {
      let table = []
      let data = this.state.review.data
      for (let res in Object.keys(data.Reviews))
      {
        table.push(<tr><ClassifiedReview data = {data.Reviews[Object.keys(data.Reviews)[res]]}></ClassifiedReview></tr>)
        table.push(<tr><div className="ViewSeperator"></div></tr>)
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