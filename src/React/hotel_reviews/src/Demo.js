import React from 'react';
import './Demo.css';
import backendApi from './backendApi';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reviewClassification: null,
      newReviewText: "",
      exampleData: null,
      indexInExampleData: 0,
      detectedLanguage : "",
    }
    this.textInputChange = this.textInputChange.bind(this);
    this.submitPressed = this.submitPressed.bind(this);
    this.examplePressed = this.examplePressed.bind(this);
    this.updateReview = this.updateReview.bind(this);
    this.dropDownButtonPressed = this.dropDownButtonPressed.bind(this);

  }

  render() {
    let response = null;

    if (this.state.reviewClassification !== null) {
      let listOfReviews = []
      for (let keyIndex in Object.keys(this.state.reviewClassification['data']['Reviews'])) {
        let reviewData = this.state.reviewClassification['data']['Reviews'][Object.keys(this.state.reviewClassification['data']['Reviews'])[keyIndex]];
        let sentenceData = this.state.reviewClassification['data']['Reviews'][Object.keys(this.state.reviewClassification['data']['Reviews'])[keyIndex]]['Sentences'];
        let listOfSentences = [];
        for (let senKey in Object.keys(sentenceData)) {
          let listOfClass = []
          let catData = sentenceData[Object.keys(sentenceData)[senKey]]['Classifications']
          for (let catKey in Object.keys(catData)) {
            listOfClass.push(
              <tr>
                <div className='DemoViewGird lblBackgroundText DemoClassGrid'>
                  <div className="Classification_Score">
                    <label className="Classification_Description">Score:</label>
                    <div className="dropdown demoCustomDropdown demoCustomDropdownWith">
                      <button className="dropBtn demoCustomDropdown demoCustomDropdownWith">{this.state.reviewClassification['data']['Reviews'][Object.keys(this.state.reviewClassification['data']['Reviews'])[keyIndex]]['Sentences'][Object.keys(sentenceData)[senKey]]['Classifications'][Object.keys(catData)[catKey]]['Score']}</button>
                      <div className="dropdown-content demoCustomDropdownWith BringToFront">
                        <div className="BringToFront"><button onClick={() => this.dropDownButtonPressed([keyIndex, senKey, catKey, "Score","Positive"])} id="Positive" className="DropdownContentText demoCustomDropdown demoCustomDropdownSubList BringToFront">Positive</button></div>
                        <div className="BringToFront"><button onClick={() => this.dropDownButtonPressed([keyIndex, senKey, catKey, "Score","Neutral"])} id="Neutral" className="DropdownContentText demoCustomDropdown demoCustomDropdownSubList BringToFront">Neutral</button></div>
                        <div className="BringToFront"><button onClick={() => this.dropDownButtonPressed([keyIndex, senKey, catKey, "Score","Negative"])} id="Negative" className="DropdownContentText demoCustomDropdown demoCustomDropdownSubList BringToFront">Negative</button></div>
                      </div>
                    </div>
                  </div>

                  <div className="Classification_ScoreConfidence">
                    <CircularProgressbar value={catData[Object.keys(catData)[catKey]]['ScoreConfidence'] * 100} text={`${catData[Object.keys(catData)[catKey]]['ScoreConfidence'] * 100}%`} />
                  </div>

                  <div className="Classification_Classification">
                    <label className="Classification_Description">Classification:</label>
                    <div className="dropdown demoCustomDropdown demoCustomDropdownWith ">
                      <button className="dropBtn demoCustomDropdown demoCustomDropdownWith">{this.state.reviewClassification['data']['Reviews'][Object.keys(this.state.reviewClassification['data']['Reviews'])[keyIndex]]['Sentences'][Object.keys(sentenceData)[senKey]]['Classifications'][Object.keys(catData)[catKey]]['Classification']}</button>
                      <div className="dropdown-content demoCustomDropdownWith">
                        <div><button onClick={() => this.dropDownButtonPressed([keyIndex, senKey, catKey, "Classification","Location"])} id="Location" className="DropdownContentText demoCustomDropdown demoCustomDropdownSubList">Location</button></div>
                        <div><button onClick={() => this.dropDownButtonPressed([keyIndex, senKey, catKey, "Classification","Room"])} id="Room" className="DropdownContentText demoCustomDropdown demoCustomDropdownSubList">Room</button></div>
                        <div><button onClick={() => this.dropDownButtonPressed([keyIndex, senKey, catKey, "Classification","Food"])} id="Food" className="DropdownContentText demoCustomDropdown demoCustomDropdownSubList">Food</button></div>
                        <div><button onClick={() => this.dropDownButtonPressed([keyIndex, senKey, catKey, "Classification","Staff"])} id="Staff" className="DropdownContentText demoCustomDropdown demoCustomDropdownSubList">Staff</button></div>
                        <div><button onClick={() => this.dropDownButtonPressed([keyIndex, senKey, catKey, "Classification","ReasonForStay"])} id="ReasonForStay" className="DropdownContentText demoCustomDropdown demoCustomDropdownSubList">ReasonForStay</button></div>
                        <div><button onClick={() => this.dropDownButtonPressed([keyIndex, senKey, catKey, "Classification","GeneralUtilities"])} id="GeneralUtilities" className="DropdownContentText demoCustomDropdown demoCustomDropdownSubList">GeneralUtilities</button></div>
                        <div><button onClick={() => this.dropDownButtonPressed([keyIndex, senKey, catKey, "Classification","HotelOrganization"])} id="HotelOrganization" className="DropdownContentText demoCustomDropdown demoCustomDropdownSubList">HotelOrganization</button></div>
                      </div>
                    </div>
                  </div>

                  <div className="Classification_ClassificationConfidence">
                    <CircularProgressbar value={catData[Object.keys(catData)[catKey]]['ClassificationConfidence'] * 100} text={`${catData[Object.keys(catData)[catKey]]['ClassificationConfidence'] * 100}%`} />
                  </div>

                  <div className="Classification_ContentType">
                    <label className="Classification_Description">Content type:</label>
                    <div className="dropdown demoCustomDropdown demoCustomDropdownWith">
                      <button className="dropBtn demoCustomDropdown demoCustomDropdownWith">{this.state.reviewClassification['data']['Reviews'][Object.keys(this.state.reviewClassification['data']['Reviews'])[keyIndex]]['Sentences'][Object.keys(sentenceData)[senKey]]['Classifications'][Object.keys(catData)[catKey]]['ContentType']}</button>
                      <div className="dropdown-content demoCustomDropdownWith BringToFront">
                        <div className="BringToFront"><button onClick={() => this.dropDownButtonPressed([keyIndex, senKey, catKey, "ContentType","Review"])} id="Review" className="DropdownContentText demoCustomDropdown demoCustomDropdownSubList BringToFront">Review</button></div>
                        <div className="BringToFront"><button onClick={() => this.dropDownButtonPressed([keyIndex, senKey, catKey, "ContentType","TravelAdvice"])} id="TravelAdvice" className="DropdownContentText demoCustomDropdown demoCustomDropdownSubList BringToFront">TravelAdvice</button></div>
                        <div className="BringToFront"><button onClick={() => this.dropDownButtonPressed([keyIndex, senKey, catKey, "ContentType","Stroy"])} id="Stroy" className="DropdownContentText demoCustomDropdown demoCustomDropdownSubList BringToFront">Stroy</button></div>
                      </div>
                    </div>
                  </div>

                  <div className="Classification_ContentTypeConfidence">
                    <CircularProgressbar value={catData[Object.keys(catData)[catKey]]['ContentTypeConfidence'] * 100} text={`${catData[Object.keys(catData)[catKey]]['ContentTypeConfidence'] * 100}%`} />
                  </div>
                  <label className='DemoViewGirdRight'>{ }</label>
                </div>
              </tr>

            )
          }
          listOfSentences.push(
            <tr>
              <div className='DemoViewGird '>
                <div className='VerticalCenter'>
                  <label className='lblBackgroundText DemoViewGirdLeft'>{sentenceData[Object.keys(sentenceData)[senKey]]['Sentence']}</label>
                </div>

                <table className='DemoViewGirdRight'>
                  {listOfClass}
                </table>
              </div>
            </tr>
          )
        }
        listOfReviews.push(
          <tr>
            <div className='DemoViewGird'>
              <div className='VerticalCenter'>
                <label className='lblBackgroundText DemoViewGirdLeft'>{reviewData['RawReview']}</label>
              </div>
              <table className='DemoViewGirdRight'>
                {listOfSentences}
              </table>
            </div>

          </tr>)
      }

      response = <div className='ClassificationResultView'>
        <div className='DemoButtonCenter'>
          <div className='DemoButtonCenter'> 
            <input className="Btn_Refresh DemoButton" type="Button" value="Update" onClick={this.updateReview} readOnly></input>
          </div>
          <div>
            <label className="Warning">Important only press this button if the classification is correct!!</label>
            <label className="Warning small">The data will be used as training sample</label>
          </div>
          
          
        </div>

        <table>
          {listOfReviews}
        </table>
      </div>
    }

    return (
      <div className="NewReview">
        <div className='NewReviewField'>
          <textarea id="TextFieldNewReview" className="TextFieldNewReview paddingBottom" value={this.state.newReviewText} placeholder="enter new review" onChange={this.textInputChange} cols="40" rows="7"></textarea>
          <input className="Btn_Submit" type="Button" value="Submit" onClick={this.submitPressed} readOnly></input>
          <label className="lblExample">get an</label>
          <input className="Btn_Example" type="Button" value="Example" onClick={this.examplePressed} readOnly></input>
          <label className="lblExample lblExampleSecond">Review</label>
          <label className="lblLanguageDetected">{this.state.detectedLanguage}</label>
        </div>
        {response}
      </div>
    );
  }

  async textInputChange(e) {
    console.log(e.target.value.length);
    this.setState({
      newReviewText: e.target.value
    });
    if (e.target.value.length === 10)
    {
      let res = await backendApi.detectLanguage(e.target.value);
      console.log(res);
      if (this.state.newReviewText.length >= 10)
      {
        this.setState({
          detectedLanguage: res
        });
      }
    }
    else if (e.target.value.length < 10)
    {
      this.setState({
        detectedLanguage: ""
      });
    }
  }

  async submitPressed(e) {

    let res = await backendApi.classifyReview(this.state.newReviewText);
    this.setState({
      reviewClassification: JSON.parse(res.response),
      newReviewText: ""
    });
    console.log(JSON.parse(res.response));

  }

  async updateReview(e) {
    let data = {
      "exampleID": this.state.exampleData[this.state.indexInExampleData-1][0],
      "data": this.state.reviewClassification['data']
    }
    let res = backendApi.addClassifiedReview(data);
    window.location.reload(false);
  }

  async dropDownButtonPressed(e) {
    let reviewData = this.state.reviewClassification;
    let sentenceData = this.state.reviewClassification['data']['Reviews'][Object.keys(this.state.reviewClassification['data']['Reviews'])[e[0]]]['Sentences'];
    let catData = sentenceData[Object.keys(sentenceData)[e[1]]]['Classifications']
    reviewData['data']['Reviews'][Object.keys(this.state.reviewClassification['data']['Reviews'])[e[0]]]['Sentences'][Object.keys(sentenceData)[e[1]]]['Classifications'][Object.keys(catData)[e[2]]][e[3]] = e[4];
    this.setState({
      reviewClassification: reviewData
    })
  }

  async examplePressed(e) {
    if (this.state.exampleData === null) {
      let res = await backendApi.getReviewExamples();

      this.setState({
        exampleData: res,
      });
    }
    let index = this.state.indexInExampleData;
    this.setState({
      newReviewText: this.state.exampleData[index][1],
      indexInExampleData: (index + 1) % this.state.exampleData.length
    });
  }
}

export default Demo;