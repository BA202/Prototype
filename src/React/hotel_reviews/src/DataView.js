import React from 'react';
import './DataView.css';
import ClassifiedReview from './ClassifiedReview.js';
import backendApi from './backendApi';


class DataView extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
          resetView: false,
          selectedData: "GetAllData",
          review : {
            "data":{
              "Reviews":{
                  1:{
                      "RawReview": "",
                      "CreationTime": "2022-02-20 07:05:13",
                      "SetType": "Training",
                      "Source": "Online",
                      "Language": "Deutsch",
                      "Sentences": {
                          1:{
                              "Sentence": "",
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
        this.dropDownButtonPressed = this.dropDownButtonPressed.bind(this);
        this.submitPressed();
        this.render();
      }

     

    render() {
      let table = []
      let data = this.state.review.data
      if(data.Reviews[Object.keys(data.Reviews)[0]].RawReview !== "" && !(this.state.resetView))
      {
        for (let res in Object.keys(data.Reviews))
        {
          table.push(<tr><ClassifiedReview data = {data.Reviews[Object.keys(data.Reviews)[res]]}></ClassifiedReview></tr>)
          table.push(<tr><div className="ViewSeperator"></div></tr>)
        }
      }
      else if((this.state.resetView)){
        this.setState({
          resetView: false
        });
      }

      let sentenceView = <table>{table}</table>
      return (
        <div className = "ClassifiedReview">
          <div>
            <label className="Lbl_Refresh">Data refresh</label>
            <input className ="Btn_Refresh" type ="Button" value ="Refresh" onClick={this.submitPressed} readOnly></input>
              <label className="LabelDropdown">Dataset:</label>
                <div className="dropdown">
                  <button className="dropBtn">{this.state.selectedData}<img src="./Dropdown.svg" className="DropdownImg" alt="DropDownArrow" readOnly></img></button>
                  <div className="dropdown-content">
                    <div><button onClick={this.dropDownButtonPressed} id="GetAllData" className="DropdownContentText">GetAllData</button><br></br></div>
                    <div><button onClick={this.dropDownButtonPressed} id="GetUserInputData" className="DropdownContentText">GetUserInputData</button><br></br></div>
                    <div><button onClick={this.dropDownButtonPressed} id="GetTrainingData" className="DropdownContentText">GetTrainingData</button><br></br></div>
                  </div>
                </div>
              </div>
          {sentenceView}
        </div>
      );
    }


    async submitPressed(e)
    {
      let data = null;
      if(this.state.selectedData == "GetTrainingData")
      {
        data = await backendApi.getTrainingData();
      }
      else if(this.state.selectedData == "GetUserInputData")
      {
        data = await backendApi.getUserInputData();
      }
      else
      {
       data = await backendApi.getAllReviews();
      }
        
        this.setState({
          review : data,
          resetView: true
        });
    }

    dropDownButtonPressed(e)
    {
      //console.log(e.target.id);
      this.setState({
        selectedData : e.target.id
      });
      this.submitPressed(e);
    }



  }
  
  export default DataView;